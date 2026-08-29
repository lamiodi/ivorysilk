"use client";

import { List } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const LINKS = [
  { href: "/shop", label: "Shop All", detail: "The complete catalog" },
  { href: "/shop?category=Dresses", label: "Dresses", detail: "Mulberry silk slips & gowns" },
  { href: "/shop?category=Blouses+%26+Tops", label: "Blouses & Tops", detail: "Silk crepe & shirts" },
  { href: "/shop?category=Suits+%26+Tailoring", label: "Tailoring", detail: "Double-breasted blazers & sets" },
  { href: "/collections", label: "Lookbook", detail: "Five curated silk worlds" },
  { href: "/craft", label: "The Craft", detail: "Grade 6A Mulberry heritage" },
  { href: "/wishlist", label: "Wishlist", detail: "Saved pieces" },
];

/** Mobile navigation: a left sheet with full atelier links and details. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on navigation.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <button
            type="button"
            aria-label="Open menu"
            className="grid size-9 cursor-pointer place-items-center text-ink outline-none transition-colors hover:text-gold focus-visible:ring-1 focus-visible:ring-ring md:hidden"
          />
        }
      >
        <List size={20} weight="light" aria-hidden />
      </SheetTrigger>
      <SheetContent side="left" className="flex h-full w-[86vw] max-w-sm flex-col gap-0 bg-ivory p-0">
        <SheetHeader className="border-b border-line p-5">
          <SheetTitle className="font-display text-sm font-medium uppercase tracking-[0.25em] text-ink">
            Ivory Silk Atelier
          </SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-4">
          <ul className="flex flex-col divide-y divide-line">
            {LINKS.map((link) => (
              <li key={link.label} className="py-2.5 first:pt-0">
                <Link
                  href={link.href}
                  className="group flex flex-col outline-none transition-colors focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <span className="font-display text-2xl font-light tracking-tight text-ink transition-colors group-hover:text-gold">
                    {link.label}
                  </span>
                  <span className="text-[11px] font-light tracking-wide text-smoke">
                    {link.detail}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-line bg-mist p-5 text-center">
          <p className="text-micro text-gold uppercase tracking-[0.16em]">
            White-Glove Courier
          </p>
          <p className="mt-1 text-[11px] text-smoke">
            Complimentary shipping on orders over $300
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
