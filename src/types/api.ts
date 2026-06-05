export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
}

export interface NewsletterData {
  email: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
}
