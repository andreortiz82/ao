import { useState } from "react";
import { Chapter, Label, Panel } from "../parts/Chapter.jsx";
import { DemoBadge, Specimen } from "../parts/Specimen.jsx";

const REQUESTS = [
  {
    id: "warning",
    title: "color.warning",
    ask: "Warning for ‘needs review’ — not danger, not accent.",
  },
  {
    id: "ghost",
    title: "Button / ghost-danger",
    ask: "Destructive secondary without a new hex.",
  },
  {
    id: "space",
    title: "space.section",
    ask: "48px between sections. Teams invent 42 and 56 today.",
  },
];

const STEPS = [
  {
    title: "Request",
    owner: "Requester",
    human: (req) => req.ask,
    ai: null,
  },
  {
    title: "Map",
    owner: "Systems lead",
    human: (req) =>
      req.id === "warning"
        ? "Maps to amber.500 → color.warning. No new hex."
        : req.id === "ghost"
          ? "Existing danger + ghost variant. Component change only."
          : "space.24 × 2 → space.section. Documented in scale.",
    ai: (req) =>
      req.id === "warning"
        ? "Suggests amber.500 from primitives. Contrast on surface: 4.8:1."
        : "Finds danger token + ghost pattern. No new color needed.",
  },
  {
    title: "Implement",
    owner: "Engineer",
    human: () => "Token in CSS + JS. Organism update. PR to system package.",
    ai: () => "Drafts PR: --color-warning, Badge update, changelog entry.",
  },
  {
    title: "Review",
    owner: "Lead + engineer",
    human: () => "Contrast in light/dark. Name matches job. No one-offs.",
    ai: () => "Runs contrast across brands/modes. Flags Harbor dark at 4.6:1 for human sign-off.",
  },
  {
    title: "Ship",
    owner: "Release",
    human: (req) => `v1.4.0 — ${req.title}. Changelog + design tool library publish.`,
    ai: () => "Prepares release notes. Human approves before publish.",
  },
];

const LOG = [
  { v: "v1.4.0", item: "color.warning", note: "Semantic warning — not danger." },
  { v: "v1.3.2", item: "Badge contrast", note: "Dark muted-on-surface now 5.1:1." },
  { v: "v1.3.0", item: "Harbor theme", note: "Token remap only." },
];

export function GovernanceSection() {
  const [reqId, setReqId] = useState("warning");
  const [step, setStep] = useState(0);
  const [logIdx, setLogIdx] = useState(0);

  const req = REQUESTS.find((r) => r.id === reqId) ?? REQUESTS[0];
  const current = STEPS[step];

  return (
    <Chapter
      id="governance"
      index="06 · Governance"
      title="Agents propose. Humans approve."
      lede="AI can inspect tokens, check contrast, and draft changes — but names stay owned. Governance is speed with oversight, not autonomous edits."
    >
      <div className="dsys-pill-row">
        {REQUESTS.map((r) => (
          <button
            key={r.id}
            type="button"
            className="dsys-pill"
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

      <div className="dsys-split">
        <Panel className="dsys-steps">
          {STEPS.map((s, i) => (
            <button
              key={s.title}
              type="button"
              className="dsys-step"
              aria-current={step === i ? "step" : undefined}
              onClick={() => setStep(i)}
            >
              <span>0{i + 1}</span>
              <span>
                <strong>{s.title}</strong>
                <small>{s.owner}</small>
              </span>
            </button>
          ))}
        </Panel>

        <Panel>
          <Label>
            {current.title} · {current.owner}
          </Label>
          <p>{current.human(req)}</p>
          {current.ai && (
            <div className="dsys-ai">
              <Label>AI assist</Label>
              <p>{current.ai(req)}</p>
            </div>
          )}
          <div className="dsys-pill-row">
            <button type="button" className="dsys-pill" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
              Back
            </button>
            <button
              type="button"
              className="dsys-pill"
              disabled={step === STEPS.length - 1}
              onClick={() => setStep((s) => s + 1)}
            >
              Next
            </button>
          </div>
          {step === STEPS.length - 1 && (
            <Specimen style={{ marginTop: "1rem", padding: "0.75rem" }}>
              <DemoBadge tone="accent">Shipped</DemoBadge>
              <p className="dsys-hint">Human approved. Named decision in the changelog.</p>
            </Specimen>
          )}
        </Panel>
      </div>

      <Label>Changelog</Label>
      <div className="dsys-log">
        {LOG.map((entry, i) => (
          <button
            key={entry.v}
            type="button"
            className="dsys-log-item"
            aria-pressed={logIdx === i}
            onClick={() => setLogIdx(i)}
          >
            <span>{entry.v}</span>
            {entry.item}
          </button>
        ))}
      </div>
      <Panel>
        <p>{LOG[logIdx].note}</p>
      </Panel>
    </Chapter>
  );
}
