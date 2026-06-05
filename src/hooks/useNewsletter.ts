import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { submitNewsletter } from '@/api/forms';
import type { NewsletterData } from '@/types/api';

export function useNewsletter() {
  return useMutation({
    mutationFn: (data: NewsletterData) => submitNewsletter(data),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message ?? 'You\'re subscribed! Welcome to the VexaLED newsletter.');
      } else {
        toast.error(result.message ?? 'Failed to subscribe. Please try again.');
      }
    },
    onError: () => {
      toast.error('An unexpected error occurred. Please try again.');
    },
  });
}
