import { NextResponse } from "next/server";
import { aeoArticles } from "@/data/aeo";
import { site } from "@/data/site";

export const dynamic = "force-static";

const publicationDate = "Fri, 31 Jul 2026 00:00:00 +0530";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const items = aeoArticles
    .slice(0, 60)
    .map((article) => {
      const url = `${site.url}/blog/${article.slug}/`;
      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(article.description)}</description>
      <pubDate>${publicationDate}</pubDate>
    </item>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(site.name)} Eye Health Blog</title>
    <link>${site.url}/blog/</link>
    <description>${escapeXml(site.description)}</description>
    <language>en-IN</language>
    <lastBuildDate>${publicationDate}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
