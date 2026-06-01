# 🎯 Tracking Pixels Setup Guide

Your tracking pixels are now properly configured to work with your React SPA! Here's how to complete the setup:

## 🚀 Quick Setup

### 1. Get Your Tracking IDs

Collect these IDs from your respective platforms:
- **Facebook Pixel ID**: From Facebook Ads Manager > Events Manager
- **LinkedIn Partner ID**: From LinkedIn Campaign Manager > Insight Tag
- **Google Analytics ID**: From Google Analytics (format: GA_MEASUREMENT_ID)
- **Google Tag Manager ID**: From GTM (format: GTM-XXXXXXX)

### 2. Update Configuration

Edit `src/components/Analytics.tsx` and replace the placeholder values:

```typescript
const TRACKING_CONFIG = {
  FACEBOOK_PIXEL_ID: 'YOUR_ACTUAL_FACEBOOK_PIXEL_ID',
  LINKEDIN_PARTNER_ID: 'YOUR_ACTUAL_LINKEDIN_PARTNER_ID', 
  GOOGLE_ANALYTICS_ID: 'YOUR_ACTUAL_GA_ID',
  GOOGLE_TAG_MANAGER_ID: 'YOUR_ACTUAL_GTM_ID',
};
```

### 3. Uncomment Scripts in HTML (Optional)

In `index.html`, uncomment and update the pixel scripts with your actual IDs for backup/fallback tracking.

## ✨ Features

### ✅ What's Working Now
- **Automatic page view tracking** on all route changes
- **Facebook Pixel** with proper SPA support
- **LinkedIn Insight Tag** with conversion tracking
- **Google Analytics 4** with enhanced ecommerce
- **Google Tag Manager** integration
- **TypeScript support** with proper type declarations

### 🎯 Smart Tracking Functions

Use the `useTracking` hook in your components:

```tsx
import { useTracking } from '@/hooks/useTracking';

function MyComponent() {
  const { trackFormSubmit, trackButtonClick, trackVoiceCallStart } = useTracking();
  
  const handleFormSubmit = () => {
    trackFormSubmit('contact_form', { source: 'homepage' });
  };
  
  const handleCallStart = () => {
    trackVoiceCallStart();
  };
  
  return (
    <form onSubmit={handleFormSubmit}>
      <button onClick={handleCallStart}>Start Call</button>
    </form>
  );
}
```

## 🔧 Advanced Usage

### Manual Event Tracking

```tsx
import { trackEvent } from '@/components/Analytics';

// Facebook events
trackEvent.facebook.track('Purchase', { value: 29.99, currency: 'USD' });
trackEvent.facebook.trackCustom('CustomEvent', { custom_parameter: 'value' });

// Google Analytics events
trackEvent.google.event('purchase', { 
  transaction_id: '12345',
  value: 29.99,
  currency: 'USD'
});

// LinkedIn conversions
trackEvent.linkedin.track('CONVERSION_ID_HERE');
```

### Pre-built Tracking Functions

The `useTracking` hook provides these ready-to-use functions:

- `trackFormSubmit(formName, additionalData)` - Track form submissions
- `trackButtonClick(buttonName, location)` - Track button interactions
- `trackVoiceCallStart()` - Track when voice calls begin
- `trackVoiceCallComplete(duration)` - Track completed calls
- `trackChatOpen()` - Track chat interactions
- `trackPageView(pageName)` - Manual page view tracking

## 🚨 Important Notes

### SPA-Specific Solutions
- ✅ Tracks route changes (not just initial page load)
- ✅ Prevents duplicate pixel loading
- ✅ Handles client-side navigation properly
- ✅ TypeScript-safe implementation

### Performance Optimized
- Scripts load asynchronously
- No blocking of page rendering
- Graceful fallbacks for failed loads
- Memory leak prevention

### Privacy Compliant
- Respects user consent preferences
- Easy to integrate with consent management
- GDPR/CCPA friendly structure

## 🧪 Testing Your Setup

### 1. Facebook Pixel Test
1. Install Facebook Pixel Helper Chrome extension
2. Visit your site and navigate between pages
3. Check that PageView events fire on route changes

### 2. LinkedIn Insight Tag Test
1. Use LinkedIn's Insight Tag Helper
2. Verify the tag loads and fires correctly

### 3. Google Analytics Test
1. Use GA4 Debug mode or Real-Time reports
2. Navigate between pages and check event tracking

### 4. Console Testing
Open browser console and test manually:
```javascript
// Test Facebook Pixel
fbq('track', 'PageView');

// Test Google Analytics
gtag('event', 'test_event', { test_parameter: 'test_value' });

// Test LinkedIn
lintrk('track', { conversion_id: 'YOUR_CONVERSION_ID' });
```

## 🛠️ Troubleshooting

### Common Issues

**Pixels not firing on navigation:**
- ✅ Fixed! Our implementation tracks SPA navigation

**Multiple instances of pixels:**
- ✅ Fixed! We prevent duplicate pixel loading

**TypeScript errors:**
- ✅ Fixed! Proper type declarations included

**Performance impact:**
- ✅ Optimized! Async loading and memory management

### Debug Mode

To enable debug logging, add this to your browser console:
```javascript
localStorage.setItem('debug_tracking', 'true');
```

## 📊 Next Steps

1. **Replace placeholder IDs** with your actual tracking IDs
2. **Test each pixel** using the testing methods above
3. **Set up conversion events** specific to your business goals
4. **Configure custom audiences** in Facebook/LinkedIn for retargeting
5. **Set up enhanced ecommerce** tracking if you process payments

Your tracking system is now enterprise-ready! 🎉