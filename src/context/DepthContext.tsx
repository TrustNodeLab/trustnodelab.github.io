import React, { createContext, useContext, useEffect, useState } from "react";
import { getDepthPreference, setDepthPreference, clearDepthPreference, type DepthLevel } from "../lib/depthPreference";

interface DepthCtx {
  depth: DepthLevel;
  setDepth: (level: DepthLevel) => void;
  isSimple: boolean;
  isFull: boolean;
}

const DepthContext = createContext<DepthCtx>({
  depth: "simple",
  setDepth: setDepthPreference,
  isSimple: true,
  isFull: false,
});

export function DepthProvider({ children }: { children: React.ReactNode }) {
  const [depth, setDepthState] = useState<DepthLevel>(getDepthPreference);

  useEffect(() => {
    const sync = () => setDepthState(getDepthPreference());
    window.addEventListener("tn-depth-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("tn-depth-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const setDepth = (level: DepthLevel) => {
    setDepthPreference(level);
    setDepthState(level);
  };

  return (
    <DepthContext.Provider value={{ depth, setDepth, isSimple: depth === "simple", isFull: depth === "full" }}>
      {children}
    </DepthContext.Provider>
  );
}

export function useDepth(): DepthCtx {
  return useContext(DepthContext);
}
