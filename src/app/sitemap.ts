import type { MetadataRoute } from "next";
import { getAllPosts, getLatestLastModified } from "@/lib/mdx";
import { getAllVideos } from "@/lib/videos";
import {
  absoluteUrl,
  formatDateForSitemap,
  SITE_LAST_MODIFIED,
  SITE_URL,
} from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllPosts("blog").filter((post) => post.published);
  const projects = getAllPosts("projects").filter((project) => project.published);
  const latestSiteUpdate = getLatestLastModified(
    [...blogPosts, ...projects, { lastModified: SITE_LAST_MODIFIED }],
    SITE_LAST_MODIFIED,
  );
  const latestBlogUpdate = getLatestLastModified(blogPosts, SITE_LAST_MODIFIED);
  const latestProjectUpdate = getLatestLastModified(projects, SITE_LAST_MODIFIED);

  return [
    {
      url: SITE_URL.toString(),
      lastModified: latestSiteUpdate,
    },
    {
      url: new URL("/projects", SITE_URL).toString(),
      lastModified: latestProjectUpdate,
    },
    {
      url: new URL("/blog", SITE_URL).toString(),
      lastModified: latestBlogUpdate,
    },
    {
      url: new URL("/videos", SITE_URL).toString(),
      lastModified: getLatestLastModified(
        getAllVideos().map((video) => ({ lastModified: video.uploadDate })),
        SITE_LAST_MODIFIED,
      ),
    },
    ...projects.map((project) => ({
      url: new URL(`/projects/${project.slug}`, SITE_URL).toString(),
      lastModified:
        formatDateForSitemap(project.lastModified) ?? SITE_LAST_MODIFIED,
    })),
    ...blogPosts.map((post) => ({
      url: new URL(`/blog/${post.slug}`, SITE_URL).toString(),
      lastModified: formatDateForSitemap(post.lastModified) ?? SITE_LAST_MODIFIED,
    })),
    ...getAllVideos().map((video) => ({
      url: new URL(`/videos/${video.slug}`, SITE_URL).toString(),
      lastModified: formatDateForSitemap(video.uploadDate) ?? SITE_LAST_MODIFIED,
      videos: [
        {
          title: video.title,
          thumbnail_loc: absoluteUrl(video.thumbnail),
          description: video.description,
          content_loc: absoluteUrl(video.src),
          duration: video.durationSeconds,
          publication_date: video.uploadDate,
        },
      ],
    })),
  ];
}
