import { useState } from "react";
import { Chapter, Label, Panel } from "../parts/Chapter.jsx";
import { CopyValue } from "../parts/CopyValue.jsx";
import { useSystem } from "../parts/SystemContext.jsx";

const SKILLS = [
  {
    id: "designer",
    role: "Designer",
    name: "compose-pattern",
    title: "Assemble organisms from tokens",
    body: "Compose known components inside system rules — no one-off frames in the handoff.",
    output: `skill: compose-pattern
prompt: "Toolbar with search + primary action"
→ ProductToolbar + Field + Button`,
  },
  {
    id: "pm",
    role: "Product manager",
    name: "audit-consistency",
    title: "Flag one-offs before handoff",
    body: "Scan specs for unnamed colors, spacing outliers, and components outside the library.",
    output: `skill: audit-consistency
found: 3 unnamed colors, 2 spacing outliers
→ map to color.warning, space.24`,
  },
  {
    id: "engineer",
    role: "Engineer",
    name: "generate-theme",
    title: "Export CSS + Tailwind @theme",
    body: "Generate production theme output from the token source.",
    output: `@theme inline {
  --color-accent: #dc2626;
  --color-foreground: #0a0a0a;
}`,
  },
  {
    id: "tools",
    role: "Design tools",
    name: "sync-library",
    title: "Keep tools and code aligned",
    body: "Publish semantic roles and component properties designers choose from.",
    output: `Component / Toolbar
props: variant, size, tone
tokens: color.accent, space.16`,
  },
];

export function SkillsSection() {
  const [active, setActive] = useState("designer");
  const skill = SKILLS.find((s) => s.id === active) ?? SKILLS[0];
  const { tokens } = useSystem();

  return (
    <Chapter
      id="skills"
      index="07 · Skills & Plugins"
      title="Agentic leverage for every role."
      lede="Skills and plugins for designers, product managers, and engineers — each working inside the system, not around it."
    >
      <div className="dsys-skill-grid">
        {SKILLS.map((s) => (
          <button
            key={s.id}
            type="button"
            className="dsys-skill-card"
            aria-pressed={active === s.id}
            onClick={() => setActive(s.id)}
          >
            <Label>{s.role}</Label>
            <strong>{s.name}</strong>
            <span>{s.title}</span>
          </button>
        ))}
      </div>

      <Panel>
        <Label>
          {skill.role} · {skill.name}
        </Label>
        <h3>{skill.title}</h3>
        <p>{skill.body}</p>
        <pre className="dsys-code">{skill.output}</pre>
        <CopyValue value={skill.output} label="Copy output" />
        <p className="dsys-accent-readout">
          Current accent <i style={{ background: tokens.accent }} /> {tokens.accent}
        </p>
      </Panel>
    </Chapter>
  );
}
