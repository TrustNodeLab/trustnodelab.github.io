import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './i18n/LanguageContext';
import { NavigationProvider } from './navigation/NavigationContext';
import { EcoModeProvider } from './context/EcoModeContext';
import { ErrorBoundary } from './components/ErrorBoundary';

function renderFatalError(error: unknown) {
  const rootEl = document.getElementById('root');
  const message = error instanceof Error ? `${error.message}\n\n${error.stack ?? ''}` : String(error);
  console.error('[TrustNode] Fatal error before/during mount:', error);
  if (rootEl) {
    rootEl.innerHTML = `
      <div style="min-height:100vh;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:24px;background:#0A0A0B;color:#F5F5F0;font-family:monospace;text-align:center;">
        <div style="font-size:14px;letter-spacing:0.05em;color:#EF4444;font-weight:700;">TRUSTNODE // BOOT ERROR</div>
        <div style="font-size:13px;color:#9CA3AF;max-width:560px;">Приложение не смогло запуститься. Сделайте скриншот текста ниже и отправьте разработчику.</div>
        <pre style="max-width:720px;width:100%;overflow:auto;text-align:left;font-size:11px;background:#111827;border:1px solid #1F2937;border-radius:8px;padding:16px;white-space:pre-wrap;word-break:break-word;">${message.replace(/</g, '&lt;')}</pre>
      </div>
    `;
  }
}

// Catches errors thrown outside React's render cycle (e.g. a module that
// throws at import time, or an async chunk failing to load) so the user
// never sees a silent blank screen with zero console output.
window.addEventListener('error', (event) => {
  console.error('[TrustNode] window.onerror:', event.error || event.message);
});
window.addEventListener('unhandledrejection', (event) => {
  console.error('[TrustNode] Unhandled promise rejection:', event.reason);
});

try {
  const rootEl = document.getElementById('root');
  if (!rootEl) {
    throw new Error('Root element (#root) not found in the DOM. Check index.html.');
  }

  createRoot(rootEl).render(
    <StrictMode>
      <ErrorBoundary>
        <LanguageProvider>
          <NavigationProvider>
            <EcoModeProvider>
              <App />
            </EcoModeProvider>
          </NavigationProvider>
        </LanguageProvider>
      </ErrorBoundary>
    </StrictMode>,
  );
} catch (error) {
  renderFatalError(error);
}
