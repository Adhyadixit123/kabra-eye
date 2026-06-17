"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Eye,
  Search,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { services } from "@/data/site";

type Pathway = {
  id: string;
  label: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  source: string;
  serviceSlugs: string[];
  signals: string[];
  goodFor: string;
};

const pathways: Pathway[] = [
  {
    id: "vision",
    label: "Vision Correction",
    headline: "Freedom from glasses starts with suitability, not shortcuts.",
    description:
      "For Trans PRK, ICL/IPCL, high number correction, and patients comparing laser versus implantable lens options.",
    image: "/Adobe Lightroom 3/DSC_0159.jpg",
    imageAlt: "Schwind Amaris laser suite at Kabra Eye Hospital",
    source: "Adobe Lightroom 3: DSC_0159.jpg",
    serviceSlugs: [
      "trans-prk-glasses-spectacle-removal-surgery",
      "icl-ipcl-high-power-number-correction",
    ],
    signals: ["Spectacle dependence", "High number", "Contact lens discomfort"],
    goodFor: "Patients considering specs removal or advanced refractive correction.",
  },
  {
    id: "surgery",
    label: "Surgery & Lens",
    headline: "Cataract care needs clear lens counselling before surgery.",
    description:
      "For cloudy vision, glare, night-driving difficulty, and patients comparing lens choices or cashless surgery support.",
    image: "/Adobe Lightroom 3/DSC_0142.jpg",
    imageAlt: "Eye care diagnostic and treatment area at Kabra Eye Hospital",
    source: "Adobe Lightroom 3: DSC_0142.jpg",
    serviceSlugs: ["cataract-surgery"],
    signals: ["Cloudy vision", "Glare", "Frequent glasses change"],
    goodFor: "Patients who need cataract evaluation, premium lens planning, or insurance guidance.",
  },
  {
    id: "retina",
    label: "Retina & Chronic Care",
    headline: "Diabetes, retina, and glaucoma need monitoring, not guesswork.",
    description:
      "For diabetic eye checks, retina concerns, glaucoma risk, pressure checks, and long-term follow-up plans.",
    image: "/Adobe Lightroom 3/DSC_0151.jpg",
    imageAlt: "Retina and diagnostic equipment at Kabra Eye Hospital",
    source: "Adobe Lightroom 3: DSC_0151.jpg",
    serviceSlugs: ["retina-diabetic-eye-care", "glaucoma-clinic"],
    signals: ["Diabetes", "Floaters", "High eye pressure"],
    goodFor: "Patients who need retinal screening, glaucoma workup, or chronic monitoring.",
  },
  {
    id: "surface",
    label: "Cornea & Alignment",
    headline: "Surface, cornea, squint, and nerve symptoms need focused clinics.",
    description:
      "For painful red eyes, light sensitivity, eye alignment concerns, unexplained vision loss, and neuro-ophthalmic symptoms.",
    image: "/Adobe Lightroom 3/DSC_0161.jpg",
    imageAlt: "Ophthalmology laser and diagnostic room at Kabra Eye Hospital",
    source: "Adobe Lightroom 3: DSC_0161.jpg",
    serviceSlugs: ["cornea-clinic", "squint-clinic", "neuro-ophthalmology-clinic"],
    signals: ["Red painful eye", "Double vision", "Nerve-related vision symptoms"],
    goodFor: "Patients with specialist symptoms that need directed examination.",
  },
  {
    id: "children",
    label: "Children's Eye Care",
    headline: "Children need eye checks that parents can understand quickly.",
    description:
      "For school vision complaints, screen strain, squint, lazy eye concerns, and routine pediatric eye checks.",
    image: "/Adobe Lightroom 3/DSC_0140.jpg",
    imageAlt: "Kabra Eye Hospital waiting area for families",
    source: "Adobe Lightroom 3: DSC_0140.jpg",
    serviceSlugs: ["childrens-eye-care", "squint-clinic"],
    signals: ["Sits close to screen", "Eye rubbing", "Eye alignment concern"],
    goodFor: "Parents who want a child-friendly checkup and practical follow-up guidance.",
  },
];

const serviceBySlug = new Map(services.map((service) => [service.slug, service]));

export function ServiceExplorer() {
  const [activeId, setActiveId] = useState(pathways[0].id);
  const activePathway = useMemo(
    () => pathways.find((pathway) => pathway.id === activeId) ?? pathways[0],
    [activeId],
  );

  const activeServices = activePathway.serviceSlugs
    .map((slug) => serviceBySlug.get(slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <section className="service-explorer care-pathway-explorer" id="service-explorer">
      <div className="pathway-intro">
        <div>
          <span className="eyebrow">Service Explorer</span>
          <h2>Choose the care pathway that matches the patient&apos;s concern.</h2>
          <p>
            Kabra Eye Hospital covers refractive correction, cataract, retina, glaucoma, cornea,
            squint, neuro ophthalmology, and children&apos;s eye care. This section groups those
            services into patient-friendly routes.
          </p>
        </div>
        <div className="pathway-proof">
          <BadgeCheck size={22} aria-hidden />
          <strong>SEO-safe service URLs preserved</strong>
          <span>Each pathway links back to the migrated WordPress service pages.</span>
        </div>
      </div>

      <div className="pathway-tabs" aria-label="Care pathway selector">
        {pathways.map((pathway) => (
          <button
            className={pathway.id === activeId ? "active" : ""}
            key={pathway.id}
            onClick={() => setActiveId(pathway.id)}
            type="button"
          >
            {pathway.label}
          </button>
        ))}
      </div>

      <div className="pathway-stage">
        <div className="pathway-image">
          <Image
            src={activePathway.image}
            alt={activePathway.imageAlt}
            width={1200}
            height={820}
            priority={activePathway.id === "vision"}
          />
          <span>{activePathway.source}</span>
        </div>

        <div className="pathway-panel">
          <Search size={28} aria-hidden />
          <h3>{activePathway.headline}</h3>
          <p>{activePathway.description}</p>

          <div className="signal-grid">
            {activePathway.signals.map((signal) => (
              <span key={signal}>
                <CheckCircle2 size={16} aria-hidden />
                {signal}
              </span>
            ))}
          </div>

          <div className="pathway-note">
            <ShieldCheck size={19} aria-hidden />
            <p>{activePathway.goodFor}</p>
          </div>

          <div className="linked-services">
            {activeServices.map((service) => {
              const Icon = service.icon;
              return (
                <Link href={`/service/${service.slug}/`} key={service.slug}>
                  <Icon size={20} aria-hidden />
                  <span>{service.shortTitle}</span>
                  <ArrowRight size={16} aria-hidden />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="all-service-map" aria-label="All Kabra Eye Hospital services">
        {services.map((service) => {
          const Icon = service.icon || (service.shortTitle === "ICL/IPCL" ? Eye : Stethoscope);
          return (
            <Link href={`/service/${service.slug}/`} key={service.slug}>
              <Icon size={18} aria-hidden />
              <span>{service.shortTitle}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
