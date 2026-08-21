export interface SiteVideo {
  slug: string;
  title: string;
  description: string;
  src: string;
  thumbnail: string;
  uploadDate: string;
  durationSeconds: number;
}

const videos: SiteVideo[] = [
  {
    slug: "jobsecretary-before",
    title: "JobSecretary 칸반보드 개선 전 드래그 동작",
    description:
      "JobSecretary 칸반보드에서 카드를 드래그할 때 영향을 받지 않은 카드까지 반복해서 렌더링되던 개선 전 동작입니다.",
    src: "/videos/projects/jobsecretary-before.mp4",
    thumbnail: "/images/videos/jobsecretary-before.png",
    uploadDate: "2026-07-26",
    durationSeconds: 7.85,
  },
  {
    slug: "jobsecretary-after",
    title: "JobSecretary 칸반보드 개선 후 드래그 동작",
    description:
      "JobSecretary 칸반보드의 DnD 라이브러리와 컴포넌트 경계를 조정한 뒤의 드래그 동작입니다.",
    src: "/videos/projects/jobsecretary-after.mp4",
    thumbnail: "/images/videos/jobsecretary-after.png",
    uploadDate: "2026-07-26",
    durationSeconds: 8.05,
  },
  {
    slug: "jobsecretary-dnd-kit-separated",
    title: "dnd-kit 카드 콘텐츠 분리 후 렌더링 기록",
    description:
      "dnd-kit을 유지한 채 드래그 상태와 카드 콘텐츠를 분리하고 React.memo를 적용한 뒤의 렌더링 기록입니다.",
    src: "/videos/projects/jobsecretary-dnd-kit-separated.mp4",
    thumbnail: "/images/videos/jobsecretary-dnd-kit-separated.png",
    uploadDate: "2026-07-26",
    durationSeconds: 7.2,
  },
  {
    slug: "redis-reference-upscaled",
    title: "Smart Messaging System 수신자 선택 화면",
    description:
      "Smart Messaging System에서 태그와 고객 조건으로 수신자를 선택하는 화면을 보여주는 데모 영상입니다.",
    src: "/videos/references/redis-reference-upscaled.mp4",
    thumbnail: "/images/videos/redis-reference-upscaled.png",
    uploadDate: "2026-07-19",
    durationSeconds: 4.16,
  },
];

export function getAllVideos() {
  return videos;
}

export function getVideoSlugs() {
  return videos.map((video) => video.slug);
}

export function getVideoBySlug(slug: string) {
  return videos.find((video) => video.slug === slug) ?? null;
}

export function formatVideoDuration(seconds: number) {
  return `PT${seconds.toFixed(2).replace(/\.00$/, "")}S`;
}
