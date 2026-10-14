import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ExternalLink,
  Eye,
  FileCheck2,
  IndianRupee,
  Layers3,
  MapPin,
  ScanLine,
  ShieldCheck,
  Sparkles,
  TimerReset,
} from "lucide-react";
import { AppointmentForm } from "@/components/appointment-form";
import { site } from "@/data/site";

type ComparisonRow = {
  option: string;
  platform: string;
  method: string;
  access: string;
  distinction: string;
};

const comparisonRows: ComparisonRow[] = [
  {
    option: "SCHWIND SmartSight",
    platform: "SCHWIND ATOS",
    method: "Femtosecond-laser lenticule extraction",
    access: "No LASIK flap; lenticule removed through a small peripheral opening",
    distinction: "Pupil recognition, eye tracking, and cyclotorsion compensation on the ATOS platform",
  },
  {
    option: "ZEISS SMILE Pro",
    platform: "ZEISS VISUMAX 800",
    method: "Femtosecond-laser lenticule extraction",
    access: "No LASIK flap; lenticule removed through a small opening",
    distinction: "A different branded platform with its own centration, cyclotorsion, and workflow features",
  },
  {
    option: "Alcon WaveLight Plus",
    platform: "WaveLight excimer ecosystem",
    method: "Ray-tracing personalised LASIK ablation",
    access: "LASIK flap followed by excimer-laser reshaping",
    distinction: "A personalised LASIK pathway, not a small-incision lenticule procedure",
  },
  {
    option: "SCHWIND CustomEyes",
    platform: "SCHWIND AMARIS with compatible diagnostics",
    method: "Personalised wavefront-guided excimer-laser treatment profile",
    access: "The treatment profile and the corneal access method are planned separately",
    distinction: "Designed around high-resolution diagnostic data and individual optical irregularities",
  },
];

const atosFaqs = [
  {
    question: "Does Kabra Eye Hospital have SCHWIND ATOS in Jaipur?",
    answer:
      "Yes. Kabra Eye Hospital has Rajasthan's first SCHWIND ATOS in Jaipur. Dr. Vighnesh Kabra performs SCHWIND ATOS procedures for suitable patients after complete refractive screening.",
  },
  {
    question: "Is SmartSight the same as SMILE Pro?",
    answer:
      "They are in the same broad category of flap-free, small-incision lenticule extraction, but they are different branded procedures on different platforms. SmartSight uses SCHWIND ATOS; SMILE Pro uses ZEISS VISUMAX 800.",
  },
  {
    question: "What is SmartSight NOVA on SCHWIND ATOS?",
    answer:
      "SmartSight NOVA is SCHWIND's advanced lenticule-extraction workflow for ATOS. It adds CenTrax-assisted centration and eye tracking, diagnostic-data import, static cyclotorsion compensation, line-of-sight centration, docking guidance, and other workflow features. Availability of a specific workflow is confirmed during consultation.",
  },
  {
    question: "What do CenTrax and cyclotorsion compensation do?",
    answer:
      "CenTrax is SCHWIND ATOS's active centration and eye-tracking system. It recognises pupil movement during docking and compensates residual docking error. Static cyclotorsion compensation helps account for rotational eye-position differences using imported diagnostic data. These features support alignment; they do not guarantee perfect vision or eliminate all higher-order aberrations.",
  },
  {
    question: "How fast is recovery after SmartSight?",
    answer:
      "SmartSight is designed for early visual recovery through a small incision without a LASIK flap, and published studies report strong early outcomes. Recovery speed, comfort, dryness, and final clarity still vary by eye. Dr. Vighnesh Kabra provides individual return-to-work, driving, exercise, and follow-up guidance after examination and surgery.",
  },
  {
    question: "Is SCHWIND ATOS better than SMILE Pro?",
    answer:
      "No machine is automatically better for every eye. The useful comparison includes prescription, corneal shape and thickness, dryness, centration, astigmatism, surgeon experience, recovery priorities, and enhancement planning.",
  },
  {
    question: "How is Alcon WaveLight Plus different from SmartSight?",
    answer:
      "WaveLight Plus is a personalised LASIK treatment using ray-tracing planning and excimer-laser ablation after flap creation. SmartSight is a lenticule-extraction procedure performed with SCHWIND ATOS without a LASIK flap.",
  },
  {
    question: "Who performs SCHWIND ATOS surgery at Kabra Eye Hospital?",
    answer:
      "Dr. Vighnesh Kabra, refractive surgeon at Kabra Eye Hospital, performs SCHWIND ATOS procedures and leads the scan-based discussion of SmartSight, CustomEyes, TransPRK, LASIK, ICL, and IPCL options.",
  },
  {
    question: "Can SmartSight be a cost-effective alternative to SMILE Pro in Jaipur?",
    answer:
      "It can be a cost-effective option for a suitable eye, but value should be compared using the complete written package: screening, surgeon, medicines, follow-up, enhancement policy, and the exact procedure. Kabra Eye Hospital confirms current SmartSight pricing after refractive screening.",
  },
  {
    question: "Did SCHWIND ATOS receive an innovation award?",
    answer:
      "Yes. SCHWIND ATOS received the German Innovation Award 2021 in the medical-technologies category. An award supports the platform's innovation story, but it does not make one procedure best for every patient.",
  },
];

