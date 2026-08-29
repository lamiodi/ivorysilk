import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";
import { getFacets } from "@/features/products/queries";

/** Categories: a quiet editorial index, typography doing the work. */
export function CategoryIndex() {
  const { categories } = getFacets();

  return (
    <section className="shell py-12 lg:py-20">
      <Reveal>
        <div className="border-t border-line pt-8 lg:pt-10">
          <p className="text-micro text-smoke">Categories</p>
          <h2 className="mt-2 font-display text-3xl font-light tracking-tight text-ink lg:text-4xl">
            Browse by craft
          </h2>
        </div>
      </Reveal>

      <nav aria-label="Product categories" className="mt-8 lg:mt-12">
        <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-2">
          {categories.map((category, index) => (
            <Reveal key={category.name} delay={Math.min(index * 0.04, 0.3)}>
              <li>
                <Link
                  href={`/shop?category=${encodeURIComponent(category.name)}`}
                  className="group flex items-baseline justify-between gap-3 border-b border-line py-4 outline-none transition-colors focus-visible:ring-1 focus-visible:ring-ring sm:gap-4"
                >
                  <span className="font-display text-xl font-light tracking-tight text-ink transition-colors group-hover:text-gold group-focus-visible:text-gold lg:text-2xl">
                    {category.name}
                  </span>
                  <span className="flex items-center gap-2 text-[11px] tracking-[0.08em] text-stone">
                    {category.count} {category.count === 1 ? "piece" : "pieces"}
                    <ArrowUpRight
                      size={13}
                      weight="light"
                      aria-hidden
                      className="text-stone transition-all duration-300 ease-luxe group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
                    />
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </nav>
    </section>
  );
}
