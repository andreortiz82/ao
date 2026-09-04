import { useState } from "react";
import { Chapter, Label, Panel } from "../parts/Chapter.jsx";
import {
  DemoCard,
  DemoField,
  DemoToolbar,
  Specimen,
} from "../parts/Specimen.jsx";
import { useSystem } from "../parts/SystemContext.jsx";

const ATOMS = ["Input", "Icon", "Button", "Avatar"];
const STATES = [
  { id: "default", label: "Default", note: "Hierarchy, spacing, and action in one surface." },
  { id: "review", label: "Needs review", note: "Status via semantic token — not a forked component." },
  { id: "empty", label: "Empty", note: "Structure stays; next action becomes explicit." },
];

export function ComponentsSection() {
  const [atoms, setAtoms] = useState(new Set(ATOMS));
  const [stateId, setStateId] = useState("default");
  const { brandId, mode, brand } = useSystem();
  const state = STATES.find((s) => s.id === stateId) ?? STATES[0];

  const toggle = (atom) =>
    setAtoms((prev) => {
      const next = new Set(prev);
      if (next.has(atom)) next.delete(atom);
      else next.add(atom);
      return next;
    });

  const hasMolecule = atoms.has("Input") && atoms.has("Icon");
  const hasOrganism = hasMolecule && atoms.has("Button") && atoms.has("Avatar");
  const hasTemplate = hasOrganism;
  const hasPage = hasTemplate;

  return (
    <Chapter
      id="components"
      index="04 · Components"
      title="Composition, not customization."
      lede="Atoms become molecules, organisms, templates, and pages. Switch brand or mode with the dock — every layer inherits the same contract."
    >
      <div className="dsys-atomic dsys-atomic-pin">
        {[
          {
            key: "atoms",
            title: "Atoms",
            body: (
              <div className="dsys-atom-list">
                {ATOMS.map((atom) => (
                  <button
                    key={atom}
                    type="button"
                    className="dsys-pill"
                    aria-pressed={atoms.has(atom)}
                    onClick={() => toggle(atom)}
                  >
                    {atom}
                  </button>
                ))}
              </div>
            ),
          },
          {
            key: "molecule",
            title: "Molecule",
            body: hasMolecule ? <DemoField /> : <p className="dsys-hint">Add Input + Icon</p>,
          },
          {
            key: "organism",
            title: "Organism",
            body: hasOrganism ? (
              <Specimen style={{ padding: "0.5rem" }}>
                <DemoToolbar />
              </Specimen>
            ) : (
              <p className="dsys-hint">Add Button + Avatar</p>
            ),
          },
          {
            key: "template",
            title: "Template",
            body: hasTemplate ? (
              <Specimen style={{ padding: "0.5rem" }}>
                <div className="dsys-template">
                  <header />
                  <aside />
                  <main>
                    <i />
                    <i className="short" />
                  </main>
                </div>
              </Specimen>
            ) : (
              <p className="dsys-hint">Wireframe shell</p>
            ),
          },
          {
            key: "page",
            title: "Page",
            body: hasPage ? (
              <Specimen style={{ padding: "0.5rem" }}>
                <DemoToolbar />
                <DemoCard kicker={brand.label} />
              </Specimen>
            ) : (
              <p className="dsys-hint">Template + organisms</p>
            ),
          },
        ].map((layer) => (
          <Panel key={layer.key} className="dsys-atomic-layer">
            <Label>{layer.title}</Label>
            {layer.body}
          </Panel>
        ))}
      </div>

      <div className="dsys-pill-row">
        {STATES.map((s) => (
          <button
            key={s.id}
            type="button"
            className="dsys-pill"
            aria-pressed={stateId === s.id}
            onClick={() => setStateId(s.id)}
          >
            {s.label}
          </button>
        ))}
        <span className="dsys-context">{brandId} · {mode}</span>
      </div>

      <div className="dsys-split">
        <Panel>
          <Label>Live surface</Label>
          <Specimen>
            {stateId === "empty" ? (
              <div className="dsys-empty">
                <span>+</span>
                <strong>No goals yet</strong>
                <p>Create the first goal to give the team a starting point.</p>
                <button type="button" className="dsys-btn dsys-btn-primary">
                  Create goal
                </button>
              </div>
            ) : (
              <>
                <DemoToolbar />
                <DemoCard
                  kicker={brand.label}
                  status={stateId === "review" ? "Needs review" : "On track"}
                  body={
                    stateId === "review"
                      ? "One decision needs an owner before this ships."
                      : undefined
                  }
                />
              </>
            )}
          </Specimen>
        </Panel>
        <Panel>
          <Label>What changed</Label>
          <h3>{state.label}</h3>
          <p>{state.note}</p>
        </Panel>
      </div>
    </Chapter>
  );
}
