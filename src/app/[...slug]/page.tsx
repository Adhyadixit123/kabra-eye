import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  AeoBlogArticlePage,
  AboutIndexPage,
  AuthorityIndexPage,
  BestCataractSurgeonJaipurPage,
  BestEyeDoctorJaipurPage,
  BlogIndexPage,
  ContactIndexPage,
  DefenceTransPrkComparisonPage,
  EditorialPolicyPage,
  EducationIndexPage,
  EmpanelmentIndexPage,
  EyeDiseaseIndexPage,
  FAQIndexPage,
  KeratoconusPage,
  JaipurCataractSearchAuthorityPage,
  LasikTransPrkPage,
  ManojKabraMilestoneNewsPage,
  NewsroomIndexPage,
  PrivacyPolicyPage,
  ResearchInnovationPage,
  ServicesIndexPage,
  SpecialistsIndexPage,
  UtilityIndexPage,
} from "@/components/page-designs";
import { ServiceDetail } from "@/components/sections";
import { SiteShell } from "@/components/site-shell";
import { aeoArticles, bestCataractSurgeonJaipur, bestEyeDoctorJaipur, transPrkLongTailKeywords } from "@/data/aeo";
import { keratoconusPage } from "@/data/keratoconus";
import { services, site } from "@/data/site";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

const normalize = (slug: string[]) => `/${slug.join("/")}/`;
const contactAliases = new Set(["/contacts/", "/contact/", "/contact-us/", "/pages/contact/"]);

