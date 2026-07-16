import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  Eye,
  FileCheck2,
  GraduationCap,
  HelpCircle,
  Hospital,
  MapPin,
  Microscope,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TimerReset,
} from "lucide-react";
import { AppointmentForm } from "@/components/appointment-form";
import { AuthorityTrustSection, ContentTopicSection, InternalLinkHub } from "@/components/sections";
import { ServiceExplorer } from "@/components/service-explorer";
import { FaqSearch } from "@/components/faq-search";
import {
  aeoArticleSchemas,
  aeoArticles,
  type AeoArticle,
  doctorBio,
  medicalOrganizationSchema,
  physicianSchema,
  schwindAmarisDeviceSchema,
  transPrkComparison,
  transPrkEvidenceSources,
  transPrkFaqs,
  transPrkHeroParagraph,
  transPrkProcedureSchema,
  transPrkSchemas,
} from "@/data/aeo";
import {
  educationPrograms,
  empanelments,
  authorityHighlights,
  contentTopicGroups,
  services,
  site,
  specialists,
  type ContentTopicGroup,
} from "@/data/site";
import {
  keratoconusCareAtKabra,
  keratoconusDiagnosisSteps,
  keratoconusFaqs,
  keratoconusPage,
  keratoconusRiskSignals,
  keratoconusSchemas,
  keratoconusSources,
  keratoconusStats,
  keratoconusSymptoms,
  keratoconusTreatments,
} from "@/data/keratoconus";

const transPrkService =
  services.find((service) => service.slug === "trans-prk-glasses-spectacle-removal-surgery") ??
  services[0];

const iclService =
  services.find((service) => service.slug === "icl-ipcl-high-power-number-correction") ??
  services[1];

const visionBenefits = [
  {
    title: "Trans PRK",
    text: "Touch-free surface laser correction for suitable eyes. No corneal flap, no blade-based cut, and no incision.",
    icon: Sparkles,
  },
  {
    title: "LASIK counselling",
    text: "Patients comparing LASIK and Trans PRK get suitability-led counselling based on scans, dryness, lifestyle, and recovery needs.",
    icon: Eye,
  },
  {
    title: "Exam planning",
    text: "Useful for candidates where flapless correction matters, while final medical fitness criteria still depend on the exam authority.",
    icon: FileCheck2,
  },
  {
    title: "Eligibility first",
    text: "Corneal thickness, number stability, surface health, dry eye, and retina status are checked before advice.",
    icon: Microscope,
  },
];

const visionChecks = [
  "Stable glasses number",
  "Corneal thickness mapping",
  "Topography and surface scan",
  "Dry-eye assessment",
  "Retina check when required",
  "Doctor-confirmed suitability",
];

const visionSteps = [
  {
    title: "Detailed screening",
    text: "Refraction, corneal scans, eye pressure, dryness evaluation, and retina checks where needed.",
  },
  {
    title: "LASIK vs Trans PRK advice",
    text: "The doctor explains whether a flapless surface laser option, LASIK, ICL/IPCL, or no procedure is safer.",
  },
  {
    title: "Procedure planning",
    text: "Treatment is planned around your number, corneal profile, daily life, and expected healing pattern.",
  },
  {
    title: "Recovery and follow-up",
    text: "You receive medicines, precautions, recovery guidance, and follow-up checks as healing progresses.",
  },
];

const authoritySchemas = [
  physicianSchema,
  medicalOrganizationSchema,
  transPrkProcedureSchema,
  schwindAmarisDeviceSchema,
];

const pickTopicGroups = (slugs: string[]) =>
  slugs
    .map((slug) => contentTopicGroups.find((group) => group.slug === slug))
    .filter((group): group is ContentTopicGroup => Boolean(group));

export function ServicesIndexPage() {
  return (
    <>
      <section className="index-hero services-index-hero">
        <div>
          <span className="eyebrow">Specialty Clinics</span>
          <h1>Eye care services organized around real patient concerns.</h1>
          <p>
            Choose by symptom, treatment goal, or specialty. Every page keeps the current SEO URL
            but the experience is rebuilt for faster decisions.
          </p>
          <div className="index-actions">
            <a className="primary-button" href="#service-explorer">
              Explore Services
              <ArrowRight size={18} aria-hidden />
            </a>
            <a className="secondary-button" href="#appointment">
              Book Consultation
              <CalendarCheck size={18} aria-hidden />
            </a>
          </div>
        </div>
        <div className="clinic-summary">
          {services.slice(0, 5).map((service) => {
            const Icon = service.icon;
            return (
              <Link key={service.slug} href={`/service/${service.slug}/`}>
                <Icon size={20} aria-hidden />
                <span>{service.shortTitle}</span>
              </Link>
            );
          })}
        </div>
      </section>
      <ServiceExplorer />
      <AppointmentForm />
    </>
  );
}

