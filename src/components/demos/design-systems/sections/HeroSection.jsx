import { useState } from "react";
import { canvasSwatches } from "../data/foundations.js";

const FORK = canvasSwatches.filter((s) => /^#[FED]/i.test(s.hex));

export function HeroSection() {
  const [named, setNamed] = useState(false);

  return (
    <header className="dsys-hero">
      <p className="dsys-eyebrow dsys-reveal">Work sample · Design systems</p>
      <h1 className="dsys-reveal">
        Multiple brands. Growing teams. <em>Products delivered.</em>
      </h1>
      <p className="dsys-lede dsys-reveal">
        Design systems capture what makes your product unique — the shared
        foundation that lets designers, product managers, and engineers ship
        faster with less friction.
      </p>

      <div className="dsys-hero-grid dsys-reveal">
        <article className="dsys-hero-card">
          <Label>Problem</Label>
          <p>
            Diverse products and growing teams make consistency expensive.
            Everyone solves the same UI problem with slightly different
            assumptions.
          </p>
        </article>
        <article className="dsys-hero-card">
          <Label>Solution</Label>
          <p>
            One system: foundations, tokens, components, governance, and
            agentic tooling — without flattening the brands underneath.
          </p>
        </article>
        <article className="dsys-hero-card">
          <Label>Audience</Label>
          <p>
            Distributed teams shipping multiple brands from a single contract
            designers and engineers can both trust.
          </p>
        </article>
      </div>

      <div className="dsys-hero-demo dsys-reveal">
        <div className="dsys-hero-demo-head">
          <Label>One-off hexes vs one named decision</Label>
          <button
            type="button"
            className="dsys-pill"
            aria-pressed={named}
            onClick={() => setNamed((v) => !v)}
          >
            {named ? "Show the fork" : "Name it once"}
          </button>
        </div>
        <div className="dsys-fork-row">
          {FORK.map((swatch) => (
            <div key={swatch.id} className="dsys-fork-item">
              <button
                type="button"
                className="dsys-fork-btn"
                style={{ background: named ? "#dc2626" : swatch.hex }}
              >
                Continue
              </button>
              <span>{named ? "accent ← red.500" : swatch.hex}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

function Label({ children }) {
  return <p className="dsys-label">{children}</p>;
}
