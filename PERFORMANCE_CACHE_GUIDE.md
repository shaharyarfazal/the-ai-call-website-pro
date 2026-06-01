# Performance & Caching Guide

## Server Cache Headers (for Hosting)

To fully pass Lighthouse's "Use efficient cache lifetimes" audit, configure your server/hosting provider with these headers:

### For Vercel (vercel.json)
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)",
      "has": [
        {
          "type": "header",
          "key": "accept",
          "value": "text/html.*"
        }
      ],
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

### For Netlify (_headers file)
```
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*
  Cache-Control: public, max-age=0, must-revalidate
```

### For Nginx
```nginx
location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location / {
    expires 0;
    add_header Cache-Control "public, max-age=0, must-revalidate";
}
```

## Implemented Optimizations

✅ **Dynamic Imports**: Retell SDK loads only when user clicks "Speak to AI Agent"  
✅ **Lazy Loading**: CosmicAurora, ChatMoon, and ChatMoonPanel load on interaction/idle  
✅ **Deferred Analytics**: GTM, Meta Pixel, LinkedIn load after user interaction or 3s idle  
✅ **Smart Resource Fetching**: ipapi.co call only when chat opens, with timeout & Save-Data check  
✅ **Optimized Service Worker**: Cache-first for hashed assets, network-first for HTML  
✅ **Source Maps**: Enabled for better debugging  
✅ **Accessibility**: Fixed missing aria-labels for logo and social links  

## Expected Improvements

- **Total Blocking Time**: Reduced from 560ms to ~200-300ms  
- **Unused JavaScript**: Reduced by ~350KB (Retell SDK + Three.js deferred)  
- **First Contentful Paint**: Improved due to lighter initial bundle  
- **Accessibility Score**: Links now have proper names  
- **Repeat Visit Speed**: Faster due to improved caching strategy