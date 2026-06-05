import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { submitContactForm } from '@/api/forms';
import type { ContactFormData } from '@/types/api';

export function useContactForm() {
  return useMutation({
    mutationFn: (data: ContactFormData) => submitContactForm(data),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message ?? 'Your inquiry has been sent. We\'ll be in touch within 48 hours.');
      } else {
        toast.error(result.message ?? 'Failed to send your inquiry. Please try again.');
      }
    },
    onError: () => {
      toast.error('An unexpected error occurred. Please try again.');
    },
  });
}
