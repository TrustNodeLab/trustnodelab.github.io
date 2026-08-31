import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { LanguageProvider } from './i18n/LanguageContext';
import { NavigationProvider } from './navigation/NavigationContext';
import { EcoModeProvider } from './context/EcoModeContext';
import { SeniorModeProvider } from './context/SeniorModeContext';
import { CookieBannerProvider } from './context/CookieBannerContext';
import { DepthProvider } from './context/DepthContext';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App.tsx';
import './index.css';

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

// PWA: register service worker (production only — dev server serves sw.js
// with a different MIME/scope and would break HMR).
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`)
      .catch((err) => console.warn("SW registration failed:", err));
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <NavigationProvider>
        <EcoModeProvider>
          <SeniorModeProvider>
            <CookieBannerProvider>
              <DepthProvider>
                <ErrorBoundary>
                  <App />
                </ErrorBoundary>
              </DepthProvider>
            </CookieBannerProvider>
          </SeniorModeProvider>
        </EcoModeProvider>
      </NavigationProvider>
    </LanguageProvider>
  </StrictMode>,
);
