import { useState } from "react";
import { WarningIcon } from "@phosphor-icons/react";
import { brands, semanticKeys, tokensToCss, tokensToJs } from "./tokens.js";
import {
  Chapter,
  CopyButton,
  KitBadge,
  KitField,
  KitToolbar,
  ProductCard,
  Specimen,
  Stage,
  useKit,
} from "./kit.jsx";

const PAIRS = [
  {
    id: "contrast",
    title: "Contrast",
    doNote: "Ink on paper. The type is the interface.",
    dontNote: "Muted gray on muted gray. Looks ‘soft’, reads as broken.",
  },
  {
    id: "spacing",
    title: "Spacing",
    doNote: "One scale. 8 / 16 / 24. Rhythm you can feel.",
    dontNote: "13px here, 18px there. The layout fidgets.",
  },
  {
    id: "icons",
    title: "Icon alignment",
    doNote: "Icon optical size matches the cap height.",
    dontNote: "A 28px fill icon next to 12px copy.",
  },
  {
    id: "buttons",
    title: "Button hierarchy",
    doNote: "One primary. Ghost for the rest.",
    dontNote: "Two solids. Everything is urgent, so nothing is.",
  },
  {
    id: "tokens",
    title: "Token misuse",
    doNote: "Accent is for action. Danger is for damage.",
    dontNote: "A red heading because it ‘pops’.",
  },
];

export function DosDonts() {
  const [id, setId] = useState("contrast");
  const pair = PAIRS.find((p) => p.id === id) ?? PAIRS[0];

  return (
    <Chapter
      id="pairs"
      index="08"
      title={
        <>
          Show the miss. Then the <em>fix</em>.
        </>
      }
      lede="Policy essays do not change files. Pairs do. Click a rule and look at both sides — then ship the left."
    >
      <div className="ds-seg" style={{ marginBottom: "1rem" }}>
        {PAIRS.map((p) => (
          <button
            key={p.id}
            type="button"
            aria-pressed={id === p.id}
            onClick={() => setId(p.id)}
          >
            {p.title}
          </button>
        ))}
      </div>
      <div className="ds-pair">
        <div className="ds-do">
          <strong>Do</strong>
          <PairPreview id={pair.id} good />
          <p className="ds-lede" style={{ marginTop: "0.75rem", fontSize: 14 }}>
            {pair.doNote}
          </p>
        </div>
        <div className="ds-dont">
          <strong>Don&apos;t</strong>
          <PairPreview id={pair.id} good={false} />
          <p className="ds-lede" style={{ marginTop: "0.75rem", fontSize: 14 }}>
            {pair.dontNote}
          </p>
        </div>
      </div>
    </Chapter>
  );
}

function PairPreview({ id, good }) {
  if (id === "contrast") {
    return (
      <div
        className="ds-pair-stage"
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
      <div
        className="ds-pair-stage"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: good ? "1rem" : "0.35rem",
          padding: good ? "1rem" : "0.4rem 0.85rem",
        }}
      >
        <div style={{ height: 10, background: "#e2e2db", borderRadius: 99 }} />
        <div
          style={{
            height: 10,
            width: "70%",
            background: "#e2e2db",
            borderRadius: 99,
          }}
        />
        <div
          style={{
            height: 10,
            width: "40%",
            background: "#e2e2db",
            borderRadius: 99,
          }}
        />
      </div>
    );
  }
  if (id === "icons") {
    return (
      <div className="ds-pair-stage ds-icon-row">
        <WarningIcon size={good ? 18 : 28} weight={good ? "regular" : "fill"} />
        <span style={{ fontSize: good ? 15 : 12 }}>Needs review</span>
      </div>
    );
  }
  if (id === "buttons") {
    return (
      <div className="ds-pair-stage ds-product-actions">
        <button
          type="button"
          className="ds-btn ds-btn-primary"
          style={{ background: "#121211", color: "#fff" }}
        >
          Save
        </button>
        <button
          type="button"
          className="ds-btn ds-btn-ghost"
          style={{
            background: good ? "transparent" : "#121211",
            color: good ? "#121211" : "#fff",
            borderColor: "#e2e2db",
          }}
        >
          Cancel
        </button>
      </div>
    );
  }
  return (
    <div className="ds-pair-stage">
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.35rem",
          color: good ? "#121211" : "#dc2626",
          margin: 0,
        }}
      >
        Review sprint goals
      </p>
      {good && (
        <div className="ds-product-actions" style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="ds-btn ds-btn-primary"
            style={{ background: "#dc2626", color: "#fff" }}
          >
            Open
          </button>
        </div>
      )}
    </div>
  );
}

