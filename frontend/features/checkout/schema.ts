import { z } from "zod";

/**
 * Guest checkout schema (blueprint §20): name, email, country — no account,
 * no password, no address fields for purely digital goods. Phone optional.
 */
export const checkoutSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.email("Enter a valid email address"),
  country: z.string().min(1, "Select your country"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s()-]{7,20}$/, "Enter a valid phone number")
    .or(z.literal("")),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;

/** Curated country list; the payment provider supplies the full set later. */
export const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Nigeria",
  "Ghana",
  "Kenya",
  "South Africa",
  "Germany",
  "France",
  "Netherlands",
  "Spain",
  "Italy",
  "Portugal",
  "Ireland",
  "Sweden",
  "Denmark",
  "Norway",
  "Finland",
  "Switzerland",
  "Austria",
  "Belgium",
  "Poland",
  "Japan",
  "South Korea",
  "Singapore",
  "United Arab Emirates",
  "India",
  "Brazil",
  "Mexico",
] as const;
