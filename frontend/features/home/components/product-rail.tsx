import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ProductGrid } from "@/components/commerce/product-grid";
import { Reveal } from "@/components/motion/reveal";
import type { Product } from "@/features/products/types";

/**
 * Shared homepage rail: section heading, a quiet "view all" link and four
 * pieces. Powers New Arrivals, Editor's Picks and Trending.
 */
export function ProductRail({
  title,
  eyebrow,
  href,
  products,
}: {
  title: string;
  eyebrow: string;
  href: string;
  products: Product[];
}) {
  if (products.length === 0) return null;

  return (
    <section className="shell py-10 sm:py-12 lg:py-20">
      <Reveal>
        <div className="flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6 lg:pt-10">
          <div>
            <p className="text-micro text-smoke">{eyebrow}</p>
            <h2 className="mt-2 font-display text-3xl font-light tracking-tight text-ink lg:text-4xl">
              {title}
            </h2>
          </div>
          <Link
            href={href}
            className="group hidden items-center gap-2 text-micro text-ink outline-none transition-colors hover:text-gold focus-visible:ring-1 focus-visible:ring-ring sm:inline-flex"
          >
            View all
            <ArrowRight
              size={14}
              weight="light"
              aria-hidden
              className="transition-transform duration-300 ease-luxe group-hover:translate-x-1"
            />
          </Link>
        </div>
      </Reveal>
      <div className="mt-8 lg:mt-12">
        <ProductGrid products={products} />
      </div>
      <Link
        href={href}
        className="text-micro mt-8 inline-flex items-center gap-2 text-ink underline decoration-line underline-offset-8 outline-none transition-colors hover:text-gold focus-visible:ring-1 focus-visible:ring-ring sm:hidden"
      >
        View all
        <ArrowRight size={14} weight="light" aria-hidden />
      </Link>
    </section>
  );
}
