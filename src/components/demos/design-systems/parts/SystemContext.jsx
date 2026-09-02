import { createContext, useContext, useMemo, useState } from "react";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { brandIds, brands } from "../data/brands.js";

const SystemContext = createContext(null);

export function SystemProvider({ children }) {
  const [brandId, setBrandId] = useState("lumen");
  const [mode, setMode] = useState("light");
  const tokens = brands[brandId][mode];

  const value = useMemo(
    () => ({
      brandId,
      setBrandId,
      mode,
      setMode,
      tokens,
      brand: brands[brandId],
    }),
    [brandId, mode, tokens],
  );

  return (
    <SystemContext.Provider value={value}>{children}</SystemContext.Provider>
  );
}

export function useSystem() {
  const ctx = useContext(SystemContext);
  if (!ctx) throw new Error("useSystem must be used within SystemProvider");
  return ctx;
}

export function ThemeDock() {
  const { brandId, setBrandId, mode, setMode, tokens, brand } = useSystem();
  const nextIndex = (brandIds.indexOf(brandId) + 1) % brandIds.length;
  const nextBrand = brands[brandIds[nextIndex]];

  return (
    <aside className="dsys-dock" aria-label="System theme controls">
      <p className="dsys-dock-live" aria-live="polite">
        {brand.label} · {mode} mode
      </p>
      <button
        type="button"
        className="dsys-dock-btn"
        onClick={() => setBrandId(brandIds[nextIndex])}
        aria-label={`Brand ${brand.label}. Switch to ${nextBrand.label}.`}
      >
        <i style={{ background: tokens.accent }} aria-hidden="true" />
        {brand.label}
      </button>
      <button
        type="button"
        className="dsys-dock-btn"
        onClick={() => setMode(mode === "light" ? "dark" : "light")}
        aria-label={`${mode} mode. Switch to ${mode === "light" ? "dark" : "light"}.`}
      >
        {mode === "light" ? <MoonIcon size={16} /> : <SunIcon size={16} />}
        {mode === "light" ? "Dark" : "Light"}
      </button>
    </aside>
  );
}
