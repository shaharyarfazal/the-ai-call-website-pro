import { trackEvent } from '@/components/Analytics';

// Custom hook for easy tracking throughout your app
export function useTracking() {
  
  const trackFormSubmit = (formName: string, additionalData?: object) => {
    trackEvent.facebook.track('SubmitApplication', { 
      content_name: formName,
      ...additionalData 
    });
    trackEvent.google.event('form_submit', { 
      form_name: formName,
      ...additionalData 
    });
    trackEvent.linkedin.track('CONVERSION_ID_FOR_FORMS'); // Replace with actual conversion ID
  };

  const trackButtonClick = (buttonName: string, location?: string) => {
    trackEvent.facebook.trackCustom('ButtonClick', { 
      button_name: buttonName,
      page_location: location || window.location.pathname
    });
    trackEvent.google.event('click', { 
      event_category: 'engagement',
      event_label: buttonName,
      page_location: location || window.location.pathname
    });
  };

  const trackVoiceCallStart = () => {
    trackEvent.facebook.track('InitiateCheckout'); // or 'Lead' for lead generation
    trackEvent.google.event('begin_checkout', {
      event_category: 'voice_call',
      event_label: 'call_started'
    });
    trackEvent.linkedin.track('CONVERSION_ID_FOR_CALLS'); // Replace with actual conversion ID
  };

  const trackVoiceCallComplete = (duration?: number) => {
    trackEvent.facebook.track('Purchase', { 
      value: 1, 
      currency: 'USD',
      content_name: 'Voice Call Completed'
    });
    trackEvent.google.event('purchase', {
      event_category: 'voice_call',
      event_label: 'call_completed',
      value: 1,
      call_duration: duration
    });
  };

  const trackChatOpen = () => {
    trackEvent.facebook.trackCustom('ChatOpened');
    trackEvent.google.event('engagement', {
      event_category: 'chat',
      event_label: 'chat_opened'
    });
  };

  const trackPageView = (pageName: string) => {
    trackEvent.facebook.track('PageView');
    trackEvent.google.event('page_view', {
      page_title: pageName,
      page_location: window.location.href
    });
  };

  return {
    trackFormSubmit,
    trackButtonClick,
    trackVoiceCallStart,
    trackVoiceCallComplete,
    trackChatOpen,
    trackPageView,
    // Direct access to tracking functions
    trackEvent
  };
}

export default useTracking;