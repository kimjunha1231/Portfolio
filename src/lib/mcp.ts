import {
  getAllPosts,
  getPostBySlug,
  toCleanMarkdown,
  type MDXPost,
} from "@/lib/mdx";
import {
  CONTACT_EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  PERSON_JOB_TITLE,
  PERSON_NAME,
  SITE_BRAND,
  SITE_DESCRIPTION,
  SITE_URL,
  TECHNICAL_TOPICS,
  absoluteUrl,
} from "@/lib/site";

export const MCP_PROTOCOL_VERSIONS = ["2025-11-25", "2025-03-26"] as const;
export const MCP_PROTOCOL_VERSION = MCP_PROTOCOL_VERSIONS[0];

export type JsonRpcId = string | number | null;

export interface McpResponse {
  status: number;
  body?: Record<string, unknown>;
}

interface McpTool {
  name: string;
  title: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations: Record<string, boolean>;
}

const publishedPosts = (kind: "blog" | "projects") =>
  getAllPosts(kind).filter((post) => post.published);

const projectSummary = (project: MDXPost) => ({
  slug: project.slug,
  title: project.title,
  description: project.description,
  category: project.projectCategory || project.category,
  role: project.role,
  tags: project.tags || [],
  date: project.date,
  lastModified: project.lastModified,
  url: absoluteUrl(`/projects/${project.slug}`),
  rawUrl: absoluteUrl(`/projects/${project.slug}/raw`),
});

const blogSummary = (post: MDXPost) => ({
  slug: post.slug,
  title: post.title,
  description: post.description,
  category: post.category,
  section: post.section,
  tags: post.tags || [],
  date: post.date,
  lastModified: post.lastModified,
  url: absoluteUrl(`/blog/${post.slug}`),
  rawUrl: absoluteUrl(`/blog/${post.slug}/raw`),
});

