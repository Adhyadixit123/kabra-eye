import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="subpage-hero text-only">
        <div>
          <span>404</span>
          <h1>We could not find that page.</h1>
          <p>
            The page may have moved during the redesign. You can return home, browse services, or
            book an appointment directly.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/">
              Back to Home
            </Link>
            <Link className="secondary-button" href="/services/">
              Browse Services
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

