import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { ContactFormData, NewsletterData, ApiResponse } from "@/types/api";

/**
 * Submit an inquiry from the public site → Supabase `leads` table.
 *
 * - Row-Level Security: schema allows anonymous INSERT, denies anonymous SELECT.
 *   So leads land safely; only authenticated admins can read them.
 * - Honeypot: real users leave hp_company_website empty. Bots fill it → we silently
 *   pretend success so they stop retrying, but write nothing.
 */
export async function submitContactForm(data: ContactFormData): Promise<ApiResponse> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      message: "Form is not connected yet. Please email sales@vexaled.com directly.",
    };
  }

  // Honeypot tripped — pretend success so the bot doesn't loop.
  if (data.hp_company_website && data.hp_company_website.trim() !== "") {
    return { success: true, message: "Thanks — we'll be in touch within 48 hours." };
  }

  if (!data.name?.trim() || !data.email?.trim()) {
    return { success: false, message: "Name and email are required." };
  }

  const payload = {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    company: data.company?.trim() || null,
    country: data.country?.trim() || null,
    job_title: data.jobTitle?.trim() || null,
    product_interest: data.productInterest?.trim() || null,
    message: data.message?.trim() || null,
    source: data.source || "website",
  };

  const { error } = await supabase.from("leads").insert(payload);

  if (error) {
    // Full Supabase error to the browser console so we can see exactly why.
    console.error("[forms] Lead insert failed", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });

    // Diagnostic toast: tell the user something useful AND surface the underlying cause
    // so we don't have to guess (RLS vs missing table vs wrong column vs unique violation).
    const code = error.code;
    if (code === "42501" || error.message?.includes("row-level security")) {
      return {
        success: false,
        message: "Submission blocked by security policy. The leads table policy isn't set — re-run supabase/schema.sql.",
      };
    }
    if (code === "42P01" || error.message?.includes("does not exist")) {
      return {
        success: false,
        message: "Leads table not found in the database. Run supabase/schema.sql in the Supabase SQL Editor.",
      };
    }
    if (code === "PGRST204" || error.message?.includes("column")) {
      return {
        success: false,
        message: `Leads table is missing a column: ${error.message}. Re-run schema.sql.`,
      };
    }
    return {
      success: false,
      message: `Submission failed: ${error.message || "unknown error"}. Please email sales@vexaled.com.`,
    };
  }

  return {
    success: true,
    message: "Thanks — our engineering team will be in touch within 48 hours.",
  };
}

/**
 * Newsletter / future-marketing opt-in. Saved as a lead with source='newsletter'.
 */
export async function submitNewsletter(data: NewsletterData): Promise<ApiResponse> {
  if (!isSupabaseConfigured()) {
    return { success: false, message: "Subscriptions are not active yet." };
  }
  if (data.hp_company_website && data.hp_company_website.trim() !== "") {
    return { success: true, message: "Subscribed." };
  }
  if (!data.email?.trim()) {
    return { success: false, message: "Email is required." };
  }

  const { error } = await supabase.from("leads").insert({
    name: "(newsletter)",
    email: data.email.trim().toLowerCase(),
    source: data.source || "newsletter",
  });

  if (error) {
    console.error("[forms] Newsletter insert failed:", error.message);
    return { success: false, message: "Failed to subscribe. Please try again." };
  }
  return { success: true, message: "You're subscribed. Watch for updates from VEXALED." };
}
