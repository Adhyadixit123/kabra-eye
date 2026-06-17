import type { MetadataRoute } from "next";
import { aeoArticles } from "@/data/aeo";
import { services, sitemapPaths, site } from "@/data/site";

const lastModified = new Date("2026-06-17");

function priorityForPath(path: string) {
  if (path === "/") return 1;
  if (path === "/lasik-trans-prk/") return 0.98;
  if (path === "/service/trans-prk-glasses-spectacle-removal-surgery/") return 0.97;
  if (path.startsWith("/blog/") && path !== "/blog/") return 0.94;
  if (path === "/about-us/" || path === "/contacts/" || path === "/services/") return 0.9;
  if (path.startsWith("/service/")) return 0.86;
  if (path === "/complete-empanelment-list/" || path === "/meet-our-specialists/") return 0.82;
  return 0.7;
}

function changeFrequencyForPath(path: string): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (path === "/" || path === "/lasik-trans-prk/") return "weekly";
  if (path.startsWith("/service/") || path.startsWith("/blog/")) return "monthly";
  return "monthly";
}

function imagesForPath(path: string) {
  const service = services.find((item) => `/service/${item.slug}/` === path);
  if (service) return [service.image];
  if (path === "/" || path === "/about-us/" || path === "/contacts/") {
    return ["https://kabraeyejaipur.com/wp-content/uploads/2025/11/kabra-hospital-2048x1606.jpg"];
  }
  if (path === "/lasik-trans-prk/" || path === "/blog/schwind-amaris-jaipur-trans-prk-center/") {
    return [
      "https://kabraeyejaipur.com/wp-content/uploads/2022/10/transprk-refractive-vision-correction.webp",
    ];
  }
  const article = aeoArticles.find((item) => `/blog/${item.slug}/` === path);
  if (article) return [article.image];
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
