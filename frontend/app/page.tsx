import type { Metadata } from "next";
import { HomePreloader } from "@/components/motion/home-preloader";
import { Reveal } from "@/components/motion/reveal";
import { Benefits } from "@/features/home/components/benefits";
import { CategoryIndex } from "@/features/home/components/category-index";
import { CreatorSpotlight } from "@/features/home/components/creator-spotlight";
import { FeaturedCollections } from "@/features/home/components/featured-collections";
import { Hero } from "@/features/home/components/hero";
import { JournalTeaser } from "@/features/home/components/journal-teaser";
import { NewsletterForm } from "@/features/home/components/newsletter-form";
import { ProductRail } from "@/features/home/components/product-rail";
import { Testimonials } from "@/features/home/components/testimonials";
import {
  getEditorsPicks,
  getNewArrivals,
  getTrending,
} from "@/features/products/queries";

export const metadata: Metadata = {
  title: "Ivory Silk Collective — Premium Digital Products",
  description:
    "Templates, presets, fonts and brand systems from independent studios. Curated for craft, delivered instantly, licensed for your work.",
};

export default function HomePage() {
  return (
    <>
      <HomePreloader />
      <Hero />
      <ProductRail
        eyebrow="Just landed"
        title="New arrivals"
        href="/shop?sort=newest"
        products={getNewArrivals()}
      />
      <FeaturedCollections />
      <ProductRail
        eyebrow="Hand-picked"
        title="Editor's picks"
        href="/shop"
        products={getEditorsPicks()}
      />
      <ProductRail
        eyebrow="Most loved"
        title="Trending now"
        href="/shop?sort=best-selling"
        products={getTrending()}
      />
      <CreatorSpotlight />
      <CategoryIndex />
      <Benefits />
      <Testimonials />
      <JournalTeaser />

      <section className="border-t border-line">
        <div className="shell flex flex-col items-center py-16 text-center lg:py-24">
          <Reveal>
            <p className="text-micro text-gold">The dispatch</p>
            <h2 className="mt-3 max-w-lg font-display text-2xl font-light leading-tight tracking-tight text-ink sm:text-3xl lg:text-4xl">
              New pieces, quietly announced
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-smoke">
              One considered email when something worth your attention enters
              the catalog. No noise, ever.
            </p>
            <div className="mt-8 flex justify-center">
              <NewsletterForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
