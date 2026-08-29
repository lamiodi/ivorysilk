import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
  supabase: {
    url: process.env.SUPABASE_URL || "",
    anonKey: process.env.SUPABASE_ANON_KEY || "",
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  },
  paystack: {
    secretKey: process.env.PAYSTACK_SECRET_KEY || "sk_test_demo",
    publicKey: process.env.PAYSTACK_PUBLIC_KEY || "pk_test_demo",
    webhookSecret: process.env.PAYSTACK_WEBHOOK_SECRET || "whsec_demo",
  },
  appUrl: process.env.APP_URL || "http://localhost:5000",
};
