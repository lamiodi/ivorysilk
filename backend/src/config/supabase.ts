import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { config } from "./env";

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (supabaseClient) return supabaseClient;

  if (
    config.supabase.url &&
    config.supabase.url.startsWith("https://") &&
    !config.supabase.url.includes("demo-ivory-silk") &&
    config.supabase.serviceRoleKey
  ) {
    try {
      supabaseClient = createClient(config.supabase.url, config.supabase.serviceRoleKey, {
        auth: { persistSession: false },
      });
      console.log("⚡ Supabase direct client connected successfully.");
      return supabaseClient;
    } catch (err) {
      console.warn("⚠️ Supabase client initialization failed, falling back to mock dataset:", err);
      return null;
    }
  }

  return null;
}
