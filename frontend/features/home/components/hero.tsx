import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";

const HERO_IMAGE = "/images/hero-silk.png";

/**
 * Luxury apparel hero: quiet split composition, oversized serif headline, dual CTAs.
 */
export function Hero() {
  return (
    <section className="shell grid items-center gap-10 py-10 sm:py-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-20">
      <Reveal>
        <div>
          <p className="text-micro text-gold uppercase tracking-[0.25em]">Ivory Silk Atelier</p>
          <h1 className="mt-5 font-display text-4xl font-light leading-[1.05] tracking-tight text-ink sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-7xl">
            Pure Mulberry Silk. Handcrafted Couture.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-smoke font-light">
            Luxury silk garments, tailored blazers, resort wear, and nightwear crafted from Grade 6A organic mulberry silk. Designed for fluid elegance and effortless drape.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              href="/shop"
              className="text-micro inline-flex h-12 items-center justify-center bg-ink px-8 text-ivory outline-none transition-colors hover:bg-gold hover:text-ivory focus-visible:ring-1 focus-visible:ring-ring uppercase tracking-[0.2em] sm:px-10"
            >
              Explore Collection
            </Link>
            <Link
              href="/collections"
              className="text-micro inline-flex h-12 items-center justify-center border border-ink px-8 text-ink outline-none transition-colors hover:bg-ink hover:text-ivory focus-visible:ring-1 focus-visible:ring-ring uppercase tracking-[0.2em] sm:px-10"
            >
              The Atelier Lookbook
            </Link>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="relative aspect-[4/5] overflow-hidden bg-mist border border-line sm:aspect-[3/4] lg:aspect-[3/4]">
          <Image
            src={HERO_IMAGE}
            alt="Haute couture ivory silk gown editorial"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}
