"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { cn } from "@/lib/utils";

type NavLink = {
  href: string;
  label: string;
  isActive: (
    pathname: string,
    category: string | null,
    collection: string | null,
  ) => boolean;
};

const LINKS: NavLink[] = [
  {
    href: "/shop",
    label: "Shop All",
    isActive: (pathname, category, collection) =>
      pathname === "/shop" && !category && !collection,
  },
  {
    href: "/shop?category=Dresses",
    label: "Dresses",
    isActive: (pathname, category) =>
      pathname === "/shop" && category === "Dresses",
  },
  {
    href: "/shop?category=Blouses+%26+Tops",
    label: "Blouses & Tops",
    isActive: (pathname, category) =>
      pathname === "/shop" && category === "Blouses & Tops",
  },
  {
    href: "/shop?category=Suits+%26+Tailoring",
    label: "Suits & Tailoring",
    isActive: (pathname, category) =>
      pathname === "/shop" && category === "Suits & Tailoring",
  },
  {
    href: "/shop?category=Nightwear+%26+Loungewear",
    label: "Nightwear & Silk Velvet",
    isActive: (pathname, category) =>
      pathname === "/shop" && category === "Nightwear & Loungewear",
  },
  {
    href: "/collections",
    label: "Lookbook Collections",
    isActive: (pathname) => pathname === "/collections",
  },
  {
    href: "/craft",
    label: "The Craft",
    isActive: (pathname) => pathname === "/craft",
  },
];

function NavLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const collection = searchParams.get("collection");

  return (
    <ul className="flex flex-wrap items-center justify-center gap-7 lg:gap-10">
      {LINKS.map((link) => {
        const active = link.isActive(pathname, category, collection);
        return (
          <li key={link.label}>
            <Link
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative inline-flex items-center py-3 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors outline-none",
                active ? "text-ink font-semibold" : "text-smoke hover:text-ink",
              )}
            >
              <span>{link.label}</span>
              {/* Luxury gold hover & active underline bar */}
              <span
                className={cn(
                  "absolute bottom-1.5 left-0 h-[1.5px] bg-gold transition-all duration-300 ease-luxe",
                  active
                    ? "w-full opacity-100"
                    : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100",
                )}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function MainNav() {
  return (
    <nav
      aria-label="Secondary Category Navigation"
      className="hidden w-full items-center justify-center border-t border-line/70 bg-ivory/80 py-0.5 md:flex"
    >
      <Suspense fallback={<div className="h-10 w-96 animate-pulse bg-mist" />}>
        <NavLinks />
      </Suspense>
    </nav>
  );
}
