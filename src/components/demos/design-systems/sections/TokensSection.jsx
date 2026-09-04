import { useState } from "react";
import {
  tokensToCssBlock,
  tokensToJsBlock,
} from "../data/brands.js";
import {
  primitiveName,
  primitives,
  semanticTokens,
  themeBridge,
  contrastRatio,
} from "../data/tokens.js";
import { Chapter, Label, Panel } from "../parts/Chapter.jsx";
import { CopyValue } from "../parts/CopyValue.jsx";
import {
  DemoCard,
  DemoToolbar,
  Specimen,
} from "../parts/Specimen.jsx";
import { useSystem } from "../parts/SystemContext.jsx";

export function TokensSection() {
  const { tokens, mode, setMode } = useSystem();
  const [primitiveId, setPrimitiveId] = useState("red.500");
  const [format, setFormat] = useState("css");
  const [semanticKey, setSemanticKey] = useState("accent");

  const code = format === "css" ? tokensToCssBlock(tokens) : tokensToJsBlock(tokens);
  const ratio = contrastRatio(tokens.text, tokens.surface);

  return (
    <Chapter
      id="tokens"
      index="03 · Tokens"
      title="Name the job. Publish it twice."
      lede="Primitives are raw material. Semantic tokens are the jobs they do. CSS variables, JavaScript objects, Tailwind @theme, and shadcn/ui aliases are doors into one contract."
    >
      <div className="dsys-split">
        <Panel>
          <Label>Primitives</Label>
          {Object.entries(primitives).map(([name, ramp]) => (
            <div key={name} className="dsys-ramp-group">
              <span className="dsys-ramp-name">{name}</span>
              <div className="dsys-ramp">
                {Object.entries(ramp).map(([step, hex]) => {
                  const id = `${name}.${step}`;
                  return (
                    <button
                      key={id}
                      type="button"
                      className="dsys-ramp-step"
                      style={{ background: hex }}
                      aria-pressed={primitiveId === id}
                      onClick={() => setPrimitiveId(id)}
                      title={id}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </Panel>

        <Panel>
          <Label>Semantic map</Label>
          <div className="dsys-pill-row">
            {semanticTokens.map((t) => (
              <button
                key={t.key}
                type="button"
                className="dsys-pill dsys-pill-swatch"
                aria-pressed={semanticKey === t.key}
                onClick={() => setSemanticKey(t.key)}
              >
                <i style={{ background: tokens[t.key] }} />
                {t.label}
              </button>
            ))}
          </div>
          <div className="dsys-token-detail">
            <h3>{semanticTokens.find((t) => t.key === semanticKey)?.label}</h3>
            <p>
              <code>--color-{semanticKey}</code> · <code>color.{semanticKey}</code>
            </p>
            <p>Value: {tokens[semanticKey]} · maps from {primitiveName(tokens[semanticKey])}</p>
            <div className="dsys-copy-row">
              <CopyValue value={tokens[semanticKey]} label="Copy hex" />
              <CopyValue value={`--color-${semanticKey}`} label="Copy CSS var" />
            </div>
          </div>

          <div className="dsys-pill-row" style={{ marginTop: "1rem" }}>
            <button type="button" className="dsys-pill" aria-pressed={format === "css"} onClick={() => setFormat("css")}>
              CSS
            </button>
            <button type="button" className="dsys-pill" aria-pressed={format === "js"} onClick={() => setFormat("js")}>
              JS
            </button>
            <CopyValue value={code} label="Copy block" />
          </div>
          <pre className="dsys-code">{code}</pre>
        </Panel>
      </div>

      <Label>Tailwind @theme · shadcn/ui</Label>
      <Panel className="dsys-bridge-table">
        <div className="dsys-bridge-head">
          <span>Demo</span>
          <span>Tailwind</span>
          <span>shadcn/ui</span>
          <span>Value</span>
        </div>
        {themeBridge.map((row) => (
          <div key={row.demo} className="dsys-bridge-row">
            <span>{row.demo}</span>
            <code>{row.tailwind}</code>
            <code>{row.shadcn}</code>
            <span className="dsys-bridge-value">
              <i style={{ background: tokens[row.demo] }} />
              {tokens[row.demo]}
              <CopyValue value={tokens[row.demo]} label="⧉" />
            </span>
          </div>
        ))}
      </Panel>

      <Label>Theme remap</Label>
      <Panel>
        <div className="dsys-pill-row">
          <button type="button" className="dsys-pill" aria-pressed={mode === "light"} onClick={() => setMode("light")}>
            Light
          </button>
          <button type="button" className="dsys-pill" aria-pressed={mode === "dark"} onClick={() => setMode("dark")}>
            Dark
          </button>
          <span className="dsys-hint">Or use the floating dock — same markup, new values.</span>
        </div>
        <Specimen>
          <DemoToolbar />
          <DemoCard />
        </Specimen>
        <p className="dsys-contrast-note">
          Contrast on surface: {ratio.toFixed(2)}:1 ({ratio >= 4.5 ? "AA pass" : "needs adjustment"})
        </p>
      </Panel>
    </Chapter>
  );
}
