import { useState } from "react";
import {
  BellIcon,
  CheckCircleIcon,
  GearSixIcon,
  MagnifyingGlassIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  UserCircleIcon,
  WarningIcon,
} from "@phosphor-icons/react";
import { brands, typeRoles, typeScale } from "./tokens.js";
import {
  Chapter,
  KitField,
  KitToolbar,
  ProductCard,
  Specimen,
  Stage,
  useKit,
} from "./kit.jsx";

export function Typography() {
  const [role, setRole] = useState("display");
  const [scaleId, setScaleId] = useState("body");
  const current = typeRoles.find((r) => r.id === role) ?? typeRoles[0];
  const step = typeScale.find((s) => s.id === scaleId) ?? typeScale[2];

  return (
    <Chapter
      id="type"
      index="04"
      title={
        <>
          Type has jobs, not just <em>sizes</em>.
        </>
      }
      lede="Display carries the idea. Body carries the argument. Meta carries the metadata. Pick a role, then walk the scale — the same sentence changes its job."
    >
      <div className="ds-grid-2">
        <div className="ds-type-row">
          {typeRoles.map((r) => (
            <button
              key={r.id}
              type="button"
              aria-pressed={role === r.id}
              onClick={() => setRole(r.id)}
            >
              <p className="section-label">{r.label}</p>
              <div>
                {r.font} · {r.size} · {r.weight}
              </div>
            </button>
          ))}
        </div>
        <Stage>
          <p
            style={{
              fontFamily: current.cssFamily,
              fontSize: current.size,
              fontWeight: current.weight,
              letterSpacing: current.tracking,
              textTransform: current.id === "meta" ? "uppercase" : "none",
              lineHeight: current.id === "display" ? 1.1 : 1.5,
              margin: 0,
            }}
          >
            {current.sample}
          </p>
        </Stage>
      </div>

      <p className="section-label" style={{ margin: "1.75rem 0 0.65rem" }}>
        Scale
      </p>
      <Stage>
        <div className="ds-scale">
          {typeScale.map((s) => (
            <button
              key={s.id}
              type="button"
              className="ds-scale-row"
              aria-pressed={scaleId === s.id}
              onClick={() => setScaleId(s.id)}
            >
              <span className="section-label">{s.role}</span>
              <span
                style={{
                  fontFamily: s.family,
                  fontSize: s.size,
                  fontWeight: s.weight,
                  letterSpacing: s.tracking,
                  lineHeight: s.lh,
                  textTransform: s.id === "meta" ? "uppercase" : "none",
                }}
              >
                {s.id === "meta" ? "Lumen · v1.4" : "A system a team can ship"}
              </span>
              <span className="ds-scale-meta">
                {s.font} · {s.size} · {s.weight}
              </span>
            </button>
          ))}
        </div>
      </Stage>

      <p className="section-label" style={{ margin: "1.75rem 0 0.65rem" }}>
        Mixed specimen · {step.role} selected
      </p>
      <Stage>
        <article className="ds-type-specimen">
          <p className="ds-type-kicker">Lumen · Product</p>
          <h3 style={{ fontSize: scaleId === "display" ? step.size : undefined }}>
            Review sprint goals
          </h3>
          <p>
            Three open threads. One decision. The system keeps the chrome quiet
            so the work can be loud — {step.role.toLowerCase()} is currently{" "}
            {step.size} {step.font}.
          </p>
          <p className="ds-type-kicker">Updated 2h ago · Design systems</p>
        </article>
      </Stage>
    </Chapter>
  );
}

const ICONS = [
  { id: "search", label: "Search", Icon: MagnifyingGlassIcon },
  { id: "warn", label: "Warning", Icon: WarningIcon },
  { id: "ok", label: "Success", Icon: CheckCircleIcon },
  { id: "user", label: "Account", Icon: UserCircleIcon },
  { id: "bell", label: "Alerts", Icon: BellIcon },
  { id: "gear", label: "Settings", Icon: GearSixIcon },
  { id: "trash", label: "Delete", Icon: TrashIcon },
];

export function Iconography() {
  const [size, setSize] = useState(20);
  const [weight, setWeight] = useState("regular");
  const [picked, setPicked] = useState("warn");
  const current = ICONS.find((i) => i.id === picked) ?? ICONS[1];
  const CurrentIcon = current.Icon;

  return (
    <Chapter
      id="icons"
      index="05"
      title={
        <>
          Icons are type, <em>drawn</em>.
        </>
      }
      lede="Phosphor is the system icon set. Size and weight have to sit on the same baseline as the copy beside them — or they shout over it."
    >
      <div className="ds-seg" style={{ marginBottom: "1rem" }}>
        {[16, 20, 24].map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={size === s}
            onClick={() => setSize(s)}
          >
            {s}px
          </button>
        ))}
        {["regular", "bold"].map((w) => (
          <button
            key={w}
            type="button"
            aria-pressed={weight === w}
            onClick={() => setWeight(w)}
          >
            {w}
          </button>
        ))}
      </div>

      <Stage>
        <p className="section-label" style={{ marginBottom: "0.75rem" }}>
          System set
        </p>
        <div className="ds-icon-grid">
          {ICONS.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              className="ds-icon-cell"
              aria-pressed={picked === id}
              onClick={() => setPicked(id)}
            >
              <Icon size={size} weight={weight} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </Stage>

      <div className="ds-grid-2" style={{ marginTop: "1rem" }}>
        <Stage>
          <p className="section-label">Do</p>
          <div className="ds-icon-row" style={{ marginTop: "0.75rem" }}>
            <CurrentIcon size={size} weight={weight} />
            <span style={{ fontSize: Math.max(13, size * 0.8) }}>
              {current.label}
            </span>
          </div>
          <p className="ds-lede" style={{ marginTop: "0.85rem", fontSize: 14 }}>
            Optical size tracks the cap height. Weight matches the UI label.
          </p>
        </Stage>
        <Stage>
          <p className="section-label">Don&apos;t</p>
          <div
            className="ds-icon-row"
            style={{ marginTop: "0.75rem", opacity: 0.9 }}
          >
            <CurrentIcon size={32} weight="fill" />
            <span style={{ fontSize: 11 }}>{current.label}</span>
          </div>
          <p className="ds-lede" style={{ marginTop: "0.85rem", fontSize: 14 }}>
            Fill + 32px next to 11px meta. The icon becomes the message. The
            type becomes a caption.
          </p>
        </Stage>
      </div>
    </Chapter>
  );
}

