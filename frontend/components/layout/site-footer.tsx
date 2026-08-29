import Link from "next/link";

const EXPLORE_LINKS = [
  { href: "/shop", label: "Shop All" },
  { href: "/shop?category=Dresses", label: "Silk Dresses" },
  { href: "/shop?category=Blouses+%26+Tops", label: "Blouses & Shirts" },
  { href: "/shop?category=Suits+%26+Tailoring", label: "Tailoring & Blazers" },
  { href: "/collections", label: "Atelier Lookbook" },
  { href: "/wishlist", label: "Saved Pieces" },
];

const ATELIER_LINKS = [
  { href: "/craft", label: "The Craft & Heritage" },
  { href: "/collections", label: "Mulberry Silk Collections" },
  { href: "/shop?sort=newest", label: "New Arrivals" },
  { href: "/shop?sort=best-selling", label: "Bestselling Silhouettes" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-cream">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 sm:gap-12 sm:py-16 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-10 lg:py-20">
        <div>
          <p className="font-display text-sm font-medium uppercase tracking-[0.32em] text-ink">
            Ivory Silk Atelier
          </p>
          <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-smoke font-light">
            An independent luxury fashion house dedicated to handcrafted Mulberry silk garments, bespoke tailoring, and timeless European couture silhouettes.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-gold">
            <span className="border border-line bg-white px-2.5 py-1 text-[10px] uppercase tracking-widest text-ink">
              Grade 6A Mulberry Silk
            </span>
            <span className="border border-line bg-white px-2.5 py-1 text-[10px] uppercase tracking-widest text-ink">
              22-Momme Weight
            </span>
          </div>
        </div>

        <nav aria-label="Explore Catalog">
          <h2 className="text-micro font-semibold text-ink uppercase tracking-[0.2em]">
            The Collections
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[13px] font-light text-smoke outline-none transition-colors hover:text-ink focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Atelier Craft">
          <h2 className="text-micro font-semibold text-ink uppercase tracking-[0.2em]">
            House & Craft
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {ATELIER_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[13px] font-light text-smoke outline-none transition-colors hover:text-ink focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-micro font-semibold text-ink uppercase tracking-[0.2em]">
            Client Concierge
          </h2>
          <p className="mt-4 text-[13px] leading-relaxed font-light text-smoke">
            Complimentary white-glove courier shipping and 30-day atelier exchanges.
          </p>
          <div className="mt-4 flex flex-col gap-1.5 text-xs">
            <span className="text-smoke">Private Inquiries:</span>
            <a
              href="mailto:concierge@ivorysilk.com"
              className="break-all text-[13px] font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:text-gold"
            >
              concierge@ivorysilk.com
            </a>
          </div>
          <p className="mt-4 text-[11px] text-stone">
            Atelier hours: Mon – Sat, 9:00 – 18:00 CET
          </p>
        </div>
      </div>

      <div className="border-t border-line bg-ivory">
        <div className="shell flex flex-col gap-3 py-6 text-[11px] tracking-[0.06em] text-smoke sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p>
            &copy; {new Date().getFullYear()} Ivory Silk Collective Atelier. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>Guest Checkout</span>
            <span aria-hidden="true">•</span>
            <span>White-Glove Courier</span>
            <span aria-hidden="true">•</span>
            <span>100% Organic Silk</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
