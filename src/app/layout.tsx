import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingSiteVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL("https://kabraeyejaipur.com"),
  title: {
    default: "Kabra Eye Hospital Jaipur | Super Specialty Eye Centre",
    template: "%s | Kabra Eye Jaipur",
  },
  description:
    "Kabra Eye Hospital, Sodala, Ajmer Road, Jaipur provides Trans PRK, cataract, retina, glaucoma, cornea, squint, neuro ophthalmology, and children's eye care.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Kabra Eye Jaipur",
    title: "Kabra Eye Hospital Jaipur",
    description: "Super specialty eye care in Sodala, Jaipur.",
    url: "https://kabraeyejaipur.com",
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
  return (
    <html lang="en" className={geistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