const BRAND_COPY = {
  lumen: {
    kicker: "Lumen",
    title: "Review sprint goals",
    body: "Original product. Red accent, quiet chrome.",
  },
  harbor: {
    kicker: "Harbor",
    title: "Close Q3 invoices",
    body: "Partner brand. Cooler surface, blue accent — same card.",
  },
  cinder: {
    kicker: "Cinder",
    title: "Warm the waitlist",
    body: "Warm line. Amber accent, paper that feels like print.",
  },
};

export function MultiBrand() {
  const { brand, setBrand, mode } = useKit();

  return (
    <Chapter
      id="brand"
      index="06"
      title={
        <>
          Three brands. One <em>component</em>.
        </>
      }
      lede="Harbor and Cinder are not forks of Lumen. They are token remaps. The card, the buttons, the type roles stay. Only the contract changes."
    >
      <div className="ds-seg" style={{ marginBottom: "1rem" }}>
        {Object.entries(brands).map(([id, b]) => (
          <button
            key={id}
            type="button"
            aria-pressed={brand === id}
            onClick={() => setBrand(id)}
          >
            {b.label}
          </button>
        ))}
      </div>
      <div className="ds-brand-row">
        {Object.entries(brands).map(([id, b]) => {
          const copy = BRAND_COPY[id];
          return (
            <div
              key={id}
              className={`ds-brand-card ${brand === id ? "is-active" : ""}`}
            >
              <span className="section-label">{b.label}</span>
              <Specimen tokens={b[mode]} style={{ padding: "0.85rem" }}>
                <ProductCard
                  kicker={copy.kicker}
                  title={copy.title}
                  body={copy.body}
                />
              </Specimen>
            </div>
          );
        })}
      </div>
      <p className="ds-lede" style={{ marginTop: "1rem", maxWidth: "none" }}>
        {brands[brand].note}. Switch brands — accent remaps, components do not.
      </p>
    </Chapter>
  );
}

const ATOMS = [
  { id: "input", label: "Input" },
  { id: "icon", label: "Icon" },
  { id: "button", label: "Button" },
  { id: "avatar", label: "Avatar" },
];

export function AtomicDesign() {
  const [on, setOn] = useState(["input", "icon"]);
  const toggle = (id) =>
    setOn((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  const hasSearch = on.includes("input") && on.includes("icon");
  const hasOrganism =
    hasSearch && on.includes("button") && on.includes("avatar");

  return (
    <Chapter
      id="atomic"
      index="07"
      title={
        <>
          Complexity is <em>composition</em>.
        </>
      }
      lede="Click atoms to assemble a molecule, then an organism. You do not customize a page into existence — you compose it from things the system already knows."
    >
      <div className="ds-atomic-pin">
        <div className="ds-atomic">
          <div className="ds-layer ds-layer-a">
            <h3>Atoms</h3>
            {ATOMS.map((a) => (
              <button
                key={a.id}
                type="button"
                className="ds-atom"
                aria-pressed={on.includes(a.id)}
                onClick={() => toggle(a.id)}
              >
                {on.includes(a.id) ? (
                  <MinusIcon size={12} />
                ) : (
                  <PlusIcon size={12} />
                )}
                {a.label}
              </button>
            ))}
            <div className="ds-atom-preview">
              {on.includes("icon") && <MagnifyingGlassIcon size={16} />}
              {on.includes("input") && (
                <span className="ds-atom-ghost">Input</span>
              )}
              {on.includes("button") && (
                <span className="ds-atom-ghost-btn">New</span>
              )}
              {on.includes("avatar") && (
                <UserCircleIcon size={24} weight="light" />
              )}
            </div>
          </div>
          <div className="ds-layer ds-layer-m">
            <h3>Molecule</h3>
            {hasSearch ? (
              <KitField />
            ) : (
              <p className="ds-lede" style={{ fontSize: 14 }}>
                Combine Input + Icon.
              </p>
            )}
          </div>
          <div className="ds-layer ds-layer-o">
            <h3>Organism</h3>
            {hasOrganism ? (
              <Specimen style={{ padding: "0.65rem" }}>
                <KitToolbar />
              </Specimen>
            ) : (
              <p className="ds-lede" style={{ fontSize: 14 }}>
                Add Button + Avatar to the search field.
              </p>
            )}
          </div>
        </div>
      </div>
    </Chapter>
  );
}
