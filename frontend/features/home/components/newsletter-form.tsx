"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const newsletterSchema = z.object({
  email: z.email("Enter a valid email address"),
});

type NewsletterValues = z.infer<typeof newsletterSchema>;

/**
 * Minimal premium signup. Frontend-only for now — the submit handler is the
 * single seam where the email provider (Resend/Mailchimp) will attach.
 */
export function NewsletterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = handleSubmit(async ({ email }) => {
    // Phase: email provider integration attaches here.
    await new Promise((resolve) => setTimeout(resolve, 400));
    toast("You're on the list", {
      description: `Dispatches will arrive at ${email}.`,
    });
    reset();
  });

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-md">
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-0">
        <Input
          type="email"
          autoComplete="email"
          placeholder="Your email address"
          aria-label="Email address"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "newsletter-error" : undefined}
          className="h-12 w-full flex-1 rounded-none border-ink bg-transparent text-sm placeholder:text-stone sm:rounded-r-none"
          {...register("email")}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 shrink-0 rounded-none bg-ink px-8 text-micro text-ivory uppercase tracking-[0.2em] transition-colors hover:bg-gold focus-visible:ring-2 focus-visible:ring-gold sm:rounded-l-none"
        >
          {isSubmitting ? "Joining" : "Subscribe"}
        </Button>
      </div>
      {errors.email && (
        <p id="newsletter-error" role="alert" className="mt-2 text-[12px] text-destructive">
          {errors.email.message}
        </p>
      )}
    </form>
  );
}
