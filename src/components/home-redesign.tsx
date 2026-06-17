import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Building2,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Clock,
  HelpCircle,
  MapPin,
  Phone,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
} from "lucide-react";
import { AppointmentForm } from "@/components/appointment-form";
import { aeoArticles } from "@/data/aeo";
import { empanelments, faqs, services, site, specialists, stats } from "@/data/site";

const heroServices = [
  services.find((service) => service.slug === "trans-prk-glasses-spectacle-removal-surgery") ??
    services[0],
  services.find((service) => service.slug === "cataract-surgery") ?? services[2],
  services.find((service) => service.slug === "retina-diabetic-eye-care") ?? services[3],
];

const serviceShowcase = heroServices;

const whyChoose = [
  {
    title: "Modern diagnostics",
    text: "Cornea scans, retina checks, pressure testing, and surgical planning with specialist review.",
    icon: Sparkles,
  },
  {
    title: "Trusted counselling",
    text: "Patients understand options before treatment, from Trans PRK and LASIK to cataract and retina care.",
    icon: ShieldCheck,
  },
  {
    title: "Insurance support",
    text: "Cashless and empanelment guidance for eligible government schemes, insurers, and TPAs.",
    icon: BadgeCheck,
  },
];

const locationCards = [
  {
    title: "Sodala, Jaipur",
    address: site.address,
    href: "/contacts/",
  },
  {
    title: "Appointment Desk",
    address: `${site.phone} · ${site.hours}`,
    href: site.phoneHref,
  },
  {
    title: "Cashless Help",
    address: "RGHS, CGHS, ECHS, ESIC, BSNL, Railway, Star Health and more.",
    href: "/complete-empanelment-list/",
  },
];

const patientStories = [
  {
    name: "Cataract care patient",
    text: "Clear counselling, careful surgery planning, and follow-up support helped the family feel confident at every step.",
    image: services.find((service) => service.slug === "cataract-surgery")?.image ?? services[2].image,
  },
  {
    name: "Specs-removal patient",
    text: "The team explained Trans PRK, LASIK suitability, testing, and recovery before discussing the safest option.",
    image: services[0].image,
  },
];

const blogCards = aeoArticles.slice(1, 5).map((article) => ({
  title: article.title,
  image: article.image,
  href: `/blog/${article.slug}/`,
}));

