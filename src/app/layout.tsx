import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingSiteVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL("https://kabraeyejaipur.com"),
  applicationName: "Kabra Eye Hospital Jaipur",
  title: {
    default: "Kabra Eye Hospital Jaipur | Super Specialty Eye Centre",
    template: "%s | Kabra Eye Jaipur",
  },
  description:
    "Kabra Eye Hospital, Sodala, Jaipur combines specialist diagnostics, surgery, and follow-up for Schwind Amaris Trans PRK, keratoconus, cataract, retina, glaucoma, cornea, squint, and children's eye care.",
  keywords: [
    "Kabra Eye Hospital Jaipur",
    "eye hospital Jaipur",
    "keratoconus treatment Jaipur",
    "keratoconus at Kabra Eye Hospital",
    "keratocunus treatment Jaipur",
    "cornea specialist Jaipur",
    "Trans PRK Jaipur",
    "Schwind Amaris Jaipur",
    "cataract surgery Jaipur",
    "retina specialist Jaipur",
    "glaucoma specialist Jaipur",
    "children eye care Jaipur",
  ],
  category: "Healthcare",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
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
    siteName: "Kabra Eye Jaipur",
    title: "Kabra Eye Hospital Jaipur",
    description:
      "Diagnosis-led eye surgery and specialist care at Kabra Eye Hospital, Sodala, Jaipur.",
    url: "https://kabraeyejaipur.com",
    images: [
      {
        url: "/Adobe Lightroom 3/DSC_0144.jpg",
        width: 1200,
        height: 800,
        alt: "Kabra Eye Hospital Jaipur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kabra Eye Hospital Jaipur",
    description:
      "Diagnosis-led eye surgery and specialist care at Kabra Eye Hospital, Sodala, Jaipur.",
    images: ["/Adobe Lightroom 3/DSC_0144.jpg"],
  },
  ...(googleSiteVerification || bingSiteVerification
    ? {
        verification: {
          ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
          ...(bingSiteVerification
            ? {
                other: {
                  "msvalidate.01": bingSiteVerification,
                },
              }
            : {}),
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const logoUrl = site.logo.startsWith("/") ? `${site.url}${site.logo}` : site.logo;
  const siteSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalOrganization",
      "@id": `${site.url}/#medical-organization`,
      name: site.name,
      alternateName: site.seoName,
      foundingDate: "1990",
      url: site.url,
      logo: logoUrl,
      image: `${site.url}/Adobe%20Lightroom%203/DSC_0144.jpg`,
      sameAs: [site.instagram],
      telephone: site.phone,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "C-59-60, Jamuna Nagar, Sodala, Ajmer Road",
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        postalCode: "302006",
        addressCountry: "IN",
      },
      medicalSpecialty: [
        "Ophthalmology",
        "Cornea",
        "Refractive Surgery",
        "Cataract Surgery",
        "Retina",
        "Glaucoma",
        "Pediatric Ophthalmology",
      ],
      areaServed: {
        "@type": "City",
        name: "Jaipur",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: site.phone,
        contactType: "appointments",
        areaServed: "IN-RJ",
        availableLanguage: ["English", "Hindi"],
      },
      knowsAbout: [
        "Schwind Amaris Trans PRK",
        "Keratoconus diagnosis and C3R/CXL planning",
        "Cataract surgery",
        "Vitreo-retinal care",
        "Glaucoma and squint care",
        "Pediatric ophthalmology",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en-IN",
      publisher: {
        "@id": `${site.url}/#medical-organization`,
      },
    },
  ];

  return (
    <html lang="en-IN" className={geistSans.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchemas) }}
        />
        {children}
      </body>
    </html>
  );
}
