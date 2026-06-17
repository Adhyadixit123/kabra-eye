import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections";
import { SiteShell } from "@/components/site-shell";
import { services } from "@/data/site";

const service =
  services.find((item) => item.slug === "trans-prk-glasses-spectacle-removal-surgery") ??
  services[0];

export const metadata: Metadata = {
  title: "Trans PRK - Glasses / Spectacle Removal Surgery",
  description:
    "Kabra Eye Hospital is the only Schwind Amaris center in Jaipur for no-touch Trans PRK surgery led by Dr. Manoj Kabra.",
  alternates: {
    canonical: "/service/trans-prk-glasses-spectacle-removal-surgery/",
  },
  openGraph: {
    title: "Trans PRK - Glasses / Spectacle Removal Surgery",
    description:
      "Kabra Eye Hospital is the only Schwind Amaris center in Jaipur for no-touch Trans PRK surgery led by Dr. Manoj Kabra.",
    url: "/service/trans-prk-glasses-spectacle-removal-surgery/",
    siteName: "Kabra Eye Jaipur",
    images: [{ url: service.image }],
  },
};

export default function TransPrkServicePage() {
  return (
    <SiteShell>
      <ServiceDetail service={service} />
    </SiteShell>
  );
}
