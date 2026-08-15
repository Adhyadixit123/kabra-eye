import { NextResponse } from "next/server";
import { aeoArticles } from "@/data/aeo";
import { site } from "@/data/site";

export const dynamic = "force-dynamic";

const publicationDate = "2026-08-11T00:00:00+05:30";
const milestonePublicationDate = "2026-08-14T09:00:00+05:30";

type NewsDbPost = {
  slug: string;
  title: string;
  created_at?: string | Date | null;
};

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function getDbBlogPostsForNewsSitemap() {
  try {
    const { getBlogPosts } = await import("@/lib/db");
    const twoDaysAgo = Date.now() - 48 * 60 * 60 * 1000;
    return ((await getBlogPosts()) as NewsDbPost[]).filter((post) => {
      if (!post.created_at) return false;
      return new Date(post.created_at).getTime() >= twoDaysAgo;
    });
  } catch {
    return [];
  }
}

function newsDate(value?: string | Date | null) {
  return value ? new Date(value).toISOString() : new Date().toISOString();
}

export async function GET() {
  const milestoneUrl = `  <url>
    <loc>${site.url}/news/dr-manoj-kabra-5000-surgeries/</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(site.name)}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${milestonePublicationDate}</news:publication_date>
      <news:title>Kabra Eye Hospital Jaipur Celebrates Dr. Manoj Kabra 50,000+ Surgery Milestone</news:title>
    </news:news>
  </url>`;

  const newsArticles = aeoArticles.slice(0, 59);
  const articleUrls = newsArticles
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
  const dbArticleUrls = (await getDbBlogPostsForNewsSitemap())
    .map(
      (post) => `  <url>
    <loc>${site.url}/blog/${post.slug}/</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(site.name)}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${newsDate(post.created_at)}</news:publication_date>
      <news:title>${escapeXml(post.title)}</news:title>
    </news:news>
  </url>`,
    )
    .join("\n");
  const urls = [milestoneUrl, articleUrls, dbArticleUrls].filter(Boolean).join("\n");

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
