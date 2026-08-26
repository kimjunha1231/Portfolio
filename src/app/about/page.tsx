import type { Metadata } from "next";
import Link from "next/link";
import StructuredData from "@/components/shared/StructuredData";
import {
  PERSON_JOB_TITLE,
  PERSON_NAME,
  SITE_BRAND,
  SITE_DESCRIPTION,
  SITE_LAST_MODIFIED,
  SITE_URL,
  TECHNICAL_TOPICS,
} from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE_BRAND} 소개`,
  description: `${SITE_BRAND}와 김준하의 개발 경험, 공개 범위와 콘텐츠 운영 원칙을 소개합니다.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full max-w-4xl px-6 py-24 md:px-12 lg:px-24">
      <StructuredData
        id="about-page-structured-data"
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "@id": `${SITE_URL.toString()}/about#page`,
          url: new URL("/about", SITE_URL).toString(),
          name: `${SITE_BRAND} 소개`,
          description: SITE_DESCRIPTION,
          dateModified: `${SITE_LAST_MODIFIED}T00:00:00+09:00`,
          mainEntity: {
            "@type": "Person",
            name: PERSON_NAME,
            jobTitle: PERSON_JOB_TITLE,
            url: SITE_URL.toString(),
          },
        }}
      />

      <header className="border-b border-card-border pb-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50">{SITE_BRAND} / About</span>
        <h1 className="mt-3 text-4xl font-light tracking-tight md:text-6xl">{SITE_BRAND} 소개</h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-foreground/70">
          김준하의 공개 포트폴리오가 어떤 사람과 작업을 다루는지, 에이전트가 어떤 근거를 사용할 수 있는지 설명하는 페이지입니다.
        </p>
      </header>

      <div className="markdown-content mt-12 space-y-10 text-sm leading-relaxed text-foreground/75">
        <section aria-labelledby="about-identity-heading">
          <h2 id="about-identity-heading" className="text-2xl font-light text-foreground">운영자와 정체성</h2>
          <p className="mt-4">
            {SITE_BRAND}는 {PERSON_NAME}({PERSON_JOB_TITLE})의 개인 포트폴리오이자 기술 기록 공간입니다. 이름과 직무를 확인할 수 있는 프로필, 실제로 참여한 프로젝트의 문제 정의와 역할, 구현 과정에서 얻은 기술적 교훈을 한 곳에서 확인할 수 있도록 구성했습니다. 모든 콘텐츠는 사람에게 읽히는 페이지와 에이전트가 읽을 수 있는 Markdown 원문을 함께 제공합니다.
          </p>
        </section>

        <section aria-labelledby="about-work-heading">
          <h2 id="about-work-heading" className="text-2xl font-light text-foreground">무엇을 다루나요</h2>
          <p className="mt-4">
            주요 관심사는 {TECHNICAL_TOPICS.slice(0, 8).join(", ")}와 웹 애니메이션, 성능 최적화, 확장 가능한 아키텍처입니다. 새로운 도구 자체를 목표로 삼기보다 사용자의 불편과 팀의 병목을 관찰한 뒤, 문제에 맞는 기술을 고르고 그 선택이 유지보수와 사용자 경험에 미친 영향을 설명합니다. 프로젝트 목록은 결과만 나열하지 않고 담당 역할, 제약, 대안과 검증 과정을 함께 보여줍니다.
          </p>
        </section>

        <section aria-labelledby="about-evidence-heading">
          <h2 id="about-evidence-heading" className="text-2xl font-light text-foreground">공개 정보의 범위</h2>
          <p className="mt-4">
            이 사이트는 읽기 전용 공개 자료입니다. 비공개 저장소, 회사 내부 자료, 계정 정보, 결제나 외부 시스템을 대신 조회하지 않습니다. 에이전트는 최신 수정일과 canonical URL이 있는 프로젝트·블로그 원문을 우선 근거로 사용해야 하며, 페이지에 없는 성과나 경력을 추정해서는 안 됩니다. 사이트의 목적과 사용 방법은 <Link className="text-accent-blue underline underline-offset-4" href="/agent-instructions.md">에이전트 안내</Link>와 <Link className="text-accent-blue underline underline-offset-4" href="/developers">개발자 리소스</Link>에 정리되어 있습니다.
          </p>
        </section>
      </div>
    </main>
  );
}
