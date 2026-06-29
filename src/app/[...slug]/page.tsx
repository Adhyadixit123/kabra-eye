import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  AeoBlogArticlePage,
  AboutIndexPage,
  BlogIndexPage,
  ContactIndexPage,
  EducationIndexPage,
  EmpanelmentIndexPage,
  EyeDiseaseIndexPage,
  FAQIndexPage,
  LasikTransPrkPage,
  ServicesIndexPage,
  SpecialistsIndexPage,
  UtilityIndexPage,
} from "@/components/page-designs";
import { ServiceDetail } from "@/components/sections";
import { SiteShell } from "@/components/site-shell";
import { aeoArticles } from "@/data/aeo";
import { services, site } from "@/data/site";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

const normalize = (slug: string[]) => `/${slug.join("/")}/`;

function titleForPath(path: string) {
  const service = services.find((item) => `/service/${item.slug}/` === path);
  if (service) return service.title;

  const titles: Record<string, string> = {
    "/about-us/": "About Us",
    "/lasik-trans-prk/": "Schwind Amaris Trans PRK Jaipur",
    "/services/": "Eye Care Services",
    "/service/": "Eye Care Services",
    "/meet-our-specialists/": "Meet Our Specialists",
    "/contacts/": "Contacts",
    "/complete-empanelment-list/": "Complete Empanelment List",
    "/education-training/": "Education & Training",
    "/paramedical-courses/": "Paramedical Courses",
    "/dnb-affiliated-post-graduation-courses/": "DNB Affiliated Post-Graduation Courses",
    "/faq/": "FAQ",
    "/eye-disease/": "Eye Disease",
    "/blog/": "Blog",
    "/prices/": "Prices",
    "/privacy-policy/": "Privacy Policy",
    "/404-2/": "404",
    "/home-option-2/": "Home Option 2",
  };

  const blogArticle = aeoArticles.find((article) => `/blog/${article.slug}/` === path);

  return blogArticle?.title ?? titles[path];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const path = normalize((await params).slug);
  const title = titleForPath(path);

  if (!title) return {};

  const service = services.find((item) => `/service/${item.slug}/` === path);
  const blogArticle = aeoArticles.find((article) => `/blog/${article.slug}/` === path);
  const description =
    path === "/lasik-trans-prk/"
      ? "Kabra Eye Hospital is the only Schwind Amaris center in Jaipur for true single-step Trans PRK surgery with Dr. Manoj Kabra."
      : path === "/service/trans-prk-glasses-spectacle-removal-surgery/"
        ? "Kabra Eye Hospital is the only Schwind Amaris center in Jaipur for no-touch Trans PRK surgery led by Dr. Manoj Kabra."
      : blogArticle
        ? blogArticle.description
        : service?.description ??
          `${title} at Kabra Eye Hospital, Sodala, Ajmer Road, Jaipur. Book a consultation or call ${site.phone}.`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Kabra Eye Jaipur",
      images: service?.image
        ? [{ url: service.image }]
        : blogArticle?.image
          ? [{ url: blogArticle.image }]
          : undefined,
    },
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const path = normalize((await params).slug);
  const service = services.find((item) => `/service/${item.slug}/` === path);

  if (service) {
    return (
      <SiteShell>
        <ServiceDetail service={service} />
      </SiteShell>
    );
  }

  if (path === "/services/" || path === "/service/") {
    return (
      <SiteShell>
        <ServicesIndexPage />
      </SiteShell>
    );
  }

  if (path === "/lasik-trans-prk/") {
    return (
      <SiteShell>
        <LasikTransPrkPage />
      </SiteShell>
    );
  }

  if (path === "/about-us/") {
    return (
      <SiteShell>
        <AboutIndexPage />
      </SiteShell>
    );
  }

  if (path === "/meet-our-specialists/") {
    return (
      <SiteShell>
        <SpecialistsIndexPage />
      </SiteShell>
    );
  }

  if (path === "/contacts/") {
    return (
      <SiteShell>
        <ContactIndexPage />
      </SiteShell>
    );
  }

  if (path === "/complete-empanelment-list/") {
    return (
      <SiteShell>
        <EmpanelmentIndexPage />
      </SiteShell>
    );
  }

  if (path === "/education-training/") {
    return (
      <SiteShell>
        <EducationIndexPage />
      </SiteShell>
    );
  }

  if (path === "/paramedical-courses/") {
    return (
      <SiteShell>
        <UtilityIndexPage
          title="Paramedical Courses"
          eyebrow="Kabra Institute of Medical Sciences"
          description="Allied healthcare training focused on practical skills, hospital discipline, and real-world patient care environments."
          icon="graduation"
        />
      </SiteShell>
    );
  }

  if (path === "/dnb-affiliated-post-graduation-courses/") {
    return (
      <SiteShell>
        <UtilityIndexPage
          title="DNB Affiliated Post-Graduation Courses"
          eyebrow="Postgraduate Ophthalmology"
          description="NBEMS-accredited postgraduate medical training in Ophthalmology at Kabra Eye Hospital, Jaipur."
          icon="hospital"
        />
      </SiteShell>
    );
  }

  if (path === "/faq/") {
    return (
      <SiteShell>
        <FAQIndexPage />
      </SiteShell>
    );
  }

  if (path === "/eye-disease/") {
    return (
      <SiteShell>
        <EyeDiseaseIndexPage />
      </SiteShell>
    );
  }

  if (path === "/blog/") {
    const { getBlogPosts } = await import("@/lib/db");
    const posts = await getBlogPosts();
    return (
      <SiteShell>
        <BlogIndexPage posts={posts as { slug: string; title: string; description: string; image: string }[]} />
      </SiteShell>
    );
  }

  const { getBlogPostBySlug, getBlogFaqs } = await import("@/lib/db");
  const blogPost = await getBlogPostBySlug(path.replace("/blog/", "").replace("/", ""));

  if (blogPost) {
    const faqs = await getBlogFaqs(blogPost.id);
    return (
      <SiteShell>
        <AeoBlogArticlePage
          article={{
            slug: blogPost.slug,
            title: blogPost.title,
            description: blogPost.description,
            image: blogPost.image,
            keywords: blogPost.keywords ?? [],
            faqs: faqs.map((f: { question: string; answer: string }) => ({ question: f.question, answer: f.answer })),
            sections: (blogPost.content as { heading: string; paragraphs: string[] }[])?.map((s) => ({
              heading: s.heading,
              paragraphs: s.paragraphs,
            })) ?? [],
            cta: blogPost.cta ?? "",
          }}
        />
      </SiteShell>
    );
  }

  if (path === "/prices/") {
    return (
      <SiteShell>
        <UtilityIndexPage
          title="Prices"
          eyebrow="Consultation Planning"
          description="A preserved pricing page for patients who want to understand consultation and treatment planning before visiting."
        />
      </SiteShell>
    );
  }

  if (path === "/privacy-policy/") {
    return (
      <SiteShell>
        <UtilityIndexPage
          title="Privacy Policy"
          eyebrow="Website Policy"
          description="How Kabra Eye Hospital handles information submitted through website contact and appointment forms."
        />
      </SiteShell>
    );
  }

  if (path === "/404-2/" || path === "/home-option-2/") {
    return (
      <SiteShell>
        <UtilityIndexPage
          title={path === "/404-2/" ? "Page Not Found" : "Home Option 2"}
          eyebrow="Legacy URL"
          description="This legacy WordPress URL is preserved during migration so users and search engines do not hit an empty page."
        />
      </SiteShell>
    );
  }

  notFound();
}

export function generateStaticParams() {
  const paths = [
    "about-us",
    "lasik-trans-prk",
    "services",
    "service",
    "meet-our-specialists",
    "contacts",
    "complete-empanelment-list",
    "education-training",
    "paramedical-courses",
    "dnb-affiliated-post-graduation-courses",
    "faq",
    "eye-disease",
    "blog",
    ...aeoArticles.map((article) => `blog/${article.slug}`),
    "prices",
    "privacy-policy",
    "404-2",
    "home-option-2",
    ...services.map((service) => `service/${service.slug}`),
  ];

  return paths.map((path) => ({ slug: path.split("/") }));
}
