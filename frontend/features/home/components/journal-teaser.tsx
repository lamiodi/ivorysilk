import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

const ENTRIES = [
  {
    title: "The case for the quiet launch",
    excerpt:
      "Why our first atelier collection shipped without a countdown timer, and what happened to demand when we prioritized craftsmanship over speed.",
    date: "August 2026",
    image: "/images/journal-1.png",
  },
  {
    title: "Inside Atelier Marais",
    excerpt:
      "A two-person Paris atelier on drafting silk patterns that drape fluidly across every silhouette.",
    date: "July 2026",
    image: "/images/journal-2.png",
  },
];

/**
 * Journal teaser: the editorial voice of the house.
 */
export function JournalTeaser() {
  return (
    <section className="shell py-12 lg:py-20">
      <Reveal>
        <div className="flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6 lg:pt-10">
          <div>
            <p className="text-micro text-gold uppercase tracking-[0.2em]">The Journal</p>
            <h2 className="mt-2 font-display text-3xl font-light tracking-tight text-ink lg:text-4xl">
              Notes from the atelier
            </h2>
          </div>
          <p className="hidden text-[11px] tracking-[0.08em] uppercase text-stone sm:block">
            Edition IV
          </p>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:mt-12 lg:gap-12">
        {ENTRIES.map((entry, index) => (
          <Reveal key={entry.title} delay={index * 0.08}>
            <article>
              <div className="relative aspect-[4/3] overflow-hidden bg-mist border border-line">
                <Image
                  src={entry.image}
                  alt={entry.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-5 text-[11px] tracking-[0.12em] uppercase text-stone">
                {entry.date}
              </p>
              <h3 className="mt-2 font-display text-2xl font-light tracking-tight text-ink">
                {entry.title}
              </h3>
              <p className="mt-3 max-w-md text-[13px] leading-relaxed text-smoke font-light">
                {entry.excerpt}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
