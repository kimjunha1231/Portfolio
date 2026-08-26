import type { Metadata } from "next";
import Link from "next/link";
import StructuredData from "@/components/shared/StructuredData";
import { CONTACT_EMAIL, SITE_BRAND, SITE_DESCRIPTION, SITE_LAST_MODIFIED, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE_BRAND} 개인정보 처리 안내`,
  description: `${SITE_BRAND} 포트폴리오가 공개 페이지, 문의 이메일과 선택적 분석 도구를 다루는 방식입니다.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen w-full max-w-4xl px-6 py-24 md:px-12 lg:px-24">
      <StructuredData
        id="privacy-page-structured-data"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${SITE_URL.toString()}/privacy#page`,
          url: new URL("/privacy", SITE_URL).toString(),
          name: `${SITE_BRAND} 개인정보 처리 안내`,
          description: SITE_DESCRIPTION,
          dateModified: `${SITE_LAST_MODIFIED}T00:00:00+09:00`,
        }}
      />

      <header className="border-b border-card-border pb-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50">{SITE_BRAND} / Privacy</span>
        <h1 className="mt-3 text-4xl font-light tracking-tight md:text-6xl">개인정보 처리 안내</h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-foreground/70">
          마지막 업데이트 {SITE_LAST_MODIFIED}. 이 문서는 Junha.dev 포트폴리오가 현재 어떤 정보를 공개하고 처리하는지 설명합니다.
        </p>
      </header>

      <div className="mt-12 space-y-10 text-sm leading-relaxed text-foreground/75">
        <section aria-labelledby="privacy-scope-heading">
          <h2 id="privacy-scope-heading" className="text-2xl font-light text-foreground">수집하지 않는 정보</h2>
          <p className="mt-4">
            {SITE_BRAND}는 회원가입, 로그인, 결제, 댓글, 파일 업로드와 같은 계정 기능을 제공하지 않습니다. 따라서 이 사이트 자체에서 비밀번호, 주민등록번호, 금융정보, 건강정보 또는 비공개 프로젝트 자료를 입력받지 않습니다. 에이전트용 Markdown, OpenAPI, MCP 엔드포인트도 공개 포트폴리오의 읽기 전용 콘텐츠만 반환하며 쓰기 작업이나 개인 계정 접근을 수행하지 않습니다.
          </p>
        </section>

        <section aria-labelledby="privacy-analytics-heading">
          <h2 id="privacy-analytics-heading" className="text-2xl font-light text-foreground">페이지 방문과 외부 링크</h2>
          <p className="mt-4">
            배포 환경에서 Google Analytics 식별자가 설정된 경우에만 페이지 방문 경로를 파악하기 위한 Google Analytics 스크립트가 로드될 수 있습니다. 식별자가 없으면 해당 스크립트를 불러오지 않습니다. 테마 선택은 브라우저의 localStorage에 저장되며 서버 데이터베이스로 전송되지 않습니다. GitHub, LinkedIn, Lottie와 같은 외부 링크를 열면 해당 서비스의 개인정보 처리방침과 쿠키 정책이 적용됩니다.
          </p>
        </section>

        <section aria-labelledby="privacy-contact-heading">
          <h2 id="privacy-contact-heading" className="text-2xl font-light text-foreground">문의 내용의 처리</h2>
          <p className="mt-4">
            이메일로 문의하면 메일 서비스 제공자의 시스템에 발신 주소와 메시지 내용이 저장될 수 있습니다. 문의를 해결하기 위해 필요한 범위에서만 내용을 확인하고, 공개 사이트에 문의 내용을 다시 게시하지 않습니다. 보관 기간, 삭제, 정정 또는 처리 방식에 대한 질문은 <a className="text-accent-blue underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>으로 보내 주세요. 법적 의무나 서비스 제공자의 정책이 우선하는 경우에는 해당 범위가 적용될 수 있습니다.
          </p>
        </section>

        <p className="border-t border-card-border/60 pt-6 text-xs text-foreground/55">
          이 안내는 현재 운영 중인 개인 포트폴리오의 공개 처리 방식을 설명하기 위한 문서입니다. 사이트의 목적과 자동화 접근 범위는 <Link className="text-accent-blue underline underline-offset-4" href="/about">소개</Link>와 <Link className="text-accent-blue underline underline-offset-4" href="/developers">개발자 리소스</Link>에서도 확인할 수 있습니다.
        </p>
      </div>
    </main>
  );
}
