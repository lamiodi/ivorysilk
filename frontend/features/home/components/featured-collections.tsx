import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { collections } from "@/features/products/data/collections";

/** Featured Collections: Editorial card grid highlighting luxury silk collections */
export function FeaturedCollections() {
  const featured = collections.slice(0, 4);

  return (
    <section className="shell py-14 sm:py-16 lg:py-24">
      <Reveal>
        <div className="flex flex-col justify-between gap-4 border-t border-line pt-8 md:flex-row md:items-end lg:pt-10">
          <div>
            <p className="text-micro font-medium text-gold uppercase tracking-[0.2em]">
              Curated Atelier Collections
            </p>
            <h2 className="mt-2 font-display text-2xl font-light tracking-tight text-ink sm:text-[2rem] lg:text-4xl">
              Handcrafted Mulberry Silk & Haute Couture
            </h2>
          </div>
          <Link
            href="/collections"
            className="text-micro self-start text-ink underline decoration-gold underline-offset-8 transition-colors hover:text-gold uppercase tracking-[0.16em] md:self-auto"
          >
            View All Collections →
          </Link>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-8 lg:mt-14 lg:grid-cols-4">
        {featured.map((collection, index) => (
          <Reveal key={collection.slug} delay={index * 0.08}>
            <Link
              href={`/shop?collection=${encodeURIComponent(collection.name)}`}
              className="group block outline-none border border-line bg-cream p-3 transition-colors hover:border-gold"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-mist border border-line">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-luxe motion-safe:group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
                <div className="absolute bottom-3 left-3 right-3 text-ivory">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold-soft">
                    {collection.tagline}
                  </p>
                  <h3 className="font-display text-xl font-light tracking-tight text-ivory">
                    {collection.name}
                  </h3>
                </div>
              </div>

              <div className="pt-3 px-1">
                <p className="text-[12px] leading-relaxed text-smoke line-clamp-2">
                  {collection.description}
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-line pt-2">
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink group-hover:text-gold transition-colors">
                    Explore Collection
                  </span>
                  <span className="text-gold text-xs">→</span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
