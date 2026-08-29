import Image from "next/image";
import Link from "next/link";
import { HeaderActions, HeaderSearchButton } from "./header-actions";
import { MainNav } from "./main-nav";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-ivory shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      {/* 1. Top Luxury Announcement Ticker */}
      <div className="border-b border-ink/15 bg-ink py-2 text-ivory">
        <div className="shell flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.18em] font-light sm:tracking-[0.22em]">
          <span className="hidden text-gold-soft sm:inline-block">
            100% Grade 6A Mulberry Silk
          </span>
          <span className="flex-1 text-center text-ivory/90 line-clamp-1">
            <span className="sm:hidden">Free Express Shipping $300+</span>
            <span className="hidden sm:inline">
              Complimentary White-Glove Courier On Orders Over $300
            </span>
          </span>
          <span className="hidden text-stone md:inline-block">
            Guest Checkout
          </span>
        </div>
      </div>

      {/* 2. Primary Brand Bar (True 3-Column Luxury Layout) */}
      <div className="border-b border-line/80 bg-ivory/95 backdrop-blur-md">
        <div className="shell flex h-16 items-center justify-between gap-2 sm:h-20 sm:gap-4 lg:h-24">
          {/* Left Column (Desktop Search & Mobile Menu) */}
          <div className="flex flex-1 items-center justify-start gap-2 sm:gap-4">
            <MobileMenu />
            <HeaderSearchButton className="hidden min-w-[200px] md:flex lg:min-w-[240px]" />
          </div>

          {/* Center Column: Monogram + Handwritten Atelier Wordmark */}
          <div className="flex shrink-0 items-center justify-center gap-2 text-center sm:gap-3">
            <Link
              href="/"
              aria-label="Atelier — home"
              className="group flex items-center justify-center gap-2 text-center outline-none transition-transform duration-300 hover:scale-[1.01] sm:gap-2.5"
            >
              <Image
                src="/logo.png"
                alt=""
                width={48}
                height={48}
                priority
                className="h-7 w-7 shrink-0 transition-opacity duration-300 group-hover:opacity-80 sm:h-9 sm:w-9 lg:h-11 lg:w-11"
              />
              <span
                className="font-script text-base italic leading-none text-ink transition-colors group-hover:text-gold sm:text-lg lg:text-xl"
                style={{ fontFamily: "var(--font-script, 'Caveat', 'Dancing Script', cursive)" }}
              >
                atelier
              </span>
            </Link>
          </div>

          {/* Right Column: Actions (Wishlist & Shopping Bag) */}
          <div className="flex flex-1 items-center justify-end">
            <HeaderActions />
          </div>
        </div>
      </div>

      {/* 3. Secondary Editorial Category Ribbon */}
      <MainNav />
    </header>
  );
}
