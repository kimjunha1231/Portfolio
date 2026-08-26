import { estimateTokens } from "@/lib/mdx";
import { getAgentInstructionsMarkdown } from "@/lib/ai-context";

export function GET() {
  const content = getAgentInstructionsMarkdown();

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "X-Robots-Tag": "noindex, follow",
      "Vary": "Accept",
      "x-markdown-tokens": String(estimateTokens(content)),
    },
  });
}
