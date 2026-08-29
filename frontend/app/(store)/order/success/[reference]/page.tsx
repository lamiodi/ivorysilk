"use client";

import {
  ArrowRight,
  CheckCircle,
  Clock,
  EnvelopeSimple,
  Printer,
  ShieldCheck,
  Truck,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

const formatUsd = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

type OrderItem = {
  id: string;
  name: string;
  creator?: string;
  category?: string;
  size: string;
  color?: string;
  price: number;
  quantity: number;
  image?: string;
};

type OrderRecord = {
  orderNumber: string;
  reference: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    phone?: string;
  };
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: string;
  createdAt: string;
  status: string;
};

export default function OrderSuccessPage() {
  const params = useParams();
  const rawReference = (params?.reference as string) || "";
  const reference = decodeURIComponent(rawReference);

  const [order, setOrder] = useState<OrderRecord | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored =
        window.sessionStorage.getItem(`order_${reference}`) ||
        window.sessionStorage.getItem("latest_order");
      if (stored) {
        try {
          setOrder(JSON.parse(stored));
        } catch {
          // fallback
        }
      }
    }
  }, [reference]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const orderNum = order?.orderNumber || reference.replace("REF_", "").split("_")[0] || "IS-839201";
  const customer = order?.customer || {
    firstName: "Valued",
    lastName: "Client",
    email: "client@ivorysilk.com",
    country: "Nigeria",
    phone: "+234 800 000 0000",
  };

  const items = order?.items || [
    {
      id: "p-aurelle-mulberry-slip-dress",
      name: "The Aurelle Mulberry Silk Slip Dress",
      creator: "Atelier Ivory Silk",
      category: "Dresses",
      size: "S",
      color: "Ivory Cream",
      price: 380,
      quantity: 1,
      image: "/images/products/slip-dress.png",
    },
  ];

  const subtotal = order?.subtotal ?? items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shippingFee = order?.shippingFee ?? (subtotal >= 300 ? 0 : 25);
  const total = order?.total ?? subtotal + shippingFee;

  return (
    <div className="shell py-8 lg:py-16">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="text-[11px] uppercase tracking-[0.14em] text-smoke print:hidden"
      >
        <ol className="flex items-center gap-2">
          <li>
            <Link
              href="/"
              className="outline-none transition-colors hover:text-ink focus-visible:ring-1 focus-visible:ring-ring"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/shop"
              className="outline-none transition-colors hover:text-ink focus-visible:ring-1 focus-visible:ring-ring"
            >
              Shop
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ink">
            Order Confirmation
          </li>
        </ol>
      </nav>

      {/* Confirmation Hero Banner */}
      <div className="mt-8 border-b border-line pb-10 lg:mt-10 lg:pb-14">
        <Reveal>
          <div className="flex items-center gap-3 text-gold">
            <CheckCircle size={28} weight="fill" />
            <span className="text-micro uppercase tracking-[0.24em] font-semibold text-gold">
              Order Confirmed & Secured
            </span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-light tracking-tight text-ink sm:text-4xl sm:leading-tight lg:text-6xl">
            Thank you for your patronage, {customer.firstName}.
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-smoke font-light">
            Your atelier order <strong className="text-ink font-semibold">#{orderNum}</strong> has been received. Our master tailors and packing artisans are preparing your garments with white-glove care.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-smoke">
            <div className="flex min-w-0 flex-1 items-center gap-2 bg-cream px-3.5 py-2 border border-line">
              <EnvelopeSimple size={16} className="text-gold shrink-0" />
              <span className="break-all">
                Sent to <strong className="text-ink">{customer.email}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 bg-cream px-3.5 py-2 border border-line">
              <Clock size={16} className="text-gold shrink-0" />
              <span>
                Dispatch: <strong className="text-ink">1 - 2 Days</strong>
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Order Grid */}
      <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        {/* Left Column: Garments & Delivery info */}
        <div className="flex flex-col gap-10">
          {/* Garments Ordered */}
          <section aria-labelledby="garments-heading">
            <h2 id="garments-heading" className="text-micro text-ink uppercase tracking-[0.2em] font-semibold">
              Garments in this Order ({items.length})
            </h2>

            <ul className="mt-6 flex flex-col divide-y divide-line border-y border-line">
              {items.map((item) => (
                <li key={`${item.id}-${item.size}`} className="flex gap-3 py-6 sm:gap-5">
                  <div className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden bg-mist border border-line sm:w-24">
                    <Image
                      src={item.image || "/images/hero-silk.png"}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 80px, 96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-medium">
                        {item.creator || "Ivory Silk Atelier"}
                      </p>
                      <h3 className="mt-1 break-words font-display text-lg font-light text-ink">
                        {item.name}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-smoke">
                        <span>Size: <strong className="text-ink">{item.size}</strong></span>
                        {item.color && (
                          <span>Color: <strong className="text-ink">{item.color}</strong></span>
                        )}
                        <span>Quantity: <strong className="text-ink">{item.quantity}</strong></span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-y-1 border-t border-line/60 pt-3">
                      <span className="text-[11px] uppercase tracking-wider text-smoke font-light">
                        Grade 6A Mulberry Silk
                      </span>
                      <span className="text-sm font-medium text-ink">
                        {formatUsd(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Delivery & Packaging Details */}
          <section className="grid gap-6 border border-line bg-cream p-4 sm:grid-cols-2 sm:p-6">
            <div>
              <div className="flex items-center gap-2 text-micro text-ink font-semibold uppercase tracking-[0.16em]">
                <Truck size={16} className="text-gold" />
                <span>Delivery Address</span>
              </div>
              <p className="mt-3 text-sm font-medium text-ink">
                {customer.firstName} {customer.lastName}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-smoke">
                {customer.country}
              </p>
              {customer.phone && (
                <p className="mt-1 text-xs text-smoke">Phone: {customer.phone}</p>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 text-micro text-ink font-semibold uppercase tracking-[0.16em]">
                <ShieldCheck size={16} className="text-gold" />
                <span>Atelier White-Glove Courier</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-smoke">
                Your garments are folded in acid-free tissue paper inside our signature Ivory Silk luxury gift box.
              </p>
              <p className="mt-2 text-xs text-gold font-medium">
                Tracking code will activate upon courier collection.
              </p>
            </div>
          </section>
        </div>

        {/* Right Column: Receipt Summary & Actions */}
        <aside aria-label="Order receipt" className="h-fit border border-line bg-cream p-4 sm:p-6 lg:sticky lg:top-24">
          <h2 className="text-micro text-ink uppercase tracking-[0.2em] font-semibold border-b border-line pb-4">
            Payment & Receipt Breakdown
          </h2>

          <dl className="mt-5 space-y-3 text-xs">
            <div className="flex justify-between">
              <dt className="text-smoke">Order Reference</dt>
              <dd className="font-mono text-ink font-semibold">#{orderNum}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-smoke">Status</dt>
              <dd className="text-gold font-semibold uppercase tracking-wider text-[11px]">
                Payment Authorized
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-smoke">Subtotal ({items.length} items)</dt>
              <dd className="text-ink font-medium">{formatUsd(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-smoke">White-Glove Shipping</dt>
              <dd className="text-ink">
                {shippingFee === 0 ? (
                  <span className="text-gold font-medium">Complimentary</span>
                ) : (
                  formatUsd(shippingFee)
                )}
              </dd>
            </div>
            <div className="flex justify-between border-t border-line pt-4 text-sm font-semibold text-ink">
              <dt className="text-micro uppercase tracking-wider">Total Paid</dt>
              <dd className="font-display text-2xl text-ink font-light">
                {formatUsd(total)}
              </dd>
            </div>
          </dl>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3 print:hidden">
            <Button
              type="button"
              onClick={handlePrint}
              variant="outline"
              className="h-11 w-full rounded-none border-ink text-micro text-ink hover:bg-ink hover:text-ivory transition-colors uppercase tracking-[0.18em] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer size={16} />
              <span>Print Official Receipt</span>
            </Button>

            <Link
              href="/shop"
              className="text-micro inline-flex h-11 w-full items-center justify-center bg-ink px-6 text-ivory outline-none transition-colors hover:bg-gold uppercase tracking-[0.2em]"
            >
              <span>Continue Exploring</span>
              <ArrowRight size={14} className="ml-2" />
            </Link>
          </div>

          <div className="mt-6 border-t border-line pt-4 text-center">
            <p className="text-[11px] text-smoke">
              Need assistance? Email concierge at{" "}
              <a
                href="mailto:concierge@ivorysilk.com"
                className="text-ink underline decoration-line hover:text-gold"
              >
                concierge@ivorysilk.com
              </a>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
