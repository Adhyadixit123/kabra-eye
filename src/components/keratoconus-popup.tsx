"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarCheck, ShieldCheck, X } from "lucide-react";
import { site } from "@/data/site";

const storageKey = "kabra-keratoconus-popup-dismissed";

export function KeratoconusPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem(storageKey) === "true") return;

    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, 1600);

    return () => window.clearTimeout(timer);
  }, []);

  function dismissPopup() {
    window.localStorage.setItem(storageKey, "true");
    setIsVisible(false);
  }

  if (!isVisible) return null;

  return (
    <aside
      className="keratoconus-popup"
      aria-labelledby="keratoconus-popup-title"
      aria-live="polite"
    >
      <button
        className="keratoconus-popup-close"
        type="button"
        onClick={dismissPopup}
        aria-label="Close keratoconus notice"
      >
        <X size={17} aria-hidden />
      </button>
      <div className="keratoconus-popup-icon" aria-hidden>
        <ShieldCheck size={24} />
      </div>
      <div className="keratoconus-popup-copy">
        <span>Keratoconus Treatment in Jaipur</span>
        <h2 id="keratoconus-popup-title">Changing glasses number or high cylinder?</h2>
        <p>
          Since 1990, Kabra Eye Hospital has built a hospital-based cornea pathway for keratoconus
          screening, corneal mapping, C3R/CXL planning, and follow-up in Sodala, Jaipur. Kabra&apos;s
          verified technology distinction includes Schwind Amaris no-touch Trans PRK for eligible
          refractive patients.
        </p>
      </div>
      <div className="keratoconus-popup-actions">
        <Link href="/keratoconus/" onClick={dismissPopup}>
          Keratoconus care
          <ArrowRight size={16} aria-hidden />
        </Link>
        <a href={site.whatsapp} onClick={dismissPopup}>
          <CalendarCheck size={16} aria-hidden />
          Book consult
        </a>
      </div>
    </aside>
  );
}
