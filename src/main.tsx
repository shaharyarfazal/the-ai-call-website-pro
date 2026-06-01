import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HelmetProvider } from 'react-helmet-async'

// Production optimized main entry
// Runtime safety check for critical React features
if (!React.useLayoutEffect) {
  // Clear all caches and reload if React is corrupted
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(regs => {
      Promise.all(regs.map(r => r.unregister())).then(() => {
        if ('caches' in window) {
          caches.keys().then(names => {
            Promise.all(names.map(name => caches.delete(name))).then(() => {
              (window as any).location.reload();
            });
          });
        } else {
          (window as any).location.reload();
        }
      });
    });
  } else {
    (window as any).location.reload();
  }
}

// Development-only debugging
if (import.meta.env.DEV) {
  // Runtime self-check for single React instance
  const globalReactCheck = '__REACT_SINGLETON__';
  if (!(window as any)[globalReactCheck]) {
    (window as any)[globalReactCheck] = React.version;
    (window as any).__REACT_INSTANCE__ = React;
  }
  
  // Monitor for useMergeRef errors
  const originalError = console.error;
  console.error = (...args: any[]) => {
    if (args[0]?.includes?.('useMergeRef') || args[0]?.includes?.('useLayoutEffect')) {
      console.log('[Debug] useMergeRef error detected. React instance check:', {
        React,
        useLayoutEffect: React.useLayoutEffect,
        globalReact: (window as any).__REACT_INSTANCE__
      });
    }
    originalError.apply(console, args);
  };
}

// Hide initial content once React app starts rendering
const hideInitialContent = () => {
  const content = document.getElementById('initial-content');
  if (content) {
    content.classList.add('hidden');
    setTimeout(() => content.remove(), 500);
  }
};

// Service worker handling - optimized for production
const handleServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) return;
  
  try {
    if (import.meta.env.DEV) {
      // Development: unregister existing SW
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r => r.unregister()));
    } else {
      // Production: register service worker
      await navigator.serviceWorker.register('/sw.js');
    }
  } catch (e) {
    if (import.meta.env.DEV) {
      console.log('[SW] Service worker handling failed:', e);
    }
  }
};

// Mount React app
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

// Hide initial content after React renders
setTimeout(hideInitialContent, 100);
if (typeof requestIdleCallback !== 'undefined') {
  requestIdleCallback(hideInitialContent, { timeout: 500 });
}

// Handle service worker after app loads
setTimeout(handleServiceWorker, 1000);