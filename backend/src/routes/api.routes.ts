import { Router } from "express";
import { CollectionController } from "../controllers/collection.controller";
import { OrderController } from "../controllers/order.controller";
import { ProductController } from "../controllers/product.controller";
import { WebhookController } from "../controllers/webhook.controller";

export const apiRouter = Router();

// Health Check
apiRouter.get("/health", (_req, res) => {
  res.status(200).json({
    status: "online",
    service: "Ivory Silk Atelier Production API",
    timestamp: new Date().toISOString(),
  });
});

// Products API
apiRouter.get("/products", ProductController.getProducts);
apiRouter.get("/products/:slug", ProductController.getProductBySlug);

// Collections API
apiRouter.get("/collections", CollectionController.getCollections);
apiRouter.get("/collections/:slug", CollectionController.getCollectionBySlug);

// Checkout & Order API
apiRouter.post("/checkout", OrderController.createCheckout);
apiRouter.post("/orders", OrderController.createCheckout);
apiRouter.get("/orders/verify/:reference", OrderController.verifyOrderPayment);

// Webhook API
apiRouter.post("/webhooks/paystack", WebhookController.handlePaystackWebhook);
