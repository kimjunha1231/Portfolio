import { handleMcpMessage, getMcpServerCard, MCP_PROTOCOL_VERSIONS } from "@/lib/mcp";
import { SITE_URL } from "@/lib/site";

const allowedOrigins = new Set([
  SITE_URL.origin,
  "https://claude.ai",
  "https://chatgpt.com",
  "https://chat.openai.com",
  "https://www.perplexity.ai",
]);

function commonHeaders(origin: string | null) {
  return {
    "Cache-Control": "no-store",
    Vary: "Origin",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Accept, Content-Type, MCP-Protocol-Version, MCP-Session-Id, Last-Event-ID",
    ...(origin && allowedOrigins.has(origin)
      ? { "Access-Control-Allow-Origin": origin }
      : {}),
  };
}

function originError(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || allowedOrigins.has(origin)) return null;

  return Response.json(
    {
      jsonrpc: "2.0",
      error: { code: -32000, message: "Origin is not allowed" },
    },
    {
      status: 403,
      headers: { ...commonHeaders(origin), "Cache-Control": "no-store" },
    },
  );
}

function protocolError(request: Request, message: string) {
  return Response.json(
    { jsonrpc: "2.0", error: { code: -32600, message } },
    { status: 400, headers: commonHeaders(request.headers.get("origin")) },
  );
}

export function OPTIONS(request: Request) {
  const denied = originError(request);
  if (denied) return denied;

  return new Response(null, {
    status: 204,
    headers: commonHeaders(request.headers.get("origin")),
  });
}

export function GET(request: Request) {
  const denied = originError(request);
  if (denied) return denied;

  const origin = request.headers.get("origin");
  const acceptsEventStream = request.headers.get("accept")?.includes("text/event-stream");
  if (acceptsEventStream) {
    return new Response(null, {
      status: 405,
      headers: {
        ...commonHeaders(origin),
        Allow: "GET, POST, OPTIONS",
      },
    });
  }

  return Response.json(getMcpServerCard(), {
    headers: {
      ...commonHeaders(origin),
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}

export async function POST(request: Request) {
  const denied = originError(request);
  if (denied) return denied;

  const contentType = request.headers.get("content-type")?.toLowerCase() || "";
  if (!contentType.includes("application/json")) {
    return protocolError(request, "Content-Type must include application/json");
  }

  const requestedProtocolVersion = request.headers.get("mcp-protocol-version");
  if (requestedProtocolVersion && !MCP_PROTOCOL_VERSIONS.includes(requestedProtocolVersion as typeof MCP_PROTOCOL_VERSIONS[number])) {
    return protocolError(
      request,
      `Unsupported MCP protocol version. Supported versions: ${MCP_PROTOCOL_VERSIONS.join(", ")}`,
    );
  }

  let message: unknown;
  try {
    message = await request.json();
  } catch {
    return protocolError(request, "Request body must be valid JSON");
  }

  const response = handleMcpMessage(message);
  if (response.status === 202) {
    return new Response(null, {
      status: 202,
      headers: commonHeaders(request.headers.get("origin")),
    });
  }

  return Response.json(response.body, {
    status: response.status,
    headers: {
      ...commonHeaders(request.headers.get("origin")),
      "MCP-Protocol-Version": MCP_PROTOCOL_VERSIONS[0],
    },
  });
}

export function DELETE(request: Request) {
  const denied = originError(request);
  if (denied) return denied;

  return new Response(null, {
    status: 405,
    headers: {
      ...commonHeaders(request.headers.get("origin")),
      Allow: "GET, POST, OPTIONS",
    },
  });
}