const customEyesFaqs = [
  {
    question: "What is CustomEyes with SCHWIND AMARIS?",
    answer:
      "CustomEyes is SCHWIND's personalised laser-vision pathway. Compatible high-resolution diagnostics provide corneal or whole-eye optical data that can be used to build an individualised AMARIS excimer-laser treatment profile.",
  },
  {
    question: "Is CustomEyes performed with SCHWIND ATOS?",
    answer:
      "CustomEyes is associated with SCHWIND AMARIS personalised excimer treatment. SmartSight is the lenticule-extraction procedure performed with SCHWIND ATOS. Kabra Eye Hospital has both platforms within its refractive programme.",
  },
  {
    question: "Is CustomEyes the same as Contoura or WaveLight Plus?",
    answer:
      "All are personalised-treatment concepts, but their diagnostics, planning algorithms, supported treatment profiles, and laser ecosystems differ. A brand-to-brand comparison cannot replace corneal and ocular measurements.",
  },
  {
    question: "Who plans CustomEyes treatment at Kabra Eye Hospital?",
    answer:
      "Dr. Vighnesh Kabra leads personalised refractive planning at Kabra Eye Hospital. He reviews the diagnostic data and explains whether CustomEyes, SmartSight, TransPRK, LASIK, ICL, IPCL, or no surgery is the appropriate route.",
  },
  {
    question: "Where is CustomEyes available in Jaipur or Rajasthan?",
    answer:
      "Kabra Eye Hospital in Sodala, Jaipur offers CustomEyes planning within its SCHWIND AMARIS refractive programme. Eligibility and the final treatment pathway are confirmed only after detailed corneal and ocular measurements.",
  },
  {
    question: "How much does CustomEyes cost in Jaipur?",
    answer:
      "CustomEyes cost depends on the diagnostic work-up, personalised treatment profile, surgical pathway, medicines, and follow-up. Kabra Eye Hospital provides the current written estimate after screening rather than advertising one price for every eye.",
  },
];

const technologySources = [
  {
    label: "SCHWIND: SmartSight with SCHWIND ATOS",
    href: "https://www.eye-tech-solutions.com/smartsight",
  },
  {
    label: "SCHWIND: SmartSight NOVA and CenTrax",
    href: "https://www.eye-tech-solutions.com/en/products/technologies/smartsight-nova",
  },
  {
    label: "SCHWIND: CustomEyes with SCHWIND AMARIS",
    href: "https://www.eye-tech-solutions.com/en/products/technologies/customeyes",
  },
  {
    label: "SCHWIND: German Innovation Award 2021 for ATOS",
    href: "https://www.eye-tech-solutions.com/en/infocenter/press/schwind-atos-german-innovation-award-2021",
  },
  {
    label: "ZEISS: VISUMAX 800 and SMILE Pro",
    href: "https://www.zeiss.com/meditec/en/products/refractive-lasers/femtosecond-laser-solutions/zeiss-visumax-800.html",
  },
  {
    label: "Alcon: WaveLight Plus personalised LASIK",
    href: "https://www.alcon.com/media-release/alcon-announces-first-fully-personalized-lasik-treatment-wavelight-plus-us-and-canada/",
  },
  {
    label: "Peer-reviewed 12-month SmartSight outcomes",
    href: "https://pubmed.ncbi.nlm.nih.gov/34949535/",
  },
  {
    label: "Peer-reviewed SmartSight centration and cyclotorsion outcomes",
    href: "https://pubmed.ncbi.nlm.nih.gov/38190561/",
  },
];

