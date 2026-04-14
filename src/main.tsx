import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { ProgressProvider } from './context/ProgressContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import './index.css';

// This app does not use Service Workers. Remove stale registrations/caches from
// previous runs so old SW scripts do not spam navigation preload warnings.
async function cleanupStaleServiceWorkers(): Promise<void> {
  if (!('serviceWorker' in navigator)) return;

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    if (registrations.length === 0) return;

    let unregisteredAny = false;
    for (const registration of registrations) {
      try {
        if ('navigationPreload' in registration) {
          await registration.navigationPreload.disable();
        }
      } catch {
        // Ignore; this is best-effort cleanup.
      }

      try {
        const ok = await registration.unregister();
        unregisteredAny = unregisteredAny || ok;
      } catch {
        // Ignore; app bootstrap must continue.
      }
    }

    if ('caches' in globalThis) {
      const keys = await caches.keys();
      await Promise.all(keys.map(key => caches.delete(key)));
    }

    // One reload is enough to detach a previously controlling SW.
    if (unregisteredAny && !sessionStorage.getItem('gopherlab-sw-cleaned')) {
      sessionStorage.setItem('gopherlab-sw-cleaned', '1');
      globalThis.location.reload();
    }
  } catch {
    // Ignore cleanup errors; app boot should never fail because of this.
  }
}

void cleanupStaleServiceWorkers();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AccessibilityProvider>
      <ProgressProvider>
        <App />
      </ProgressProvider>
    </AccessibilityProvider>
  </React.StrictMode>
);
