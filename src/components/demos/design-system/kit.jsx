import { createContext, useContext, useMemo, useState } from "react";
import { MagnifyingGlassIcon, UserCircleIcon } from "@phosphor-icons/react";
import { brands, tokensToCssVars } from "./tokens.js";

const KitContext = createContext(null);

export function KitProvider({ children }) {
  const [brand, setBrand] = useState("lumen");
  const [mode, setMode] = useState("light");
  const tokens = brands[brand][mode];
  const value = useMemo(
    () => ({ brand, setBrand, mode, setMode, tokens }),
    [brand, mode, tokens],
  );

  return <KitContext.Provider value={value}>{children}</KitContext.Provider>;
}

export function useKit() {
  const ctx = useContext(KitContext);
  if (!ctx) throw new Error("useKit must be inside KitProvider");
  return ctx;
}

export function Specimen({ children, className = "", style, tokens: override }) {
  const { tokens: ctx } = useKit();
  const tokens = override ?? ctx;
  return (
    <div
      className={`ds-kit ${className}`}
      style={{ ...tokensToCssVars(tokens), padding: "1.1rem", ...style }}
    >
      {children}
    </div>
  );
}

export function CopyButton({ text, label = "Copy" }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="ds-copy"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          window.setTimeout(() => setDone(false), 1400);
        } catch {
          setDone(false);
        }
      }}
    >
      {done ? "Copied" : label}
    </button>
  );
}

export function Chapter({ id, index, title, lede, children, pinClass }) {
  return (
    <section
      className={`ds-chapter ${pinClass ?? ""}`}
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <header className="ds-chapter-head ds-reveal">
        <p className="section-label">{index} · Design systems</p>
        <h2 id={`${id}-title`}>{title}</h2>
        <p className="ds-lede">{lede}</p>
      </header>
      <div className="ds-chapter-body ds-reveal">{children}</div>
    </section>
  );
}

export function Stage({ children, className = "" }) {
  return <div className={`ds-stage ${className}`}>{children}</div>;
}

export function KitButton({ children, variant = "primary", ...props }) {
  return (
    <button type="button" className={`ds-btn ds-btn-${variant}`} {...props}>
      {children}
    </button>
  );
}

export function KitBadge({ tone = "accent", children }) {
  return <span className={`ds-badge ds-badge-${tone}`}>{children}</span>;
}

export function KitField({ placeholder = "Search the backlog", label = "Search" }) {
  return (
    <label className="ds-field">
      <span className="sr-only">{label}</span>
      <MagnifyingGlassIcon size={16} aria-hidden="true" />
      <input type="search" placeholder={placeholder} />
    </label>
  );
}

export function KitToolbar() {
  return (
    <div className="ds-organism" role="toolbar" aria-label="Product toolbar">
      <KitField />
      <KitButton>New</KitButton>
      <UserCircleIcon size={28} weight="light" aria-hidden="true" />
    </div>
  );
}

export function ProductCard({
  kicker = "Today",
  title = "Review sprint goals",
  body = "Three open threads. One decision. The system keeps the chrome quiet so the work can be loud.",
  status = "On track",
  meta = "4 teammates",
}) {
  return (
    <article className="ds-product-card" aria-label="Sample product card">
      <div className="ds-product-kicker">{kicker}</div>
      <h3>{title}</h3>
      <p>{body}</p>
      <div className="ds-product-meta">
        <span style={{ color: "var(--ds-success)" }}>{status}</span>
        <span>{meta}</span>
      </div>
      <div className="ds-product-actions">
        <KitButton>Open board</KitButton>
        <KitButton variant="ghost">Dismiss</KitButton>
      </div>
    </article>
  );
}
