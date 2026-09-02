import { useState } from "react";
import { WarningIcon } from "@phosphor-icons/react";
import { Chapter, Label, Panel } from "../parts/Chapter.jsx";
import {
  DemoBadge,
  DemoCard,
  DemoToolbar,
  Specimen,
} from "../parts/Specimen.jsx";
import { useSystem } from "../parts/SystemContext.jsx";

const PAIRS = [
  {
    id: "contrast",
    title: "Contrast",
    do: "Ink on paper. Type carries the interface.",
    dont: "Muted on muted. Soft, but unreadable.",
    hint: "Harbor in dark mode exposes weak pairs faster — fix the token, not the component.",
  },
  {
    id: "spacing",
    title: "Spacing",
    do: "One scale: 8, 16, 24. Rhythm you can feel.",
    dont: "13px here, 18px there. Layout fidgets.",
    hint: "Spacing tokens are brand-agnostic. Rhythm should hold when accent remaps.",
  },
  {
    id: "icons",
    title: "Icons",
    do: "Optical size tracks cap height.",
    dont: "32px fill icon beside 11px label.",
    hint: "Icon weight should match the label — not shout over it.",
  },
  {
    id: "buttons",
    title: "Buttons",
    do: "One primary. Ghost for the rest.",
    dont: "Two solids. Everything urgent; nothing is.",
    hint: "Cinder amber makes double-primary even louder.",
  },
  {
    id: "tokens",
    title: "Tokens",
    do: "Accent for action. Danger for damage.",
    dont: "Red heading because it ‘pops’.",
    hint: "Remap accent per brand — the role stays stable.",
  },
];

function PairVisual({ id, good }) {
  if (id === "contrast") {
    return (
      <div
        className="dsys-pair-stage"
        style={{
          background: good ? "#fff" : "#d4d4d4",
          color: good ? "#121211" : "#adadad",
        }}
      >
        Review sprint goals
      </div>
    );
  }
  if (id === "spacing") {
    return (
      <div className="dsys-pair-stage" style={{ display: "flex", flexDirection: "column", gap: good ? 16 : 6 }}>
        <i className="dsys-bar" />
        <i className="dsys-bar" style={{ width: "70%" }} />
        <i className="dsys-bar" style={{ width: "40%" }} />
      </div>
    );
  }
  if (id === "icons") {
    return (
      <div className="dsys-pair-stage dsys-pair-icons">
        <WarningIcon size={good ? 18 : 28} weight={good ? "regular" : "fill"} />
        <span style={{ fontSize: good ? 15 : 11 }}>Needs review</span>
      </div>
    );
  }
  if (id === "buttons") {
    return (
      <div className="dsys-pair-stage dsys-pair-btns">
        <button type="button" className="dsys-btn dsys-btn-primary">Save</button>
        <button
          type="button"
          className="dsys-btn dsys-btn-ghost"
          style={{
            background: good ? "transparent" : "#121211",
            color: good ? "#121211" : "#fff",
          }}
        >
          Cancel
        </button>
      </div>
    );
  }
  return (
    <div className="dsys-pair-stage">
      <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: good ? "#121211" : "#dc2626", margin: 0 }}>
        Review sprint goals
      </p>
    </div>
  );
}

export function ExamplesSection() {
  const [pairId, setPairId] = useState("contrast");
  const { brand, mode } = useSystem();
  const pair = PAIRS.find((p) => p.id === pairId) ?? PAIRS[0];

  return (
    <Chapter
      id="examples"
      index="05 · Examples"
      title="See the system respond."
      lede="Use the floating dock to change brand and theme. Compare the miss with the fix — the better path should feel like the default."
    >
      <Panel>
        <Label>
          Live specimen · {brand.label} · {mode}
        </Label>
        <Specimen>
          <DemoToolbar />
          <div className="dsys-badges">
            <DemoBadge>Accent</DemoBadge>
            <DemoBadge tone="success">On track</DemoBadge>
            <DemoBadge tone="danger">Blocked</DemoBadge>
          </div>
          <DemoCard
            kicker={brand.label}
            title="Change me with the dock"
            body="Brand accent, surface, and text remap instantly. Components do not fork."
          />
        </Specimen>
      </Panel>

      <Label>Dos and don&apos;ts</Label>
      <div className="dsys-pill-row">
        {PAIRS.map((p) => (
          <button
            key={p.id}
            type="button"
            className="dsys-pill"
            aria-pressed={pairId === p.id}
            onClick={() => setPairId(p.id)}
          >
            {p.title}
          </button>
        ))}
      </div>
      <p className="dsys-hint dsys-hint-italic">{pair.hint}</p>

      <div className="dsys-pair-grid">
        <Panel className="dsys-do">
          <strong>Do</strong>
          <PairVisual id={pair.id} good />
          <p>{pair.do}</p>
        </Panel>
        <Panel className="dsys-dont">
          <strong>Don&apos;t</strong>
          <PairVisual id={pair.id} good={false} />
          <p>{pair.dont}</p>
        </Panel>
      </div>
    </Chapter>
  );
}
