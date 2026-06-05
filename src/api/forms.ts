import env from '@/config/env';
import type { ContactFormData, NewsletterData, ApiResponse } from '@/types/api';

export async function submitContactForm(data: ContactFormData): Promise<ApiResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(env.VITE_CONTACT_FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { success: false, message: body.message ?? `Request failed (${res.status})` };
    }

    const body = await res.json().catch(() => ({}));
    return { success: true, message: body.message };
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      return { success: false, message: 'Request timed out. Please try again.' };
    }
    if (!navigator.onLine) {
      return { success: false, message: 'You appear to be offline. Please check your connection.' };
    }
    return { success: false, message: 'An unexpected error occurred. Please try again.' };
  } finally {
    clearTimeout(timeout);
  }
}

export async function submitNewsletter(data: NewsletterData): Promise<ApiResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(`${env.VITE_API_URL}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { success: false, message: body.message ?? `Request failed (${res.status})` };
    }

    const body = await res.json().catch(() => ({}));
    return { success: true, message: body.message };
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      return { success: false, message: 'Request timed out. Please try again.' };
    }
    if (!navigator.onLine) {
      return { success: false, message: 'You appear to be offline. Please check your connection.' };
    }
    return { success: false, message: 'An unexpected error occurred. Please try again.' };
  } finally {
    clearTimeout(timeout);
  }
}
