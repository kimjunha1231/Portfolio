import process from "node:process";

const baseUrl = (process.env.AGENT_READINESS_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const failures = [];

async function get(path, init) {
  const response = await fetch(`${baseUrl}${path}`, init);
  const body = await response.text();
  return { response, body };
}

function expect(condition, message) {
  if (!condition) failures.push(message);
}

function contentText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[^;]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function verify() {
  const missing = await get("/agent-readiness-check-does-not-exist");
  expect(missing.response.status === 404, `404 check returned ${missing.response.status}`);
  expect(missing.response.headers.get("content-type")?.includes("text/markdown"), "404 response is not Markdown");
  expect(missing.body.includes("/sitemap.xml"), "404 body does not link to sitemap.xml");
  expect(missing.body.includes("/llms.txt"), "404 body does not link to llms.txt");
  expect(missing.body.includes("/developers"), "404 body does not link to developer resources");

  const home = await get("/");
  const homeText = contentText(home.body);
  expect(home.response.status === 200, `homepage returned ${home.response.status}`);
  expect(/<h1\b/i.test(home.body), "homepage has no H1 in raw HTML");
  expect(/<h2\b/i.test(home.body) && /<h3\b/i.test(home.body), "homepage lacks a hierarchical H2/H3 heading structure");
  expect(homeText.length >= 500, `homepage has only ${homeText.length} visible raw-HTML characters`);
  expect(home.body.includes("Junha.dev"), "homepage raw HTML does not include the brand name");

  const publicEndpoints = [
    "/projects",
    "/blog",
    "/videos",
    "/robots.txt",
    "/rss.xml",
    "/feed.xml",
    "/video-sitemap.xml",
    "/llms.md",
    "/llms-full.txt",
    "/index.md",
    "/projects.md",
    "/blog.md",
    "/skill.md",
    "/.well-known/agent-skills/index.json",
    "/videos/jobsecretary-before",
    "/videos/jobsecretary-after",
    "/videos/jobsecretary-dnd-kit-separated",
    "/videos/redis-reference-upscaled",
  ];
  for (const path of publicEndpoints) {
    const endpoint = await get(path);
    expect(endpoint.response.status === 200, `${path} returned ${endpoint.response.status}`);
  }

  for (const path of ["/about", "/contact", "/privacy", "/developers"]) {
    const page = await get(path);
    const text = contentText(page.body);
    expect(page.response.status === 200, `${path} returned ${page.response.status}`);
    expect(/<h1\b/i.test(page.body), `${path} has no H1`);
    expect(text.length >= 500, `${path} has only ${text.length} visible characters`);
    expect(page.body.includes("Junha.dev"), `${path} does not include the brand name`);
  }

  const llms = await get("/llms.txt");
  expect(llms.response.status === 200, `llms.txt returned ${llms.response.status}`);
  expect(llms.body.includes("## When to use this site"), "llms.txt lacks when-to-use instructions");
  expect(llms.body.includes("/openapi.json"), "llms.txt does not list OpenAPI");
  expect(llms.body.includes("/.well-known/mcp"), "llms.txt does not list MCP");
  const indexedContentPaths = [...llms.body.matchAll(/https?:\/\/[^\s)]+\/(projects|blog)\/([a-z0-9-]+)/g)]
    .map((match) => `/${match[1]}/${match[2]}`)
    .filter((path, index, paths) => paths.indexOf(path) === index);
  for (const path of indexedContentPaths) {
    const page = await get(path);
    const raw = await get(`${path}/raw`);
    expect(page.response.status === 200, `${path} returned ${page.response.status}`);
    expect(raw.response.status === 200, `${path}/raw returned ${raw.response.status}`);
    expect(raw.response.headers.get("content-type")?.includes("text/markdown"), `${path}/raw is not Markdown`);
  }

  const instructions = await get("/agent-instructions.md");
  expect(instructions.response.status === 200, `agent-instructions.md returned ${instructions.response.status}`);
  expect(instructions.body.includes("## When to use this site"), "agent-instructions.md lacks when-to-use guidance");

  const instructionsAlias = await get("/agents.md");
  expect(instructionsAlias.response.status === 200, `agents.md returned ${instructionsAlias.response.status}`);
  expect(instructionsAlias.body.includes("## When to use this site"), "agents.md lacks when-to-use guidance");

  const openapi = await get("/openapi.json");
  expect(openapi.response.status === 200, `openapi.json returned ${openapi.response.status}`);
  let openapiJson;
  try {
    openapiJson = JSON.parse(openapi.body);
  } catch {
    failures.push("openapi.json is not valid JSON");
  }
  expect(openapiJson?.openapi === "3.1.0", "openapi.json is not OpenAPI 3.1");
  expect(Boolean(openapiJson?.paths?.["/.well-known/mcp"]), "OpenAPI does not describe MCP");

  const mcpCard = await get("/.well-known/mcp");
  expect(mcpCard.response.status === 200, `MCP server card returned ${mcpCard.response.status}`);
  let cardJson;
  try {
    cardJson = JSON.parse(mcpCard.body);
  } catch {
    failures.push("MCP server card is not valid JSON");
  }
  expect(cardJson?.transport === "streamable-http", "MCP server card does not declare Streamable HTTP");
  expect(cardJson?.endpoint?.endsWith("/.well-known/mcp"), "MCP server card endpoint is incorrect");

  const initialize = await get("/.well-known/mcp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2025-11-25",
        capabilities: {},
        clientInfo: { name: "agent-readiness-test", version: "1.0.0" },
      },
    }),
  });
  let initializeJson;
  try {
    initializeJson = JSON.parse(initialize.body);
  } catch {
    failures.push("MCP initialize response is not valid JSON");
  }
  expect(initialize.response.status === 200, `MCP initialize returned ${initialize.response.status}`);
  expect(initializeJson?.jsonrpc === "2.0" && initializeJson?.result?.protocolVersion, "MCP initialize response is missing protocolVersion");
  expect(initializeJson?.result?.serverInfo?.name === "junha-portfolio", "MCP initialize response has wrong server name");

  const tools = await get("/.well-known/mcp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      "MCP-Protocol-Version": "2025-11-25",
    },
    body: JSON.stringify({ jsonrpc: "2.0", id: 2, method: "tools/list" }),
  });
  let toolsJson;
  try {
    toolsJson = JSON.parse(tools.body);
  } catch {
    failures.push("MCP tools/list response is not valid JSON");
  }
  expect(tools.response.status === 200, `MCP tools/list returned ${tools.response.status}`);
  expect(toolsJson?.result?.tools?.some((tool) => tool.name === "search_portfolio"), "MCP tools/list lacks search_portfolio");

  const toolCall = await get("/.well-known/mcp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      "MCP-Protocol-Version": "2025-11-25",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: { name: "search_portfolio", arguments: { query: "Next.js", limit: 3 } },
    }),
  });
  let toolCallJson;
  try {
    toolCallJson = JSON.parse(toolCall.body);
  } catch {
    failures.push("MCP tools/call response is not valid JSON");
  }
  expect(toolCall.response.status === 200, `MCP tools/call returned ${toolCall.response.status}`);
  expect(toolCallJson?.result?.isError === false, "MCP tools/call did not return a successful read-only result");

  const initialized = await get("/.well-known/mcp", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json, text/event-stream" },
    body: JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }),
  });
  expect(initialized.response.status === 202, `MCP initialized notification returned ${initialized.response.status}`);

  const sseGet = await get("/.well-known/mcp", { headers: { Accept: "text/event-stream" } });
  expect(sseGet.response.status === 405, `MCP GET SSE probe returned ${sseGet.response.status}`);

  const deniedOrigin = await get("/.well-known/mcp", { headers: { Origin: "https://untrusted.example" } });
  expect(deniedOrigin.response.status === 403, `MCP rejected-origin probe returned ${deniedOrigin.response.status}`);

  const sitemap = await get("/sitemap.xml");
  expect(sitemap.response.status === 200, `sitemap.xml returned ${sitemap.response.status}`);
  for (const path of ["/about", "/contact", "/privacy", "/developers"]) {
    expect(sitemap.body.includes(path), `sitemap.xml does not include ${path}`);
  }
}

try {
  await verify();
} catch (error) {
  failures.push(error instanceof Error ? error.message : String(error));
}

if (failures.length > 0) {
  console.error(`Agent readiness verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Agent readiness verification passed against ${baseUrl}.`);
}
