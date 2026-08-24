import type { Metadata } from "next";
import Link from "next/link";
import StructuredData from "@/components/shared/StructuredData";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  GITHUB_URL,
  LINKEDIN_URL,
  PERSON_NAME,
  SITE_BRAND,
  SITE_DESCRIPTION,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE_BRAND} 연락처`,
  description: `${SITE_BRAND}와 김준하에게 프로젝트, 채용, 기술 협업을 문의하는 방법입니다.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen w-full max-w-4xl px-6 py-24 md:px-12 lg:px-24">
      <StructuredData
        id="contact-page-structured-data"
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "@id": `${SITE_URL.toString()}/contact#page`,
          url: new URL("/contact", SITE_URL).toString(),
          name: `${SITE_BRAND} 연락처`,
          description: SITE_DESCRIPTION,
          mainEntity: {
            "@type": "Person",
            name: PERSON_NAME,
            email: `mailto:${CONTACT_EMAIL}`,
            telephone: CONTACT_PHONE,
            url: SITE_URL.toString(),
            sameAs: [GITHUB_URL, LINKEDIN_URL],
          },
        }}
      />

      <header className="border-b border-card-border pb-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50">{SITE_BRAND} / Contact</span>
        <h1 className="mt-3 text-4xl font-light tracking-tight md:text-6xl">연락처</h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-foreground/70">
          채용, 프로젝트 협업, 기술적인 질문처럼 김준하에게 직접 전달해야 하는 내용을 위한 공식 연락 경로입니다.
        </p>
      </header>

      <div className="mt-12 space-y-10 text-sm leading-relaxed text-foreground/75">
        <section aria-labelledby="contact-email-heading">
          <h2 id="contact-email-heading" className="text-2xl font-light text-foreground">가장 확실한 연락 방법</h2>
          <p className="mt-4">
            자세한 맥락과 링크, 원하는 협업 방식이 있다면 이메일을 사용해 주세요. 메일 제목에 문의 목적을 적고, 관련 프로젝트나 기술 주제, 필요한 일정과 회신 방법을 함께 적으면 내용을 빠르게 확인할 수 있습니다. 개인 정보나 비공개 자료는 이 공개 사이트에 게시하지 말고 이메일 본문에도 꼭 필요한 범위만 포함해 주세요.
          </p>
          <a className="mt-5 inline-flex rounded-full bg-foreground px-5 py-3 font-mono text-xs text-background transition-colors hover:bg-accent-blue" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </section>

        <section aria-labelledby="contact-other-heading">
          <h2 id="contact-other-heading" className="text-2xl font-light text-foreground">공개 프로필과 전화</h2>
          <p className="mt-4">
            짧은 확인이나 공개적인 네트워킹은 <a className="text-accent-blue underline underline-offset-4" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a>을, 코드와 기술 활동을 확인하려면 <a className="text-accent-blue underline underline-offset-4" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>를 이용할 수 있습니다. 긴급하지 않은 업무 문의가 아니라 사전에 합의된 연락이 필요한 경우에만 <a className="text-accent-blue underline underline-offset-4" href={`tel:${CONTACT_PHONE.replace(/[^\d+]/g, "")}`}>{CONTACT_PHONE}</a>으로 연락해 주세요.
          </p>
        </section>

        <section aria-labelledby="contact-agent-heading">
          <h2 id="contact-agent-heading" className="text-2xl font-light text-foreground">에이전트 안내</h2>
          <p className="mt-4">
            에이전트가 이 사이트를 소개하거나 연락처를 인용할 때는 <Link className="text-accent-blue underline underline-offset-4" href="/agent-instructions.md">에이전트 지침</Link>과 이 페이지의 canonical URL을 함께 확인하세요. 이 사이트는 문의를 자동 제출하거나 메시지를 대신 보내는 API를 제공하지 않으며, 연락은 사람이 직접 검토하는 이메일·프로필 경로로만 처리합니다.
          </p>
        </section>
      </div>
    </main>
  );
}