function RefractiveSchemas({
  path,
  name,
  description,
  faqs,
  variant,
}: {
  path: string;
  name: string;
  description: string;
  faqs: Array<{ question: string; answer: string }>;
  variant: "atos" | "customeyes";
}) {
  const isAtos = variant === "atos";
  const pageUrl = `${site.url}${path}`;
  const physicianId = `${site.url}/meet-our-specialists/#dr-vighnesh-kabra`;
  const procedureId = `${pageUrl}#procedure`;
  const deviceId = `${pageUrl}#device`;
  const technologyName = isAtos ? "SCHWIND ATOS" : "SCHWIND AMARIS";
  const officialTechnologyUrl = isAtos
    ? "https://www.eye-tech-solutions.com/smartsight"
    : "https://www.eye-tech-solutions.com/en/products/technologies/customeyes";
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "@id": `${pageUrl}#webpage`,
      name,
      description,
      url: pageUrl,
      inLanguage: "en-IN",
      datePublished: "2026-10-14",
      dateModified: "2026-10-14",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${site.url}/doctor-portraits/vighnesh-kabra.jpeg`,
      },
      about: [{ "@id": procedureId }, { "@id": deviceId }],
      mainEntity: { "@id": procedureId },
      reviewedBy: { "@id": physicianId },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    },
    {
      "@context": "https://schema.org",
      "@type": "MedicalProcedure",
      "@id": procedureId,
      name,
      alternateName: isAtos
        ? ["SmartSight", "SmartSight NOVA", "SmartSight surgery", "Small-incision lenticule extraction with SCHWIND ATOS"]
        : ["SCHWIND CustomEyes", "CustomEyes personalised laser vision correction"],
      description,
      medicalSpecialty: "Ophthalmology",
      procedureType: isAtos
        ? "Small-incision lenticule extraction refractive surgery"
        : "Personalised excimer-laser refractive treatment",
      bodyLocation: "Cornea",
      howPerformed: isAtos
        ? "The SCHWIND ATOS femtosecond laser creates a planned corneal lenticule that the surgeon removes through a small peripheral opening without creating a LASIK flap."
        : "Compatible diagnostic data is reviewed to build an individualised treatment profile delivered through the SCHWIND AMARIS excimer-laser ecosystem when clinically appropriate.",
      preparation:
        "Stable refraction, corneal tomography and thickness, dry-eye evaluation, pupil assessment, eye pressure, and retina review where indicated are completed before treatment selection.",
      followup:
        "The surgeon explains medicines, precautions, recovery expectations, warning symptoms, and the required follow-up schedule.",
      url: pageUrl,
      performer: { "@id": physicianId },
      provider: {
        "@type": "MedicalOrganization",
        "@id": `${site.url}/#medical-organization`,
        name: site.name,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Physician",
      "@id": physicianId,
      name: "Dr. Vighnesh Kabra",
      description:
        "Dr. Vighnesh Kabra is the refractive surgeon at Kabra Eye Hospital who performs SCHWIND ATOS procedures and leads CustomEyes, TransPRK, LASIK, ICL, and IPCL suitability planning.",
      url: `${site.url}/meet-our-specialists/`,
      image: `${site.url}/doctor-portraits/vighnesh-kabra.jpeg`,
      telephone: site.phone,
      medicalSpecialty: ["Ophthalmology", "Refractive Surgery"],
      knowsAbout: [
        "SCHWIND ATOS SmartSight",
        "SCHWIND CustomEyes",
        "SCHWIND AMARIS TransPRK",
        "LASIK suitability",
        "ICL and IPCL planning",
      ],
      areaServed: ["Jaipur", "Rajasthan"],
      worksFor: {
        "@type": "MedicalOrganization",
        "@id": `${site.url}/#medical-organization`,
        name: site.name,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "MedicalDevice",
      "@id": deviceId,
      name: technologyName,
      description: isAtos
        ? "SCHWIND ATOS is the femtosecond-laser platform used for SmartSight and SmartSight NOVA lenticule extraction. SmartSight NOVA adds CenTrax-assisted centration and eye tracking. Kabra Eye Hospital has Rajasthan's first SCHWIND ATOS."
        : "SCHWIND AMARIS is the excimer-laser ecosystem used for personalised CustomEyes treatment profiles at Kabra Eye Hospital.",
      category: isAtos
        ? "Femtosecond laser for refractive eye surgery"
        : "Excimer laser for personalised refractive eye surgery",
      manufacturer: {
        "@type": "Organization",
        name: "SCHWIND eye-tech-solutions",
        url: "https://www.eye-tech-solutions.com/",
      },
      sameAs: officialTechnologyUrl,
      usedFor: { "@id": procedureId },
      availableAtOrFrom: {
        "@type": "MedicalOrganization",
        "@id": `${site.url}/#medical-organization`,
        name: site.name,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${site.url}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Refractive Surgery",
          item: `${site.url}/lasik-trans-prk/`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name,
          item: pageUrl,
        },
      ],
    },
  ];

  return schemas.map((schema, index) => (
    <script
      key={index}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  ));
}

