import { MCP_PROTOCOL_VERSION } from "@/lib/mcp";
import {
  CONTACT_EMAIL,
  SITE_BRAND,
  SITE_DESCRIPTION,
  SITE_URL,
} from "@/lib/site";

const markdownResponse = {
  "200": {
    description: "UTF-8 Markdown or plain-text document",
    content: {
      "text/markdown": { schema: { type: "string" } },
      "text/plain": { schema: { type: "string" } },
    },
  },
};

const rawPath = (kind: "projects" | "blog") => ({
  get: {
    operationId: `get${kind === "projects" ? "Project" : "BlogPost"}Markdown`,
    summary: `Get a ${kind === "projects" ? "project" : "blog post"} as Markdown`,
    description: "Returns the published canonical Markdown source. No authentication is required.",
    parameters: [
      {
        name: "slug",
        in: "path",
        required: true,
        schema: { type: "string", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" },
      },
    ],
    responses: {
      ...markdownResponse,
      "404": { description: "Published slug not found" },
    },
  },
});

const document = {
  openapi: "3.1.0",
  info: {
    title: `${SITE_BRAND} Portfolio Read-only API`,
    version: "1.0.0",
    description: `${SITE_DESCRIPTION} 공개 콘텐츠와 에이전트용 문서를 읽기 위한 인증 없는 API입니다.`,
    contact: { name: "김준하", email: CONTACT_EMAIL, url: SITE_URL.toString() },
  },
  servers: [{ url: SITE_URL.toString(), description: `${SITE_BRAND} production (Vercel)` }],
  externalDocs: {
    description: "Developer guide and MCP usage",
    url: new URL("/developers", SITE_URL).toString(),
  },
  paths: {
    "/llms.txt": {
      get: {
        operationId: "getAgentIndex",
        summary: "Get the short agent index",
        description: "Returns profile, project, blog, developer resource and when-to-use guidance in Markdown.",
        responses: markdownResponse,
      },
    },
    "/llms-full.txt": {
      get: {
        operationId: "getFullAgentContext",
        summary: "Get the full agent context",
        description: "Returns all published project and blog Markdown in one text response.",
        responses: { "200": { description: "Full text context", content: { "text/plain": { schema: { type: "string" } } } } },
      },
    },
    "/skill.md": {
      get: {
        operationId: "getPortfolioSkill",
        summary: "Get the portfolio skill document",
        responses: markdownResponse,
      },
    },
    "/agent-instructions.md": {
      get: {
        operationId: "getAgentInstructions",
        summary: "Get instructions for when and how to use Junha.dev",
        responses: markdownResponse,
      },
    },
    "/projects": {
      get: {
        operationId: "getProjectsIndex",
        summary: "Get the projects collection",
        responses: { "200": { description: "HTML collection page" } },
      },
    },
    "/projects/{slug}/raw": rawPath("projects"),
    "/blog": {
      get: {
        operationId: "getBlogIndex",
        summary: "Get the blog collection",
        responses: { "200": { description: "HTML collection page" } },
      },
    },
    "/blog/{slug}/raw": rawPath("blog"),
    "/.well-known/agent-skills/index.json": {
      get: {
        operationId: "getAgentSkillsDiscovery",
        summary: "Discover the portfolio skill",
        responses: { "200": { description: "Agent Skills discovery JSON", content: { "application/json": { schema: { type: "object" } } } } },
      },
    },
    "/.well-known/mcp": {
      get: {
        operationId: "getMcpServerCard",
        summary: "Get the Junha.dev MCP server card",
        responses: { "200": { description: "MCP server card", content: { "application/json": { schema: { type: "object" } } } } },
      },
      post: {
        operationId: "callMcp",
        summary: "Send a JSON-RPC request to the MCP server",
        description: `Streamable HTTP JSON-RPC endpoint using MCP protocol ${MCP_PROTOCOL_VERSION}. Read-only tools only; no authentication is required.`,
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["jsonrpc", "method"],
                properties: {
                  jsonrpc: { const: "2.0" },
                  id: { oneOf: [{ type: "string" }, { type: "number" }, { type: "null" }] },
                  method: { type: "string" },
                  params: { type: "object" },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "JSON-RPC response", content: { "application/json": { schema: { type: "object" } } } },
          "202": { description: "JSON-RPC notification accepted" },
          "400": { description: "Invalid protocol or JSON" },
          "403": { description: "Origin rejected" },
        },
      },
    },
  },
  "x-agent-readonly": true,
  "x-mcp-protocol-version": MCP_PROTOCOL_VERSION,
};

export function GET() {
  return Response.json(document, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
