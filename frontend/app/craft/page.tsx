import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "The Craft — Ivory Silk Atelier",
  description:
    "Discover the heritage of 100% Grade 6A Mulberry Silk, 22-momme weight weaves, and European artisanal tailoring.",
};

const CRAFT_IMAGE = "/images/craft-silk.png";

export default function CraftPage() {
  return (
    <div className="shell py-12 lg:py-20">
      <Reveal>
        <div className="max-w-3xl">
          <p className="text-micro text-gold uppercase tracking-[0.25em]">Atelier Craftsmanship</p>
          <h1 className="mt-4 font-display text-4xl font-light tracking-tight text-ink sm:text-5xl lg:text-6xl">
            The Heritage of Organic Mulberry Silk
          </h1>
          <p className="mt-6 text-base leading-relaxed text-smoke font-light">
            At Ivory Silk, every garment represents a harmonious blend of organic silk cultivation, timeless European pattern drafting, and meticulous French-seam tailoring.
          </p>
        </div>
      </Reveal>

      {/* Hero Craft Image */}
      <Reveal delay={0.1}>
        <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden bg-mist border border-line">
          <Image
            src={CRAFT_IMAGE}
            alt="Ivory Silk atelier tailoring process"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Reveal>

      {/* Three Pillars */}
      <section className="mt-16 grid gap-12 border-t border-line pt-16 sm:grid-cols-3 lg:mt-24 lg:pt-20">
        <Reveal delay={0.1}>
          <div>
            <span className="font-display text-4xl font-light text-gold">01</span>
            <h2 className="mt-4 font-display text-2xl font-light text-ink">Grade 6A Raw Silk</h2>
            <p className="mt-3 text-sm leading-relaxed text-smoke font-light">
              We select only long-strand Grade 6A Mulberry silk—the highest quality tier achievable—ensuring smooth luster, natural breathability, and hypoallergenic softness against the skin.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div>
            <span className="font-display text-4xl font-light text-gold">02</span>
            <h2 className="mt-4 font-display text-2xl font-light text-ink">22-Momme Weight</h2>
            <p className="mt-3 text-sm leading-relaxed text-smoke font-light">
              While standard silk garments use lightweight 16-momme fabric, Ivory Silk pieces are woven at 22 to 30-momme density for luxurious opacity, rich drape, and lifelong durability.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div>
            <span className="font-display text-4xl font-light text-gold">03</span>
            <h2 className="mt-4 font-display text-2xl font-light text-ink">French-Seam Tailoring</h2>
            <p className="mt-3 text-sm leading-relaxed text-smoke font-light">
              Every interior edge is finished with enclosed French seams and hand-stitched bias bindings, preventing fraying while creating a smooth interior fit.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Call to action */}
      <section className="mt-20 border-t border-line pt-16 text-center lg:mt-28">
        <Reveal>
          <h2 className="font-display text-3xl font-light tracking-tight text-ink lg:text-4xl">
            Experience the drape of pure silk
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-smoke">
            Explore our curated collections of slip dresses, tailored shirts, and bespoke evening wear.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/shop"
              className="text-micro inline-flex h-12 items-center bg-ink px-10 text-ivory outline-none transition-colors hover:bg-gold uppercase tracking-[0.2em]"
            >
              Shop Atelier Collection
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