export function LasikTransPrkPage() {
  return (
    <>
      <AeoJsonLd schemas={transPrkSchemas} />
      <section className="service-lab">
        <div className="service-lab-copy">
          <span className="eyebrow">LASIK & Trans PRK in Jaipur</span>
          <h1>Schwind Amaris Trans PRK surgery in Jaipur.</h1>
          <p>{transPrkHeroParagraph}</p>
          <div className="aeo-proof-points" aria-label="Schwind Amaris Trans PRK facts">
            <span>Only Schwind Amaris in Jaipur</span>
            <span>No-touch laser</span>
            <span>Peer doctor referrals</span>
          </div>
          <div className="service-lab-actions">
            <a className="primary-button" href="#appointment">
              Book Screening
              <CalendarCheck size={18} aria-hidden />
            </a>
            <Link className="secondary-button" href={`/service/${transPrkService.slug}/`}>
              Trans PRK Service Page
              <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
        <div className="service-lab-media">
          <Image
            src={transPrkService.image}
            alt="Trans PRK laser vision correction at Kabra Eye Hospital"
            width={880}
            height={620}
            priority
          />
          <div>
            <Sparkles size={30} aria-hidden />
            <span>Touch-free surface laser</span>
          </div>
        </div>
      </section>

      <section className="aeo-faq-section" id="trans-prk-faq">
        <div className="transprk-section-head">
          <span className="eyebrow">Trans PRK FAQ</span>
          <h2>Direct answers about Schwind Amaris and Trans PRK in Jaipur.</h2>
          <p>
            Kabra Eye Hospital is the only Schwind Amaris center in Jaipur for true single-step
            Trans PRK. These answers are written plainly for patients comparing laser eye surgery
            options in Rajasthan.
          </p>
        </div>
        <div className="aeo-faq-grid">
          {transPrkFaqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <ContentTopicSection
        groups={pickTopicGroups(["lasik-specs-removal"])}
        eyebrow="LASIK & Specs Removal Content"
        title="Topics patients search before choosing glasses removal."
        description="Use these as patient education posts, FAQs, reels, and comparison guides for LASIK, Trans PRK, SMILE, PRK, and specs-removal counselling."
      />

      <section className="proof-ledger" aria-label="Trans PRK highlights">
        <div>
          <strong>No flap</strong>
          <span>No corneal flap is created</span>
        </div>
        <div>
          <strong>No blade</strong>
          <span>Laser-based surface correction</span>
        </div>
        <div>
          <strong>No incision</strong>
          <span>Flapless treatment pathway</span>
        </div>
        <div>
          <strong>Tested first</strong>
          <span>Suitability decides the safest option</span>
        </div>
      </section>

      <section className="transprk-benefits" id="why-transprk">
        <div className="transprk-section-head">
          <span className="eyebrow">Compare Before You Choose</span>
          <h2>LASIK and Trans PRK are not one-size-fits-all treatments.</h2>
          <p>
            The best procedure depends on eye measurements, number stability, corneal shape,
            dryness, lifestyle needs, and recovery expectations. The goal is not to sell one
            technology to everyone; it is to choose the safest route for that patient.
          </p>
        </div>
        <div className="benefit-grid">
          {visionBenefits.map((benefit) => {
            const BenefitIcon = benefit.icon;
            return (
              <article key={benefit.title}>
                <BenefitIcon size={28} aria-hidden />
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="refractive-comparison" id="trans-prk-vs-contoura-smile">
        <div className="transprk-section-head">
          <span className="eyebrow">Trans PRK vs Contoura vs SMILE</span>
          <h2>Why Trans PRK can be preferable, without claiming it is best for every eye.</h2>
          <p>
            Trans PRK&apos;s clearest distinction is anatomical: it creates no LASIK flap and no
            SMILE-style corneal incision. That can make it a strong choice for suitable patients
            who prioritize a fully surface-based pathway, while accepting slower early recovery.
          </p>
        </div>
        <div className="refractive-table-wrap">
          <table>
            <caption>Evidence-balanced comparison of common glasses-removal procedures</caption>
            <thead>
              <tr>
                <th scope="col">Procedure</th>
                <th scope="col">How it works</th>
                <th scope="col">When it may fit</th>
                <th scope="col">Important trade-off</th>
              </tr>
            </thead>
            <tbody>
              {transPrkComparison.map((item) => (
                <tr key={item.procedure}>
                  <th scope="row">{item.procedure}</th>
                  <td>{item.howItWorks}</td>
                  <td>{item.whenItMayFit}</td>
                  <td>{item.tradeOff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="refractive-evidence-answer">
          <div>
            <strong>Evidence-based answer</strong>
            <p>
              Current comparative evidence does not show one procedure winning for every patient.
              A 2026 meta-analysis found no statistically significant overall difference in efficacy
              or predictability between Trans PRK and LASIK or SMILE. Kabra Eye Hospital therefore
              recommends from scans, eye health, lifestyle, recovery needs, and surgeon judgement.
            </p>
          </div>
          <nav aria-label="Refractive surgery evidence sources">
            {transPrkEvidenceSources.map((source) => (
              <a key={source.href} href={source.href} target="_blank" rel="noreferrer">
                {source.label}
                <ArrowRight size={15} aria-hidden />
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="fitness-panel" id="exam-fitness">
        <div>
          <span className="eyebrow">Exam & Fitness Candidates</span>
          <h2>Planning glasses removal before medical, defence, police, or fitness checks?</h2>
          <p>
            Many candidates ask about Trans PRK because it is flapless and incision-free. Exam rules
            can vary by authority, so patients should confirm the latest criteria and plan enough
            recovery time before a medical board or physical test.
          </p>
        </div>
        <div className="fitness-card">
          <FileCheck2 size={30} aria-hidden />
          <h3>Bring this for screening</h3>
          <ul>
            <li>Latest exam or department vision criteria, if available.</li>
            <li>Old and current glasses prescription records.</li>
            <li>Any past eye infection, injury, dryness, or contact lens history.</li>
            <li>Enough time buffer for healing and follow-up before final medical testing.</li>
          </ul>
        </div>
      </section>

      <section className="eligibility-section" id="eligibility">
        <div className="transprk-section-head">
          <span className="eyebrow">Eligibility Checklist</span>
          <h2>Specs removal should start with measurements, not assumptions.</h2>
          <p>
            A phone call can explain the process, but only a clinical screening can tell whether
            Trans PRK, LASIK, ICL/IPCL, or another approach is appropriate.
          </p>
        </div>
        <div className="eligibility-grid">
          {visionChecks.map((check) => (
            <span key={check}>
              <CheckCircle2 size={17} aria-hidden />
              {check}
            </span>
          ))}
        </div>
      </section>

      <section className="transprk-steps">
        <div className="steps-copy">
          <span className="eyebrow">Treatment Journey</span>
          <h2>From screening to follow-up, every step should be explained clearly.</h2>
          <p>
            Patients should know what is being tested, why a procedure is recommended, what recovery
            may feel like, and when follow-up is required.
          </p>
        </div>
        <div className="steps-list">
          {visionSteps.map((step, index) => (
            <article key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="comparison-band">
        <div>
          <span className="eyebrow">When Laser Is Not Ideal</span>
          <h2>High power patients may need ICL/IPCL counselling instead.</h2>
        </div>
        <div className="comparison-list">
          <p>
            <ShieldCheck size={18} aria-hidden />
            Trans PRK and LASIK depend on corneal suitability.
          </p>
          <p>
            <ClipboardCheck size={18} aria-hidden />
            ICL/IPCL may be discussed for selected high-power patients.
          </p>
          <p>
            <TimerReset size={18} aria-hidden />
            Recovery timelines differ by procedure and by patient.
          </p>
          <p>
            <ArrowRight size={18} aria-hidden />
            <Link href={`/service/${iclService.slug}/`}>Read about ICL/IPCL options</Link>
          </p>
        </div>
      </section>

      <AppointmentForm />
    </>
  );
}

export function AeoBlogArticlePage({ article }: { article: AeoArticle }) {
  const schemas = aeoArticleSchemas[aeoArticles.findIndex((item) => item.slug === article.slug)] ?? [];

  return (
    <>
      <AeoJsonLd schemas={[...authoritySchemas, ...schemas]} />
      <article className="aeo-blog-article">
        <header>
          <span className="eyebrow">Eye Health Guide</span>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <Link className="primary-button" href="/lasik-trans-prk/#appointment">
            Book Screening
            <ArrowRight size={18} aria-hidden />
          </Link>
        </header>
        <Image
          src={article.image}
          alt={article.title}
          width={1280}
          height={680}
          priority
        />
        {article.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
        <section className="article-faq-block">
          <h2>Quick Answers</h2>
          {article.faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </section>
        <footer>
          <p>{article.cta}</p>
          <a className="primary-button" href="#appointment">
            Book an appointment
            <CalendarCheck size={18} aria-hidden />
          </a>
        </footer>
      </article>
      <InternalLinkHub
        currentPath={`/blog/${article.slug}/`}
        title="Related Kabra Eye Hospital pages for this guide."
      />
      <AppointmentForm />
    </>
  );
}

export function SchwindBlogPage() {
  return <AeoBlogArticlePage article={aeoArticles[0]} />;
}

export function BlogIndexPage({ posts }: { posts: { slug: string; title: string; description: string; image: string }[] }) {
  return (
    <>
      <section className="blog-index-page">
        <div className="education-head">
          <span className="eyebrow">Eye Health Updates</span>
          <h1>Guides for Trans PRK, LASIK, ICL/IPCL, and glasses removal decisions.</h1>
          <p>
            AEO-focused patient education written in direct question-and-answer language for people
            comparing no-cut laser eye surgery, medical-fitness planning, and vision correction
            options in Jaipur.
          </p>
        </div>
        <div className="blog-card-grid">
          {posts.map((article) => (
            <Link href={`/blog/${article.slug}/`} key={article.slug}>
              <Image src={article.image} alt={article.title} width={720} height={420} />
              <div>
                <h3>{article.title}</h3>
                <span>
                  <ArrowRight size={18} aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <ContentTopicSection
        groups={pickTopicGroups(["viral-reel-topics", "interesting-eye-facts"])}
        eyebrow="Blog & Reel Ideas"
        title="Shareable eye-health topics for the content calendar."
        description="These hooks can support short blogs, reels, challenges, doctor-reaction posts, and awareness-led campaigns."
      />
    </>
  );
}

export function EyeDiseaseIndexPage() {
  return (
    <>
      <section className="utility-redesign">
        <BookOpen size={34} aria-hidden />
        <span className="eyebrow">Patient Education</span>
        <h1>Eye disease topics organized for clearer patient awareness.</h1>
        <p>
          Use these prompts to build simple explainers around symptoms, warning signs, dry eye,
          screen strain, children&apos;s eye health, and emergency eye conditions.
        </p>
        <div className="utility-actions">
          <Link className="primary-button" href="/services/">
            Browse Services
          </Link>
          <Link className="secondary-button" href="/contacts/">
            Contact Hospital
          </Link>
        </div>
      </section>
      <ContentTopicSection
        groups={pickTopicGroups([
          "eye-disease-topics",
          "dry-eye-digital-strain",
          "childrens-eye-health",
          "interesting-eye-facts",
          "viral-reel-topics",
        ])}
        eyebrow="Eye Disease Content"
        title="Awareness topics for eye disease, symptoms, and prevention."
        description="A ready content library for education pages, FAQs, social posts, reels, and clinic-specific awareness campaigns."
      />
      <AppointmentForm />
    </>
  );
}

export function KeratoconusPage() {
  return (
    <>
      <AeoJsonLd schemas={keratoconusSchemas} />
      <section className="keratoconus-hero">
        <div className="keratoconus-hero-copy">
          <span className="eyebrow">Keratoconus Cornea Care in Jaipur</span>
          <h1>Keratoconus symptoms, diagnosis, and treatment options.</h1>
          <p>{keratoconusPage.hero}</p>
          <div className="keratoconus-direct-answer">
            <strong>Direct answer</strong>
            <p>{keratoconusPage.directAnswer}</p>
          </div>
          <div className="service-lab-actions">
            <a className="primary-button" href="#appointment">
              Book Cornea Screening
              <CalendarCheck size={18} aria-hidden />
            </a>
            <Link className="secondary-button" href="/service/cornea-clinic/">
              Cornea Clinic
              <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
        <div className="keratoconus-hero-media">
          <Image
            src={keratoconusPage.image}
            alt="Cornea diagnostics and keratoconus screening at Kabra Eye Hospital Jaipur"
            width={980}
            height={720}
            priority
          />
          <div>
            <Microscope size={28} aria-hidden />
            <span>Corneal topography and doctor-led screening matter before any laser decision.</span>
          </div>
        </div>
      </section>

      <section className="keratoconus-stat-band" aria-label="Keratoconus care priorities">
        {keratoconusStats.map((stat) => (
          <div key={stat.value}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="keratoconus-section" id="symptoms">
        <div className="keratoconus-section-head">
          <span className="eyebrow">Warning Signs</span>
          <h2>Symptoms patients often mistake for a simple glasses-number problem.</h2>
          <p>
            Keratoconus can be missed when changing vision is treated only as routine spectacle
            power. Corneal mapping is important when symptoms and prescriptions keep changing.
          </p>
        </div>
        <div className="keratoconus-symptom-grid">
          {keratoconusSymptoms.map((symptom) => (
            <span key={symptom}>
              <CheckCircle2 size={17} aria-hidden />
              {symptom}
            </span>
          ))}
        </div>
      </section>

      <section className="keratoconus-split">
        <div>
          <span className="eyebrow">Who Needs Earlier Screening?</span>
          <h2>Eye rubbing, allergy, young age, and family history deserve attention.</h2>
          <p>
            Keratoconus decisions are time-sensitive because younger, progressing corneas may
            benefit from earlier stabilization. A cornea specialist can compare scans and decide
            whether observation, C3R/CXL, lenses, or another plan is appropriate.
          </p>
        </div>
        <div className="keratoconus-risk-list">
          {keratoconusRiskSignals.map((signal) => (
            <article key={signal.title}>
              <ShieldCheck size={22} aria-hidden />
              <h3>{signal.title}</h3>
              <p>{signal.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="keratoconus-section" id="diagnosis">
        <div className="keratoconus-section-head">
          <span className="eyebrow">Diagnosis</span>
          <h2>How keratoconus is checked at a cornea clinic.</h2>
          <p>
            Diagnosis is not based on symptoms alone. It combines refraction, corneal examination,
            corneal maps, thickness data, and progression history.
          </p>
        </div>
        <div className="keratoconus-step-grid">
          {keratoconusDiagnosisSteps.map((step, index) => (
            <article key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="keratoconus-kabra-care" id="keratoconus-treatment-jaipur">
        <div className="keratoconus-kabra-intro">
          <span className="eyebrow">Keratoconus at Kabra Eye Hospital</span>
          <h2>A complete keratoconus evaluation and treatment pathway in Jaipur.</h2>
          <p>{keratoconusCareAtKabra.directAnswer}</p>
          <div className="keratoconus-brand-answer">
            <strong>What is distinctive about Kabra?</strong>
            <p>{keratoconusCareAtKabra.distinction}</p>
          </div>
        </div>
        <div className="keratoconus-capability-list" aria-label="Keratoconus care capabilities">
          {keratoconusCareAtKabra.capabilities.map((capability) => (
            <span key={capability}>
              <CheckCircle2 size={18} aria-hidden />
              {capability}
            </span>
          ))}
        </div>
        <aside className="keratoconus-cost-panel" aria-label="Indicative keratoconus treatment cost">
          <ClipboardCheck size={28} aria-hidden />
          <span>Transparent Cost Guidance</span>
          <strong>{keratoconusCareAtKabra.cost.value}</strong>
          <h3>{keratoconusCareAtKabra.cost.label}</h3>
          <p>{keratoconusCareAtKabra.cost.note}</p>
          <a className="primary-button" href="#appointment">
            Request a Written Estimate
            <ArrowRight size={18} aria-hidden />
          </a>
        </aside>
      </section>

      <section className="keratoconus-treatment-section" id="treatment">
        <div className="keratoconus-section-head">
          <span className="eyebrow">Treatment Pathways</span>
          <h2>Treatment has two goals: stabilize the cornea and improve useful vision.</h2>
          <p>
            C3R/CXL is mainly used to slow or halt progression in suitable progressive eyes.
            Glasses, specialty lenses, and surgical options are selected according to vision,
            corneal shape, scarring, and stage.
          </p>
        </div>
        <div className="keratoconus-treatment-grid">
          {keratoconusTreatments.map((treatment) => (
            <article key={treatment.title}>
              <Stethoscope size={24} aria-hidden />
              <h3>{treatment.title}</h3>
              <p>{treatment.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="keratoconus-lasik-warning">
        <div>
          <Eye size={32} aria-hidden />
          <span className="eyebrow">Important for LASIK Candidates</span>
          <h2>Keratoconus screening should happen before any specs-removal plan.</h2>
        </div>
        <p>
          A patient with keratoconus or suspicious corneal thinning may not be a safe LASIK
          candidate. Corneal topography helps protect patients from choosing a procedure that could
          weaken an already unstable cornea.
        </p>
      </section>

      <section className="aeo-faq-section" id="keratoconus-faq">
        <div className="transprk-section-head">
          <span className="eyebrow">Keratoconus FAQ</span>
          <h2>Short answers for patients and AI search results.</h2>
          <p>
            These answers are written plainly so patients can decide when to seek a cornea
            consultation and what questions to ask.
          </p>
        </div>
        <div className="aeo-faq-grid">
          {keratoconusFaqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="keratoconus-sources" aria-label="Keratoconus research sources">
        <div>
          <span className="eyebrow">Research Sources</span>
          <h2>Medical references used for this patient guide.</h2>
          <p>
            This page is educational and does not replace an eye examination. Treatment suitability
            depends on clinical measurements and doctor advice.
          </p>
          <small>Page updated {keratoconusPage.updated}.</small>
        </div>
        <div>
          {keratoconusSources.map((source) => (
            <a key={source.href} href={source.href} target="_blank" rel="noreferrer">
              {source.label}
              <ArrowRight size={16} aria-hidden />
            </a>
          ))}
        </div>
      </section>

      <AppointmentForm />
    </>
  );
}

export function AboutIndexPage() {
  return (
    <>
      <AeoJsonLd schemas={authoritySchemas} />
      <section className="story-page">
        <div className="story-copy">
          <span className="eyebrow">About Kabra Eye Hospital</span>
          <h1>Long-standing Jaipur eye care, redesigned around clarity.</h1>
          <p>
            Kabra Eye Hospital, Sodala, Ajmer Road, Jaipur is a super-specialty eye centre led by
            Dr. Manoj Kabra, known for advanced diagnostics, counselling, surgery, and follow-up.
          </p>
          <div className="story-stats">
            <strong>35+</strong>
            <span>Years of care</span>
            <strong>100K+</strong>
            <span>Successful eye surgeries</span>
          </div>
        </div>
        <div className="trust-panel">
          <span>Since 1990</span>
          <h2>Built around diagnosis, counselling, surgery, and follow-up.</h2>
          <p>
            Kabra Eye Hospital combines clear services, visible doctors, insurance support, timing,
            location, diagnostics, treatment planning, and follow-up in one Jaipur eye hospital.
          </p>
          <Link href="/services/">
            Explore care pathways
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </section>
      <section className="about-team-feature">
        <div>
          <span className="eyebrow">Clinical Team</span>
          <h2>The people behind Kabra Eye Hospital&apos;s care journey.</h2>
          <p>
            Consultations, diagnostics, counselling, surgery support, insurance help, and follow-up
            are handled by a coordinated team so patients are not left guessing between steps.
          </p>
        </div>
        <Image
          src="/Adobe Lightroom 3/DSC_0090.jpg"
          alt="Kabra Eye Hospital clinical and support team"
          width={1200}
          height={800}
        />
      </section>
      <section className="doctor-authority-section" id="dr-manoj-kabra">
        <div>
          <span className="eyebrow">About Dr. Manoj Kabra</span>
          <h2>Authority for Schwind Amaris Trans PRK in Jaipur.</h2>
          <p>{doctorBio}</p>
        </div>
        <Image
          src="/DSC_0056.jpg"
          alt="Portrait of Dr. Vighnesh Kabra"
          width={3000}
          height={4496}
        />
      </section>
      <AuthorityTrustSection compact />
      <section className="mission-strip">
        <article>
          <ShieldCheck size={28} aria-hidden />
          <h2>Mission</h2>
          <p>
            Deliver quality patient care with safety, integrity, technology, and commitment to the
            people the hospital serves.
          </p>
        </article>
        <article>
          <Stethoscope size={28} aria-hidden />
          <h2>Care Model</h2>
          <p>
            Diagnosis, counselling, treatment planning, surgery where needed, and follow-up are
            presented as one connected pathway.
          </p>
        </article>
        <article>
          <CheckCircle2 size={28} aria-hidden />
          <h2>Trust</h2>
          <p>
            Patients can scan doctors, services, empanelments, timing, and appointment routes
            without digging through heavy pages.
          </p>
        </article>
      </section>
      <SpecialistsIndexPage compact />
      <EmpanelmentIndexPage compact />
    </>
  );
}

export function AuthorityIndexPage() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": `${site.url}/authority/#webpage`,
      url: `${site.url}/authority/`,
      name: "Kabra Eye Hospital Authority, Research, News and Free Eye Camps",
      description:
        "Authority signals for Kabra Eye Hospital Jaipur including research-aware care, public education, community eye camps, AU Finance Bank outreach, and Instagram updates.",
      isPartOf: {
        "@id": `${site.url}/#website`,
      },
      about: {
        "@id": `${site.url}/#medical-organization`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${site.url}/authority/#authority-signals`,
      itemListElement: authorityHighlights.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        description: item.description,
        url: item.href.startsWith("http") ? item.href : `${site.url}${item.href}`,
      })),
    },
  ];

  return (
    <>
      <AeoJsonLd schemas={schemas} />
      <section className="authority-page-hero">
        <div>
          <span className="eyebrow">Kabra Eye Hospital Authority</span>
          <h1>Research-aware eye care, public education, and free eye camps in Jaipur.</h1>
          <p>
            This page collects the trust signals patients and search engines look for: specialist
            leadership, academic orientation, media-ready patient education, community camps,
            insurance access, and the official Instagram channel.
          </p>
          <div className="authority-hero-actions">
            <a className="primary-button" href={site.instagram} target="_blank" rel="noreferrer">
              Follow @{site.instagramHandle}
              <ExternalLink size={18} aria-hidden />
            </a>
            <a className="secondary-button" href="#camps">
              Community Camps
              <ArrowRight size={18} aria-hidden />
            </a>
          </div>
        </div>
        <div className="authority-proof-panel">
          <strong>Since 1990</strong>
          <span>Specialist eye care in Sodala, Jaipur</span>
          <p>
            Use this page as the central internal link for research, news, social proof, and free
            camp authority around Kabra Eye Hospital.
          </p>
        </div>
      </section>

      <section className="authority-proof-sections">
        <article id="research">
          <span>01</span>
          <h2>Research papers and academic trust</h2>
          <p>
            Kabra Eye Hospital should use this section to display verified research papers,
            conference presentations, training credentials, and doctor-authored education. Add
            exact paper titles, journal names, DOI links, and author names here as they are
            available.
          </p>
        </article>
        <article id="media">
          <span>02</span>
          <h2>News channels and public awareness</h2>
          <p>
            Display verified news features, media mentions, interviews, eye-health awareness
            coverage, and doctor explainers. Each verified feature can later link to the original
            news page or video for stronger E-E-A-T.
          </p>
        </article>
        <article id="camps">
          <span>03</span>
          <h2>Free eye camps with AU Finance Bank and community partners</h2>
          <p>
            Kabra Eye Hospital has already conducted free eye-check camps and community screening
            work, including AU Finance Bank-associated outreach. This content builds local
            authority for searches around free eye camp in Jaipur, eye checkup camp Jaipur, and
            community eye care.
          </p>
        </article>
        <article id="instagram">
          <span>04</span>
          <h2>Instagram connected to the website</h2>
          <p>
            The official Instagram profile @{site.instagramHandle} is now connected across the
            website, structured data, footer, authority page, and SEO support links.
          </p>
          <a href={site.instagram} target="_blank" rel="noreferrer">
            Open Instagram
            <ExternalLink size={16} aria-hidden />
          </a>
        </article>
      </section>

      <AuthorityTrustSection compact />
      <InternalLinkHub currentPath="/authority/" title="Authority pages should pass relevance to core treatment pages." />
    </>
  );
}

export function SpecialistsIndexPage({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "specialist-page compact" : "specialist-page"}>
      <div className="specialist-head">
        <span className="eyebrow">Clinical Team</span>
        <h1>{compact ? "Specialist-led care." : "Meet the specialists behind the care pathways."}</h1>
        <p>
          A cleaner view of doctors connected with consultation, diagnosis, counselling, and
          procedure planning at Kabra Eye Hospital.
        </p>
      </div>
      <div className="specialist-board">
        {specialists.map((doctor, index) => (
          <article key={doctor.name}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <Image src={doctor.image} alt={doctor.name} width={420} height={420} />
            <div>
              <h2>{doctor.name}</h2>
              <p>{doctor.role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ContactIndexPage() {
  return (
    <>
      <section className="contact-redesign">
        <div>
          <span className="eyebrow">Contact & Visit</span>
          <h1>Book, call, or visit the Sodala hospital.</h1>
          <p>{site.address}</p>
          <div className="contact-actions">
            <a className="primary-button" href={site.phoneHref}>
              <Phone size={18} aria-hidden />
              {site.phone}
            </a>
            <a className="secondary-button" href={site.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
              <ArrowRight size={18} aria-hidden />
            </a>
          </div>
        </div>
        <div className="visit-card-stack">
          <article>
            <MapPin size={22} aria-hidden />
            <h2>Location</h2>
            <p>{site.address}</p>
          </article>
          <article>
            <CalendarCheck size={22} aria-hidden />
            <h2>Hours</h2>
            <p>{site.hours}</p>
          </article>
          <article>
            <Phone size={22} aria-hidden />
            <h2>Email</h2>
            <p>{site.email}</p>
            <p>{site.secondEmail}</p>
          </article>
        </div>
      </section>
      <AppointmentForm />
    </>
  );
}

export function EducationIndexPage() {
  return (
    <section className="education-redesign">
      <div className="education-head">
        <span className="eyebrow">Education & Training</span>
        <h1>Healthcare training connected to real clinical exposure.</h1>
        <p>
          Kabra Institute of Medical Sciences and DNB-linked programs are presented as distinct
          tracks, not another generic hospital content block.
        </p>
      </div>
      <div className="education-track-grid">
        {educationPrograms.map((program, index) => {
          const Icon = program.icon;
          return (
            <Link key={program.href} href={program.href}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Icon size={30} aria-hidden />
              <h2>{program.title}</h2>
              <p>{program.text}</p>
              <strong>
                Open Track
                <ArrowRight size={16} aria-hidden />
              </strong>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export async function FAQIndexPage() {
  const { getAllFaqs } = await import("@/lib/db");
  const faqs = await getAllFaqs();
  return (
    <section className="faq-redesign">
      <div className="faq-aside">
        <HelpCircle size={34} aria-hidden />
        <span className="eyebrow">Patient Help</span>
        <h1>Questions patients ask before visiting.</h1>
        <p>
          Search popular questions or browse answers. Click any question to expand.
        </p>
      </div>
      <FaqSearch initialFaqs={faqs as { id: number; question: string; answer: string; category: string; is_viral: boolean }[]} />
    </section>
  );
}

export function EmpanelmentIndexPage({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "empanelment-page compact" : "empanelment-page"}>
      <div>
        <span className="eyebrow">Insurance & TPA</span>
        <h1>{compact ? "Cashless support." : "Complete empanelment list."}</h1>
        <p>
          Kabra Eye Hospital is listed with government schemes, insurance partners, and TPAs.
          Eligibility and approval depend on the scheme or policy.
        </p>
      </div>
      <div className="empanelment-grid">
        {empanelments.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}

export function UtilityIndexPage({
  title,
  eyebrow,
  description,
  icon = "book",
}: {
  title: string;
  eyebrow: string;
  description: string;
  icon?: "book" | "hospital" | "graduation";
}) {
  const Icon = icon === "hospital" ? Hospital : icon === "graduation" ? GraduationCap : BookOpen;

  return (
    <section className="utility-redesign">
      <Icon size={34} aria-hidden />
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="utility-actions">
        <Link className="primary-button" href="/services/">
          Browse Services
        </Link>
        <Link className="secondary-button" href="/contacts/">
          Contact Hospital
        </Link>
      </div>
    </section>
  );
}

function AeoJsonLd({ schemas }: { schemas: unknown[] }) {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