function titleForPath(path: string) {
  const service = services.find((item) => `/service/${item.slug}/` === path);
  if (service) return service.title;

  const titles: Record<string, string> = {
    "/about-us/": "About Us",
    "/best-cataract-surgeon-jaipur/": bestCataractSurgeonJaipur.seoTitle,
    "/jaipur-cataract-surgery-search-authority/": "Best Cataract Surgery Jaipur Search Authority | Kabra Eye Hospital",
    "/best-eye-doctor-jaipur/": bestEyeDoctorJaipur.seoTitle,
    "/newsroom/": "Kabra Eye Hospital Newsroom | Jaipur Eye Care Updates",
    "/news/dr-manoj-kabra-5000-surgeries/": "Dr. Manoj Kabra 50,000+ Successful Surgery Milestone | Kabra Eye Hospital Jaipur",
    "/lasik-trans-prk/": "Schwind Amaris Trans PRK Jaipur",
    "/keratoconus/": keratoconusPage.seoTitle,
    "/authority/": "Authority, Research, News and Free Eye Camps",
    "/eye-research-and-innovation/": "Eye Research and Innovation Explained | Kabra Eye Hospital Jaipur",
    "/editorial-policy/": "Editorial Policy and Medical Content Standards",
    "/defence-eye-surgery-transprk-comparison/": "Defence Eye Surgery Comparison: Trans PRK vs LASIK, Contoura, SMILE and SILK",
    "/services/": "Eye Care Services",
    "/service/": "Eye Care Services",
    "/meet-our-specialists/": "Meet Our Specialists",
    "/contacts/": "Contacts",
    "/contact/": "Contacts",
    "/contact-us/": "Contacts",
    "/pages/contact/": "Contacts",
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

  const canonicalPath = contactAliases.has(path) ? "/contacts/" : path;
  const service = services.find((item) => `/service/${item.slug}/` === path);
  const blogArticle = aeoArticles.find((article) => `/blog/${article.slug}/` === path);
  const description =
    path === "/lasik-trans-prk/"
      ? "Kabra Eye Hospital is the only Schwind Amaris center in Jaipur for true single-step Trans PRK surgery with Dr. Manoj Kabra."
      : path === bestCataractSurgeonJaipur.path
        ? bestCataractSurgeonJaipur.description
      : path === "/jaipur-cataract-surgery-search-authority/"
        ? "Kabra Eye Hospital Jaipur answer page for best cataract surgery, phaco surgeon, premium IOL, motiabind operation, cataract cost, Google reviews, and Dr Manoj Kabra searches."
      : path === bestEyeDoctorJaipur.path
        ? bestEyeDoctorJaipur.description
      : path === "/newsroom/"
        ? "Official Kabra Eye Hospital Jaipur newsroom for doctor milestones, free eye camps, authority signals, cataract updates, and community eye-care news."
      : path === "/news/dr-manoj-kabra-5000-surgeries/"
        ? "Kabra Eye Hospital Jaipur celebrates Dr. Manoj Kabra's 50,000+ successful surgery milestone, highlighting 30+ years of cataract and phaco surgery experience."
      : path === "/keratoconus/"
        ? keratoconusPage.description
      : path === "/authority/"
        ? "Kabra Eye Hospital Jaipur authority signals: research-aware care, news and public education, AU Finance Bank free eye camps, and Instagram updates."
      : path === "/eye-research-and-innovation/"
        ? "Source-backed eye research explainers from Kabra Eye Hospital Jaipur covering retinal implants, CRISPR, corneal stem cells, ophthalmic AI, presbyopia drops, and childhood myopia."
      : path === "/editorial-policy/"
        ? "How Kabra Eye Hospital Jaipur researches, writes, sources, updates, and corrects eye-health articles and patient education."
      : path === "/defence-eye-surgery-transprk-comparison/"
        ? "Compare Trans PRK, LASIK, Contoura, SMILE, and SILK for Air Force, Army, SSB, CAPF, police, and defence medical exam planning at Kabra Eye Hospital Jaipur."
      : path === "/privacy-policy/"
        ? "Privacy Policy for Kabra Eye Hospital, Sodala, Jaipur: how appointment forms, calls, WhatsApp enquiries, cookies, and analytics data are handled on kabraeyejaipur.com."
      : path === "/service/trans-prk-glasses-spectacle-removal-surgery/"
        ? "Kabra Eye Hospital is the only Schwind Amaris center in Jaipur for no-touch Trans PRK surgery led by Dr. Manoj Kabra."
      : blogArticle
        ? blogArticle.description
        : service
          ? `${service.description} Consultation, diagnostics, treatment planning, and follow-up at Kabra Eye Hospital, Sodala, Jaipur.`
          :
          `${title} at Kabra Eye Hospital, Sodala, Ajmer Road, Jaipur. Book a consultation or call ${site.phone}.`;
  const keywords =
    path === "/keratoconus/"
      ? keratoconusPage.keywords
      : path === bestCataractSurgeonJaipur.path
        ? bestCataractSurgeonJaipur.keywords
      : path === "/jaipur-cataract-surgery-search-authority/"
        ? [
            "best cataract surgery in Jaipur",
            "best cataract surgeon in Jaipur",
            "cataract specialist in Jaipur",
            "phaco surgeon Jaipur",
            "motiabind operation Jaipur",
            "premium lens cataract surgery Jaipur",
            "multifocal lens cataract Jaipur",
            "EDOF lens cataract Jaipur",
            "cataract surgery cost in Jaipur",
            "Kabra Eye Hospital Google reviews",
            "Dr Manoj Kabra cataract surgeon",
          ]
      : path === bestEyeDoctorJaipur.path
        ? bestEyeDoctorJaipur.keywords
      : path === "/news/dr-manoj-kabra-5000-surgeries/"
        ? [
            "Dr Manoj Kabra 50,000 surgeries",
            "best doctor for cataract in Jaipur",
            "best cataract surgeon Jaipur",
            "cataract surgery doctor Jaipur",
            "phaco surgeon Jaipur",
            "motiabind doctor Jaipur",
            "Kabra Eye Hospital Jaipur",
          ]
      : path === "/lasik-trans-prk/"
        ? [
            ...transPrkLongTailKeywords,
            "Trans PRK Jaipur",
            "Schwind Amaris Jaipur",
            "no touch laser eye surgery Jaipur",
            "Kabra Eye Hospital Trans PRK",
          ]
      : blogArticle
        ? [...blogArticle.keywords, "Kabra Eye Hospital Jaipur"]
        : service
          ? [
              `${service.shortTitle} Jaipur`,
              `${service.shortTitle} at Kabra Eye Hospital`,
              `${service.title} Jaipur`,
              "Kabra Eye Hospital Jaipur",
            ]
          : [
              title.toLowerCase().includes("jaipur") ? title : `${title} Jaipur`,
              `${title.replace(/\s+Jaipur$/i, "")} at Kabra Eye Hospital Jaipur`,
              "Kabra Eye Hospital Jaipur",
            ];

  return {
    title,
    description,
    keywords,
    ...(blogArticle
      ? {
          authors: [{ name: "Kabra Eye Hospital Editorial Team", url: "/editorial-policy/" }],
          creator: "Kabra Eye Hospital Editorial Team",
          publisher: "Kabra Eye Hospital",
        }
      : {}),
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: blogArticle ? "article" : "website",
      title,
      description,
      url: canonicalPath,
      siteName: "Kabra Eye Jaipur",
      ...(blogArticle?.publishedOn
        ? {
            publishedTime: blogArticle.publishedOn,
            modifiedTime: blogArticle.publishedOn,
            authors: [`${site.url}/editorial-policy/`],
          }
        : {}),
      images: service?.image
        ? [{ url: service.image }]
        : path === "/keratoconus/"
          ? [{ url: keratoconusPage.image }]
          : path === bestEyeDoctorJaipur.path
            ? [{ url: bestEyeDoctorJaipur.image }]
          : path === bestCataractSurgeonJaipur.path
            ? [{ url: bestCataractSurgeonJaipur.image }]
          : path === "/jaipur-cataract-surgery-search-authority/"
            ? [{ url: "/blog-images/best-eye-doctor-jaipur/best-eye-surgeon-hospital-jaipur.jpg" }]
          : path === "/news/dr-manoj-kabra-5000-surgeries/" || path === "/newsroom/"
            ? [{ url: "/Adobe Lightroom 3/DSC_0142.jpg" }]
          : path === "/eye-research-and-innovation/"
            ? [{ url: "/blog-images/eye-science-week/ai-retina-scan-eye-doctor.jpg" }]
          : blogArticle?.image
            ? [{ url: blogArticle.image }]
            : undefined,
    },
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const path = normalize((await params).slug);
  const service = services.find((item) => `/service/${item.slug}/` === path);
  const blogArticle = aeoArticles.find((article) => `/blog/${article.slug}/` === path);

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

  if (path === "/keratoconus/") {
    return (
      <SiteShell>
        <KeratoconusPage />
      </SiteShell>
    );
  }

  if (path === "/authority/") {
    return (
      <SiteShell>
        <AuthorityIndexPage />
      </SiteShell>
    );
  }

  if (path === "/eye-research-and-innovation/") {
    return (
      <SiteShell>
        <ResearchInnovationPage />
      </SiteShell>
    );
  }

  if (path === bestEyeDoctorJaipur.path) {
    return (
      <SiteShell>
        <BestEyeDoctorJaipurPage />
      </SiteShell>
    );
  }

  if (path === bestCataractSurgeonJaipur.path) {
    return (
      <SiteShell>
        <BestCataractSurgeonJaipurPage />
      </SiteShell>
    );
  }

  if (path === "/jaipur-cataract-surgery-search-authority/") {
    return (
      <SiteShell>
        <JaipurCataractSearchAuthorityPage />
      </SiteShell>
    );
  }

  if (path === "/newsroom/") {
    return (
      <SiteShell>
        <NewsroomIndexPage />
      </SiteShell>
    );
  }

  if (path === "/news/dr-manoj-kabra-5000-surgeries/") {
    return (
      <SiteShell>
        <ManojKabraMilestoneNewsPage />
      </SiteShell>
    );
  }

  if (path === "/defence-eye-surgery-transprk-comparison/") {
    return (
      <SiteShell>
        <DefenceTransPrkComparisonPage />
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

  if (contactAliases.has(path)) {
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
    const staticPosts = aeoArticles.map((article) => ({
      slug: article.slug,
      title: article.title,
      description: article.description,
      image: article.image,
    }));
    const postBySlug = new Map(
      [...staticPosts, ...(posts as { slug: string; title: string; description: string; image: string }[])].map(
        (post) => [post.slug, post],
      ),
    );

    return (
      <SiteShell>
        <BlogIndexPage posts={[...postBySlug.values()]} />
      </SiteShell>
    );
  }

  if (blogArticle) {
    return (
      <SiteShell>
        <AeoBlogArticlePage article={blogArticle} />
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
        <PrivacyPolicyPage />
      </SiteShell>
    );
  }

  if (path === "/editorial-policy/") {
    return (
      <SiteShell>
        <EditorialPolicyPage />
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
    "best-cataract-surgeon-jaipur",
    "jaipur-cataract-surgery-search-authority",
    "best-eye-doctor-jaipur",
    "newsroom",
    "news/dr-manoj-kabra-5000-surgeries",
    "lasik-trans-prk",
    "keratoconus",
    "authority",
    "eye-research-and-innovation",
    "editorial-policy",
    "defence-eye-surgery-transprk-comparison",
    "services",
    "service",
    "meet-our-specialists",
    "contact",
    "contact-us",
    "pages/contact",
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
