import { Star } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";
import { getTestimonials } from "@/features/products/data/reviews";

/** Testimonials: three customer voices, set quietly in serif. */
export function Testimonials() {
  const testimonials = getTestimonials();

  return (
    <section className="border-y border-line bg-cream">
      <div className="shell py-12 lg:py-20">
        <Reveal>
          <p className="text-micro text-smoke">Kind words</p>
          <h2 className="mt-2 font-display text-3xl font-light tracking-tight text-ink lg:text-4xl">
            From the collective
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-14">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.author} delay={index * 0.08}>
              <figure className="flex h-full flex-col">
                <div
                  className="flex gap-1 text-gold"
                  aria-label={`${testimonial.rating} out of 5 stars`}
                >
                  {Array.from({ length: testimonial.rating }).map((_, star) => (
                    <Star key={star} size={13} weight="fill" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1">
                  <p className="font-display text-lg font-light leading-relaxed text-ink lg:text-xl">
                    &ldquo;{testimonial.body}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-5 text-[11px] tracking-[0.12em] uppercase text-smoke">
                  {testimonial.author} — {testimonial.location}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
