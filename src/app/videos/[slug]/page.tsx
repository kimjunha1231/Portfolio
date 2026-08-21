import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import StructuredData from "@/components/shared/StructuredData";
import {
  getVideoBySlug,
  getVideoSlugs,
} from "@/lib/videos";
import {
  getVideoCanonicalUrl,
  getVideoMetadata,
  getVideoStructuredData,
} from "@/lib/seo";

interface VideoPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getVideoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: VideoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const video = getVideoBySlug(slug);

  if (!video) notFound();

  return getVideoMetadata(video);
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { slug } = await params;
  const video = getVideoBySlug(slug);

  if (!video) notFound();

  const canonicalUrl = getVideoCanonicalUrl(video);

  return (
    <main className="min-h-screen px-6 py-24 md:px-12 lg:px-24">
      <StructuredData
        id="video-page-structured-data"
        data={getVideoStructuredData(video)}
      />
      <article className="mx-auto w-full max-w-5xl">
        <header className="mb-8 border-b border-card-border pb-8">
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-foreground/50">
            Video watch page
          </p>
          <h1 className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
            {video.title}
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-foreground/70">
            {video.description}
          </p>
        </header>

        <figure>
          <div className="overflow-hidden rounded-3xl border border-card-border bg-black">
            <video
              controls
              playsInline
              preload="metadata"
              poster={video.thumbnail}
              aria-label={video.title}
              className="aspect-video w-full object-contain"
            >
              <source src={video.src} type="video/mp4" />
              이 브라우저에서는 동영상을 재생할 수 없습니다.
            </video>
          </div>
          <figcaption className="mt-3 text-xs text-foreground/60">
            {video.title} · {canonicalUrl}
          </figcaption>
        </figure>

        <footer className="mt-12 flex flex-wrap gap-4 border-t border-card-border pt-6 text-xs font-mono text-foreground/60">
          <Link
            href="/blog"
            className="transition-colors hover:text-accent-blue"
          >
            ← 기술 블로그
          </Link>
          <Link
            href="/projects"
            className="transition-colors hover:text-accent-blue"
          >
            프로젝트 보기
          </Link>
        </footer>
      </article>
    </main>
  );
}
