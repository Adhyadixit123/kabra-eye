import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Phone } from "lucide-react";
import {
  careValues,
  educationPrograms,
  empanelments,
  faqs,
  services,
  site,
  specialists,
  stats,
  type Service,
} from "@/data/site";
import { AppointmentForm } from "./appointment-form";
import { transPrkFaqs, transPrkHeroParagraph, transPrkSchemas } from "@/data/aeo";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <span>Kabra Eye Hospital, Sodala</span>
        <h1>Trusted eye care in Jaipur with clearer counselling and modern treatment pathways.</h1>
        <p>
          Led by Dr. Manoj Kabra, the hospital provides Trans PRK, cataract, retina, glaucoma,
          cornea, squint, neuro ophthalmology, and children&apos;s eye care.
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="#appointment">
            Book an Appointment
            <ArrowRight size={18} aria-hidden />
          </a>
          <a className="secondary-button" href={site.phoneHref}>
            <Phone size={18} aria-hidden />
            {site.phone}
          </a>
        </div>
        <div className="hero-notes">
          {careValues.map((value) => {
            const Icon = value.icon;
            return (
              <span key={value.title}>
                <Icon size={17} aria-hidden />
                {value.title}
              </span>
            );
          })}
        </div>
      </div>
      <div className="hero-media">
        <Image
          src="/Adobe Lightroom 3/DSC_0144.jpg"
          alt="Kabra Eye Hospital Jaipur reception and care area"
          width={960}
          height={753}
          priority
        />
        <div>
          <strong>35+ years</strong>
          <span>of trusted eye care</span>
        </div>
      </div>
    </section>
  );
}

