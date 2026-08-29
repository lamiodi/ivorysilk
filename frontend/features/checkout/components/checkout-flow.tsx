"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Bank,
  Check,
  CreditCard,
  DeviceMobile,
  LockKey,
  PlusCircle,
  ShieldCheck,
  Spinner,
  Truck,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { products } from "@/features/products/data/products";
import { submitCheckoutToBackend } from "@/lib/api-client";
import { bag, useBagItems } from "@/lib/commerce-store";
import { cn } from "@/lib/utils";
import { COUNTRIES, checkoutSchema, type CheckoutValues } from "../schema";

const formatUsd = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

type Step = "information" | "payment";
type PaymentMethod = "card" | "apple_pay" | "bank_transfer" | "paystack";

export function CheckoutFlow() {
  const router = useRouter();
  const bagItems = useBagItems();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>("information");
  const [customer, setCustomer] = useState<CheckoutValues | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  useEffect(() => setMounted(true), []);

  const cartEntries = bagItems
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return null;
      return { ...item, product };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  const subtotal = cartEntries.reduce(
    (sum, entry) => sum + entry.product.price * entry.quantity,
    0,
  );
  const shippingFee = subtotal >= 300 || subtotal === 0 ? 0 : 25;
  const total = subtotal + shippingFee;

  // Checkout product suggestions (items not currently in cart)
  const currentItemIds = new Set(cartEntries.map((e) => e.product.id));
  const suggestedProducts = products
    .filter((p) => !currentItemIds.has(p.id))
    .slice(0, 2);

  const addCheckoutAddon = (prodId: string) => {
    const targetProduct = products.find((p) => p.id === prodId);
    if (!targetProduct) return;
    const defaultSize = targetProduct.sizes[0] || "S";
    const defaultColor = targetProduct.colors[0]?.name || "Ivory Cream";
    bag.addItem(targetProduct.id, defaultSize, defaultColor, 1);
    toast.success(`Added ${targetProduct.name} to order`, {
      description: `Size ${defaultSize} • ${defaultColor}`,
    });
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      phone: "",
    },
  });

  const country = watch("country");

  const submitInformation = handleSubmit((values) => {
    setCustomer(values);
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const handleCompletePayment = async () => {
    if (!customer) {
      toast.error("Customer details required");
      setStep("information");
      return;
    }

    setIsProcessing(true);

    try {
      const orderPayload = {
        customer,
        items: cartEntries.map((entry) => ({
          id: entry.id,
          name: entry.product.name,
          creator: entry.product.creator,
          category: entry.product.category,
          size: entry.size,
          color: entry.color,
          price: entry.product.price,
          quantity: entry.quantity,
          image: entry.product.image,
        })),
        subtotal,
        shippingFee,
        total,
        paymentMethod,
      };

      const backendResponse = await submitCheckoutToBackend(orderPayload);
      const orderNumber =
        backendResponse?.data?.orderNumber ||
        `IS-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderReference =
        backendResponse?.data?.reference || `REF_${orderNumber}_${Date.now()}`;

      const finalOrder = {
        orderNumber,
        reference: orderReference,
        customer,
        items: orderPayload.items,
        subtotal,
        shippingFee,
        total,
        paymentMethod,
        createdAt: new Date().toISOString(),
        status: "CONFIRMED",
      };

      // Persist order in sessionStorage for instant retrieval on the confirmation page
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(
          `order_${orderReference}`,
          JSON.stringify(finalOrder),
        );
        window.sessionStorage.setItem(
          "latest_order",
          JSON.stringify(finalOrder),
        );
      }

      // Clear the shopping bag
      bag.clear();

      toast.success("Payment authorized successfully", {
        description: `Order ${orderNumber} is confirmed.`,
      });

      router.push(`/order/success/${encodeURIComponent(orderReference)}`);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment authorization failed. Please try again.");
      setIsProcessing(false);
    }
  };

  if (!mounted) {
    return (
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full rounded-none" />
          ))}
        </div>
        <Skeleton className="h-72 w-full rounded-none" />
      </div>
    );
  }

  if (cartEntries.length === 0 && !isProcessing) {
    return (
      <div className="flex flex-col items-start gap-5 py-16 lg:py-24">
        <p className="text-micro text-smoke">Your shopping bag is empty</p>
        <p className="max-w-md font-display text-2xl font-light leading-snug text-ink lg:text-3xl">
          Discover our Mulberry Silk & Atelier Couture collections.
        </p>
        <Link
          href="/shop"
          className="text-micro inline-flex h-11 items-center border border-ink px-8 text-ink outline-none transition-colors hover:bg-ink hover:text-ivory focus-visible:ring-1 focus-visible:ring-ring uppercase tracking-[0.2em]"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      {/* Left: steps */}
      <div>
        {/* Step indicator */}
        <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 text-micro">
          <li
            aria-current={step === "information" ? "step" : undefined}
            className={cn(
              "flex items-center gap-2",
              step === "information" ? "text-ink font-semibold" : "text-stone",
            )}
          >
            <StepDot state={step === "payment" ? "done" : "active"} /> <span className="whitespace-nowrap">Delivery</span>
          </li>
          <li aria-hidden="true" className="hidden h-px w-8 bg-line sm:block" />
          <li
            aria-current={step === "payment" ? "step" : undefined}
            className={cn(
              "flex items-center gap-2",
              step === "payment" ? "text-ink font-semibold" : "text-stone",
            )}
          >
            <StepDot state={step === "payment" ? "active" : "idle"} /> <span className="whitespace-nowrap">Payment</span>
          </li>
        </ol>

        {step === "information" ? (
          <form
            onSubmit={submitInformation}
            noValidate
            className="mt-8 flex flex-col gap-6"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="First Name" error={errors.firstName?.message} htmlFor="firstName">
                <Input
                  id="firstName"
                  autoComplete="given-name"
                  aria-invalid={Boolean(errors.firstName)}
                  className="h-12 rounded-none border-line text-sm"
                  {...register("firstName")}
                />
              </Field>
              <Field label="Last Name" error={errors.lastName?.message} htmlFor="lastName">
                <Input
                  id="lastName"
                  autoComplete="family-name"
                  aria-invalid={Boolean(errors.lastName)}
                  className="h-12 rounded-none border-line text-sm"
                  {...register("lastName")}
                />
              </Field>
            </div>

            <Field label="Email Address" error={errors.email?.message} htmlFor="email">
              <Input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                className="h-12 rounded-none border-line text-sm"
                {...register("email")}
              />
              <p className="mt-2 text-[11px] leading-relaxed text-smoke">
                Order confirmation, white-glove dispatch tracking, and receipt will be sent to this email address.
              </p>
            </Field>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Destination Country" error={errors.country?.message} htmlFor="country">
                <Select
                  value={country}
                  onValueChange={(value) =>
                    setValue("country", String(value), { shouldValidate: true })
                  }
                >
                  <SelectTrigger
                    id="country"
                    aria-invalid={Boolean(errors.country)}
                    className="h-12 w-full rounded-none border-line text-sm normal-case tracking-normal"
                  >
                    <SelectValue placeholder="Select destination country" />
                  </SelectTrigger>
                  <SelectContent
                    alignItemWithTrigger={false}
                    className="rounded-none"
                  >
                    {COUNTRIES.map((name) => (
                      <SelectItem key={name} value={name} className="text-[13px]">
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field
                label="Phone"
                error={errors.phone?.message}
                htmlFor="phone"
              >
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.phone)}
                  className="h-12 rounded-none border-line text-sm"
                  {...register("phone")}
                />
              </Field>
            </div>

            <div className="rounded-none bg-mist p-4 border border-line flex items-center gap-3">
              <Truck size={20} weight="light" className="text-gold shrink-0" />
              <p className="text-[12px] text-smoke">
                Orders are packaged in our signature Ivory Silk cotton garment box with complimentary white-glove courier shipping.
              </p>
            </div>

            <Button
              type="submit"
              className="mt-2 h-12 w-full rounded-none text-micro sm:w-fit sm:px-12 uppercase tracking-[0.2em] bg-ink text-ivory hover:bg-gold transition-colors cursor-pointer"
            >
              Continue to Payment
            </Button>
          </form>
        ) : (
          <div className="mt-8 flex flex-col gap-8">
            {/* Delivery Details Summary Card */}
            <div className="border border-line bg-cream p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                <p className="text-micro text-smoke">Deliver to</p>
                <button
                  type="button"
                  onClick={() => setStep("information")}
                  className="text-[11px] tracking-[0.06em] text-gold underline decoration-gold underline-offset-4 outline-none transition-colors hover:text-ink cursor-pointer"
                >
                  Edit details
                </button>
              </div>
              <p className="mt-2 break-words text-sm text-ink font-medium">
                <span>
                  {customer?.firstName} {customer?.lastName}
                </span>{" "}
                <span aria-hidden="true" className="text-stone">—</span>{" "}
                <span className="break-all">{customer?.email}</span>
              </p>
              <p className="mt-1 text-[12px] text-smoke">
                {customer?.country} • {customer?.phone || "No phone provided"}
              </p>
            </div>

            {/* Payment Method Selector */}
            <div>
              <h2 className="flex items-center gap-2 text-micro text-ink font-semibold uppercase tracking-[0.16em]">
                <LockKey size={14} weight="light" aria-hidden />
                Select Payment Method
              </h2>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    id: "card",
                    title: "Credit / Debit Card",
                    icon: CreditCard,
                    description: "Visa, Mastercard, Amex",
                  },
                  {
                    id: "apple_pay",
                    title: "Apple Pay / Digital",
                    icon: DeviceMobile,
                    description: "Instant express checkout",
                  },
                  {
                    id: "bank_transfer",
                    title: "Bank Wire Transfer",
                    icon: Bank,
                    description: "Direct atelier wire transfer",
                  },
                  {
                    id: "paystack",
                    title: "Paystack Gateway",
                    icon: ShieldCheck,
                    description: "NGN & International cards",
                  },
                ].map((method) => {
                  const isSelected = paymentMethod === method.id;
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                      className={cn(
                        "flex items-start gap-3 border p-4 text-left transition-all cursor-pointer",
                        isSelected
                          ? "border-ink bg-ivory ring-1 ring-ink"
                          : "border-line bg-white hover:border-ink hover:bg-mist",
                      )}
                    >
                      <Icon
                        size={20}
                        weight="light"
                        className={cn("mt-0.5 shrink-0", isSelected ? "text-gold" : "text-smoke")}
                      />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-ink">
                          {method.title}
                        </p>
                        <p className="mt-0.5 text-[11px] text-smoke">
                          {method.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Card Inputs if Card is selected */}
              {paymentMethod === "card" && (
                <div className="mt-5 border border-line bg-white p-4 space-y-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-smoke font-medium block mb-1.5">
                      Card Number
                    </label>
                    <Input
                      type="text"
                      placeholder="4000 1234 5678 9010"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength={19}
                      className="h-11 w-full rounded-none border-line text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-smoke font-medium block mb-1.5">
                        Expiry Date
                      </label>
                      <Input
                        type="text"
                        placeholder="MM / YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        maxLength={5}
                        className="h-11 w-full rounded-none border-line text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-smoke font-medium block mb-1.5">
                        Security Code (CVC)
                      </label>
                      <Input
                        type="password"
                        placeholder="123"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        maxLength={4}
                        className="h-11 w-full rounded-none border-line text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Security & Guarantee Note */}
              <div className="mt-5 rounded-none bg-mist p-4 border border-line flex items-center gap-3">
                <ShieldCheck size={20} weight="light" className="text-gold shrink-0" />
                <p className="text-[11px] leading-relaxed text-smoke">
                  All transactions are encrypted with 256-bit SSL security. Your financial information is never stored on our servers.
                </p>
              </div>

              {/* Action Button */}
              <Button
                type="button"
                onClick={handleCompletePayment}
                disabled={isProcessing}
                className="mt-6 h-12 w-full rounded-none text-micro sm:w-fit sm:px-12 uppercase tracking-[0.2em] bg-ink text-ivory hover:bg-gold transition-colors cursor-pointer flex items-center justify-center gap-2 whitespace-normal text-center"
              >
                {isProcessing ? (
                  <>
                    <Spinner size={16} className="animate-spin shrink-0" />
                    <span>Authorizing Payment...</span>
                  </>
                ) : (
                  <span>Complete Payment — {formatUsd(total)}</span>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Right: order summary & checkout suggestions */}
      <aside
        aria-label="Order summary"
        className="h-fit border border-line bg-cream p-4 sm:p-6 lg:sticky lg:top-24"
      >
        <h2 className="text-micro text-ink uppercase tracking-[0.18em]">
          Order Summary ({cartEntries.length} {cartEntries.length === 1 ? "garment" : "garments"})
        </h2>
        <ul className="mt-5 flex flex-col gap-4 divide-y divide-line">
          {cartEntries.map((entry) => (
            <li key={`${entry.id}-${entry.size}-${entry.color}`} className="flex gap-3 pt-4 first:pt-0 sm:gap-4">
              <div className="relative aspect-[3/4] w-16 shrink-0 overflow-hidden bg-mist border border-line">
                <Image
                  src={entry.product.image}
                  alt={entry.product.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="truncate text-[12px] font-medium uppercase tracking-[0.1em] text-ink">
                  {entry.product.name}
                </p>
                <p className="mt-0.5 text-[11px] text-gold font-medium">
                  {entry.product.creator}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-smoke">
                  <span>Size: <strong className="text-ink">{entry.size}</strong></span>
                  {entry.color && (
                    <span>Color: <strong className="text-ink">{entry.color}</strong></span>
                  )}
                  <span>Qty: <strong className="text-ink">{entry.quantity}</strong></span>
                </div>
              </div>
              <p className="shrink-0 text-[12px] tracking-[0.04em] text-ink font-medium">
                {formatUsd(entry.product.price * entry.quantity)}
              </p>
            </li>
          ))}
        </ul>

        <dl className="mt-6 border-t border-line pt-5 text-[13px]">
          <div className="flex justify-between py-1">
            <dt className="text-smoke">Garments Subtotal</dt>
            <dd className="text-ink font-medium">{formatUsd(subtotal)}</dd>
          </div>
          <div className="flex justify-between py-1">
            <dt className="text-smoke">Express Courier Shipping</dt>
            <dd className="text-ink">
              {shippingFee === 0 ? (
                <span className="text-gold font-medium">Complimentary</span>
              ) : (
                formatUsd(shippingFee)
              )}
            </dd>
          </div>
          <div className="mt-3 flex justify-between border-t border-line pt-4">
            <dt className="text-micro text-ink uppercase tracking-wider font-semibold">Total</dt>
            <dd className="font-display text-xl font-medium text-ink">
              {formatUsd(total)}
            </dd>
          </div>
        </dl>

        {/* Mandatory Checkout Product Recommendations */}
        {suggestedProducts.length > 0 && (
          <div className="mt-8 border-t border-line pt-5">
            <p className="text-micro text-ink font-semibold uppercase tracking-[0.16em]">
              Frequently Added Atelier Accents
            </p>
            <div className="mt-3 flex flex-col gap-3">
              {suggestedProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between border border-line bg-white p-2.5"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="relative aspect-square w-10 shrink-0 overflow-hidden bg-mist border border-line">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-medium uppercase tracking-wider text-ink">
                        {p.name}
                      </p>
                      <p className="text-[10px] text-gold font-medium">
                        {formatUsd(p.price)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => addCheckoutAddon(p.id)}
                    className="inline-flex shrink-0 items-center gap-1 text-[10px] uppercase font-semibold text-ink hover:text-gold transition-colors px-2 py-1 border border-line bg-mist cursor-pointer whitespace-nowrap"
                  >
                    <PlusCircle size={12} weight="bold" />
                    <span>Add</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

function StepDot({ state }: { state: "idle" | "active" | "done" }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-5 place-items-center border text-[10px]",
        state === "active" && "border-ink bg-ink text-ivory",
        state === "done" && "border-gold bg-gold text-ivory",
        state === "idle" && "border-line text-stone",
      )}
    >
      {state === "done" ? <Check size={11} weight="bold" /> : null}
    </span>
  );
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-micro mb-2 block text-ink font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-2 text-[12px] text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
