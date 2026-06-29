import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "ct-period-context";
const DEFAULT_PERIOD = { month: "01", year: "2026" };

export const PeriodContext = createContext(null);

export function PeriodProvider({ children }) {
  const [period, setPeriod] = useState(DEFAULT_PERIOD);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setPeriod(JSON.parse(raw));
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(period));
    } catch {
      // ignore storage errors
    }
  }, [period]);

  const value = useMemo(() => ({ period, setPeriod }), [period]);

  return <PeriodContext.Provider value={value}>{children}</PeriodContext.Provider>;
}

export function usePeriod() {
  const ctx = useContext(PeriodContext);
  if (!ctx) {
    throw new Error("usePeriod debe usarse dentro de PeriodProvider");
  }
  return ctx;
}