const REQUESTS = [
  {
    id: "warning",
    title: "color.warning",
    owner: "Designer",
    ask: "Need a warning color for ‘needs review’ — not danger, not accent.",
  },
  {
    id: "ghost",
    title: "Button / ghost-danger",
    owner: "Engineer",
    ask: "Destructive secondary for ‘Remove from board’ — no new hex.",
  },
  {
    id: "space",
    title: "space.section",
    owner: "Designer",
    ask: "Need 48px between chapters. Today people are inventing 42 and 56.",
  },
];

const STEPS = [
  {
    title: "Request",
    owner: "Requester",
    body: (req) => req.ask,
  },
  {
    title: "Map",
    owner: "Systems lead",
    body: (req) =>
      req.id === "warning"
        ? "Maps to primitive amber.500. Semantic name: color.warning. No new hex."
        : req.id === "ghost"
          ? "Maps to existing danger + ghost variant. Component change, not a new color."
          : "Maps to space.24 × 2. Name: space.section. Documented in the scale.",
  },
  {
    title: "Implement",
    owner: "Engineer",
    body: () =>
      "Adds the token to CSS + JS. Updates the organism. Opens a PR against the system package.",
  },
  {
    title: "Review",
    owner: "Systems lead + engineer",
    body: () =>
      "Contrast in light/dark. Name matches the job. No one-off in the component.",
  },
  {
    title: "Ship",
    owner: "Release",
    body: (req) => `v1.4.0 — ${req.title}. Changelog, Slack, Figma library publish.`,
  },
];

const CHANGELOG = [
  {
    version: "v1.4.0",
    item: "color.warning from amber.500",
    note: "Semantic warning. Not danger. Not accent.",
  },
  {
    version: "v1.3.2",
    item: "Badge organism contrast fix",
    note: "Dark mode muted-on-surface now 5.1:1.",
  },
  {
    version: "v1.3.0",
    item: "Harbor theme",
    note: "Token remap only. No component forks.",
  },
  {
    version: "v1.2.1",
    item: "Phosphor 20/regular default",
    note: "Icon size locked to UI label cap height.",
  },
];

export function Governance() {
  const [reqId, setReqId] = useState("warning");
  const [step, setStep] = useState(0);
  const [logId, setLogId] = useState(0);
  const req = REQUESTS.find((r) => r.id === reqId) ?? REQUESTS[0];
  const current = STEPS[step];

  return (
    <Chapter
      id="governance"
      index="09"
      title={
        <>
          Who owns the <em>name</em>.
        </>
      }
      lede="Designers do not invent hexes in PRs. Engineers do not invent jobs in CSS. Tokens are owned. Components are contributed. Versioning is how the team stays fast."
    >
      <p className="section-label" style={{ marginBottom: "0.65rem" }}>
        Contribution request
      </p>
      <div className="ds-seg" style={{ marginBottom: "1rem" }}>
        {REQUESTS.map((r) => (
          <button
            key={r.id}
            type="button"
            aria-pressed={reqId === r.id}
            onClick={() => {
              setReqId(r.id);
              setStep(0);
            }}
          >
            {r.title}
          </button>
        ))}
      </div>

      <div className="ds-grid-2">
        <div className="ds-steps">
          {STEPS.map((s, i) => (
            <button
              key={s.title}
              type="button"
              className="ds-step"
              aria-current={i === step ? "step" : undefined}
              onClick={() => setStep(i)}
            >
              <span className="ds-step-num">0{i + 1}</span>
              <span>
                <strong>{s.title}</strong>
                <span className="ds-step-owner">{s.owner}</span>
              </span>
            </button>
          ))}
        </div>
        <Stage>
          <p className="section-label">
            {current.title} · {current.owner}
          </p>
          <p className="ds-gov-body">{current.body(req)}</p>
          <div className="ds-seg">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
              disabled={step === STEPS.length - 1}
            >
              Next
            </button>
          </div>
          {step === STEPS.length - 1 && (
            <Specimen style={{ marginTop: "1.1rem", padding: "0.85rem" }}>
              <div className="ds-badge-row">
                <KitBadge tone="accent">Shipped</KitBadge>
                {req.id === "warning" && (
                  <KitBadge tone="warning">Needs review</KitBadge>
                )}
              </div>
              <p className="ds-lede" style={{ marginTop: "0.65rem", fontSize: 14 }}>
                The request is now a named decision. Next hire will find it.
              </p>
            </Specimen>
          )}
        </Stage>
      </div>

      <p className="section-label" style={{ margin: "1.75rem 0 0.65rem" }}>
        Changelog
      </p>
      <div className="ds-changelog">
        {CHANGELOG.map((entry, i) => (
          <button
            key={entry.version}
            type="button"
            className="ds-log"
            aria-pressed={logId === i}
            onClick={() => setLogId(i)}
          >
            <span className="ds-log-v">{entry.version}</span>
            <span>{entry.item}</span>
          </button>
        ))}
      </div>
      <Stage>
        <p className="section-label">{CHANGELOG[logId].version}</p>
        <p className="ds-gov-body">{CHANGELOG[logId].note}</p>
      </Stage>
    </Chapter>
  );
}

