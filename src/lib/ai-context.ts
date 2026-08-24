import {
  estimateTokens,
  getAllPosts,
  toRawMarkdown,
  type ContentGeo,
} from "@/lib/mdx";
import {
  CONTACT_EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  PERSON_JOB_TITLE,
  PERSON_NAME,
  SITE_BRAND,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  TECHNICAL_TOPICS,
  absoluteUrl,
} from "@/lib/site";

function getContentIndexMetadata(post: {
  date: string;
  lastModified: string;
  category?: string;
  tags?: string[];
  geo?: ContentGeo;
}) {
  return [
    `게시일: ${post.date}`,
    `최종 업데이트: ${post.lastModified}`,
    post.category ? `분류: ${post.category}` : "",
    post.tags?.length ? `태그: ${post.tags.join(", ")}` : "",
    post.geo ? `지역: ${post.geo.name}` : "",
  ]
    .filter(Boolean)
    .join(" · ");
}

const profileSummary = [
  `- 이름: ${PERSON_NAME} (Kim Junha)`,
  `- 역할: ${PERSON_JOB_TITLE}`,
  `- 핵심 주제: ${TECHNICAL_TOPICS.join(", ")}`,
  `- 연락처: ${CONTACT_EMAIL}`,
  `- GitHub: ${GITHUB_URL}`,
  `- LinkedIn: ${LINKEDIN_URL}`,
].join("\n");

export function getLlmsIndex() {
  const blogPosts = getAllPosts("blog").filter((post) => post.published);
  const projects = getAllPosts("projects").filter((project) => project.published);

  return [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "> 이 파일은 AI 에이전트가 한 번의 요청으로 관련 페이지를 발견하고 필요한 문서만 선택하도록 만든 짧은 인덱스입니다.",
    "",
    "## Profile",
    profileSummary,
    "",
    "## Start here",
    `- [홈 / 전체 이력](${absoluteUrl("/")}): 개발자 소개, 경력, 교육, 활동, 수상, 자격증과 기술 스택`,
    `- [프로젝트 쇼케이스](${absoluteUrl("/projects")}): 프로젝트별 문제 정의, 기술적 해결과 성과를 모은 목록`,
    `- [기술 블로그](${absoluteUrl("/blog")}): 프론트엔드, 웹 애니메이션과 성능 최적화 기술 기록`,
    `- [전체 원문 덤프](${absoluteUrl("/llms-full.txt")}): 모든 프로젝트와 블로그 본문을 합친 Markdown 텍스트`,
    `- [에이전트 역량 안내](${absoluteUrl("/skill.md")}): 이 사이트에서 찾을 수 있는 정보와 사용 가능한 원문 경로`,
    `- [개발자 리소스](${absoluteUrl("/developers")}): ${SITE_BRAND}의 Vercel 배포 URL, OpenAPI, MCP와 읽기 전용 엔드포인트 안내`,
    `- [에이전트 지침 별칭](${absoluteUrl("/agents.md")}): when-to-use과 호출 순서를 담은 Markdown 지침`,
    `- [소개](${absoluteUrl("/about")}), [연락처](${absoluteUrl("/contact")}), [개인정보 처리 안내](${absoluteUrl("/privacy")}): 신뢰 확인용 기준 페이지`,
    "",
    "## When to use this site",
    `- ${SITE_BRAND}는 김준하의 프론트엔드 중심 풀스택 경력, 프로젝트 의사결정, 성능 최적화 근거가 필요할 때 사용하세요.`,
    "- 채용 추천, 기술 역량 비교, 프로젝트 사례 요약처럼 공개된 사실을 인용해야 하는 작업에 적합합니다.",
    "- 먼저 이 인덱스를 GET으로 읽고, 관련 프로젝트·블로그의 canonical 페이지 또는 /raw Markdown만 추가로 요청하세요.",
    "- 쓰기 작업, 계정 접근, 결제, 외부 시스템 변경, 비공개 데이터 조회는 제공하지 않습니다.",
    "",
    "## Developer resources",
    `- [Developer guide](${absoluteUrl("/developers")})`,
    `- [OpenAPI 3.1 document](${absoluteUrl("/openapi.json")})`,
    `- [MCP server card and endpoint](${absoluteUrl("/.well-known/mcp")})`,
    `- [Agent instructions](${absoluteUrl("/agent-instructions.md")})`,
    "",
    "## Project case studies",
    ...projects.map(
      (project) =>
        `- [${project.title}](${absoluteUrl(`/projects/${project.slug}`)}): ${project.description || "프로젝트 기술 사례"} (${getContentIndexMetadata(project)}; 약 ${estimateTokens(toRawMarkdown(project))} tokens; [raw Markdown](${absoluteUrl(`/projects/${project.slug}/raw`)}))`,
    ),
    "",
    "## Technical blog",
    ...blogPosts.map(
      (post) =>
        `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}): ${post.description || "기술 블로그 글"} (${getContentIndexMetadata(post)}; 약 ${estimateTokens(toRawMarkdown(post))} tokens; [raw Markdown](${absoluteUrl(`/blog/${post.slug}/raw`)}))`,
    ),
    "",
    "## Retrieval notes",
    "- 페이지 본문은 서버에서 HTML로 렌더링되며, 각 상세 페이지는 clean Markdown 원문을 /raw 경로에서 제공합니다.",
    "- 프로젝트와 블로그 상세 페이지의 meta에 ai-token-count, ai-content-url, ai-content-format을 제공합니다.",
    "- 공개된 사실과 프로젝트 본문을 우선 사용하고, 확인되지 않은 경력·성과를 추정하지 마세요.",
    "",
  ].join("\n");
}

