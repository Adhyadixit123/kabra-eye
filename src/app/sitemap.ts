import type { MetadataRoute } from "next";
import { aeoArticles } from "@/data/aeo";
import { keratoconusPage } from "@/data/keratoconus";
import { services, sitemapPaths, site } from "@/data/site";

const lastModified = new Date("2026-08-12");

type SitemapDbPost = {
  slug: string;
  image?: string | null;
  created_at?: string | Date | null;
};

function priorityForPath(path: string) {
  if (path === "/") return 1;
  if (path === "/best-cataract-surgeon-jaipur/") return 0.995;
  if (path === "/news/dr-manoj-kabra-5000-surgeries/") return 0.993;
  if (path === "/best-eye-doctor-jaipur/") return 0.99;
  if (path === "/newsroom/") return 0.985;
  if (path === "/lasik-trans-prk/") return 0.98;
  if (path === "/defence-eye-surgery-transprk-comparison/") return 0.97;
  if (path === "/service/trans-prk-glasses-spectacle-removal-surgery/") return 0.97;
  if (path === keratoconusPage.path) return 0.96;
  if (path === "/authority/") return 0.91;
  if (path.startsWith("/blog/") && path !== "/blog/") return 0.94;
  if (path === "/about-us/" || path === "/contacts/" || path === "/services/") return 0.9;
  if (path.startsWith("/service/")) return 0.86;
  if (path === "/complete-empanelment-list/" || path === "/meet-our-specialists/") return 0.82;
  return 0.7;
}

function changeFrequencyForPath(path: string): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (
    path === "/" ||
    path === "/best-cataract-surgeon-jaipur/" ||
    path === "/news/dr-manoj-kabra-5000-surgeries/" ||
    path === "/newsroom/" ||
    path === "/best-eye-doctor-jaipur/" ||
    path === "/lasik-trans-prk/" ||
    path === "/defence-eye-surgery-transprk-comparison/" ||
    path === keratoconusPage.path
  ) return "weekly";
  if (path === "/authority/") return "weekly";
  if (path.startsWith("/service/") || path.startsWith("/blog/")) return "monthly";
  return "monthly";
}

function imagesForPath(path: string, dbPosts: SitemapDbPost[] = []) {
  const service = services.find((item) => `/service/${item.slug}/` === path);
  if (service) {
    return [service.image.startsWith("/") ? encodeURI(`${site.url}${service.image}`) : service.image];
  }
  if (path === "/" || path === "/about-us/" || path === "/contacts/") {
    return [`${site.url}/Adobe%20Lightroom%203/DSC_0144.jpg`];
  }
  if (path === "/best-eye-doctor-jaipur/") {
    return [`${site.url}/Adobe%20Lightroom%203/DSC_0144.jpg`];
  }
  if (path === "/best-cataract-surgeon-jaipur/") {
    return [`${site.url}/Adobe%20Lightroom%203/DSC_0142.jpg`];
  }
  if (path === "/newsroom/" || path === "/news/dr-manoj-kabra-5000-surgeries/") {
    return [`${site.url}/Adobe%20Lightroom%203/DSC_0142.jpg`];
  }
  if (path === "/lasik-trans-prk/" || path === "/blog/schwind-amaris-jaipur-trans-prk-center/") {
    return [`${site.url}/Adobe%20Lightroom%203/DSC_0159.jpg`];
  }
  if (path === "/defence-eye-surgery-transprk-comparison/") {
    return [`${site.url}/blog-images/schwind-amaris-trans-prk.jpg`];
  }
  if (path === keratoconusPage.path) {
    return [encodeURI(`${site.url}${keratoconusPage.image}`)];
  }
  const article = aeoArticles.find((item) => `/blog/${item.slug}/` === path);
  if (article) {
    return [article.image.startsWith("/") ? encodeURI(`${site.url}${article.image}`) : article.image];
  }
  const dbPost = dbPosts.find((item) => `/blog/${item.slug}/` === path);
  if (dbPost?.image) {
    return [dbPost.image.startsWith("/") ? encodeURI(`${site.url}${dbPost.image}`) : dbPost.image];
  }
  return undefined;
}

function lastModifiedForPath(path: string, dbPosts: SitemapDbPost[]) {
  const dbPost = dbPosts.find((item) => `/blog/${item.slug}/` === path);
  return dbPost?.created_at ? new Date(dbPost.created_at) : lastModified;
}

async function getDbBlogPostsForSitemap() {
  try {
    const { getBlogPosts } = await import("@/lib/db");
    return (await getBlogPosts()) as SitemapDbPost[];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dbPosts = await getDbBlogPostsForSitemap();
  const paths = [
    ...sitemapPaths,
    ...aeoArticles.map((article) => `/blog/${article.slug}/`),
    ...dbPosts.map((post) => `/blog/${post.slug}/`),
  ].filter((path, index, array) => array.indexOf(path) === index);

  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: lastModifiedForPath(path, dbPosts),
    changeFrequency: changeFrequencyForPath(path),
    priority: priorityForPath(path),
    images: imagesForPath(path, dbPosts),
  }));
}
