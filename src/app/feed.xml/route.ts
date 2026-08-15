import { NextResponse } from "next/server";
import { aeoArticles } from "@/data/aeo";
import { site } from "@/data/site";

export const dynamic = "force-dynamic";

const publicationDate = "Fri, 31 Jul 2026 00:00:00 +0530";
const milestonePublicationDate = "Fri, 14 Aug 2026 09:00:00 +0530";

type FeedDbPost = {
  slug: string;
  title: string;
  description?: string | null;
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

async function getDbBlogPostsForFeed() {
  try {
    const { getBlogPosts } = await import("@/lib/db");
    return (await getBlogPosts()) as FeedDbPost[];
  } catch {
    return [];
  }
}

function pubDate(value?: string | Date | null) {
  return value ? new Date(value).toUTCString() : new Date().toUTCString();
}

export async function GET() {
  const milestoneUrl = `${site.url}/news/dr-manoj-kabra-5000-surgeries/`;
  const milestoneItem = `    <item>
      <title>Kabra Eye Hospital Jaipur Celebrates Dr. Manoj Kabra 50,000+ Surgery Milestone</title>
      <link>${milestoneUrl}</link>
      <guid isPermaLink="true">${milestoneUrl}</guid>
      <description>Kabra Eye Hospital, Sodala Jaipur, celebrates Dr. Manoj Kabra crossing 50,000+ successful eye surgeries, highlighting 30+ years of cataract and phaco surgery experience.</description>
      <pubDate>${milestonePublicationDate}</pubDate>
    </item>`;

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
  const dbItems = (await getDbBlogPostsForFeed())
    .map((post) => {
      const url = `${site.url}/blog/${post.slug}/`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description ?? "")}</description>
      <pubDate>${pubDate(post.created_at)}</pubDate>
    </item>`;
    })
    .join("\n");
  const allItems = [milestoneItem, items, dbItems].filter(Boolean).join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(site.name)} Eye Health Blog</title>
    <link>${site.url}/blog/</link>
    <description>${escapeXml(site.description)}</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${allItems}
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
