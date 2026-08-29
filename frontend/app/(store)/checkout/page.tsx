import type { Metadata } from "next";
import { CheckoutFlow } from "@/features/checkout/components/checkout-flow";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Guest checkout — no account, no password. Just your email.",
};

export default function CheckoutPage() {
  return (
    <div className="shell py-8 lg:py-12">
      <header className="border-b border-line pb-8 lg:pb-10">
        <h1 className="font-display text-4xl font-light tracking-tight text-ink lg:text-5xl">
          Checkout
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-smoke">
          Guest checkout — no account, no password. Your email is how you
          reach your order.
        </p>
      </header>
      <div className="mt-10 lg:mt-14">
        <CheckoutFlow />
      </div>
    </div>
  );
}
