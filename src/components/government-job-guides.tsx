import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, ClipboardCheck, ExternalLink, FileSearch, MapPin } from "lucide-react";
import { governmentJobArticles, governmentJobChecklist, governmentJobGuides, governmentJobsHub, governmentJobsImage, governmentJobsUpdated, type GovernmentJobGuide } from "@/data/government-jobs";
import { site } from "@/data/site";
import { examEyeStandards, type ExamCategory } from "@/data/exam-eye-standards";
import { ExamStandardsSection, VisionGuideReference } from "./exam-eye-standards";
import styles from "./government-job-guides.module.css";

const hubTitle = "Government Job Eye Medical & LASIK Guide in Rajasthan";
const hubDescription = "Exam-wise eyesight standards for SSC CGL, CPO, GD, CAPF AC, Railway and Rajasthan Police: minimum vision, glasses, LASIK rules and other eye checks. Jaipur guide.";

export function governmentJobMetadata(guide?: GovernmentJobGuide): Metadata {
  const title = guide?.seoTitle ?? hubTitle;
  const description = guide?.description ?? hubDescription;
  const path = guide?.path ?? governmentJobsHub;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website", images: [{ url: governmentJobsImage, alt: "Refractive care at Kabra Eye Hospital Jaipur" }] },
    twitter: { card: "summary_large_image", title, description, images: [governmentJobsImage] },
  };
}

export function GovernmentJobsCallout() {
  return (
    <aside className={styles.callout} aria-label="Government job candidate guides">
      <ClipboardCheck size={30} aria-hidden />
      <div><strong>Preparing for a government job medical?</strong><p>Explore SSC, Railway, CRPF and Rajasthan Police eye requirements before planning surgery.</p></div>
      <Link href={governmentJobsHub}>Find your job guide <ArrowRight size={18} aria-hidden /></Link>
    </aside>
  );
}

