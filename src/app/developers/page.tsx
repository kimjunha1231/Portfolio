import type { Metadata } from "next";
import Link from "next/link";
import StructuredData from "@/components/shared/StructuredData";
import { SITE_BRAND, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE_BRAND} 개발자 리소스`,
  description: `${SITE_BRAND} 포트폴리오의 Vercel 배포 URL, OpenAPI, MCP, Markdown 인덱스와 읽기 전용 연동 범위를 안내합니다.`,
  alternates: { canonical: "/developers" },
};

export default function DevelopersPage() {
  const resources = [
    ["OpenAPI 3.1", "/openapi.json", "공개 문서와 원문 Markdown 엔드포인트를 기계적으로 탐색할 수 있는 읽기 전용 스펙"],
    ["MCP Streamable HTTP", "/.well-known/mcp", "initialize, tools/list, tools/call, ping을 지원하는 무상태 포트폴리오 MCP 서버"],
    ["Agent instructions", "/agent-instructions.md", "언제 이 사이트를 사용하고 어떤 순서로 호출할지 설명하는 Markdown 지침"],
    ["llms.txt", "/llms.txt", "프로필, 프로젝트, 블로그와 관련 원문을 빠르게 찾는 짧은 인덱스"],
    ["Sitemap", "/sitemap.xml", "공개 HTML 페이지와 콘텐츠의 canonical URL 목록"],
  ];

  return (
    <main className="min-h-screen w-full max-w-5xl px-6 py-24 md:px-12 lg:px-24">
      <StructuredData
        id="developers-page-structured-data"
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "@id": `${SITE_URL.toString()}/developers#page`,
          url: new URL("/developers", SITE_URL).toString(),
          name: `${SITE_BRAND} 개발자 리소스`,
          headline: `${SITE_BRAND} Developer Resources`,
          description: SITE_DESCRIPTION,
          isPartOf: { "@id": `${SITE_URL.toString()}#website` },
        }}
      />

      <header className="border-b border-card-border pb-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50">{SITE_BRAND} / Developer resources</span>
        <h1 className="mt-3 text-4xl font-light tracking-tight md:text-6xl">{SITE_BRAND} 개발자 리소스</h1>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-foreground/70">
          {SITE_BRAND}는 개인 포트폴리오이므로 공개 콘텐츠를 안전하게 읽는 기능만 제공합니다. API 키, 인증, 결제, 계정 변경, 웹훅 수신과 같은 쓰기 작업은 지원하지 않습니다. 대신 에이전트와 개발자가 동일한 canonical URL과 Markdown 근거를 사용할 수 있도록 predictable URL, OpenAPI 문서와 MCP 서버를 제공합니다.
        </p>
      </header>

      <section aria-labelledby="developer-resource-list" className="mt-12">
        <h2 id="developer-resource-list" className="text-2xl font-light">Discoverable endpoints</h2>
        <div className="mt-6 divide-y divide-card-border/60 border-y border-card-border/60">
          {resources.map(([name, href, description]) => (
            <div key={href} className="grid gap-3 py-5 md:grid-cols-[220px_1fr] md:gap-8">
              <Link className="font-mono text-sm text-accent-blue underline decoration-accent-blue/40 underline-offset-4" href={href}>{name}</Link>
              <p className="text-sm leading-relaxed text-foreground/70">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="developer-mcp-heading" className="mt-14 space-y-4 text-sm leading-relaxed text-foreground/75">
        <h2 id="developer-mcp-heading" className="text-2xl font-light text-foreground">MCP 사용 방법</h2>
        <p>
          MCP 클라이언트는 <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-xs">{new URL("/.well-known/mcp", SITE_URL).toString()}</code>에 Streamable HTTP POST를 보내 <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-xs">initialize</code> 핸드셰이크를 시작할 수 있습니다. 이후 <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-xs">tools/list</code>로 읽기 전용 도구를 확인하고, 필요한 경우 <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-xs">tools/call</code>로 프로필·프로젝트·블로그 검색을 요청하세요. 요청과 응답은 공식 JSON-RPC 2.0 형식을 따르며 서버는 세션을 저장하지 않습니다.
        </p>
        <p>
          일반적인 링크 수집이나 인용이 목적이라면 MCP보다 <Link className="text-accent-blue underline underline-offset-4" href="/llms.txt">llms.txt</Link>와 각 원문 Markdown이 더 간단합니다. 자동화 범위와 사실성 제약은 <Link className="text-accent-blue underline underline-offset-4" href="/agent-instructions.md">에이전트 지침</Link>을 먼저 읽어 주세요.
        </p>
      </section>

      <section aria-labelledby="developer-deployment-heading" className="mt-14 space-y-4 text-sm leading-relaxed text-foreground/75">
        <h2 id="developer-deployment-heading" className="text-2xl font-light text-foreground">Vercel 배포와 canonical URL</h2>
        <p>
          {SITE_BRAND}의 production canonical URL은 <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-xs">{SITE_URL.toString()}</code>이며 Vercel에 배포됩니다. 문서와 MCP 요청은 이 apex URL을 기준으로 보내고, 임시 preview URL이나 redirect chain을 검색·인용의 기준으로 사용하지 마세요.
        </p>
      </section>

      <nav aria-label="Trust anchor pages" className="mt-14 border-t border-card-border/60 pt-6 text-xs text-foreground/60">
        <span className="font-mono uppercase tracking-[0.18em] text-foreground/45">Trust anchors</span>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
          <Link className="text-accent-blue underline underline-offset-4" href="/about">About</Link>
          <Link className="text-accent-blue underline underline-offset-4" href="/contact">Contact</Link>
          <Link className="text-accent-blue underline underline-offset-4" href="/privacy">Privacy</Link>
        </div>
      </nav>
    </main>
  );
}