export function HomeRedesign() {
  return (
    <>
      <section className="asg-inspired-hero">
        <video
          aria-label="Kabra Eye Hospital eye care overview"
          autoPlay
          loop
          muted
          playsInline
          poster="https://kabraeyejaipur.com/wp-content/uploads/2025/11/kabra-hospital-2048x1606.jpg"
        >
          <source
            src="https://video.gumlet.io/6a324bb1bf17ac22ca57cc19/6a324c56b02ffb1d838b29da/download.mp4"
            type="video/mp4"
          />
        </video>
        <div className="hero-shade" />
        <div className="hero-content">
          <span>Kabra Eye Hospital, Sodala Jaipur</span>
          <h1>Clearer vision starts here.</h1>
          <p>Specialist eye care in Jaipur with diagnostics, counselling, surgery, and follow-up.</p>
          <div className="hero-actions">
            <a className="primary-button" href="#appointment">
              Schedule a Consultation
              <ArrowRight size={18} aria-hidden />
            </a>
          <Link
            className="secondary-button glass-button"
            href="/service/trans-prk-glasses-spectacle-removal-surgery/"
          >
            Trans PRK
          </Link>
        </div>
        </div>
      </section>

      <section className="floating-care-bar" aria-label="Fast appointment actions">
        <a href="#appointment">
          <span>
            <CalendarCheck size={20} aria-hidden />
          </span>
          <strong>Book an Appointment</strong>
        </a>
        <a href={site.phoneHref}>
          <span>
            <Phone size={20} aria-hidden />
          </span>
          <strong>Get a call back</strong>
        </a>
      </section>

      <section className="home-stat-cards" aria-label="Hospital highlights">
        {stats.map((stat, index) => {
          const icons = [BadgeCheck, Building2, Stethoscope, ShieldCheck];
          const Icon = icons[index] ?? BadgeCheck;
          return (
            <article key={stat.label}>
              <Icon size={42} aria-hidden />
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          );
        })}
      </section>

      <section className="home-location-search">
        <div className="section-pill">
          <MapPin size={18} aria-hidden />
          Our Location
        </div>
        <h2>Trusted eye care in Sodala, Ajmer Road, Jaipur.</h2>
        <p>
          A central Jaipur eye hospital for consultation, diagnostics, surgeries, optical, pharmacy,
          education, and follow-up support.
        </p>
        <div className="find-care-panel">
          <strong>Find Kabra Eye Hospital</strong>
          <span>Jaipur</span>
          <span>Sodala</span>
          <Link href="/contacts/">
            Locate Me
            <MapPin size={16} aria-hidden />
          </Link>
        </div>
        <div className="location-map-grid">
          <div className="location-list">
            {locationCards.map((item) => (
              <Link href={item.href} key={item.title}>
                <MapPin size={20} aria-hidden />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.address}</p>
                </div>
                <span>View</span>
              </Link>
            ))}
          </div>
          <div className="jaipur-map-card">
            <Image
              src="https://kabraeyejaipur.com/wp-content/uploads/2025/11/kabra-hospital-1024x803.jpg"
              alt="Kabra Eye Hospital Sodala Jaipur location"
              width={860}
              height={670}
            />
            <div>
              <strong>Sodala, Ajmer Road</strong>
              <span>Jaipur eye care hub</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-services-showcase">
        <div className="section-pill">
          <Sparkles size={18} aria-hidden />
          Services & Specialities
        </div>
        <h2>Every angle of vision. Every kind of care.</h2>
        <div className="showcase-grid">
          {serviceShowcase.map((service) => {
            const Icon = service.icon;
            return (
              <Link className="showcase-card" key={service.slug} href={`/service/${service.slug}/`}>
                <Image src={service.image} alt={service.title} width={640} height={420} />
                <div className="showcase-icon">
                  <Icon size={26} aria-hidden />
                </div>
                <div>
                  <h3>{service.shortTitle}</h3>
                  <p>{service.description}</p>
                  <span>
                    Explore treatment
                    <ArrowRight size={16} aria-hidden />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="carousel-controls" aria-hidden="true">
          <span>
            <ChevronLeft size={18} />
          </span>
          <i />
          <i />
          <i />
          <span>
            <ChevronRight size={18} />
          </span>
        </div>
      </section>

      <section className="home-image-banner">
        <Image
          src="https://kabraeyejaipur.com/wp-content/uploads/2023/02/kids-eye-checkup.webp"
          alt="Pediatric eye checkup at Kabra Eye Hospital"
          width={1600}
          height={760}
        />
        <div>
          <h2>35+ years of restoring sight and confidence.</h2>
          <p>
            From glasses removal to children&apos;s eye checks and complex retina care, the hospital
            keeps the journey simple: diagnose clearly, explain honestly, treat carefully.
          </p>
          <a className="secondary-button glass-button" href="#appointment">
            Get Assistance
            <ArrowRight size={18} aria-hidden />
          </a>
        </div>
      </section>

      <section className="why-choose-home">
        <h2>Why choose Kabra Eye Hospital</h2>
        <div className="why-tabs">
          {whyChoose.map((item, index) => {
            const Icon = item.icon;
            return (
              <article className={index === 0 ? "active" : ""} key={item.title}>
                <span>
                  <Icon size={22} aria-hidden />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            );
          })}
        </div>
        <div className="instrument-panel">
          <Image
            src="https://kabraeyejaipur.com/wp-content/uploads/2022/10/transprk-refractive-vision-correction.webp"
            alt="Modern eye care equipment at Kabra Eye Hospital"
            width={1300}
            height={680}
          />
          <div>
            <h3>Modern instruments, smarter care</h3>
            <p>
              Diagnostics and treatment planning are organized so patients know what is being
              tested, why it matters, and what the next step should be.
            </p>
          </div>
        </div>
        <div className="oct-video-feature">
          <div className="oct-video-copy">
            <span className="eyebrow">Retina & OCT Diagnostics</span>
            <h3>High-resolution eye scans before treatment decisions.</h3>
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

      <section className="home-video-checkup">
        <div className="video-card">
          <Image
            src="https://kabraeyejaipur.com/wp-content/uploads/2025/11/kabra-hospital-2048x1606.jpg"
            alt="Inside Kabra Eye Hospital Jaipur"
            width={1500}
            height={760}
          />
          <Link href="/about-us/" aria-label="Open hospital overview">
            <PlayCircle size={56} aria-hidden />
          </Link>
        </div>
        <div className="checkup-banner">
          <Image
            src="https://kabraeyejaipur.com/wp-content/uploads/2023/02/cornea-clinic-service.webp"
            alt="Schedule an eye checkup at Kabra Eye Hospital"
            width={1500}
            height={720}
          />
          <div>
            <h2>Schedule your eye checkup</h2>
            <p>
              Get guidance for vision correction, cataract, retina, glaucoma, cornea, squint, and
              children&apos;s eye care.
            </p>
            <a className="secondary-button glass-button" href="#appointment">
              Book now
              <ArrowRight size={18} aria-hidden />
            </a>
          </div>
        </div>
      </section>

      <section className="patient-stories-home">
        <div className="section-pill">
          <Star size={18} aria-hidden />
          Patient Stories
        </div>
        <h2>Through their eyes, you&apos;ll see the care journey.</h2>
        <p>
          Real patient journeys are about more than procedures: they include clarity, confidence,
          counselling, and follow-up.
        </p>
        <div className="story-carousel">
          <article className="story-video">
            <Image
              src={patientStories[0].image}
              alt="Patient eye care story"
              width={720}
              height={460}
            />
            <PlayCircle size={62} aria-hidden />
          </article>
          <article className="story-quote">
            <div className="stars" aria-label="Five star rating">
              <Star size={26} aria-hidden />
              <Star size={26} aria-hidden />
              <Star size={26} aria-hidden />
              <Star size={26} aria-hidden />
              <Star size={26} aria-hidden />
            </div>
            <h3>{patientStories[0].name}</h3>
            <p>{patientStories[0].text}</p>
          </article>
        </div>
        <div className="story-dots" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className="home-blog-hub">
        <div className="section-pill">
          <BookOpen size={18} aria-hidden />
          Blogs
        </div>
        <div className="blog-head-row">
          <h2>Eye Health Hub</h2>
          <Link className="primary-button" href="/blog/">
            View All Blogs
            <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
        <div className="blog-card-grid">
          {blogCards.map((blog) => (
            <Link href={blog.href} key={blog.title}>
              <Image src={blog.image} alt={blog.title} width={720} height={420} />
              <div>
                <h3>{blog.title}</h3>
                <span>
                  <ArrowRight size={18} aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-seo-block">
        <div className="section-pill">
          <Sparkles size={18} aria-hidden />
          About Kabra Eye Hospital
        </div>
        <h2>Kabra Eye Hospital - trusted eye care in Jaipur</h2>
        <p>
          Kabra Eye Hospital, Sodala, Ajmer Road, Jaipur is one of the city&apos;s trusted eye
          centres with 35+ years of care. Led by Dr. Manoj Kabra, the hospital provides Trans PRK,
          LASIK counselling, cataract surgery, retina and diabetic eye care, glaucoma, cornea,
          squint, neuro ophthalmology, and pediatric eye care.
        </p>
        <p>
          Patients can access advanced diagnostics, honest counselling, modern surgical planning,
          cashless support for eligible schemes, in-house pharmacy, optical support, and follow-up
          care from one location.
        </p>
        <Link className="primary-button" href="/about-us/">
          Read More
          <ArrowRight size={18} aria-hidden />
        </Link>
      </section>

      <section className="home-faq-section">
        <div className="section-pill">
          <HelpCircle size={18} aria-hidden />
          FAQ&apos;s
        </div>
        <h2>Clear answers for better vision</h2>
        <div className="home-faq-list">
          {faqs.slice(0, 8).map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="home-doctors">
        <div>
          <span className="eyebrow">Clinical Team</span>
          <h2>Specialist-led care, visible before patients book.</h2>
        </div>
        <div className="doctor-strip">
          {specialists.slice(0, 4).map((doctor) => (
            <article key={doctor.name}>
              <Image src={doctor.image} alt={doctor.name} width={360} height={360} />
              <h3>{doctor.name}</h3>
              <p>{doctor.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="visit-console refined">
        <div>
          <span className="eyebrow">Before You Visit</span>
          <h2>Timing, calls, location, and cashless support.</h2>
        </div>
        <div className="console-grid">
          <div>
            <h3>Hours</h3>
            <p>
              <Clock size={16} aria-hidden />
              {site.hours}
            </p>
          </div>
          <div>
            <h3>Call</h3>
            <p>{site.phone}</p>
            <a href={site.phoneHref}>
              Call hospital
              <Phone size={16} aria-hidden />
            </a>
          </div>
          <div>
            <h3>Cashless Support</h3>
            <p>{empanelments.slice(0, 6).join(", ")} and more.</p>
            <Link href="/complete-empanelment-list/">
              Check list
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <AppointmentForm />
    </>
  );
}