function TechnologyBreadcrumb({ current }: { current: string }) {
  return (
    <nav className="refractive-breadcrumb" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      <span aria-hidden>/</span>
      <Link href="/lasik-trans-prk/">Refractive Surgery</Link>
      <span aria-hidden>/</span>
      <span aria-current="page">{current}</span>
    </nav>
  );
}

function TechnologyHero({ variant }: { variant: "atos" | "customeyes" }) {
  const isAtos = variant === "atos";

  return (
    <section className="refractive-tech-hero">
      <div className="refractive-tech-copy">
        <span>{isAtos ? "Rajasthan's First SCHWIND ATOS" : "Personalised Vision with SCHWIND AMARIS"}</span>
        <h1>
          {isAtos
            ? "SCHWIND ATOS SmartSight in Jaipur with Dr. Vighnesh Kabra."
            : "CustomEyes in Jaipur with Dr. Vighnesh Kabra."}
        </h1>
        <p>
          {isAtos
            ? "Kabra Eye Hospital has Rajasthan's first SCHWIND ATOS. Dr. Vighnesh Kabra performs ATOS procedures and helps patients compare SmartSight with SMILE Pro, Alcon WaveLight Plus, CustomEyes, TransPRK, LASIK, ICL, and IPCL."
            : "CustomEyes with SCHWIND AMARIS uses detailed diagnostic data to personalise laser-vision planning. Dr. Vighnesh Kabra leads the examination, procedure selection, treatment planning, and follow-up at Kabra Eye Hospital."}
        </p>
        <div className="refractive-tech-proof" aria-label="Technology and surgeon highlights">
          <span><ShieldCheck size={17} aria-hidden />Dr. Vighnesh Kabra</span>
          <span><ScanLine size={17} aria-hidden />Scan-led planning</span>
          <span><Eye size={17} aria-hidden />Suitability before surgery</span>
        </div>
        <div className="hero-actions">
          <a className="primary-button" href="#appointment">
            Book Refractive Screening
            <CalendarCheck size={18} aria-hidden />
          </a>
          <Link
            className="secondary-button"
            href={isAtos ? "/customeyes-schwind-amaris-jaipur/" : "/schwind-atos-smartsight-jaipur/"}
          >
            {isAtos ? "Explore CustomEyes" : "Explore SCHWIND ATOS"}
            <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </div>
      <figure className="refractive-surgeon-hero">
        <Image
          src="/doctor-portraits/vighnesh-kabra.jpeg"
          alt="Dr. Vighnesh Kabra, SCHWIND ATOS and refractive surgeon at Kabra Eye Hospital Jaipur"
          width={1067}
          height={1600}
          priority
        />
        <figcaption>
          <span>Refractive Surgeon</span>
          <strong>Dr. Vighnesh Kabra</strong>
          <p>{isAtos ? "Performing SCHWIND ATOS procedures at Kabra Eye Hospital" : "Leading CustomEyes personalised treatment planning"}</p>
        </figcaption>
      </figure>
    </section>
  );
}

