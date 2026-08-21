import Image from "next/image";
import Link from "next/link";
import { getVideoBySlug } from "@/lib/videos";

interface VideoLinkProps {
  slug: string;
  caption?: string;
}

export default function VideoLink({ slug, caption }: VideoLinkProps) {
  const video = getVideoBySlug(slug);

  if (!video) return null;

  return (
    <figure className="my-6 min-w-0">
      <Link
        href={`/videos/${video.slug}`}
        className="group block overflow-hidden rounded-2xl border border-card-border bg-black/5 transition-colors hover:border-accent-blue/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2"
        aria-label={`${video.title} 영상 보기`}
      >
        <div className="relative aspect-video overflow-hidden bg-black">
          <Image
            src={video.thumbnail}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/20 text-sm font-medium text-white transition-colors group-hover:bg-black/10">
            <span className="rounded-full bg-black/70 px-4 py-2 backdrop-blur-sm">
              ▶ 영상 보기
            </span>
          </span>
        </div>
        <div className="px-4 py-3 text-sm font-medium text-foreground transition-colors group-hover:text-accent-blue">
          {video.title}
        </div>
      </Link>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
