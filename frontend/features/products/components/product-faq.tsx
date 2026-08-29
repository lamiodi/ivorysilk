import { Plus } from "@phosphor-icons/react/dist/ssr";
import { PRODUCT_FAQ } from "@/features/products/data/product-details";

/**
 * PDP FAQ: native details/summary, keyboard-accessible by default, hairline
 * rhythm. The plus rotates open via the group-open variant.
 */
export function ProductFaq() {
  return (
    <section aria-labelledby="faq-heading" className="border-t border-line py-12 lg:py-16">
      <h2
        id="faq-heading"
        className="font-display text-2xl font-light tracking-tight text-ink lg:text-3xl"
      >
        Questions, answered
      </h2>

      <div className="mt-8 max-w-2xl">
        {PRODUCT_FAQ.map((item) => (
          <details key={item.question} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[13px] font-medium tracking-[0.02em] text-ink outline-none transition-colors hover:text-gold focus-visible:ring-1 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
              {item.question}
              <Plus
                size={15}
                weight="light"
                aria-hidden
                className="shrink-0 text-smoke transition-transform duration-300 ease-luxe group-open:rotate-45"
              />
            </summary>
            <p className="pb-6 text-[13px] leading-relaxed text-smoke">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
