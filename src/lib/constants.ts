// Application constants
export const APP_NAME = 'Voice AI Solutions';
export const APP_DESCRIPTION = 'Advanced AI-powered voice automation solutions for modern businesses';

// API endpoints
export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Feature flags
export const FEATURES = {
  VOICE_RECOGNITION: true,
  ANALYTICS_DASHBOARD: true,
  CRM_INTEGRATION: true,
  APPOINTMENT_BOOKING: true,
} as const;

// Theme constants
export const THEME = {
  DEFAULT_THEME: 'dark',
  STORAGE_KEY: 'theme-preference',
} as const;

// Query keys for React Query
export const QUERY_KEYS = {
  USER: 'user',
  APPOINTMENTS: 'appointments',
  ANALYTICS: 'analytics',
  INTEGRATIONS: 'integrations',
} as const;