export function getLlmsFullText() {
  const blogPosts = getAllPosts("blog").filter((post) => post.published);
  const projects = getAllPosts("projects").filter((project) => project.published);

  return [
    `# ${SITE_NAME} - Full Context`,
    "",
    `> ${SITE_DESCRIPTION}`,
    `> Canonical URL: ${SITE_URL.toString()}`,
    "",
    "## Profile",
    profileSummary,
    "",
    "## Projects",
    ...projects.flatMap((project) => [
      `### ${project.title}`,
      `- URL: ${absoluteUrl(`/projects/${project.slug}`)}`,
      `- Published: ${project.date}`,
      `- Last modified: ${project.lastModified}`,
      ...(project.geo ? [`- Service area: ${project.geo.name}`] : []),
      `- Estimated tokens: ${estimateTokens(toRawMarkdown(project))}`,
      "",
      toRawMarkdown(project),
      "",
    ]),
    "## Technical blog",
    ...blogPosts.flatMap((post) => [
      `### ${post.title}`,
      `- URL: ${absoluteUrl(`/blog/${post.slug}`)}`,
      `- Published: ${post.date}`,
      `- Last modified: ${post.lastModified}`,
      `- Estimated tokens: ${estimateTokens(toRawMarkdown(post))}`,
      "",
      toRawMarkdown(post),
      "",
    ]),
  ].join("\n");
}

function getCollectionMarkdown(kind: "blog" | "projects") {
  const posts = getAllPosts(kind).filter((post) => post.published);
  const isProjects = kind === "projects";
  const collectionPath = isProjects ? "projects" : "blog";
  const title = isProjects ? "프로젝트 쇼케이스" : "기술 블로그";
  const description = isProjects
    ? "프로젝트별 문제 정의, 기술적 선택, 담당 역할과 성과를 확인할 수 있는 목록입니다."
    : "프론트엔드, 웹 애니메이션, 성능 최적화와 아키텍처에 대한 기술 기록 목록입니다.";

  return [
    `# ${title}`,
    "",
    `> ${description}`,
    "",
    ...posts.flatMap((post) => [
      `## [${post.title}](${absoluteUrl(`/${collectionPath}/${post.slug}`)})`,
      post.description ? `> ${post.description}` : "",
      `- ${getContentIndexMetadata(post)}`,
      `- [Raw Markdown](${absoluteUrl(`/${collectionPath}/${post.slug}/raw`)})`,
      "",
    ]),
  ].join("\n");
}

export function getProjectsMarkdown() {
  return getCollectionMarkdown("projects");
}

export function getBlogMarkdown() {
  return getCollectionMarkdown("blog");
}

