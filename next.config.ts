import type { NextConfig } from "next";

const agentDiscoveryLinkHeader = [
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</skill.md>; rel="service-desc"; type="text/markdown"',
  '</agent-instructions.md>; rel="help"; type="text/markdown"',
  '</developers>; rel="service-doc"; type="text/html"',
  '</openapi.json>; rel="describedby"; type="application/vnd.oai.openapi+json"',
  '</.well-known/mcp>; rel="service"; type="application/json"',
  '</.well-known/agent-skills/index.json>; rel="alternate"; type="application/json"',
].join(", ");

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const nextConfig: NextConfig = {
  // 개발 중에는 이미지 변환 워커가 메모리를 크게 사용하지 않도록 원본을 사용합니다.
  // 배포 환경에서는 Next Image 최적화를 다시 활성화합니다.
  images: {
    unoptimized: process.env.NODE_ENV === "development",
  },
  async redirects() {
    return [
      {
        source: "/blog/jobsecretary-kanban-rendering-optimization",
        destination: "/projects/jobsecretary",
        permanent: true,
      },
      {
        source: "/blog/integrated-inventory-implementation-worklog",
        destination: "/blog/integrated-inventory-source-normalization",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/",
        headers: [{ key: "Link", value: agentDiscoveryLinkHeader }],
      },
      {
        source: "/projects",
        headers: [{ key: "Link", value: agentDiscoveryLinkHeader }],
      },
      {
        source: "/projects/:slug",
        headers: [{ key: "Link", value: agentDiscoveryLinkHeader }],
      },
      {
        source: "/blog",
        headers: [{ key: "Link", value: agentDiscoveryLinkHeader }],
      },
      {
        source: "/blog/:slug",
        headers: [{ key: "Link", value: agentDiscoveryLinkHeader }],
      },
      {
        source: "/videos",
        headers: [{ key: "Link", value: agentDiscoveryLinkHeader }],
      },
      {
        source: "/videos/:slug",
        headers: [{ key: "Link", value: agentDiscoveryLinkHeader }],
      },
      {
        source: "/developers",
        headers: [{ key: "Link", value: agentDiscoveryLinkHeader }],
      },
      {
        source: "/about",
        headers: [{ key: "Link", value: agentDiscoveryLinkHeader }],
      },
      {
        source: "/contact",
        headers: [{ key: "Link", value: agentDiscoveryLinkHeader }],
      },
      {
        source: "/privacy",
        headers: [{ key: "Link", value: agentDiscoveryLinkHeader }],
      },
      {
        source: "/openapi.json",
        headers: [{ key: "Link", value: agentDiscoveryLinkHeader }],
      },
      {
        source: "/.well-known/mcp",
        headers: [{ key: "Link", value: agentDiscoveryLinkHeader }],
      },
    ];
  },
};

export default nextConfig;
