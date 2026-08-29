import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";
import { getCreators } from "@/features/products/queries";

/** Short studio notes for the spotlighted couture houses. */
const SPOTLIGHT_NOTES: Record<string, string> = {
  "Maison de Soie":
    "Haute couture silk tailoring & liquid draped evening gowns from Paris.",
  "Atelier Ivory":
    "Timeless Mulberry silk shirting and minimalist tailoring crafted in Milan.",
  "Nocturne Silk":
    "Pure 22-momme Mulberry silk nightwear and pyjamas for restorative luxury.",
  "Riviera Silk Co.":
    "Resort wear & vacation silhouettes inspired by the Côte d'Azur.",
};

const SPOTLIGHT_ORDER = [
  "Maison de Soie",
  "Atelier Ivory",
  "Nocturne Silk",
  "Riviera Silk Co.",
];

/** Creator Spotlight: the ateliers behind the luxury catalog. */
export function CreatorSpotlight() {
  const counts = new Map(getCreators().map((creator) => [creator.name, creator.count]));
  const spotlighted = SPOTLIGHT_ORDER.filter((name) => counts.has(name));

  return (
    <section className="border-y border-line bg-cream">
      <div className="shell py-12 lg:py-20">
        <Reveal>
          <p className="text-micro text-gold uppercase tracking-[0.2em]">Atelier Spotlight</p>
          <h2 className="mt-2 max-w-xl font-display text-3xl font-light tracking-tight text-ink lg:text-4xl">
            Artisanal tailoring from European silk houses
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:mt-14 lg:gap-10">
          {spotlighted.map((name, index) => (
            <Reveal key={name} delay={index * 0.08}>
              <div className="flex h-full flex-col border-t border-ink pt-6">
                <h3 className="font-display text-2xl font-light tracking-tight text-ink">
                  {name}
                </h3>
                <p className="mt-3 flex-1 text-[13px] leading-relaxed text-smoke font-light">
                  {SPOTLIGHT_NOTES[name]}
                </p>
                <Link
                  href={`/shop?q=${encodeURIComponent(name)}`}
                  className="group mt-6 inline-flex items-center gap-2 self-start text-micro text-ink outline-none transition-colors hover:text-gold focus-visible:ring-1 focus-visible:ring-ring uppercase tracking-[0.14em]"
                >
                  {counts.get(name)}{" "}
                  {counts.get(name) === 1 ? "garment" : "garments"}
                  <ArrowRight
                    size={14}
                    weight="light"
                    aria-hidden
                    className="transition-transform duration-300 ease-luxe group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