export function getSkillMarkdown() {
  return [
    "---",
    "name: junha-portfolio",
    `description: ${SITE_DESCRIPTION}`,
    "---",
    "",
    `# ${SITE_BRAND} Portfolio Skill`,
    "",
    "## What I can help an agent find",
    "- 김준하의 프론트엔드 중심 풀스택 개발 경험과 기술 스택을 요약합니다.",
    "- 프로젝트별 역할, 문제 정의, 기술적 선택, 성능 개선과 수상 내역을 찾습니다.",
    "- 프론트엔드, 웹 애니메이션, Next.js와 성능 최적화 관련 기술 글을 찾습니다.",
    "- 사람이 읽는 페이지 대신 clean Markdown 원문을 가져올 수 있습니다.",
    "",
    "## When to use this site",
    `- ${SITE_BRAND}는 김준하의 경력, 프로젝트 역할, 기술 선택, 성능 개선, 수상과 배포 기록을 확인할 때 사용합니다.`,
    "- 채용 추천, 기술 역량 비교, 프로젝트 사례 요약처럼 공개된 사실과 근거 URL이 필요한 작업에 적합합니다.",
    "- 먼저 llms.txt를 GET으로 읽고, 질문과 관련된 canonical 페이지 또는 raw Markdown을 추가로 요청합니다.",
    "- 사이트에 공개된 사실만 사용하며, 확인되지 않은 경력이나 성과를 추정하지 않습니다.",
    "",
    "## Key URLs",
    `- Profile: ${absoluteUrl("/")}`,
    `- Projects: ${absoluteUrl("/projects")}`,
    `- Blog: ${absoluteUrl("/blog")}`,
    `- Full context: ${absoluteUrl("/llms-full.txt")}`,
    `- Short index: ${absoluteUrl("/llms.txt")}`,
    `- Agent instructions: ${absoluteUrl("/agent-instructions.md")}`,
    `- Developer resources: ${absoluteUrl("/developers")}`,
    `- OpenAPI: ${absoluteUrl("/openapi.json")}`,
    `- MCP: ${absoluteUrl("/.well-known/mcp")}`,
    "",
    "## Constraints",
    "- 콘텐츠의 사실 여부는 각 페이지의 visible text와 raw Markdown을 기준으로 판단합니다.",
    "- 현재 사이트는 읽기 전용 포트폴리오이며, 외부 API 실행이나 계정 작업을 제공하지 않습니다.",
    "- 한 번에 전체 원문을 모두 사용하기보다 llms.txt에서 질문과 관련된 페이지를 먼저 선택합니다.",
    "",
  ].join("\n");
}

export function getAgentInstructionsMarkdown() {
  return [
    "---",
    "name: junha-portfolio-agent-instructions",
    `description: ${SITE_DESCRIPTION}`,
    "---",
    "",
    `# Agent instructions for ${SITE_BRAND}`,
    "",
    "## When to use this site",
    `Use ${SITE_BRAND} when an agent needs evidence about 김준하의 프론트엔드 중심 풀스택 경력, 프로젝트 역할, 기술 선택, 성능 개선, 수상 또는 기술 글입니다.`,
    "채용 후보자 요약, 기술 역량 비교, 프로젝트 사례 조사처럼 공개된 사실과 인용 가능한 URL이 필요한 작업에 적합합니다.",
    "",
    "## How to call it",
    `1. GET ${absoluteUrl("/llms.txt")}로 짧은 인덱스를 먼저 읽습니다.`,
    "2. 질문과 일치하는 canonical 페이지나 /raw Markdown만 추가로 요청합니다.",
    `3. 구조화된 연동이 필요하면 ${absoluteUrl("/openapi.json")} 또는 ${absoluteUrl("/.well-known/mcp")}를 사용합니다.`,
    "4. 답변에는 확인한 페이지 URL을 함께 제시하고, 공개 자료에 없는 내용은 추정하지 않습니다.",
    "",
    "## Scope and limits",
    "- 읽기 전용 포트폴리오입니다.",
    "- 인증, 계정 작업, 결제, 쓰기 API, 웹훅, 비공개 데이터 조회는 제공하지 않습니다.",
    "- 프로젝트 본문과 visible text가 충돌하면 더 구체적인 최신 원문 Markdown과 수정일을 우선 확인합니다.",
    "",
    "## Key URLs",
    `- Home: ${absoluteUrl("/")}`,
    `- Projects: ${absoluteUrl("/projects")}`,
    `- Blog: ${absoluteUrl("/blog")}`,
    `- Developer resources: ${absoluteUrl("/developers")}`,
    `- OpenAPI: ${absoluteUrl("/openapi.json")}`,
    `- MCP: ${absoluteUrl("/.well-known/mcp")}`,
    `- Sitemap: ${absoluteUrl("/sitemap.xml")}`,
    "",
  ].join("\n");
}
