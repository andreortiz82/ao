import { tokensToCssVars } from "../data/brands.js";
import { useSystem } from "./SystemContext.jsx";

export function Specimen({ children, className = "", style, tokens: override }) {
  const { tokens } = useSystem();
  const active = override ?? tokens;

  return (
    <div
      className={`dsys-specimen ${className}`.trim()}
      style={{ ...tokensToCssVars(active), ...style }}
    >
      {children}
    </div>
  );
}

export function DemoButton({ children, variant = "primary", ...props }) {
  return (
    <button type="button" className={`dsys-btn dsys-btn-${variant}`} {...props}>
      {children}
    </button>
  );
}

export function DemoBadge({ tone = "accent", children }) {
  return <span className={`dsys-badge dsys-badge-${tone}`}>{children}</span>;
}

export function DemoField() {
  return (
    <label className="dsys-field">
      <span className="dsys-sr-only">Search</span>
      <svg width="16" height="16" viewBox="0 0 256 256" aria-hidden="true">
        <path
          fill="currentColor"
          d="m229.66 218.34-50.07-50.06a88.11 88.11 0 1 0-11.31 11.31l50.06 50.07a8 8 0 0 0 11.32-11.32ZM40 112a72 72 0 1 1 72 72 72.08 72.08 0 0 1-72-72Z"
        />
      </svg>
      <input type="search" placeholder="Search backlog" />
    </label>
  );
}

export function DemoCard({
  kicker = "Today",
  title = "Review sprint goals",
  body = "Three open threads. One decision. The system keeps chrome quiet so the work can be loud.",
  status = "On track",
}) {
  return (
    <article className="dsys-card">
      <p className="dsys-card-kicker">{kicker}</p>
      <h3>{title}</h3>
      <p>{body}</p>
      <footer>
        <span style={{ color: "var(--ds-success)" }}>{status}</span>
        <span>4 teammates</span>
      </footer>
      <div className="dsys-card-actions">
        <DemoButton>Open</DemoButton>
        <DemoButton variant="ghost">Dismiss</DemoButton>
      </div>
    </article>
  );
}

export function DemoToolbar() {
  return (
    <div className="dsys-toolbar" role="toolbar" aria-label="Product toolbar">
      <DemoField />
      <DemoButton>New</DemoButton>
      <span className="dsys-avatar" aria-hidden="true" />
    </div>
  );
}
