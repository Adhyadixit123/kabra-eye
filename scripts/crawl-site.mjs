import { writeFile, mkdir } from "node:fs/promises";

const origin = "https://kabraeyejaipur.com";
const sitemapUrls = [
  `${origin}/page-sitemap.xml`,
  `${origin}/pxl-service-sitemap.xml`,
  `${origin}/product-sitemap.xml`,
  `${origin}/product_cat-sitemap.xml`,
];

const stripTags = (html = "") =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#038;|&amp;/g, "&")
    .replace(/&#8211;/g, "-")
    .replace(/&#8217;|&rsquo;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();

const matchOne = (html, regex) => html.match(regex)?.[1]?.trim() ?? "";
const matchAll = (html, regex) => [...html.matchAll(regex)].map((m) => stripTags(m[1]));

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "KabraEyeNextMigration/1.0",
    },
  });
  return {
    status: response.status,
    text: await response.text(),
  };
}

async function getSitemapUrls(url) {
  const { text } = await fetchText(url);
  return [...text.matchAll(/<loc>(.*?)<\/loc>/g)]
    .map((m) => m[1].trim())
    .filter((loc) => loc.startsWith(origin));
}

async function crawlPage(url) {
  const { status, text } = await fetchText(url);
  const bodyText = stripTags(matchOne(text, /<body[^>]*>([\s\S]*?)<\/body>/i));

  return {
    url,
    path: new URL(url).pathname,
    status,
    title: stripTags(matchOne(text, /<title[^>]*>([\s\S]*?)<\/title>/i)),
    description: stripTags(
      matchOne(text, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) ||
        matchOne(text, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i),
    ),
    canonical: matchOne(text, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i),
    h1: matchAll(text, /<h1[^>]*>([\s\S]*?)<\/h1>/gi),
    h2: matchAll(text, /<h2[^>]*>([\s\S]*?)<\/h2>/gi),
    images: [...text.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)]
      .map((m) => new URL(m[1], origin).href)
      .slice(0, 16),
    excerpt: bodyText.slice(0, 900),
    wordCount: bodyText ? bodyText.split(/\s+/).length : 0,
  };
}

const sitemapPageUrls = (await Promise.all(sitemapUrls.map(getSitemapUrls))).flat();
const adminPagePaths = [
  "/404-2/",
  "/about-us/",
  "/blog/",
  "/complete-empanelment-list/",
  "/contacts/",
  "/dnb-affiliated-post-graduation-courses/",
  "/education-training/",
  "/services/",
  "/eye-disease/",
  "/faq/",
  "/",
  "/home-option-2/",
  "/meet-our-specialists/",
  "/my-account/",
  "/paramedical-courses/",
  "/prices/",
  "/privacy-policy/",
  "/refund_returns/",
  "/shop/",
  "/shop-2/",
  "/wishlist/",
];

const urls = [
  ...new Set([
    ...sitemapPageUrls,
    ...adminPagePaths.map((path) => new URL(path, origin).href),
  ]),
].sort((a, b) => new URL(a).pathname.localeCompare(new URL(b).pathname));

const pages = [];
for (const url of urls) {
  try {
    pages.push(await crawlPage(url));
    console.log(`crawled ${url}`);
  } catch (error) {
    pages.push({
      url,
      path: new URL(url).pathname,
      status: 0,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

await mkdir("src/data", { recursive: true });
await writeFile(
  "src/data/crawl.json",
  `${JSON.stringify(
    {
      crawledAt: new Date().toISOString(),
      origin,
      count: pages.length,
      pages,
    },
    null,
    2,
  )}\n`,
);