function AtosTechnologyHighlights() {
  const highlights = [
    {
      icon: Layers3,
      number: "01",
      title: "SmartSight / SmartSight NOVA",
      text: "A flap-free, minimally invasive lenticule-extraction procedure on SCHWIND ATOS for eligible patients with myopia and myopic astigmatism. The laser creates a precise corneal lenticule; the surgeon removes it through a small peripheral opening.",
      note: "No LASIK flap is created.",
    },
    {
      icon: ScanLine,
      number: "02",
      title: "CenTrax centration & eye tracking",
      text: "SmartSight NOVA adds CenTrax-assisted docking, active centration, line-of-sight alignment, static cyclotorsion compensation, and residual docking-error compensation using the connected SCHWIND diagnostic workflow.",
      note: "Designed to support precise treatment alignment.",
    },
    {
      icon: TimerReset,
      number: "03",
      title: "Comfort-led, early recovery pathway",
      text: "The small-incision, flap-free approach is designed around comfortable patient care and early visual recovery. Published studies report strong early outcomes, but recovery speed and final clarity remain individual—not guaranteed by a machine name.",
      note: "Your personal recovery plan comes from your surgeon.",
    },
  ];

  return (
    <section className="atos-technology-story" aria-labelledby="atos-technology-highlights">
      <div className="section-heading">
        <span>Key Technology Highlights</span>
        <h2 id="atos-technology-highlights">What makes SmartSight NOVA on SCHWIND ATOS different?</h2>
        <p>
          SmartSight is not simply another name for SMILE Pro. It is SCHWIND&apos;s own flap-free
          lenticule-extraction pathway, with a distinct laser platform, planning workflow, and
          centration technology.
        </p>
      </div>

      <figure className="atos-technology-visual">
        <Image
          src="/blog-images/schwind-atos-smartsight-centration-illustration.png"
          alt="Medical illustration of SmartSight flap-free lenticule extraction and CenTrax-style visual-axis centration"
          width={1672}
          height={941}
          sizes="(max-width: 900px) 100vw, 88vw"
        />
        <figcaption>
          <span>Illustrated procedure concept</span>
          <p>
            Centration, lenticule creation, and removal through a small opening. This is an
            educational illustration, not a photograph of the ATOS device.
          </p>
        </figcaption>
      </figure>

      <div className="atos-highlight-grid">
        {highlights.map((highlight) => {
          const HighlightIcon = highlight.icon;
          return (
            <article key={highlight.title}>
              <div className="atos-highlight-meta">
                <HighlightIcon size={24} aria-hidden />
                <span>{highlight.number}</span>
              </div>
              <h3>{highlight.title}</h3>
              <p>{highlight.text}</p>
              <strong><CheckCircle2 size={17} aria-hidden />{highlight.note}</strong>
            </article>
          );
        })}
      </div>

      <div className="atos-aberration-note">
        <Eye size={26} aria-hidden />
        <div>
          <h3>Why accurate centration matters</h3>
          <p>
            Decentration can influence optical quality and higher-order aberrations such as coma.
            CenTrax is designed to support consistent alignment during docking; it should be described
            as an alignment aid, not as a promise that every aberration will be removed.
          </p>
        </div>
      </div>
    </section>
  );
}

function AtosRecoverySection() {
  return (
    <section className="atos-recovery-section" aria-labelledby="atos-recovery-title">
      <figure>
        <Image
          src="/blog-images/smile-transprk-defence.jpg"
          alt="Dr. Vighnesh Kabra explaining laser vision correction and recovery planning"
          width={1600}
          height={2397}
          sizes="(max-width: 900px) 100vw, 42vw"
        />
        <figcaption>
          <strong>Dr. Vighnesh Kabra</strong>
          <span>Procedure selection, informed consent, surgery, and follow-up</span>
        </figcaption>
      </figure>
      <div className="atos-recovery-copy">
        <span className="eyebrow">Fast Recovery, Explained Honestly</span>
        <h2 id="atos-recovery-title">A small incision supports early recovery. Your eye sets the timeline.</h2>
        <p>
          SmartSight avoids creation of a LASIK flap. That removes flap-related healing and
          displacement concerns from the pathway, while retaining the familiar advantages of a
          minimally invasive lenticule procedure. It does not mean every patient sees perfectly the
          next morning or recovers faster than every modern LASIK patient.
        </p>
        <div className="atos-recovery-points">
          <article>
            <span>After surgery</span>
            <h3>Expect temporary blur, watering, light sensitivity, or fluctuation.</h3>
          </article>
          <article>
            <span>Return to routine</span>
            <h3>Driving, screens, work, exercise, and eye rubbing need individual guidance.</h3>
          </article>
          <article>
            <span>Follow-up matters</span>
            <h3>Medicines and scheduled reviews remain essential even when vision clears quickly.</h3>
          </article>
        </div>
        <p className="atos-recovery-evidence">
          In a peer-reviewed 2024 study of 331 eyes, SmartSight produced strong three-month visual and
          refractive outcomes. Published group results explain the technology; they cannot predict one
          person&apos;s result.
        </p>
      </div>
    </section>
  );
}

