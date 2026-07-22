import React, { createContext, useContext, useState, useEffect } from 'react';

interface EcoModeContextType {
  ecoMode: boolean;
  toggleEcoMode: () => void;
}

const EcoModeContext = createContext<EcoModeContextType | undefined>(undefined);

/**
 * Best-effort, conservative detection of a low-end device.
 * Never assumes "weak" from a single vague signal — requires at least one
 * concrete low-resource indicator (few CPU cores, low RAM, save-data mode,
 * or the OS-level "prefers reduced motion" setting) before defaulting the
 * background animation to eco mode. This only changes the DEFAULT; a user
 * who has already toggled the switch manually always keeps their choice.
 */
function detectLowEndDevice(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;

  try {
    const cores = (navigator as any).hardwareConcurrency;
    if (typeof cores === 'number' && cores > 0 && cores <= 4) return true;

    const memory = (navigator as any).deviceMemory;
    if (typeof memory === 'number' && memory > 0 && memory <= 4) return true;

    const connection = (navigator as any).connection;
    if (connection?.saveData) return true;
    if (typeof connection?.effectiveType === 'string' && /2g/.test(connection.effectiveType)) return true;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  } catch (_e) {
    // If detection throws for any reason, fail safe: treat as a normal device.
    return false;
  }

  return false;
}

export const EcoModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ecoMode, setEcoMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('trustnode_eco');
    // Respect an explicit prior choice (on OR off) if the user already set one.
    if (saved === 'true') return true;
    if (saved === 'false') return false;
    // No prior choice recorded yet: pick a sensible default based on device capability.
    return detectLowEndDevice();
  });

  const toggleEcoMode = () => {
    setEcoMode((prev) => {
      const next = !prev;
      localStorage.setItem('trustnode_eco', String(next));
      return next;
    });
  };

  useEffect(() => {
    if (ecoMode) {
      document.documentElement.classList.add('eco-mode');
    } else {
      document.documentElement.classList.remove('eco-mode');
    }
  }, [ecoMode]);

  return (
    <EcoModeContext.Provider value={{ ecoMode, toggleEcoMode }}>
      {children}
    </EcoModeContext.Provider>
  );
};

export const useEcoMode = () => {
  const context = useContext(EcoModeContext);
  if (!context) {
    throw new Error('useEcoMode must be used within an EcoModeProvider');
  }
  return context;
};
