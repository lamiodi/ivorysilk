import {
  Crown,
  Package,
  ShieldCheck,
  Truck,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";

const BENEFITS = [
  {
    icon: Crown,
    title: "100% Grade 6A Silk",
    copy: "Organic Mulberry silk woven at 22-momme weight for unmatched softness and luminous sheen.",
  },
  {
    icon: Truck,
    title: "Express Global Delivery",
    copy: "Complimentary white-glove express courier shipping on orders over $300.",
  },
  {
    icon: Package,
    title: "Signature Packaging",
    copy: "Every piece is wrapped in unbleached tissue and delivered in our breathable cotton garment bag.",
  },
  {
    icon: ShieldCheck,
    title: "30-Day Guarantee",
    copy: "Enjoy complimentary exchanges and returns within 30 days of receiving your atelier order.",
  },
];

/** Benefits strip: the four house promises, hairline-divided. */
export function Benefits() {
  return (
    <section className="shell py-12 lg:py-20">
      <div className="grid gap-8 border-t border-line pt-10 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:pt-14">
        {BENEFITS.map((benefit, index) => (
          <Reveal key={benefit.title} delay={index * 0.06}>
            <div>
              <benefit.icon
                size={22}
                weight="light"
                aria-hidden
                className="text-gold"
              />
              <h3 className="mt-4 text-micro text-ink uppercase tracking-[0.14em] font-semibold">{benefit.title}</h3>
              <p className="mt-3 text-[13px] leading-relaxed text-smoke font-light">
                {benefit.copy}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
