import { Request, Response } from "express";
import { PaystackService } from "../services/paystack.service";

export class WebhookController {
  /**
   * POST /api/webhooks/paystack
   * Paystack real-time payment notification webhook
   */
  static async handlePaystackWebhook(req: Request, res: Response) {
    try {
      const signature = req.headers["x-paystack-signature"] as string;
      const rawBody = JSON.stringify(req.body);

      // Verify Paystack HMAC SHA512 Signature
      if (signature && !PaystackService.verifyWebhookSignature(signature, rawBody)) {
        return res.status(401).json({
          success: false,
          message: "Invalid webhook signature",
        });
      }

      const event = req.body;

      if (event && event.event === "charge.success") {
        const { reference, amount, customer } = event.data;
        console.log(`[PAYSTACK WEBHOOK SUCCESS] Reference: ${reference}, Amount: ${amount}, Email: ${customer?.email}`);
        
        // In production with DB, update Order status to PAID
      }

      return res.status(200).json({ status: "success", message: "Webhook processed" });
    } catch (error) {
      console.error("[PAYSTACK WEBHOOK ERROR]", error);
      return res.status(500).json({ status: "error", message: (error as Error).message });
    }
  }
}
