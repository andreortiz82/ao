import { useState } from "react";
import {
  BellIcon,
  CheckCircleIcon,
  GearSixIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  WarningIcon,
} from "@phosphor-icons/react";
import { primitives } from "../data/brands.js";
import {
  breakpoints,
  canvasSwatches,
  spacingScale,
  typeRoles,
} from "../data/foundations.js";
import { contrastRatio } from "../data/tokens.js";
import { Chapter, Label, Panel } from "../parts/Chapter.jsx";
import { CopyValue } from "../parts/CopyValue.jsx";
import { useSystem } from "../parts/SystemContext.jsx";

const ICONS = [
  { Icon: MagnifyingGlassIcon, label: "Search" },
  { Icon: WarningIcon, label: "Warning" },
  { Icon: CheckCircleIcon, label: "Success" },
  { Icon: UserCircleIcon, label: "Account" },
  { Icon: BellIcon, label: "Alerts" },
  { Icon: GearSixIcon, label: "Settings" },
];

const POSITIONS = [
  { top: "14%", left: "10%" },
  { top: "28%", left: "55%" },
  { top: "58%", left: "18%" },
  { top: "48%", left: "66%" },
  { top: "36%", left: "36%" },
  { top: "70%", left: "44%" },
];

export function FoundationsSection() {
  const { tokens } = useSystem();
  const [swatchId, setSwatchId] = useState("a");
  const [ramp, setRamp] = useState("red");
  const [roleId, setRoleId] = useState("display");
  const [bpId, setBpId] = useState("lg");
  const [motion, setMotion] = useState(true);

  const swatch = canvasSwatches.find((s) => s.id === swatchId) ?? canvasSwatches[0];
  const role = typeRoles.find((r) => r.id === roleId) ?? typeRoles[0];
  const bp = breakpoints.find((b) => b.id === bpId) ?? breakpoints[2];
  const ratio = contrastRatio(tokens.text, tokens.surface);

  return (
    <Chapter
      id="foundations"
      index="02 · Foundations"
      title="The decisions everyone inherits."
      lede="Color, type, spacing, motion, breakpoints, and icons — abstracted into a small vocabulary. Accessibility is measured here, not patched later."
    >
      <div className="dsys-split">
        <Panel className="dsys-canvas" aria-label="Design tool color canvas">
          <div className="dsys-canvas-bar">Lumen / Colors</div>
          <div className="dsys-canvas-stage">
            {canvasSwatches.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className={`dsys-canvas-chip ${swatchId === s.id ? "is-active" : ""}`}
                style={POSITIONS[i]}
                onClick={() => setSwatchId(s.id)}
                aria-pressed={swatchId === s.id}
              >
                <i style={{ background: s.hex }} />
                {s.hex}
              </button>
            ))}
          </div>
        </Panel>
        <Panel>
          <Label>Inspect</Label>
          <h3>
            {swatch.label} · {swatch.hex}
          </h3>
          <p>Referenced in {swatch.files} files. Still a one-off until it earns a semantic name.</p>
          <CopyValue value={swatch.hex} />
        </Panel>
      </div>

      <Label>Color ramps</Label>
      <Panel>
        <div className="dsys-pill-row">
          {Object.keys(primitives).map((name) => (
            <button
              key={name}
              type="button"
              className="dsys-pill"
              aria-pressed={ramp === name}
              onClick={() => setRamp(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="dsys-ramp">
          {Object.entries(primitives[ramp]).map(([step, hex]) => (
            <button
              key={step}
              type="button"
              className="dsys-ramp-step"
              style={{ background: hex }}
              onClick={() => navigator.clipboard?.writeText(hex)}
              title={`Copy ${hex}`}
            >
              <span>{step}</span>
            </button>
          ))}
        </div>
      </Panel>

      <div className="dsys-trio">
        <Panel>
          <Label>Typography</Label>
          <div className="dsys-pill-row">
            {typeRoles.map((r) => (
              <button
                key={r.id}
                type="button"
                className="dsys-pill"
                aria-pressed={roleId === r.id}
                onClick={() => setRoleId(r.id)}
              >
                {r.label}
              </button>
            ))}
          </div>
          <p
            className="dsys-type-sample"
            style={{
              fontFamily: role.family,
              fontSize: role.size,
              fontWeight: role.weight,
              textTransform: role.uppercase ? "uppercase" : "none",
              letterSpacing: role.uppercase ? "0.1em" : "-0.01em",
            }}
          >
            {role.sample}
          </p>
        </Panel>

        <Panel>
          <Label>Spacing</Label>
          <div className="dsys-spacing">
            {spacingScale.map((s) => (
              <div key={s.token} className="dsys-spacing-row">
                <code>{s.token}</code>
                <i style={{ width: s.px, height: s.px }} />
                <span>{s.px}px</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <Label>Breakpoints</Label>
          <div className="dsys-pill-row">
            {breakpoints.map((b) => (
              <button
                key={b.id}
                type="button"
                className="dsys-pill"
                aria-pressed={bpId === b.id}
                onClick={() => setBpId(b.id)}
              >
                {b.id}
              </button>
            ))}
          </div>
          <div className="dsys-bp" style={{ maxWidth: Math.min(bp.width, 320) }}>
            <div
              className="dsys-bp-grid"
              style={{ gridTemplateColumns: `repeat(${bp.cols}, 1fr)` }}
            >
              {Array.from({ length: bp.cols }).map((_, i) => (
                <i key={i} />
              ))}
            </div>
            <span>
              {bp.width}px · {bp.cols} col
            </span>
          </div>
        </Panel>
      </div>

      <div className="dsys-split">
        <Panel>
          <Label>Motion</Label>
          <button
            type="button"
            className="dsys-pill"
            aria-pressed={motion}
            onClick={() => setMotion((v) => !v)}
          >
            {motion ? "Motion on" : "Motion off"}
          </button>
          <div className={`dsys-motion ${motion ? "is-on" : ""}`}>
            <span>Lift</span>
            <span>Fade</span>
            <span>Stagger</span>
          </div>
        </Panel>
        <Panel>
          <Label>Iconography · 16px / 32px</Label>
          <div className="dsys-icons">
            {ICONS.slice(0, 3).map(({ Icon, label }) => (
              <span key={label}>
                <Icon size={16} />
                <small>{label}</small>
              </span>
            ))}
          </div>
          <div className="dsys-icons dsys-icons-lg">
            {ICONS.slice(3, 6).map(({ Icon, label }) => (
              <span key={label}>
                <Icon size={32} />
                <small>{label}</small>
              </span>
            ))}
          </div>
        </Panel>
      </div>

      <Panel className="dsys-a11y">
        <Label>Contrast · WCAG AA</Label>
        <div className="dsys-a11y-sample" style={{ background: tokens.surface, color: tokens.text }}>
          <strong>Text on surface</strong>
          <p>
            {ratio.toFixed(2)}:1 — {ratio >= 4.5 ? "pass" : "fail"} for body copy
          </p>
        </div>
        <CopyValue value={tokens.text} label="Copy text token" />
      </Panel>
    </Chapter>
  );
}
