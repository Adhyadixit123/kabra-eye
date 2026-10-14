import type { Metadata } from "next";
import { CustomEyesSchwindAmarisPage } from "@/components/refractive-technology-pages";
import { SiteShell } from "@/components/site-shell";

const title = "CustomEyes Jaipur | SCHWIND AMARIS | Kabra Eye Hospital";
const description =
  "CustomEyes with SCHWIND AMARIS in Jaipur offers personalised laser-vision planning led by refractive surgeon Dr. Vighnesh Kabra at Kabra Eye Hospital.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  authors: [{ name: "Kabra Eye Hospital Refractive Surgery Team", url: "/meet-our-specialists/" }],
  creator: "Kabra Eye Hospital",
  publisher: "Kabra Eye Hospital",
  category: "Personalised refractive eye surgery",
  keywords: [
    "CustomEyes Jaipur",
    "SCHWIND CustomEyes Jaipur",
    "SCHWIND AMARIS Jaipur",
    "personalised laser eye surgery Jaipur",
    "personalised laser eye surgery Rajasthan",
    "wavefront guided laser Jaipur",
    "customised LASIK Jaipur",
    "CustomEyes vs WaveLight Plus",
    "CustomEyes vs SMILE Pro",
    "CustomEyes cost Jaipur",
    "Dr Vighnesh Kabra refractive surgeon",
  ],
  alternates: {
    canonical: "/customeyes-schwind-amaris-jaipur/",
    languages: {
      "en-IN": "/customeyes-schwind-amaris-jaipur/",
      "x-default": "/customeyes-schwind-amaris-jaipur/",
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
    url: "/customeyes-schwind-amaris-jaipur/",
    siteName: "Kabra Eye Jaipur",
    locale: "en_IN",
    images: [
      {
        url: "/doctor-portraits/vighnesh-kabra.jpeg",
        width: 1067,
        height: 1600,
        alt: "Dr. Vighnesh Kabra leading CustomEyes planning at Kabra Eye Hospital Jaipur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/doctor-portraits/vighnesh-kabra.jpeg"],
  },
  other: {
    "geo.region": "IN-RJ",
    "geo.placename": "Jaipur",
  },
};

export default function Page() {
  return (
    <SiteShell>
      <CustomEyesSchwindAmarisPage />
    </SiteShell>
  );
}
