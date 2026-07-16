import type { MetadataRoute } from "next";
import { aeoArticles } from "@/data/aeo";
import { keratoconusPage } from "@/data/keratoconus";
import { services, sitemapPaths, site } from "@/data/site";

const lastModified = new Date("2026-07-16");

function priorityForPath(path: string) {
  if (path === "/") return 1;
  if (path === "/lasik-trans-prk/") return 0.98;
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
  if (path === "/" || path === "/lasik-trans-prk/" || path === keratoconusPage.path) return "weekly";
  if (path === "/authority/") return "weekly";
  if (path.startsWith("/service/") || path.startsWith("/blog/")) return "monthly";
  return "monthly";
}

function imagesForPath(path: string) {
  const service = services.find((item) => `/service/${item.slug}/` === path);
  if (service) {
    return [service.image.startsWith("/") ? encodeURI(`${site.url}${service.image}`) : service.image];
  }
  if (path === "/" || path === "/about-us/" || path === "/contacts/") {
    return [`${site.url}/Adobe%20Lightroom%203/DSC_0144.jpg`];
  }
  if (path === "/lasik-trans-prk/" || path === "/blog/schwind-amaris-jaipur-trans-prk-center/") {
    return [`${site.url}/Adobe%20Lightroom%203/DSC_0159.jpg`];
  }
  if (path === keratoconusPage.path) {
    return [encodeURI(`${site.url}${keratoconusPage.image}`)];
  }
  const article = aeoArticles.find((item) => `/blog/${item.slug}/` === path);
  if (article) {
    return [article.image.startsWith("/") ? encodeURI(`${site.url}${article.image}`) : article.image];
  }
  return undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapPaths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: changeFrequencyForPath(path),
    priority: priorityForPath(path),
    images: imagesForPath(path),
  }));
}
