import React from "react";
import Link from "next/link";
import BentoProjects from "@/components/home/BentoProjects";
import type { Metadata } from "next";
import StructuredData from "@/components/shared/StructuredData";
import { getAllPosts, getLatestLastModified } from "@/lib/mdx";
import {
  PROJECT_PLATFORM_LABELS,
  PROJECT_ROLE_LABELS,
  PROJECT_ROLES,
  type ProjectRole,
} from "@/lib/project-taxonomy";
import { SITE_DESCRIPTION, SITE_LAST_MODIFIED, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "프로젝트",
  description:
    "Next.js, React, Flutter, AI, 실시간 통신과 웹 성능 최적화를 적용한 김준하의 프로젝트 케이스 스터디 모음입니다.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "프로젝트 | 김준하",
    description:
      "풀스택 개발, AI 서비스, 웹 성능 최적화 프로젝트를 소개합니다.",
    type: "website",
    url: new URL("/projects", SITE_URL).toString(),
  },
};

type ProjectsListPageProps = {
  searchParams: Promise<{
    role?: string | string[];
  }>;
};

type ProjectFilters = {
  role: ProjectRole | "all";
};

function getSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getFilterHref(current: ProjectFilters, updates: Partial<ProjectFilters>) {
  const filters = { ...current, ...updates };
  const query = new URLSearchParams();

  if (filters.role !== "all") query.set("role", filters.role);

  const queryString = query.toString();
  return queryString ? `/projects?${queryString}` : "/projects";
}

export default async function ProjectsListPage({ searchParams }: ProjectsListPageProps) {
  const params = await searchParams;
  const posts = getAllPosts("projects").filter((post) => post.published);
  const requestedRole = getSearchParam(params.role) || "all";
  const selectedRole = PROJECT_ROLES.includes(requestedRole as ProjectRole)
    ? (requestedRole as ProjectRole)
    : "all";
  const currentFilters: ProjectFilters = {
    role: selectedRole,
  };

  const visiblePosts = posts.filter((project) => {
    const matchesRole = selectedRole === "all" || project.role === selectedRole;

    return matchesRole;
  });

  const projects = visiblePosts.map((project) => ({
    slug: project.slug,
    title: project.title,
    category: project.projectCategory || project.category || "Project Case Study",
    metaItems: [
      ...(project.platforms?.length
        ? [
          {
            label: "Platform",
            value: project.platforms
              .map((platform) => PROJECT_PLATFORM_LABELS[platform])
              .join(" · "),
          },
        ]
        : []),
      ...(project.role
        ? [{ label: "Role", value: PROJECT_ROLE_LABELS[project.role] }]
        : []),
    ],
    description: project.description || "Smart Messaging System은 마케터가 고객을 선택하고, 메시지를 작성·검토한 뒤 여러 채널로 발송하고 결과를 분석할 수 있도록 구성한 통합 메시징 시스템입니다.",
    tags: project.tags || [],
    cover: project.cover,
    coverAlt: project.coverAlt,
    coverFit: project.coverFit,
    lastModified: project.lastModified,
  }));

  return (
    <main
      aria-labelledby="projects-heading"
      className="min-h-screen py-24 px-6 md:px-12 lg:px-24 flex flex-col justify-between max-w-7xl mx-auto w-full relative z-10"
    >
      <StructuredData
        id="projects-list-structured-data"
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": new URL("/projects#collection", SITE_URL).toString(),
          url: new URL("/projects", SITE_URL).toString(),
          name: "프로젝트",
          description: SITE_DESCRIPTION,
          dateModified: getLatestLastModified(visiblePosts, SITE_LAST_MODIFIED),
          isPartOf: { "@id": `${SITE_URL.toString()}#website` },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: visiblePosts.map((project, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: project.title,
              url: new URL(`/projects/${project.slug}`, SITE_URL).toString(),
            })),
          },
        }}
      />

      <div className="mb-12">
        <div className="mx-auto max-w-7xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50">
            Project
          </span>
          <h1 id="projects-heading" className="mt-2 text-4xl font-light leading-none tracking-tight md:text-6xl">
            프로젝트
          </h1>
          <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-foreground/60">
            프로젝트별 문제 정의, 담당 역할, 기술적 선택과 결과를 케이스 스터디로 정리했습니다.
          </p>

          <div className="mt-8 border-t border-card-border/60 pt-4" aria-label="프로젝트 필터">
            <div className="flex flex-col gap-4 border-b border-card-border/60 pb-4 sm:flex-row sm:items-center sm:justify-between" aria-label="역할 필터">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                  Role
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { value: "all", label: "전체" },
                    ...PROJECT_ROLES.map((role) => ({
                      value: role,
                      label: PROJECT_ROLE_LABELS[role],
                    })),
                  ].map((option) => {
                    const isSelected = option.value === selectedRole;
                    return (
                      <Link
                        key={option.value}
                        href={getFilterHref(currentFilters, {
                          role: option.value as ProjectRole | "all",
                        })}
                        aria-current={isSelected ? "page" : undefined}
                        className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue ${isSelected
                          ? "bg-accent-blue text-white shadow-sm"
                          : "border border-card-border/70 text-foreground/60 hover:border-accent-blue/40 hover:text-accent-blue hover:bg-accent-blue/5"
                          }`}
                      >
                        {option.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-foreground/50">
                {selectedRole !== "all" && (
                  <>
                    <span>역할: <strong className="font-normal text-foreground/80">{PROJECT_ROLE_LABELS[selectedRole]}</strong></span>
                    <span className="w-1 h-1 rounded-full bg-foreground/20" aria-hidden="true" />
                  </>
                )}
                <span>총 <strong className="font-normal text-accent-blue">{visiblePosts.length}</strong>개의 프로젝트</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 벤토 그리드 프로젝트 리스트 마운트 */}
      <div className="flex-1 -mx-6 md:-mx-12 lg:-mx-24">
        {projects.length > 0 ? (
          <BentoProjects projects={projects} />
        ) : (
          <div className="mx-auto max-w-7xl px-6 py-20 text-center text-sm text-foreground/50 md:px-12 lg:px-24">
            선택한 조건에 해당하는 프로젝트가 없습니다.
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-24 pt-8 border-t border-card-border text-[10px] font-mono text-foreground/45 flex items-center justify-between w-full">
        <span>김준하 &copy; 2026</span>
        <span>Developing high performance products.</span>
      </footer>

    </main>
  );
}