export const MCP_TOOLS: McpTool[] = [
  {
    name: "get_profile",
    title: `${SITE_BRAND} 프로필 조회`,
    description: "김준하의 공개 프로필, 전문 분야와 공식 링크를 반환합니다.",
    inputSchema: { type: "object", additionalProperties: false },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  {
    name: "list_projects",
    title: "프로젝트 목록 조회",
    description: "공개된 프로젝트 케이스 스터디의 요약과 canonical URL을 반환합니다.",
    inputSchema: { type: "object", additionalProperties: false },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  {
    name: "get_project",
    title: "프로젝트 원문 조회",
    description: "프로젝트 slug에 해당하는 공개 Markdown 원문을 반환합니다.",
    inputSchema: {
      type: "object",
      properties: { slug: { type: "string", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" } },
      required: ["slug"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  {
    name: "list_blog_posts",
    title: "기술 블로그 목록 조회",
    description: "공개된 기술 블로그 글의 요약과 canonical URL을 반환합니다.",
    inputSchema: { type: "object", additionalProperties: false },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  {
    name: "get_blog_post",
    title: "기술 블로그 원문 조회",
    description: "블로그 slug에 해당하는 공개 Markdown 원문을 반환합니다.",
    inputSchema: {
      type: "object",
      properties: { slug: { type: "string", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" } },
      required: ["slug"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  {
    name: "search_portfolio",
    title: `${SITE_BRAND} 콘텐츠 검색`,
    description: "프로필, 프로젝트와 블로그에서 질의어가 포함된 공개 콘텐츠를 찾습니다.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", minLength: 1, maxLength: 120 },
        limit: { type: "integer", minimum: 1, maximum: 10, default: 5 },
      },
      required: ["query"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
];

export function getMcpServerCard() {
  return {
    name: "junha-portfolio",
    title: `${SITE_BRAND} Portfolio MCP`,
    version: "1.0.0",
    description: SITE_DESCRIPTION,
    protocolVersion: MCP_PROTOCOL_VERSION,
    protocolVersions: [...MCP_PROTOCOL_VERSIONS],
    transport: "streamable-http",
    endpoint: absoluteUrl("/.well-known/mcp"),
    authentication: { required: false, scope: "public read-only portfolio content" },
    tools: MCP_TOOLS.map(({ name, title, description }) => ({ name, title, description })),
    documentation: absoluteUrl("/developers"),
    openapi: absoluteUrl("/openapi.json"),
  };
}

function jsonRpcError(id: JsonRpcId, code: number, message: string, data?: unknown): McpResponse {
  return {
    status: 200,
    body: {
      jsonrpc: "2.0",
      id,
      error: { code, message, ...(data === undefined ? {} : { data }) },
    },
  };
}

function jsonRpcResult(id: JsonRpcId, result: Record<string, unknown>): McpResponse {
  return { status: 200, body: { jsonrpc: "2.0", id, result } };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isJsonRpcId(value: unknown): value is JsonRpcId {
  return value === null || typeof value === "string" || typeof value === "number";
}

function getArguments(value: unknown) {
  return isRecord(value) ? value : null;
}

function toolTextResult(value: unknown, structuredContent?: Record<string, unknown>) {
  const text = typeof value === "string" ? value : JSON.stringify(value, null, 2);
  return {
    content: [{ type: "text", text }],
    ...(structuredContent ? { structuredContent } : {}),
    isError: false,
  };
}

function toolErrorResult(message: string) {
  return {
    content: [{ type: "text", text: message }],
    isError: true,
  };
}

function profile() {
  return {
    brand: SITE_BRAND,
    name: PERSON_NAME,
    alternateName: "Kim Junha",
    jobTitle: PERSON_JOB_TITLE,
    description: SITE_DESCRIPTION,
    topics: TECHNICAL_TOPICS,
    email: CONTACT_EMAIL,
    urls: {
      home: absoluteUrl("/"),
      projects: absoluteUrl("/projects"),
      blog: absoluteUrl("/blog"),
      github: GITHUB_URL,
      linkedin: LINKEDIN_URL,
      agentInstructions: absoluteUrl("/agent-instructions.md"),
    },
  };
}

function searchPosts(query: string, limit: number) {
  const normalizedQuery = query.trim().toLocaleLowerCase("ko-KR");
  const posts = [
    ...publishedPosts("projects").map((post) => ({ kind: "project" as const, post })),
    ...publishedPosts("blog").map((post) => ({ kind: "blog" as const, post })),
  ];

  return posts
    .filter(({ post }) =>
      [post.title, post.description, post.category, post.section, ...(post.tags || []), post.content]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("ko-KR")
        .includes(normalizedQuery),
    )
    .slice(0, limit)
    .map(({ kind, post }) => ({
      kind,
      ...(kind === "project" ? projectSummary(post) : blogSummary(post)),
    }));
}

function callTool(name: string, args: Record<string, unknown>) {
  switch (name) {
    case "get_profile":
      return toolTextResult(profile(), profile());
    case "list_projects": {
      const projects = publishedPosts("projects").map(projectSummary);
      return toolTextResult({ projects }, { projects });
    }
    case "get_project": {
      const slug = typeof args.slug === "string" ? args.slug : "";
      const project = getPostBySlug("projects", slug);
      if (!project?.published) return toolErrorResult(`공개된 프로젝트를 찾을 수 없습니다: ${slug}`);
      return toolTextResult(toCleanMarkdown(project), {
        slug: project.slug,
        title: project.title,
        url: absoluteUrl(`/projects/${project.slug}`),
        rawUrl: absoluteUrl(`/projects/${project.slug}/raw`),
      });
    }
    case "list_blog_posts": {
      const posts = publishedPosts("blog").map(blogSummary);
      return toolTextResult({ posts }, { posts });
    }
    case "get_blog_post": {
      const slug = typeof args.slug === "string" ? args.slug : "";
      const post = getPostBySlug("blog", slug);
      if (!post?.published) return toolErrorResult(`공개된 블로그 글을 찾을 수 없습니다: ${slug}`);
      return toolTextResult(toCleanMarkdown(post), {
        slug: post.slug,
        title: post.title,
        url: absoluteUrl(`/blog/${post.slug}`),
        rawUrl: absoluteUrl(`/blog/${post.slug}/raw`),
      });
    }
    case "search_portfolio": {
      const query = typeof args.query === "string" ? args.query.trim() : "";
      if (!query) return toolErrorResult("query는 한 글자 이상이어야 합니다.");
      const requestedLimit = typeof args.limit === "number" && Number.isFinite(args.limit) ? args.limit : 5;
      const limit = Math.min(10, Math.max(1, Math.floor(requestedLimit)));
      const matches = searchPosts(query, limit);
      return toolTextResult({ query, matches }, { query, matches });
    }
    default:
      return null;
  }
}

export function handleMcpMessage(message: unknown): McpResponse {
  if (!isRecord(message) || message.jsonrpc !== "2.0" || typeof message.method !== "string") {
    return jsonRpcError(null, -32600, "Invalid Request");
  }

  const idValue = Object.prototype.hasOwnProperty.call(message, "id") ? message.id : null;
  if (!isJsonRpcId(idValue)) return jsonRpcError(null, -32600, "Invalid Request");
  const isNotification = !Object.prototype.hasOwnProperty.call(message, "id");

  if (message.method === "notifications/initialized") {
    return { status: 202 };
  }

  if (message.method === "initialize") {
    const params = isRecord(message.params) ? message.params : {};
    const requestedVersion = typeof params.protocolVersion === "string" ? params.protocolVersion : "";
    const protocolVersion = MCP_PROTOCOL_VERSIONS.includes(requestedVersion as typeof MCP_PROTOCOL_VERSIONS[number])
      ? requestedVersion
      : MCP_PROTOCOL_VERSION;

    if (isNotification) return { status: 202 };

    return jsonRpcResult(idValue, {
      protocolVersion,
      capabilities: { tools: { listChanged: false } },
      serverInfo: {
        name: "junha-portfolio",
        title: `${SITE_BRAND} Portfolio MCP`,
        version: "1.0.0",
        description: SITE_DESCRIPTION,
        websiteUrl: SITE_URL.toString(),
      },
      instructions: "읽기 전용 포트폴리오입니다. 공개된 프로필·프로젝트·블로그 근거를 찾을 때만 사용하세요.",
    });
  }

  if (message.method === "ping") {
    return isNotification ? { status: 202 } : jsonRpcResult(idValue, {});
  }

  if (message.method === "tools/list") {
    return isNotification ? { status: 202 } : jsonRpcResult(idValue, { tools: MCP_TOOLS });
  }

  if (message.method === "tools/call") {
    const params = isRecord(message.params) ? message.params : {};
    const name = typeof params.name === "string" ? params.name : "";
    const tool = MCP_TOOLS.find((candidate) => candidate.name === name);
    if (!tool) return jsonRpcError(idValue, -32602, `Unknown tool: ${name}`);
    const result = callTool(name, getArguments(params.arguments) || {});
    if (!result) return jsonRpcError(idValue, -32602, `Unable to call tool: ${name}`);
    return isNotification ? { status: 202 } : jsonRpcResult(idValue, result);
  }

  return jsonRpcError(idValue, -32601, `Method not found: ${message.method}`);
}
