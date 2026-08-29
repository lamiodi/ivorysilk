import crypto from "crypto";
import { config } from "../config/env";

export interface InitializePaystackPayload {
  email: string;
  amountInKobo: number; // Paystack amounts are in subunit (kobo / cents)
  reference: string;
  callbackUrl?: string;
  metadata?: Record<string, any>;
}

export class PaystackService {
  private static secretKey = config.paystack.secretKey;

  /**
   * Initializes a Paystack checkout transaction session
   */
  static async initializeTransaction(payload: InitializePaystackPayload) {
    if (!this.secretKey || this.secretKey.startsWith("sk_test_demo")) {
      // Mock payment URL for demonstration / offline dev
      return {
        status: true,
        message: "Demo Authorization URL generated",
        data: {
          authorization_url: `${config.corsOrigin}/checkout/success?reference=${payload.reference}`,
          access_code: `demo_${Date.now()}`,
          reference: payload.reference,
        },
      };
    }

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: payload.email,
        amount: payload.amountInKobo,
        reference: payload.reference,
        callback_url: payload.callbackUrl || `${config.corsOrigin}/checkout/verify`,
        metadata: payload.metadata,
      }),
    });

    const data = await response.json();
    return data;
  }

  /**
   * Verifies payment status via Paystack API
   */
  static async verifyTransaction(reference: string) {
    if (!this.secretKey || this.secretKey.startsWith("sk_test_demo")) {
      return {
        status: true,
        data: {
          status: "success",
          reference,
          amount: 30000,
          gateway_response: "Successful (Demo)",
        },
      };
    }

    const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
      },
    });

    return await response.json();
  }

  /**
   * Validates Paystack Webhook HMAC SHA512 signature
   */
  static verifyWebhookSignature(signature: string, bodyRaw: string): boolean {
    if (!config.paystack.webhookSecret) return true;
    const hash = crypto
      .createHmac("sha512", config.paystack.webhookSecret)
      .update(bodyRaw)
      .digest("hex");
    return hash === signature;
  }
}
