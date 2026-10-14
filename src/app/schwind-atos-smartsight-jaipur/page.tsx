import type { Metadata } from "next";
import { SchwindAtosSmartSightPage } from "@/components/refractive-technology-pages";
import { SiteShell } from "@/components/site-shell";

const title = "SCHWIND ATOS SmartSight Jaipur | Rajasthan's First";
const description =
  "Rajasthan's first SCHWIND ATOS is at Kabra Eye Hospital Jaipur. Compare SmartSight with SMILE Pro and Alcon with surgeon Dr. Vighnesh Kabra.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  authors: [{ name: "Kabra Eye Hospital Refractive Surgery Team", url: "/meet-our-specialists/" }],
  creator: "Kabra Eye Hospital",
  publisher: "Kabra Eye Hospital",
  category: "Refractive eye surgery",
  keywords: [
    "SCHWIND ATOS Jaipur",
    "SCHWIND ATOS Rajasthan",
    "SmartSight Jaipur",
    "SmartSight NOVA Jaipur",
    "CenTrax eye tracking Jaipur",
    "SmartSight NOVA vs SMILE Pro",
    "SmartSight vs SMILE Pro",
    "SmartSight vs Alcon WaveLight Plus",
    "SMILE Pro alternative Jaipur",
    "SMILE Pro alternative Rajasthan",
    "SmartSight surgery cost Jaipur",
    "flap free laser eye surgery Jaipur",
    "lenticule extraction Jaipur",
    "Alcon vs SCHWIND laser",
    "Dr Vighnesh Kabra refractive surgeon",
    "Kabra Eye Hospital laser eye surgery",
  ],
  alternates: {
    canonical: "/schwind-atos-smartsight-jaipur/",
    languages: {
      "en-IN": "/schwind-atos-smartsight-jaipur/",
      "x-default": "/schwind-atos-smartsight-jaipur/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/schwind-atos-smartsight-jaipur/",
    siteName: "Kabra Eye Jaipur",
    locale: "en_IN",
    images: [
      {
        url: "/blog-images/schwind-atos-smartsight-centration-illustration.png",
        width: 1672,
        height: 941,
        alt: "Illustration of SmartSight NOVA lenticule extraction and CenTrax centration",
      },
      {
        url: "/doctor-portraits/vighnesh-kabra.jpeg",
        width: 1067,
        height: 1600,
        alt: "Dr. Vighnesh Kabra, SCHWIND ATOS surgeon at Kabra Eye Hospital Jaipur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/blog-images/schwind-atos-smartsight-centration-illustration.png"],
  },
  other: {
    "geo.region": "IN-RJ",
    "geo.placename": "Jaipur",
  },
};

export default function Page() {
  return (
    <SiteShell>
      <SchwindAtosSmartSightPage />
    </SiteShell>
  );
}
