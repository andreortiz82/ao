import { useMemo, useState } from "react";
import {
  contrastRatio,
  figmaSwatches,
  primitiveName,
  primitives,
  semanticKeys,
  tokensToCss,
  tokensToJs,
} from "./tokens.js";
import {
  Chapter,
  CopyButton,
  KitBadge,
  KitButton,
  KitField,
  ProductCard,
  Specimen,
  Stage,
  useKit,
} from "./kit.jsx";

const FORK_REDS = figmaSwatches.filter((s) => s.hex.startsWith("#F") || s.hex.startsWith("#E") || s.hex.startsWith("#D"));

export function FigmaOrigin() {
  const [active, setActive] = useState("a");
  const [systematized, setSystematized] = useState(false);
  const swatch = figmaSwatches.find((s) => s.id === active) ?? figmaSwatches[0];
  const near = figmaSwatches.filter(
    (s) =>
      s.id !== active &&
      Math.abs(parseInt(s.hex.slice(1), 16) - parseInt(swatch.hex.slice(1), 16)) <
        0x220000,
  );

  const positions = [
    { top: "16%", left: "12%" },
    { top: "26%", left: "58%" },
    { top: "62%", left: "20%" },
    { top: "52%", left: "68%" },
    { top: "38%", left: "38%" },
    { top: "74%", left: "46%" },
  ];

  return (
    <Chapter
      id="origin"
      index="01"
      title={
        <>
          It starts as a few hexes on a <em>canvas</em>.
        </>
      }
      lede="A founder picks a red in Figma. Then another. Then a third that is almost the same. One-off color decisions do not scale — they fork."
    >
      <div className="ds-grid-2">
        <div className="ds-figma" aria-label="Stylized Figma canvas">
          <div className="ds-figma-bar">
            <span className="ds-figma-dots" aria-hidden="true">
              <i style={{ background: "#f24e1e" }} />
              <i style={{ background: "#a259ff" }} />
              <i style={{ background: "#1abcfe" }} />
              <i style={{ background: "#0acf83" }} />
            </span>
            Lumen / Colors
          </div>
          <div className="ds-figma-canvas">
            <div className="ds-figma-frame">
              {figmaSwatches.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  className={`ds-figma-swatch ${active === s.id ? "active" : ""}`}
                  style={positions[i]}
                  onClick={() => setActive(s.id)}
                  aria-pressed={active === s.id}
                  aria-label={`${s.label} ${s.hex}`}
                >
                  <span className="dot" style={{ background: s.hex }} />
                  {s.hex}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="ds-inspect">
          <p className="section-label">Inspect</p>
          <h3>
            {swatch.label} · {swatch.hex}
          </h3>
          <p>
            Used in {swatch.files} files. {swatch.note}.{" "}
            {near.length
              ? `${near.length} near-duplicate${near.length > 1 ? "s" : ""} already in the file (${near.map((n) => n.hex).join(", ")}).`
              : "No near-duplicates — still a one-off until it is named."}
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            Engineering will hardcode whichever hex they saw last. The next hire
            will pick a fourth red. That is how a product gets six primaries and
            no system.
          </p>
        </div>
      </div>

      <div className="ds-break-block">
        <div className="ds-break-head">
          <p className="section-label">Why one-off hexes break</p>
          <button
            type="button"
            className="ds-chip"
            aria-pressed={systematized}
            onClick={() => setSystematized((v) => !v)}
          >
            {systematized ? "Show the fork" : "Name it once"}
          </button>
        </div>
        <Stage>
          <div className="ds-break" role="group" aria-label="Primary buttons from four files">
            {FORK_REDS.map((s) => (
              <div key={s.id} className="ds-break-item">
                <button
                  type="button"
                  className="ds-break-btn"
                  style={{
                    background: systematized ? "#dc2626" : s.hex,
                  }}
                >
                  Continue
                </button>
                <span>
                  {s.label}
                  <br />
                  {systematized ? "accent ← red.500" : s.hex}
                </span>
              </div>
            ))}
          </div>
          <p className="ds-lede" style={{ marginTop: "1rem", maxWidth: "none" }}>
            {systematized
              ? "One name. Four files. The CTA is the same decision, not four accidents."
              : "Four files, four reds, four CTAs. Same product. Toggle “Name it once.”"}
          </p>
        </Stage>
      </div>
    </Chapter>
  );
}

function PrimitiveBoard({ selected, onSelect }) {
  return (
    <div>
      {Object.entries(primitives).map(([name, ramp]) => (
        <div key={name} style={{ marginBottom: "0.75rem" }}>
          <p className="section-label" style={{ marginBottom: "0.35rem" }}>
            {name}
          </p>
          <div className="ds-ramp">
            {Object.entries(ramp).map(([step, hex]) => {
              const id = `${name}.${step}`;
              return (
                <button
                  key={id}
                  type="button"
                  className="ds-swatch"
                  style={{ background: hex }}
                  aria-label={`${id} ${hex}`}
                  aria-pressed={selected === id}
                  onClick={() => onSelect(id, hex)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export function FoundationTokens() {
  const { tokens } = useKit();
  const [view, setView] = useState("css");
  const [selected, setSelected] = useState({
    id: "red.500",
    hex: primitives.red[500],
  });
  const mapped = semanticKeys.filter((s) => tokens[s.key] === selected.hex);
  const source = view === "css" ? tokensToCss(tokens) : tokensToJs(tokens);

  const rows = semanticKeys.map((s) => ({
    ...s,
    hex: tokens[s.key],
    primitive: primitiveName(tokens[s.key]),
    css: `--color-${s.key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`,
    js: `color.${s.key}`,
  }));

  return (
    <Chapter
      id="tokens"
      index="02"
      title={
        <>
          Name the decision. Map it <em>twice</em>.
        </>
      }
      lede="Primitives are the raw paint. Semantic tokens are the jobs those colors do. CSS custom properties and a JS object are the same contract — two doors into one source of truth."
    >
      <div className="ds-grid-2">
        <Stage>
          <p className="section-label" style={{ marginBottom: "0.75rem" }}>
            Primitives
          </p>
          <PrimitiveBoard
            selected={selected.id}
            onSelect={(id, hex) => setSelected({ id, hex })}
          />
        </Stage>
        <div>
          <p className="section-label">Semantic jobs</p>
          <div className="ds-token-map" style={{ margin: "0.65rem 0 1rem" }}>
            {semanticKeys.map((s) => (
              <button
                key={s.key}
                type="button"
                className="ds-chip ds-sem"
                aria-pressed={mapped.some((m) => m.key === s.key)}
                style={{
                  margin: "0.2rem",
                  opacity: mapped.some((m) => m.key === s.key) ? 1 : 0.45,
                }}
                onClick={() =>
                  setSelected({
                    id: `--color-${s.key}`,
                    hex: tokens[s.key],
                  })
                }
              >
                {s.label}
                <span
                  className="ds-chip-swatch"
                  style={{ background: tokens[s.key] }}
                />
              </button>
            ))}
          </div>
          <div className="ds-inspect">
            <p className="section-label">Selected</p>
            <h3>
              {selected.id} · {selected.hex}
            </h3>
            <p>
              {mapped.length
                ? `This primitive currently fills: ${mapped.map((m) => m.label).join(", ")}.`
                : "Not referenced by a semantic token in the current theme — still a primitive until it is given a job."}
            </p>
            <div className="ds-seg" style={{ margin: "0.75rem 0" }}>
              <button
                type="button"
                aria-pressed={view === "css"}
                onClick={() => setView("css")}
              >
                CSS
              </button>
              <button
                type="button"
                aria-pressed={view === "js"}
                onClick={() => setView("js")}
              >
                JS object
              </button>
              <CopyButton text={source} />
            </div>
            <pre className="ds-code">{source}</pre>
          </div>
        </div>
      </div>

      <div className="ds-token-pin">
        <p className="section-label" style={{ margin: "1.75rem 0 0.65rem" }}>
          Same decision, both doors
        </p>
        <Stage>
          <div className="ds-map" aria-label="Token mapping">
            <div className="ds-map-row ds-map-head">
              <span>Job</span>
              <span>Primitive</span>
              <span>CSS</span>
              <span>JS</span>
            </div>
            {rows.map((row) => (
              <button
                key={row.key}
                type="button"
                className="ds-map-row"
                aria-pressed={selected.hex === row.hex}
                onClick={() => setSelected({ id: row.primitive, hex: row.hex })}
              >
                <span className="ds-map-job">
                  <i style={{ background: row.hex }} />
                  {row.label}
                </span>
                <span>{row.primitive}</span>
                <span>{row.css}</span>
                <span>{row.js}</span>
              </button>
            ))}
          </div>
        </Stage>
      </div>
    </Chapter>
  );
}

export function LightDark() {
  const { mode, setMode, tokens } = useKit();
  const pairs = useMemo(
    () => [
      { fg: tokens.text, bg: tokens.bg, label: "Text on background" },
      { fg: tokens.accentText, bg: tokens.accent, label: "Label on accent" },
      { fg: tokens.textMuted, bg: tokens.surface, label: "Muted on surface" },
      { fg: tokens.text, bg: tokens.surface, label: "Text on surface" },
    ],
    [tokens],
  );

  return (
    <Chapter
      id="theme"
      index="03"
      title={
        <>
          Light and dark are the same <em>tokens</em>.
        </>
      }
      lede="Flip the mode. The components do not change — only the values behind the names. Pairing is the test: if contrast fails, the token is wrong, not the component."
    >
      <div className="ds-seg" style={{ marginBottom: "1rem" }}>
        <button
          type="button"
          aria-pressed={mode === "light"}
          onClick={() => setMode("light")}
        >
          Light
        </button>
        <button
          type="button"
          aria-pressed={mode === "dark"}
          onClick={() => setMode("dark")}
        >
          Dark
        </button>
      </div>
      <Stage>
        <Specimen>
          <div className="ds-chrome">
            <div className="ds-organism">
              <KitField />
              <KitButton>New</KitButton>
            </div>
            <div className="ds-badge-row">
              <KitBadge>Accent</KitBadge>
              <KitBadge tone="success">On track</KitBadge>
              <KitBadge tone="danger">Blocked</KitBadge>
            </div>
            <ProductCard />
          </div>
        </Specimen>
      </Stage>
      <div className="ds-contrast-grid">
        {pairs.map((p) => {
          const ratio = contrastRatio(p.fg, p.bg);
          const pass = ratio >= 4.5;
          return (
            <div
              key={p.label}
              className="ds-inspect"
              style={{
                background: p.bg,
                color: p.fg,
                borderColor: tokens.border,
              }}
            >
              <p className="section-label" style={{ color: p.fg, opacity: 0.7 }}>
                {p.label}
              </p>
              <h3 style={{ color: p.fg, fontSize: "1.75rem" }}>Aa</h3>
              <p>
                {ratio.toFixed(2)}:1 ·{" "}
                {pass ? "WCAG AA pass" : "Fails AA for body text"}
              </p>
            </div>
          );
        })}
      </div>
    </Chapter>
  );
}
