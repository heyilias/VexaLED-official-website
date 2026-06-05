const env = {
  VITE_API_URL: import.meta.env.VITE_API_URL ?? 'http://localhost:3001',
  VITE_CONTACT_FORM_ENDPOINT: import.meta.env.VITE_CONTACT_FORM_ENDPOINT ?? 'http://localhost:3001/forms',
  VITE_ANALYTICS_ID: import.meta.env.VITE_ANALYTICS_ID ?? '',
  VITE_SITE_URL: import.meta.env.VITE_SITE_URL ?? 'http://localhost:5173',
} as const;

export type EnvConfig = typeof env;
export default env;
