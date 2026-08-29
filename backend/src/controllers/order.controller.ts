import { Request, Response } from "express";
import { PaystackService } from "../services/paystack.service";

export class OrderController {
  /**
   * POST /api/checkout
   * Creates an order record and initializes a Paystack Checkout session
   */
  static async createCheckout(req: Request, res: Response) {
    try {
      const { customer, items, shippingFee = 0 } = req.body;

      if (!customer || !customer.email || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid order payload. Customer email and items array are required.",
        });
      }

      const orderNumber = `IS-${Math.floor(100000 + Math.random() * 900000)}`;
      const reference = `REF_${orderNumber}_${Date.now()}`;

      const subtotal = items.reduce(
        (sum: number, item: any) => sum + (item.price || 0) * (item.quantity || 1),
        0,
      );

      const total = subtotal + shippingFee;
      const amountInKobo = Math.round(total * 100);

      // Initialize Paystack payment session
      const paystackRes = await PaystackService.initializeTransaction({
        email: customer.email,
        amountInKobo,
        reference,
        metadata: {
          orderNumber,
          customerName: `${customer.firstName} ${customer.lastName}`,
          country: customer.country,
        },
      });

      return res.status(201).json({
        success: true,
        message: "Order initialized successfully",
        data: {
          orderNumber,
          reference,
          subtotal,
          shippingFee,
          total,
          status: "PENDING",
          authorizationUrl: paystackRes?.data?.authorization_url || null,
          accessCode: paystackRes?.data?.access_code || null,
          customer,
          items,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to process checkout order",
        error: (error as Error).message,
      });
    }
  }

  /**
   * GET /api/orders/verify/:reference
   */
  static async verifyOrderPayment(req: Request, res: Response) {
    try {
      const { reference } = req.params;
      const verification = await PaystackService.verifyTransaction(reference);

      return res.status(200).json({
        success: true,
        data: verification,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to verify transaction",
        error: (error as Error).message,
      });
    }
  }
}