function ComparisonTable() {
  return (
    <section className="refractive-tech-comparison" id="comparison">
      <div className="section-heading">
        <span>Honest Technology Comparison</span>
        <h2>SmartSight, SMILE Pro, Alcon, and CustomEyes are not interchangeable names.</h2>
        <p>
          The platforms solve refractive problems through different surgical routes. The correct
          comparison starts with how each procedure changes the cornea, not with advertising alone.
        </p>
      </div>
      <div className="refractive-tech-table-wrap">
        <table>
          <caption>
            Patient-focused comparison of SCHWIND SmartSight, ZEISS SMILE Pro, Alcon WaveLight
            Plus, and SCHWIND CustomEyes
          </caption>
          <thead>
            <tr>
              <th scope="col">Option</th>
              <th scope="col">Platform</th>
              <th scope="col">Method</th>
              <th scope="col">Corneal access</th>
              <th scope="col">Useful distinction</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.option}>
                <th scope="row">{row.option}</th>
                <td>{row.platform}</td>
                <td>{row.method}</td>
                <td>{row.access}</td>
                <td>{row.distinction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="refractive-tech-disclaimer">
        This table explains procedure categories; it does not rank them or predict an individual result.
      </p>
    </section>
  );
}

function RajasthanDecisionSection({ variant }: { variant: "atos" | "customeyes" }) {
  const isAtos = variant === "atos";
  const answers = isAtos
    ? [
        {
          icon: MapPin,
          title: "Where is SCHWIND ATOS available in Rajasthan?",
          text: "Kabra Eye Hospital in Sodala, Jaipur has Rajasthan's first SCHWIND ATOS for SmartSight and other supported femtosecond-laser applications.",
        },
        {
          icon: ShieldCheck,
          title: "Who performs ATOS procedures?",
          text: "Dr. Vighnesh Kabra performs SCHWIND ATOS procedures and leads the pre-operative scan review, procedure choice, surgery, and follow-up.",
        },
        {
          icon: IndianRupee,
          title: "Is SmartSight a cost-effective SMILE Pro alternative?",
          text: "It can offer strong value for a suitable eye. Compare the total written package—not only the headline price—including tests, surgeon, medicines, follow-up, and enhancement policy.",
        },
        {
          icon: FileCheck2,
          title: "What decides eligibility?",
          text: "Stable power, corneal maps and thickness, dryness, pupil and centration findings, retina health, age, lifestyle, and realistic expectations all affect the recommendation.",
        },
      ]
    : [
        {
          icon: MapPin,
          title: "Where is CustomEyes available in Rajasthan?",
          text: "Kabra Eye Hospital in Sodala, Jaipur offers CustomEyes planning within its SCHWIND AMARIS refractive programme for suitable eyes.",
        },
        {
          icon: ShieldCheck,
          title: "Who plans CustomEyes treatment?",
          text: "Dr. Vighnesh Kabra reviews the diagnostics, decides whether personalisation is clinically useful, selects the appropriate pathway, and manages follow-up.",
        },
        {
          icon: IndianRupee,
          title: "How is CustomEyes cost calculated?",
          text: "The estimate depends on diagnostics, the personalised profile, surgical access method, medicines, and follow-up. The hospital confirms a written package after screening.",
        },
        {
          icon: FileCheck2,
          title: "CustomEyes, SmartSight, or no surgery?",
          text: "CustomEyes is not automatically the premium answer for every eye. Corneal shape, optical findings, prescription, dryness, and tissue planning determine whether it adds value.",
        },
      ];

  return (
    <section className="refractive-search-answers" aria-labelledby={`${variant}-rajasthan-answers`}>
      <div className="section-heading">
        <span>Jaipur &amp; Rajasthan Direct Answers</span>
        <h2 id={`${variant}-rajasthan-answers`}>
          {isAtos
            ? "What Rajasthan patients should know before comparing SmartSight and SMILE Pro."
            : "What Rajasthan patients should know before choosing personalised laser treatment."}
        </h2>
        <p>
          Clear answers for patients and search engines, with the technology, surgeon, location,
          suitability, and cost questions stated directly.
        </p>
      </div>
      <div className="refractive-search-answer-grid">
        {answers.map((answer) => {
          const AnswerIcon = answer.icon;
          return (
            <article key={answer.title}>
              <AnswerIcon size={24} aria-hidden />
              <h3>{answer.title}</h3>
              <p>{answer.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function SurgeonAuthority({ variant }: { variant: "atos" | "customeyes" }) {
  const isAtos = variant === "atos";
  const steps = isAtos
    ? [
        "Review stable prescription, corneal tomography, thickness, dryness, pupil, and retina findings.",
        "Compare SmartSight with SMILE Pro, TransPRK, CustomEyes, LASIK, ICL, and IPCL without forcing one platform.",
        "Plan and perform the SCHWIND ATOS procedure when the eye is eligible.",
        "Guide medicines, precautions, recovery, and follow-up after surgery.",
      ]
    : [
        "Measure the cornea and optical system with compatible high-resolution diagnostics.",
        "Identify which irregularities are clinically meaningful and which should not be treated.",
        "Select the appropriate SCHWIND AMARIS profile and surgical pathway for the individual eye.",
        "Explain realistic vision goals, possible residual power, recovery, and follow-up.",
      ];

  return (
    <section className="refractive-surgeon-authority">
      <div>
        <span className="eyebrow">The Surgeon Behind the Technology</span>
        <h2>Dr. Vighnesh Kabra makes the procedure decision—not the machine name.</h2>
        <p>
          As Kabra Eye Hospital&apos;s refractive surgeon, Dr. Vighnesh Kabra leads the complete pathway
          from diagnostic review to surgery and follow-up. The aim is to use the hospital&apos;s expanded
          SCHWIND technology range without treating every patient as a candidate for the newest option.
        </p>
        <Link className="secondary-button" href="/meet-our-specialists/">
          Meet Dr. Vighnesh Kabra
          <ArrowRight size={18} aria-hidden />
        </Link>
      </div>
      <ol>
        {steps.map((step, index) => (
          <li key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function TechnologyFaq({
  title,
  faqs,
}: {
  title: string;
  faqs: Array<{ question: string; answer: string }>;
}) {
  return (
    <section className="refractive-tech-faq">
      <div className="section-heading">
        <span>Direct Answers</span>
        <h2>{title}</h2>
      </div>
      <div className="aeo-faq-grid">
        {faqs.map((faq, index) => (
          <details key={faq.question} open={index === 0}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function EvidenceSources() {
  return (
    <section className="refractive-tech-sources">
      <div>
        <span className="eyebrow">Primary Sources</span>
        <h2>Technology claims checked against manufacturers and clinical literature.</h2>
        <p>
          Kabra Eye Hospital&apos;s Rajasthan-first ownership statement is first-party hospital information.
          Procedure descriptions and competitor distinctions are supported by the linked sources.
        </p>
      </div>
      <ul>
        {technologySources.map((source) => (
          <li key={source.href}>
            <a href={source.href} target="_blank" rel="noreferrer">
              {source.label}
              <ExternalLink size={17} aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SchwindAtosSmartSightPage() {
  const path = "/schwind-atos-smartsight-jaipur/";
  const description =
    "Kabra Eye Hospital has Rajasthan's first SCHWIND ATOS in Jaipur. Dr. Vighnesh Kabra performs SmartSight procedures and compares them with SMILE Pro, Alcon, CustomEyes, and other refractive options.";

  return (
    <>
      <RefractiveSchemas path={path} name="SCHWIND ATOS SmartSight Surgery in Jaipur" description={description} faqs={atosFaqs} variant="atos" />
      <TechnologyBreadcrumb current="SCHWIND ATOS SmartSight Jaipur" />
      <TechnologyHero variant="atos" />
      <section className="refractive-tech-answer">
        <div>
          <span className="eyebrow">The Direct Answer</span>
          <h2>Kabra Eye Hospital has Rajasthan&apos;s first SCHWIND ATOS.</h2>
        </div>
        <div>
          <p>
            SCHWIND ATOS is the femtosecond-laser platform used for SmartSight small-incision lenticule
            extraction. It gives Jaipur and Rajasthan patients a modern alternative to consider when
            searching for ZEISS SMILE Pro or other flap-free vision-correction procedures.
          </p>
          <p>
            Dr. Vighnesh Kabra performs the ATOS procedures at Kabra Eye Hospital. He first determines
            whether the eye is better suited to SmartSight, CustomEyes, TransPRK, LASIK, ICL/IPCL,
            continued glasses, or no surgery.
          </p>
        </div>
      </section>
      <AtosTechnologyHighlights />
      <section className="refractive-tech-benefits">
        {[
          ["SmartSight", "Flap-free lenticule extraction using the SCHWIND ATOS femtosecond laser."],
          ["Intelligent alignment", "Pupil recognition, eye tracking, and cyclotorsion compensation support treatment alignment."],
          ["Rajasthan access", "The first SCHWIND ATOS in Rajasthan is at Kabra Eye Hospital, Sodala, Jaipur."],
        ].map(([title, text]) => (
          <article key={title}>
            <Sparkles size={24} aria-hidden />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <AtosRecoverySection />
      <RajasthanDecisionSection variant="atos" />
      <ComparisonTable />
      <SurgeonAuthority variant="atos" />
      <TechnologyFaq title="Questions about SCHWIND ATOS and SmartSight in Jaipur." faqs={atosFaqs} />
      <EvidenceSources />
      <nav className="refractive-tech-links" aria-label="Related refractive technology pages">
        <Link href="/customeyes-schwind-amaris-jaipur/">CustomEyes with SCHWIND AMARIS <ArrowRight size={17} aria-hidden /></Link>
        <Link href="/blog/schwind-atos-smartsight-vs-smile-pro-jaipur/">Detailed SmartSight vs SMILE Pro guide <ArrowRight size={17} aria-hidden /></Link>
        <Link href="/service/trans-prk-glasses-spectacle-removal-surgery/">SCHWIND AMARIS TransPRK <ArrowRight size={17} aria-hidden /></Link>
      </nav>
      <AppointmentForm />
    </>
  );
}

export function CustomEyesSchwindAmarisPage() {
  const path = "/customeyes-schwind-amaris-jaipur/";
  const description =
    "CustomEyes with SCHWIND AMARIS in Jaipur uses high-resolution diagnostic data for personalised laser-vision planning led by refractive surgeon Dr. Vighnesh Kabra.";

  return (
    <>
      <RefractiveSchemas path={path} name="CustomEyes with SCHWIND AMARIS in Jaipur" description={description} faqs={customEyesFaqs} variant="customeyes" />
      <TechnologyBreadcrumb current="CustomEyes SCHWIND AMARIS Jaipur" />
      <TechnologyHero variant="customeyes" />
      <section className="refractive-tech-answer">
        <div>
          <span className="eyebrow">Personalisation Explained</span>
          <h2>CustomEyes is the personalised SCHWIND AMARIS pathway—not another name for ATOS.</h2>
        </div>
        <div>
          <p>
            CustomEyes uses compatible high-resolution diagnostic information to personalise the
            treatment profile delivered by SCHWIND AMARIS. Depending on the diagnostic system and
            treatment plan, the data may describe corneal shape or the wider optical system of the eye.
          </p>
          <p>
            Kabra Eye Hospital combines this AMARIS capability with Rajasthan&apos;s first SCHWIND ATOS.
            That gives Dr. Vighnesh Kabra distinct technology routes rather than forcing SmartSight,
            CustomEyes, or TransPRK into the same marketing label.
          </p>
        </div>
      </section>
      <section className="refractive-tech-benefits">
        {[
          ["High-resolution mapping", "Detailed diagnostic measurements inform the personalised treatment discussion."],
          ["Individual optical profile", "Treatment planning can account for selected corneal or ocular irregularities where clinically appropriate."],
          ["AMARIS precision", "The personalised profile is delivered through the SCHWIND AMARIS excimer-laser ecosystem."],
        ].map(([title, text]) => (
          <article key={title}>
            <CheckCircle2 size={24} aria-hidden />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <RajasthanDecisionSection variant="customeyes" />
      <ComparisonTable />
      <SurgeonAuthority variant="customeyes" />
      <TechnologyFaq title="Questions about CustomEyes and personalised laser planning." faqs={customEyesFaqs} />
      <EvidenceSources />
      <nav className="refractive-tech-links" aria-label="Related refractive technology pages">
        <Link href="/schwind-atos-smartsight-jaipur/">Rajasthan&apos;s first SCHWIND ATOS <ArrowRight size={17} aria-hidden /></Link>
        <Link href="/blog/schwind-atos-smartsight-vs-smile-pro-jaipur/">SmartSight vs SMILE Pro and Alcon <ArrowRight size={17} aria-hidden /></Link>
        <Link href="/service/trans-prk-glasses-spectacle-removal-surgery/">No-touch TransPRK in Jaipur <ArrowRight size={17} aria-hidden /></Link>
      </nav>
      <AppointmentForm />
    </>
  );
}
