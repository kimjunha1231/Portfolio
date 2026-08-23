import { getAllVideos } from "@/lib/videos";
import { absoluteUrl, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const urls = getAllVideos()
    .map(
      (video) => `  <url>
    <loc>${escapeXml(new URL(`/videos/${video.slug}`, SITE_URL).toString())}</loc>
    <video:video>
      <video:thumbnail_loc>${escapeXml(absoluteUrl(video.thumbnail))}</video:thumbnail_loc>
      <video:title>${escapeXml(video.title)}</video:title>
      <video:description>${escapeXml(video.description)}</video:description>
      <video:content_loc>${escapeXml(absoluteUrl(video.src))}</video:content_loc>
      <video:duration>${video.durationSeconds}</video:duration>
      <video:publication_date>${video.uploadDate}</video:publication_date>
    </video:video>
  </url>`,
    )
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>
${urls}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
