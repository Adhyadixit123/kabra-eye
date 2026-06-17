import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Menu, Phone } from "lucide-react";
import { nav, quickActions, site } from "@/data/site";

export function Header() {
  return (
    <header className="site-header">
      <div className="top-strip">
        <span>{site.hours}</span>
        <a href={site.phoneHref}>
          <Phone size={15} aria-hidden />
          {site.phone}
        </a>
      </div>
      <div className="nav-wrap">
        <Link className="brand" href="/" aria-label="Kabra Eye Hospital home">
          <Image src={site.logo} alt="Kabra Eye Hospital" width={150} height={90} priority />
          <span>
            <strong>Kabra Eye Hospital</strong>
            <small>Sodala, Ajmer Road, Jaipur</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <details className="mobile-nav">
          <summary aria-label="Open navigation">
            <Menu size={22} aria-hidden />
          </summary>
          <div>
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </details>
        <a className="nav-cta" href="#appointment">
          Book
          <ArrowRight size={16} aria-hidden />
        </a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <h2>Kabra Eye Hospital</h2>
          <p>
            Super-specialty eye care in Jaipur for Trans PRK, cataract, retina, glaucoma,
            cornea, squint, neuro ophthalmology, and children&apos;s eye care.
          </p>
        </div>
        <div>
          <h3>Useful Links</h3>
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <h3>Contact</h3>
          <a href={site.phoneHref}>
            <Phone size={16} aria-hidden />
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`}>
            <Mail size={16} aria-hidden />
            {site.email}
          </a>
          <p>
            <MapPin size={16} aria-hidden />
            {site.address}
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Copyright © 2026 Kabra Eye Hospital. All rights reserved.</span>
        <Link href="/privacy-policy/">Privacy Policy</Link>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <QuickActionBar />
      <Footer />
    </>
  );
}

function QuickActionBar() {
  return (
    <div className="quick-action-bar" aria-label="Quick actions">
      {quickActions.map((action) => {
        const Icon = action.icon;
        return (
          <a key={action.label} href={action.href} title={action.label}>
            <Icon size={18} aria-hidden />
            <span>{action.label}</span>
          </a>
        );
      })}
    </div>
  );
}
