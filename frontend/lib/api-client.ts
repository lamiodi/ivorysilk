import { products as fallbackProducts } from "@/features/products/data/products";
import type { Product } from "@/features/products/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function fetchProductsFromBackend(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return json.data || fallbackProducts;
  } catch (error) {
    console.warn("Backend API unavailable, using local mock dataset:", error);
    return fallbackProducts;
  }
}

export async function fetchProductBySlugFromBackend(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return json.data || fallbackProducts.find((p) => p.slug === slug) || null;
  } catch (error) {
    console.warn("Backend API unavailable, using local mock dataset:", error);
    return fallbackProducts.find((p) => p.slug === slug) || null;
  }
}

export type CheckoutPayload = {
  customer: Record<string, unknown>;
  items: Array<Record<string, unknown>>;
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: string;
};

export async function submitCheckoutToBackend(checkoutData: CheckoutPayload) {
  try {
    const res = await fetch(`${API_BASE_URL}/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(checkoutData),
    });
    return await res.json();
  } catch (error) {
    console.warn("Backend API offline, operating in guest simulation mode:", error);
    return {
      success: true,
      message: "Order placed in demonstration mode",
      data: {
        orderNumber: `IS-${Math.floor(100000 + Math.random() * 900000)}`,
        status: "PENDING",
      },
    };
  }
}