export function GovernmentJobPage({ guide }: { guide?: GovernmentJobGuide }) {
  const path = guide?.path ?? governmentJobsHub;
  const title = guide?.title ?? "Government job exams and eye medical standards for Rajasthan candidates.";
  const answer = guide?.answer ?? "Find the exams conducted for SSC, CAPF, Railway and Rajasthan Police recruitment, the posts they lead to, and their published eye criteria. Compare minimum distance and near vision, glasses permission, surgery rules and other eye checks. Use the named notice for your entry before planning LASIK or Trans PRK in Jaipur.";
  const exams = examEyeStandards.filter((exam) => !guide || exam.categories.includes(guide.label as ExamCategory));
  const sources = [...new Map([...(guide?.sources ?? []), ...exams.flatMap((exam) => exam.sources)].map((source) => [source.href, source])).values()];
  const faqs = guide?.faqs ?? [
    { question: "Which is the best LASIK for government jobs in Rajasthan?", answer: "No single operation is best or accepted for every government job. First check whether your post permits refractive surgery. If it does, an ophthalmologist can assess your eyes and discuss suitable options, recovery and timing." },
    { question: "Can Kabra Eye Hospital guarantee medical clearance?", answer: "No. The hospital can examine your eyes, discuss clinical options and provide examination records. The designated recruitment medical board decides fitness under the applicable rules." },
    { question: "Can I consult Dr. Vighnesh Kabra before selecting a procedure?", answer: "Yes. Bring your recruitment notice, selected post, old prescriptions and any previous surgery records to a refractive consultation at Kabra Eye Hospital, Sodala, Jaipur." },
  ];
  const breadcrumbs = [
    { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
    { "@type": "ListItem", position: 2, name: "Government job eye medical", item: `${site.url}${governmentJobsHub}` },
    ...(guide ? [{ "@type": "ListItem", position: 3, name: guide.label, item: `${site.url}${path}` }] : []),
  ];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "MedicalWebPage", "@id": `${site.url}${path}#page`, url: `${site.url}${path}`, name: guide?.seoTitle ?? hubTitle, description: guide?.description ?? hubDescription, dateModified: governmentJobsUpdated, inLanguage: "en-IN", audience: { "@type": "Audience", audienceType: "Government job candidates in Rajasthan" }, publisher: { "@id": `${site.url}/#medical-organization` }, primaryImageOfPage: { "@type": "ImageObject", url: encodeURI(`${site.url}${governmentJobsImage}`) }, citation: sources.map((source) => source.href), ...(!guide ? { hasPart: governmentJobGuides.map((item) => ({ "@type": "MedicalWebPage", url: `${site.url}${item.path}`, name: item.seoTitle })) } : {}) },
      { "@type": "BreadcrumbList", itemListElement: breadcrumbs },
      { "@type": "FAQPage", "@id": `${site.url}${path}#faq`, mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
    ],
  };
  const articles = governmentJobArticles.filter((article) => !guide || guide.articleSlugs.includes(article.slug));

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span>{guide ? <><Link href={governmentJobsHub}>Government job eye medical</Link><span>/</span><span aria-current="page">{guide.label}</span></> : <span aria-current="page">Government job eye medical</span>}</nav>
      <header className={styles.hero}>
        <div><span className={styles.eyebrow}>Jaipur · Rajasthan · Candidate guide</span><h1>{title}</h1><p className={styles.answer}>{answer}</p><div className={styles.actions}><a className={styles.primary} href="#choose-guide">{guide ? "Check your post" : "Choose your job category"}<ArrowRight size={18} aria-hidden /></a><Link className={styles.secondary} href="/contacts/#appointment">Book an eye assessment</Link></div><p className={styles.date}>By Kabra Eye Hospital Editorial Team · Updated <time dateTime={governmentJobsUpdated}>15 October 2026</time></p></div>
        <figure><Image src={governmentJobsImage} alt="Refractive eye care equipment at Kabra Eye Hospital, Jaipur" width={860} height={760} priority /><figcaption><MapPin size={17} aria-hidden /> Sodala, Ajmer Road, Jaipur</figcaption></figure>
      </header>

      <section id="choose-guide" className={styles.section}>
        <span className={styles.eyebrow}>{guide ? "Post-wise starting point" : "Find your recruitment route"}</span>
        <h2>{guide ? `${guide.label}: which rule applies to you?` : "Choose the job you are preparing for."}</h2>
        {guide ? <div className={styles.tableWrap} role="region" aria-label={`${guide.label} recruitment guidance`} tabIndex={0}><table><caption>Identify your post, then open its official source. This is not a fitness certificate.</caption><thead><tr><th scope="col">Post or route</th><th scope="col">What to know</th><th scope="col">Next step</th></tr></thead><tbody>{guide.rows.map((row) => <tr key={row.role}><th scope="row">{row.role}</th><td data-label="What to know">{row.position}</td><td data-label="Next step">{row.nextStep}<a href={row.source.href} target="_blank" rel="noreferrer">Official source <ExternalLink size={14} aria-hidden /></a></td></tr>)}</tbody></table></div> : <div className={styles.cards}>{governmentJobGuides.map((item, index) => <Link className={styles.card} href={item.path} key={item.path}><span className={styles.number}>0{index + 1}</span><h3>{item.label}</h3><p>{item.description}</p><span className={styles.cardLink}>Read the guide <ArrowRight size={18} aria-hidden /></span></Link>)}</div>}
      </section>

      <aside className={styles.notice}><FileSearch size={28} aria-hidden /><div><h2>{guide ? "Source scope and verification" : "Know the rule before choosing a laser."}</h2><p>{guide?.notice ?? "A procedure can be clinically suitable and still be incompatible with a recruitment rule. These guides distinguish confirmed restrictions from questions that need official clarification. The notice and medical board for your exact post remain decisive."}</p><p>Check for later notices and corrigenda before acting.</p></div></aside>

      <nav className={styles.examNav} aria-label="Guide contents"><a href="#exam-standards">Exams and minimum vision</a><a href="#understand-vision">Read your eye report</a><a href="#other-eye-conditions">Other eye conditions</a><a href="#medical-review">Medical review checklist</a></nav>
      <ExamStandardsSection category={guide?.label as ExamCategory | undefined} />
      <VisionGuideReference />

      {guide ? <div className={styles.editorial}>{guide.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}</div> : <section className={styles.section}><span className={styles.eyebrow}>A practical decision path</span><h2>Three checks before a treatment decision.</h2><ol className={styles.steps}><li><span>01</span><h3>Identify the rule</h3><p>Exact post, recruitment year, medical category and latest amendments.</p></li><li><span>02</span><h3>Understand your eyes</h3><p>Bring your prescription history and have an ophthalmologist assess your vision and eye health.</p></li><li><span>03</span><h3>Discuss the options</h3><p>If the rules permit surgery, compare clinical suitability, timing, recovery and follow-up.</p></li></ol></section>}

      <section className={`${styles.section} ${styles.consultation}`}><div><span className={styles.eyebrow}>Prepare for your Jaipur visit</span><h2>Bring your documents, not just your glasses number.</h2><ul className={styles.checklist}>{governmentJobChecklist.map((item) => <li key={item}><ClipboardCheck size={20} aria-hidden />{item}</li>)}</ul></div><aside className={styles.doctor}><Image src="/doctor-portraits/vighnesh-kabra.jpeg" alt="Dr. Vighnesh Kabra, refractive surgeon at Kabra Eye Hospital" width={160} height={180} /><h3>Dr. Vighnesh Kabra</h3><p>Refractive surgeon at Kabra Eye Hospital, Jaipur. Discuss your eye findings, clinical options and recruitment documents in a consultation.</p><Link className={styles.primary} href="/contacts/#appointment">Arrange an assessment <ArrowRight size={18} aria-hidden /></Link><p className={styles.small}>The hospital does not issue recruitment clearance.</p></aside></section>

      <section className={styles.section}><span className={styles.eyebrow}>Explore clinical options</span><h2>Procedure information for your consultation.</h2><p>Read these alongside your recruitment guide. A procedure name or technology brand does not establish job eligibility.</p><div className={styles.procedures}><Link href="/lasik-trans-prk/"><h3>LASIK & Trans PRK</h3><p>Understand screening, surface laser treatment and recovery questions.</p><ArrowRight size={20} aria-hidden /></Link><Link href="/schwind-atos-smartsight-jaipur/"><h3>SCHWIND ATOS SmartSight</h3><p>Explore the hospital&apos;s lenticule extraction technology and suitability assessment.</p><ArrowRight size={20} aria-hidden /></Link><Link href="/defence-eye-surgery-transprk-comparison/"><h3>Army & defence planning</h3><p>Continue to our existing defence procedure comparison guide.</p><ArrowRight size={20} aria-hidden /></Link></div></section>

      {articles.length > 0 && <section className={styles.section}><span className={styles.eyebrow}>Read further</span><h2>Questions candidates ask before their medical.</h2><div className={styles.articles}>{articles.map((article) => <Link href={`/blog/${article.slug}/`} key={article.slug}><BookOpen size={23} aria-hidden /><div><h3>{article.title}</h3><p>{article.description}</p></div><ArrowRight size={20} aria-hidden /></Link>)}</div></section>}

      <section className={styles.section} id="faq"><h2>Common questions</h2><div className={styles.faqs}>{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
      <section className={`${styles.section} ${styles.sources}`}><h2>Official sources for this guide</h2><p>Source check: 15 October 2026. Document dates and limitations are identified above. A listed source is not an endorsement of surgery or of this hospital. Some older Railway PDF addresses may move; use the official RRB portal if a source link redirects.</p><ul>{sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label}<ExternalLink size={16} aria-hidden /></a></li>)}</ul></section>
      {guide && <nav className={styles.related} aria-label="Other government job guides"><Link href={governmentJobsHub}>All job categories</Link>{governmentJobGuides.filter((item) => item.path !== guide.path).map((item) => <Link href={item.path} key={item.path}>{item.label}<ArrowRight size={16} aria-hidden /></Link>)}</nav>}
    </div>
  );
}
