import { NextResponse } from "next/server";
import { aeoArticles } from "@/data/aeo";
import { site } from "@/data/site";

export const dynamic = "force-static";

const publicationDate = "2026-08-09T00:00:00+05:30";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const newsArticles = aeoArticles.slice(0, 60);
  const urls = newsArticles
    .map(
      (article) => `  <url>
    <loc>${site.url}/blog/${article.slug}/</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(site.name)}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${publicationDate}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
    </news:news>
  </url>`,
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