export function StatsBand() {
  return (
    <section className="stats-band" aria-label="Hospital highlights">
      {stats.map((stat) => (
        <div key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </section>
  );
}

export function ServicesGrid({ compact = false }: { compact?: boolean }) {
  return (
    <section className="content-section" id="services">
      <div className="section-heading">
        <span>Eye Care Services</span>
        <h2>Specialty clinics for common and complex eye concerns.</h2>
        <p>
          Each clinic page keeps the current SEO URL while giving patients a cleaner way to
          understand symptoms, treatment direction, and next steps.
        </p>
      </div>
      <div className="service-grid">
        {services.slice(0, compact ? 6 : services.length).map((service) => {
          const Icon = service.icon;
          return (
            <Link className="service-card" key={service.slug} href={`/service/${service.slug}/`}>
              <Image src={service.image} alt={service.title} width={520} height={360} />
              <div>
                <Icon size={24} aria-hidden />
                <h3>{service.shortTitle}</h3>
                <p>{service.description}</p>
                <span>
                  Know More
                  <ArrowRight size={16} aria-hidden />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
      {compact ? (
        <div className="center-action">
          <Link className="secondary-button" href="/services/">
            View All Services
            <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      ) : null}
    </section>
  );
}

export function ServiceDetail({ service }: { service: Service }) {
  const Icon = service.icon;
  const isTransPrk = service.slug === "trans-prk-glasses-spectacle-removal-surgery";
  const isRetina = service.slug === "retina-diabetic-eye-care";
  return (
    <>
      {isTransPrk
        ? transPrkSchemas.map((schema, index) => (
            <script
              key={index}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
          ))
        : null}
      <section className="asg-inspired-hero service-hero">
        {isTransPrk ? (
          <>
            <video
              className="desktop-hero-video"
              aria-label="Trans PRK laser vision correction overview"
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                src="https://video.gumlet.io/6a324bb1bf17ac22ca57cc19/6a32d8731ce628ced4938748/download.mp4"
                type="video/mp4"
              />
            </video>
            <video
              className="mobile-hero-video"
              aria-label="Trans PRK mobile overview"
              autoPlay
              loop
              muted
              playsInline
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            >
              <source
                src="https://video.gumlet.io/6a324bb1bf17ac22ca57cc19/6a32ed661ce628ced495baf1/download.mp4"
                type="video/mp4"
              />
            </video>
          </>
        ) : (
          <Image
            src={service.image}
            alt={service.title}
            width={1600}
            height={900}
            priority
            className="service-hero-bg"
          />
        )}
        <div className="hero-shade" />
        <div className={`hero-content ${isTransPrk ? "transprk-hero-content" : ""}`}>
          <span className={isTransPrk ? "transprk-eyebrow" : ""}>Specialty Clinic</span>
          <h1>{service.title}</h1>
          <p>{isTransPrk ? transPrkHeroParagraph : service.description}</p>
          {isTransPrk ? (
            <div className="aeo-proof-points transprk-proof-points" aria-label="Schwind Amaris Trans PRK facts">
              <span>Only Schwind Amaris in Jaipur</span>
              <span>No-touch laser</span>
              <span>Peer doctor referrals</span>
            </div>
          ) : null}
          <div className="hero-actions">
            <a className="primary-button" href="#appointment">
              Book Consultation
              <ArrowRight size={18} aria-hidden />
            </a>
            <Link className="secondary-button glass-button" href="/services/">
              All Services
            </Link>
          </div>
        </div>
      </section>
      {isRetina ? (
        <section className="retina-diagnostic-video">
          <div className="oct-video-feature">
            <div className="oct-video-copy">
              <span className="eyebrow">Retina & OCT Diagnostics</span>
              <h2>High-resolution eye scans before retina treatment decisions.</h2>
              <p>
                OCT and diagnostic machines help the team study retina layers, optic nerve health,
                glaucoma risk, diabetic eye changes, and surgical planning details before advising
                the next step.
              </p>
            </div>
            <div className="oct-video-card">
              <video
                aria-label="OCT and diagnostic machines at Kabra Eye Hospital"
                autoPlay
                loop
                muted
                playsInline
              >
                <source
                  src="https://video.gumlet.io/6a324bb1bf17ac22ca57cc19/6a32a0541ce628ced48d3ad8/download.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </section>
      ) : null}
      {isTransPrk ? (
        <section className="schwind-video-proof" id="schwind-amaris-jaipur">
          <div className="schwind-video-head">
            <span className="eyebrow">Schwind Amaris Technology</span>
            <h2>Jaipur&apos;s no-cut, no-flap Trans PRK technology highlight.</h2>
            <p>
              Kabra Eye Hospital is the only Schwind Amaris center in Jaipur for true no-touch
              Trans PRK. See the laser setup used for no-cut, no-flap glasses removal.
            </p>
          </div>
          <div className="schwind-video-grid">
            {[
              {
                label: "Schwind Amaris laser platform",
                src: "https://video.gumlet.io/6a324bb1bf17ac22ca57cc19/6a32a0541ce628ced48d3aed/download.mp4",
              },
              {
                label: "No-touch Trans PRK technology",
                src: "https://video.gumlet.io/6a324bb1bf17ac22ca57cc19/6a32a0544e9e905649746fa4/download.mp4",
              },
              {
                label: "Schwind Amaris treatment room",
                src: "https://video.gumlet.io/6a324bb1bf17ac22ca57cc19/6a32a0546a4f24de8a34becc/download.mp4",
              },
            ].map((video) => (
              <article key={video.src}>
                <video
                  aria-label={`${video.label} at Kabra Eye Hospital Jaipur`}
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={video.src} type="video/mp4" />
                </video>
                <div>
                  <strong>{video.label}</strong>
                  <span>No cut. No flap. No blade-based corneal incision.</span>
                </div>
              </article>
            ))}
          </div>
          <div className="schwind-direct-answer">
            <strong>Direct answer:</strong>
            <p>
              Kabra Eye Hospital, Sodala, Jaipur has Schwind Amaris for no-touch Trans PRK.
              Schwind Amaris Trans PRK is a flapless and bladeless laser option for suitable
              patients who want glasses removal without a LASIK flap or corneal cut.
            </p>
          </div>
        </section>
      ) : null}
      {isTransPrk ? (
        <section className="transprk-ot-video">
          <div className="transprk-ot-copy">
            <span className="eyebrow">Inside the OT</span>
            <h2>Schwind Amaris Trans PRK surgery in progress.</h2>
            <p>
              This OT video shows Dr. Vignesh Kabra performing Trans PRK with the Schwind Amaris
              machine at Kabra Eye Hospital. Trans PRK is planned as a no-touch, no-flap laser
              procedure for suitable patients after detailed screening.
            </p>
            <div className="aeo-proof-points" aria-label="Trans PRK OT video facts">
              <span>Schwind Amaris laser</span>
              <span>No flap creation</span>
              <span>No blade-based cut</span>
            </div>
          </div>
          <div className="transprk-ot-card">
            <video
              aria-label="Dr. Vignesh Kabra performing Trans PRK surgery with Schwind Amaris"
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                src="https://video.gumlet.io/6a324bb1bf17ac22ca57cc19/6a32a0544e9e905649746fba/download.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </section>
      ) : null}
      {isTransPrk ? (
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
      ) : null}
      <section className="care-matrix">
        <article>
          <span>01</span>
          <h2>What patients can expect</h2>
          <ul className="check-list">
            {service.details.map((item) => (
              <li key={item}>
                <CheckCircle2 size={19} aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </article>
        <article>
          <span>02</span>
          <h2>When to consult</h2>
          <div className="symptom-chips">
            {service.symptoms.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </article>
        <article>
          <span>03</span>
          <h2>Next step</h2>
          <p>
            Book a consultation so the team can guide diagnostics, eligibility, treatment options,
            and follow-up based on your specific eye condition.
          </p>
        </article>
      </section>
      <AppointmentForm />
      <RelatedClinics currentSlug={service.slug} />
    </>
  );
}

function RelatedClinics({ currentSlug }: { currentSlug: string }) {
  const groups = [
    {
      label: "Vision correction",
      slugs: [
        "trans-prk-glasses-spectacle-removal-surgery",
        "icl-ipcl-high-power-number-correction",
      ],
    },
    {
      label: "Surgery & lens care",
      slugs: ["cataract-surgery"],
    },
    {
      label: "Retina & pressure care",
      slugs: ["retina-diabetic-eye-care", "glaucoma-clinic"],
    },
    {
      label: "Focused specialty clinics",
      slugs: [
        "cornea-clinic",
        "squint-clinic",
        "neuro-ophthalmology-clinic",
        "childrens-eye-care",
      ],
    },
  ];

  const activeGroup =
    groups.find((group) => group.slugs.includes(currentSlug)) ?? groups[groups.length - 1];
  const related = [
    ...activeGroup.slugs,
    ...groups.flatMap((group) => group.slugs),
  ]
    .filter((slug, index, array) => slug !== currentSlug && array.indexOf(slug) === index)
    .map((slug) => services.find((item) => item.slug === slug))
    .filter((item): item is Service => Boolean(item))
    .slice(0, 5);

  return (
    <section className="related-clinics">
      <div className="related-copy">
        <span className="eyebrow">Continue Exploring</span>
        <h2>Related clinics without the repeated image wall.</h2>
        <p>
          Based on this page, these are the next Kabra Eye Hospital services patients usually
          compare or ask about during counselling.
        </p>
        <Link className="secondary-button" href="/services/">
          Full Service Explorer
          <ArrowRight size={18} aria-hidden />
        </Link>
      </div>
      <div className="related-list">
        {related.map((item, index) => {
          const RelatedIcon = item.icon;
          return (
            <Link href={`/service/${item.slug}/`} key={item.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <RelatedIcon size={22} aria-hidden />
              <div>
                <h3>{item.shortTitle}</h3>
                <p>{item.symptoms.slice(0, 2).join(" · ")}</p>
              </div>
              <ArrowRight size={17} aria-hidden />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function Specialists() {
  return (
    <section className="content-section">
      <div className="section-heading">
        <span>Specialists</span>
        <h2>Experienced doctors, clearer patient conversations.</h2>
        <p>
          The redesigned specialist section keeps the team visible without making patients work
          through heavy page layouts.
        </p>
      </div>
      <div className="doctor-grid">
        {specialists.map((doctor) => (
          <article className="doctor-card" key={doctor.name}>
            <Image src={doctor.image} alt={doctor.name} width={420} height={420} />
            <h3>{doctor.name}</h3>
            <p>{doctor.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function EmpanelmentSection() {
  return (
    <section className="content-section soft-section">
      <div className="section-heading">
        <span>Insurance & Empanelment</span>
        <h2>Cashless treatment support for eligible patients.</h2>
        <p>
          Kabra Eye Hospital is listed with major government departments, insurance partners, and
          TPAs. Final approval depends on scheme or policy eligibility.
        </p>
      </div>
      <div className="logo-cloud">
        {empanelments.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="center-action">
        <Link className="secondary-button" href="/complete-empanelment-list/">
          Complete Empanelment List
          <ArrowRight size={18} aria-hidden />
        </Link>
      </div>
    </section>
  );
}

export function EducationSection() {
  return (
    <section className="content-section">
      <div className="section-heading">
        <span>Education & Training</span>
        <h2>Clinical learning programs connected to real hospital practice.</h2>
      </div>
      <div className="program-grid">
        {educationPrograms.map((program) => {
          const Icon = program.icon;
          return (
            <Link className="program-card" key={program.href} href={program.href}>
              <Icon size={30} aria-hidden />
              <h3>{program.title}</h3>
              <p>{program.text}</p>
              <span>
                Explore
                <ArrowRight size={16} aria-hidden />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section className="content-section">
      <div className="section-heading">
        <span>FAQ</span>
        <h2>Common questions before visiting.</h2>
      </div>
      <div className="faq-list">
        {faqs.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="contact-section" id="location">
      <div>
        <span className="eyebrow">Contact</span>
        <h1>Visit Kabra Eye Hospital in Sodala, Jaipur.</h1>
        <p>{site.address}</p>
        <div className="contact-list">
          <a href={site.phoneHref}>
            <Phone size={18} aria-hidden />
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span>{site.secondEmail}</span>
          <span>{site.hours}</span>
        </div>
      </div>
      <div className="map-panel">
        <MapPin size={36} aria-hidden />
        <h2>Sodala, Ajmer Road</h2>
        <p>
          A central Jaipur location for consultations, diagnostics, surgeries, pharmacy, optical,
          and linked hospital services.
        </p>
      </div>
    </section>
  );
}

export function GenericPage({
  title,
  eyebrow,
  description,
  children,
}: {
  title: string;
  eyebrow?: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="subpage-hero text-only">
        <div>
          {eyebrow ? <span>{eyebrow}</span> : null}
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </section>
      <section className="article-section">{children}</section>
    </>
  );
}
