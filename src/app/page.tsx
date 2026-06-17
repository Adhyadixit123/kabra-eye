import type { Metadata } from "next";
import { HomeRedesign } from "@/components/home-redesign";
import { SiteShell } from "@/components/site-shell";
import {
  medicalOrganizationSchema,
  physicianSchema,
  schwindAmarisDeviceSchema,
  transPrkProcedureSchema,
} from "@/data/aeo";

export const metadata: Metadata = {
  title: "Schwind Amaris Trans PRK Jaipur | Kabra Eye Hospital",
  description:
    "Kabra Eye Hospital has Jaipur's Schwind Amaris for Trans PRK, led by Dr. Manoj Kabra with 35+ years, the only such center in Rajasthan.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Schwind Amaris Trans PRK Jaipur | Kabra Eye Hospital",
    description:
      "Kabra Eye Hospital has Jaipur's Schwind Amaris for Trans PRK, led by Dr. Manoj Kabra with 35+ years, the only such center in Rajasthan.",
    url: "https://kabraeyejaipur.com/",
    siteName: "Kabra Eye Hospital Jaipur",
    type: "website",
    images: [
      {
        url: "https://kabraeyejaipur.com/wp-content/uploads/2022/10/transprk-refractive-vision-correction.webp",
        width: 1200,
        height: 630,
        alt: "Schwind Amaris Trans PRK at Kabra Eye Hospital Jaipur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Schwind Amaris Trans PRK Jaipur | Kabra Eye Hospital",
    description:
      "Kabra Eye Hospital has Jaipur's Schwind Amaris for Trans PRK, led by Dr. Manoj Kabra with 35+ years, the only such center in Rajasthan.",
    images: [
      "https://kabraeyejaipur.com/wp-content/uploads/2022/10/transprk-refractive-vision-correction.webp",
    ],
  },
};

export default function Home() {
  return (
    <SiteShell>
      {[medicalOrganizationSchema, physicianSchema, transPrkProcedureSchema, schwindAmarisDeviceSchema].map(
        (schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ),
      )}
      <HomeRedesign />
    </SiteShell>
  );
}