export function Payoff() {
  const { brand, setBrand, mode, setMode, tokens } = useKit();
  const [tab, setTab] = useState("organism");
  const [picked, setPicked] = useState("accent");
  const source = tab === "css" ? tokensToCss(tokens) : tokensToJs(tokens);
  const pickedMeta = semanticKeys.find((s) => s.key === picked) ?? semanticKeys[5];

  return (
    <Chapter
      id="payoff"
      index="10"
      title={
        <>
          Operate the <em>system</em>.
        </>
      }
      lede="This is the point. Tokens, theme, and a composed organism — usable, not a recap. Change the brand. Flip the mode. Inspect a token. The product holds."
    >
      <div className="ds-payoff-controls">
        {Object.entries(brands).map(([id, b]) => (
          <button
            key={id}
            type="button"
            className="ds-chip"
            aria-pressed={brand === id}
            onClick={() => setBrand(id)}
          >
            {b.label}
          </button>
        ))}
        <button
          type="button"
          className="ds-chip"
          aria-pressed={mode === "light"}
          onClick={() => setMode("light")}
        >
          Light
        </button>
        <button
          type="button"
          className="ds-chip"
          aria-pressed={mode === "dark"}
          onClick={() => setMode("dark")}
        >
          Dark
        </button>
        <button
          type="button"
          className="ds-chip"
          aria-pressed={tab === "organism"}
          onClick={() => setTab("organism")}
        >
          Organism
        </button>
        <button
          type="button"
          className="ds-chip"
          aria-pressed={tab === "css"}
          onClick={() => setTab("css")}
        >
          CSS
        </button>
        <button
          type="button"
          className="ds-chip"
          aria-pressed={tab === "js"}
          onClick={() => setTab("js")}
        >
          JS
        </button>
      </div>

      <div className="ds-explorer">
        <div className="ds-explorer-tokens">
          <p className="section-label">Tokens</p>
          {semanticKeys.map((s) => (
            <button
              key={s.key}
              type="button"
              className="ds-token-chip"
              aria-pressed={picked === s.key}
              onClick={() => setPicked(s.key)}
            >
              <i style={{ background: tokens[s.key] }} />
              {s.label}
            </button>
          ))}
          <div className="ds-inspect" style={{ marginTop: "0.75rem" }}>
            <p className="section-label">{pickedMeta.label}</p>
            <h3>{tokens[picked]}</h3>
            <p>
              --color-{picked} · color.{picked}
            </p>
            <CopyButton text={tokens[picked]} label="Copy hex" />
          </div>
        </div>
        <Stage>
          {tab === "organism" ? (
            <Specimen>
              <div className="ds-chrome">
                <KitToolbar />
                <div className="ds-badge-row">
                  <KitBadge>Accent</KitBadge>
                  <KitBadge tone="success">On track</KitBadge>
                  <KitBadge tone="danger">Blocked</KitBadge>
                </div>
                <ProductCard
                  kicker={brands[brand].label}
                  title="The system is the sample"
                  body="Tokens, theme, and a composed organism. This is what a small team ships against — not a slide."
                />
              </div>
            </Specimen>
          ) : (
            <div>
              <CopyButton text={source} />
              <pre className="ds-code" style={{ marginTop: "0.75rem" }}>
                {source}
              </pre>
            </div>
          )}
        </Stage>
      </div>
    </Chapter>
  );
}
