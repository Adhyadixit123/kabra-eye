import type { MetadataRoute } from "next";
import { aeoArticles } from "@/data/aeo";
import { governmentJobGuides, governmentJobsHub, governmentJobsImage, governmentJobsUpdated } from "@/data/government-jobs";
import { keratoconusPage } from "@/data/keratoconus";
import { services, sitemapPaths, site } from "@/data/site";

const lastModified = new Date("2026-08-17");
const serviceContentRefreshDate = new Date("2026-10-14");

type SitemapDbPost = {
  slug: string;
  image?: string | null;
  created_at?: string | Date | null;
};

function priorityForPath(path: string) {
  if (path === governmentJobsHub) return 0.95;
  if (governmentJobGuides.some((guide) => guide.path === path)) return 0.9;
  if (path === "/") return 1;
  if (path === "/best-cataract-surgeon-jaipur/") return 0.995;
  if (path === "/jaipur-cataract-surgery-search-authority/") return 0.994;
  if (path === "/news/dr-manoj-kabra-5000-surgeries/") return 0.993;
  if (path === "/best-eye-doctor-jaipur/") return 0.99;
  if (path === "/newsroom/") return 0.985;
  if (path === "/eye-research-and-innovation/") return 0.982;
  if (path === "/schwind-atos-smartsight-jaipur/") return 0.981;
  if (path === "/customeyes-schwind-amaris-jaipur/") return 0.979;
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
    path === "/jaipur-cataract-surgery-search-authority/" ||
    path === "/news/dr-manoj-kabra-5000-surgeries/" ||
    path === "/newsroom/" ||
    path === "/eye-research-and-innovation/" ||
    path === "/schwind-atos-smartsight-jaipur/" ||
    path === "/customeyes-schwind-amaris-jaipur/" ||
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
  if (path === governmentJobsHub || governmentJobGuides.some((guide) => guide.path === path)) {
    return [encodeURI(`${site.url}${governmentJobsImage}`)];
  }
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
  if (path === "/jaipur-cataract-surgery-search-authority/") {
    return [`${site.url}/blog-images/best-eye-doctor-jaipur/best-eye-surgeon-hospital-jaipur.jpg`];
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
  if (path === "/schwind-atos-smartsight-jaipur/") {
    return [
      `${site.url}/technology/schwind/schwind-atos-treatment-system.webp`,
      `${site.url}/technology/schwind/schwind-atos-product.webp`,
      `${site.url}/technology/schwind/smartsight-nova-centrax.webp`,
      `${site.url}/technology/schwind/customeyes-amaris-platform.webp`,
      `${site.url}/technology/schwind/customeyes-sirius-diagnostics.webp`,
      `${site.url}/technology/schwind/customeyes-ms39-diagnostics.webp`,
      `${site.url}/blog-images/schwind-atos-smartsight-centration-illustration.png`,
      `${site.url}/doctor-portraits/vighnesh-kabra.jpeg`,
      `${site.url}/blog-images/smile-transprk-defence.jpg`,
    ];
  }
  if (path === "/customeyes-schwind-amaris-jaipur/") {
    return [`${site.url}/doctor-portraits/vighnesh-kabra.jpeg`];
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
  if (path === governmentJobsHub || governmentJobGuides.some((guide) => guide.path === path) || path === "/blog/capf-police-lasik-transprk-medical-test/") return new Date(governmentJobsUpdated);
  const dbPost = dbPosts.find((item) => `/blog/${item.slug}/` === path);
  if (dbPost?.created_at) return new Date(dbPost.created_at);
  const article = aeoArticles.find((item) => `/blog/${item.slug}/` === path);
  const articleDate = article?.updatedOn ?? article?.publishedOn;
  if (articleDate) return new Date(articleDate);
  if (
    path === "/" ||
    path === "/schwind-atos-smartsight-jaipur/" ||
    path === "/customeyes-schwind-amaris-jaipur/" ||
    path === "/service/trans-prk-glasses-spectacle-removal-surgery/" ||
    path === "/service/icl-ipcl-high-power-number-correction/" ||
    path === "/service/cataract-surgery/"
  ) {
    return serviceContentRefreshDate;
  }
  return lastModified;
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
    governmentJobsHub,
    ...governmentJobGuides.map((guide) => guide.path),
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
