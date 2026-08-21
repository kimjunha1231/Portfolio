import type { Metadata } from "next";
import VideoLink from "@/components/shared/VideoLink";
import { getAllVideos } from "@/lib/videos";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "동영상",
  description: "김준하의 프로젝트와 기술 기록에 포함된 데모 영상을 모았습니다.",
  alternates: { canonical: "/videos" },
  openGraph: {
    title: "동영상 | 김준하",
    description: "김준하의 프로젝트와 기술 기록에 포함된 데모 영상을 모았습니다.",
    type: "website",
    url: new URL("/videos", SITE_URL).toString(),
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: "동영상 | 김준하",
    description: "김준하의 프로젝트와 기술 기록에 포함된 데모 영상을 모았습니다.",
  },
};

export default function VideosPage() {
  const videos = getAllVideos();

  return (
    <main className="min-h-screen px-6 py-24 md:px-12 lg:px-24">
      <section className="mx-auto w-full max-w-5xl">
        <header className="mb-12 border-b border-card-border pb-8">
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-foreground/50">
            Video library
          </p>
          <h1 className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
            프로젝트 동영상
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-foreground/70">
            프로젝트 화면과 성능 측정 과정을 한 편씩 확인할 수 있습니다.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {videos.map((video) => (
            <VideoLink key={video.slug} slug={video.slug} />
          ))}
        </div>
      </section>
    </main>
  );
}
