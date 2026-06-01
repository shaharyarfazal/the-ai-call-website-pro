import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Analytics configuration - Using actual tracking IDs
const TRACKING_CONFIG = {
  FACEBOOK_PIXEL_ID: '1840764980206362',
  LINKEDIN_PARTNER_ID: '8632209',
  GOOGLE_ANALYTICS_ID: 'G-G4SX46405S',
  GOOGLE_TAG_MANAGER_ID: '', // Not provided
};

// Declare global analytics functions
declare global {
  interface Window {
    fbq: any;
    gtag: any;
    dataLayer: any;
    lintrk: any;
    _linkedin_partner_id: string;
    _linkedin_data_partner_ids: string[];
  }
}

export function Analytics() {
  const location = useLocation();

  // Scripts are already loaded in index.html, no need to initialize again
  useEffect(() => {
    console.log('Analytics initialized via index.html scripts');
  }, []);

  // Track page views on route change for SPA navigation
  useEffect(() => {
    const path = location.pathname + location.search;
    
    // Facebook Pixel page view for SPA navigation
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }

    // Google Analytics page view for SPA navigation
    if (window.gtag) {
      window.gtag('config', TRACKING_CONFIG.GOOGLE_ANALYTICS_ID, {
        page_path: path,
        page_title: document.title,
      });
    }

    // LinkedIn - no additional page view tracking needed, handled by initial script
    
    console.log('Analytics SPA page view tracked:', path);
  }, [location]);

  return null; // This component doesn't render anything
}

// Utility functions for tracking events
export const trackEvent = {
  // Facebook Pixel events
  facebook: {
    track: (eventName: string, parameters?: object) => {
      if (window.fbq) {
        window.fbq('track', eventName, parameters);
      }
    },
    trackCustom: (eventName: string, parameters?: object) => {
      if (window.fbq) {
        window.fbq('trackCustom', eventName, parameters);
      }
    },
  },

  // Google Analytics events
  google: {
    event: (action: string, parameters?: object) => {
      if (window.gtag) {
        window.gtag('event', action, parameters);
      }
    },
  },

  // LinkedIn events
  linkedin: {
    track: (conversionId: string) => {
      if (window.lintrk) {
        window.lintrk('track', { conversion_id: conversionId });
      }
    },
  },
};

export default Analytics;