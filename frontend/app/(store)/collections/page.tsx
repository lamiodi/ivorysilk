import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { collections } from "@/features/products/data/collections";
import { getFacets } from "@/features/products/queries";

export const metadata: Metadata = {
  title: "Collections — Ivory Silk Atelier",
  description:
    "Curated haute couture and silk collections: Silk Essentials, Atelier Couture, Nightfall Silk, Resort & Riviera, and Bespoke Tailoring.",
};

export default function CollectionsPage() {
  const { collections: facets } = getFacets();
  const counts = new Map(facets.map((facet) => [facet.name, facet.count]));

  return (
    <div className="shell py-8 lg:py-12">
      <nav
        aria-label="Breadcrumb"
        className="text-[11px] uppercase tracking-[0.14em] text-smoke"
      >
        <ol className="flex items-center gap-2">
          <li>
            <Link
              href="/"
              className="outline-none transition-colors hover:text-ink focus-visible:ring-1 focus-visible:ring-ring"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ink">
            Collections
          </li>
        </ol>
      </nav>

      <header className="mt-6 border-b border-line pb-8 lg:mt-8 lg:pb-10">
        <p className="text-micro text-gold uppercase tracking-[0.25em]">Ivory Silk Collections</p>
        <h1 className="mt-2 font-display text-3xl font-light tracking-tight text-ink sm:text-4xl lg:text-5xl">
          The Atelier Lookbook
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-smoke font-light">
          Five curated silk worlds, each designed with artisanal craftsmanship and Grade 6A organic Mulberry silk.
        </p>
      </header>

      <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-14 lg:gap-x-10 lg:gap-y-16">
        {collections.map((collection, index) => {
          const count = counts.get(collection.name) ?? 0;
          return (
            <Reveal key={collection.slug} delay={Math.min(index * 0.05, 0.3)}>
              <Link
                href={`/shop?collection=${encodeURIComponent(collection.name)}`}
                className="group block outline-none"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-mist border border-line">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    priority={index < 2}
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-luxe motion-safe:group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex items-start justify-between gap-4 pt-5">
                  <div>
                    <h2 className="font-display text-2xl font-light tracking-tight text-ink transition-colors group-hover:text-gold group-focus-visible:text-gold">
                      {collection.name}
                    </h2>
                    <p className="mt-1 text-[12px] tracking-[0.04em] text-smoke font-light">
                      {collection.tagline}
                    </p>
                    <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-smoke font-light">
                      {collection.description}
                    </p>
                  </div>
                  <span className="mt-1 shrink-0 text-[11px] tracking-[0.08em] uppercase text-stone">
                    {count} {count === 1 ? "garment" : "garments"}
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
