export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;

  // Optional structured fields (preserved as columns in the `leads` table
  // instead of being flattened into the message body).
  country?: string;
  jobTitle?: string;
  productInterest?: string;

  // Which page / CTA produced the lead. Used for funnel analysis.
  source?: string;

  // Anti-bot honeypot. Must be empty on submit; bots fill it.
  // Field name intentionally innocuous so bots target it.
  hp_company_website?: string;
}

export interface NewsletterData {
  email: string;
  source?: string;
  hp_company_website?: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
}
