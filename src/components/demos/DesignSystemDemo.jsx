import { useState } from "react";

const THEMES = {
  default: {
    label: "Platform Default",
    vars: {
      "--ds-accent": "#0a0a0a",
      "--ds-accent-soft": "#fafafa",
      "--ds-surface": "#ffffff",
      "--ds-text": "#0a0a0a",
      "--ds-muted": "#737373",
      "--ds-border": "rgba(0,0,0,0.08)",
      "--ds-radius": "4px",
    },
  },
  navigator: {
    label: "Navigator",
    vars: {
      "--ds-accent": "#1d4ed8",
      "--ds-accent-soft": "#eff6ff",
      "--ds-surface": "#ffffff",
      "--ds-text": "#0f172a",
      "--ds-muted": "#64748b",
      "--ds-border": "rgba(29,78,216,0.12)",
      "--ds-radius": "8px",
    },
  },
  clinical: {
    label: "Clinical",
    vars: {
      "--ds-accent": "#0f766e",
      "--ds-accent-soft": "#f0fdfa",
      "--ds-surface": "#ffffff",
      "--ds-text": "#134e4a",
      "--ds-muted": "#5f8a84",
      "--ds-border": "rgba(15,118,110,0.14)",
      "--ds-radius": "6px",
    },
  },
  signal: {
    label: "Signal Ops",
    vars: {
      "--ds-accent": "#b45309",
      "--ds-accent-soft": "#fffbeb",
      "--ds-surface": "#fffdf8",
      "--ds-text": "#292524",
      "--ds-muted": "#78716c",
      "--ds-border": "rgba(180,83,9,0.14)",
      "--ds-radius": "10px",
    },
  },
};

export default function DesignSystemDemo() {
  const [themeId, setThemeId] = useState("navigator");
  const theme = THEMES[themeId];

  return (
    <div className="ds-demo">
      <div className="ds-toolbar">
        <span className="ds-toolbar-label">Brand theme</span>
        <div className="ds-theme-list" role="tablist" aria-label="Brand themes">
          {Object.entries(THEMES).map(([id, t]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={themeId === id}
              className={`ds-theme-btn${themeId === id ? " is-active" : ""}`}
              onClick={() => setThemeId(id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="ds-preview" style={theme.vars}>
        <div className="ds-card">
          <div className="ds-card-head">
            <span className="ds-badge">Enrollment</span>
            <span className="ds-meta">Updated 2m ago</span>
          </div>
          <h3 className="ds-card-title">Site activation request</h3>
          <p className="ds-card-body">
            Review staffing and IRB status before approving the next enrollment
            window.
          </p>
          <label className="ds-field">
            <span className="ds-field-label">Site lead</span>
            <input
              className="ds-input"
              type="text"
              defaultValue="Dr. Elena Vasquez"
              readOnly
            />
          </label>
          <div className="ds-actions">
            <button type="button" className="ds-btn ds-btn--primary">
              Approve window
            </button>
            <button type="button" className="ds-btn ds-btn--secondary">
              Request changes
            </button>
          </div>
        </div>

        <aside className="ds-tokens">
          <div className="ds-tokens-label">Active tokens</div>
          <ul className="ds-token-list">
            <li>
              <code>--ds-accent</code>
              <span>{theme.vars["--ds-accent"]}</span>
            </li>
            <li>
              <code>--ds-surface</code>
              <span>{theme.vars["--ds-surface"]}</span>
            </li>
            <li>
              <code>--ds-radius</code>
              <span>{theme.vars["--ds-radius"]}</span>
            </li>
          </ul>
          <p className="ds-tokens-note">
            Same component structure — remapped semantic tokens per brand.
          </p>
        </aside>
      </div>

      <style>{`
        .ds-demo {
          font-family: var(--font-sans);
          color: var(--color-ink);
          background: var(--color-background);
          min-height: 460px;
          display: flex;
          flex-direction: column;
        }

        .ds-toolbar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.75rem 1rem;
          padding: 0.875rem 1.25rem;
          border-bottom: 1px solid var(--color-line);
          background: var(--color-paper);
        }

        .ds-toolbar-label {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-ink-3);
        }

        .ds-theme-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .ds-theme-btn {
          font-family: var(--font-sans);
          font-size: 12px;
          padding: 0.4rem 0.75rem;
          border-radius: 999px;
          border: 1px solid var(--color-line);
          background: var(--color-background);
          color: var(--color-ink-2);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .ds-theme-btn.is-active {
          background: var(--color-ink);
          border-color: var(--color-ink);
          color: #fff;
        }

        .ds-preview {
          flex: 1;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 1.25rem;
          padding: 1.25rem;
          background: var(--ds-accent-soft);
          transition: background 0.25s ease;
        }

        @media (max-width: 720px) {
          .ds-preview {
            grid-template-columns: 1fr;
          }
        }

        .ds-card {
          background: var(--ds-surface);
          border: 1px solid var(--ds-border);
          border-radius: var(--ds-radius);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          transition: all 0.25s ease;
          box-shadow: 0 8px 24px -12px rgba(0, 0, 0, 0.12);
        }

        .ds-card-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.5rem;
        }

        .ds-badge {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--ds-accent);
          background: var(--ds-accent-soft);
          padding: 0.3rem 0.55rem;
          border-radius: 999px;
          border: 1px solid var(--ds-border);
        }

        .ds-meta {
          font-size: 11px;
          color: var(--ds-muted);
        }

        .ds-card-title {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-variation-settings: "opsz" 24, "wght" 450;
          color: var(--ds-text);
          margin: 0;
          line-height: 1.15;
        }

        .ds-card-body {
          font-size: 14px;
          line-height: 1.55;
          color: var(--ds-muted);
          margin: 0;
        }

        .ds-field {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .ds-field-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--ds-text);
        }

        .ds-input {
          font-family: var(--font-sans);
          font-size: 14px;
          padding: 0.55rem 0.7rem;
          border: 1px solid var(--ds-border);
          border-radius: calc(var(--ds-radius) - 2px);
          background: var(--ds-surface);
          color: var(--ds-text);
        }

        .ds-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.25rem;
        }

        .ds-btn {
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 500;
          padding: 0.55rem 0.9rem;
          border-radius: calc(var(--ds-radius) - 2px);
          cursor: pointer;
          border: 1px solid transparent;
          transition: opacity 0.15s ease;
        }

        .ds-btn:hover { opacity: 0.88; }

        .ds-btn--primary {
          background: var(--ds-accent);
          color: #fff;
        }

        .ds-btn--secondary {
          background: transparent;
          color: var(--ds-text);
          border-color: var(--ds-border);
        }

        .ds-tokens {
          background: var(--ds-surface);
          border: 1px solid var(--ds-border);
          border-radius: var(--ds-radius);
          padding: 1rem;
          align-self: start;
        }

        .ds-tokens-label {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--ds-muted);
          margin-bottom: 0.75rem;
        }

        .ds-token-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0.5rem;
        }

        .ds-token-list li {
          display: flex;
          justify-content: space-between;
          gap: 0.75rem;
          font-size: 12px;
          color: var(--ds-text);
        }

        .ds-token-list code {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--ds-accent);
        }

        .ds-tokens-note {
          margin: 0.85rem 0 0;
          font-size: 12px;
          line-height: 1.5;
          color: var(--ds-muted);
        }
      `}</style>
    </div>
  );
}
