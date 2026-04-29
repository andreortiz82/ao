import { useState, useEffect } from "react";

// ── Palette ─────────────────────────────────────────────────────────────────
const C = {
  base: "#FAFAF8",
  accent: "#222222",
  accentLight: "#F5F5F5",
  surface: "#F4F3EF",
  border: "#E8E6E1",
  text: "#1A1A18",
  secondary: "#6B6B64",
  white: "#FFFFFF",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
};

// ── Fake data (no faker dep needed for simple avatars/names) ─────────────────
const NAMES = [
  "Jordan Lee",
  "Sam Rivera",
  "Alex Chen",
  "Morgan Kim",
  "Casey Park",
];
const INITIALS = NAMES.map((n) =>
  n
    .split(" ")
    .map((w) => w[0])
    .join(""),
);
const STATS = [
  { label: "Active Users", value: "12,480", delta: "+8.2%", up: true },
  { label: "Avg Session", value: "4m 32s", delta: "+12%", up: true },
  { label: "Bounce Rate", value: "24.1%", delta: "-3.4%", up: false },
  { label: "Conversions", value: "1,924", delta: "+5.7%", up: true },
];

// ── Design tokens per component ──────────────────────────────────────────────
const TOKENS = {
  Buttons: [
    { name: "background", token: "--color-accent", value: "#FF5C35" },
    { name: "color", token: "--color-white", value: "#FFFFFF" },
    { name: "border-radius", token: "--radius-md", value: "12px" },
    { name: "font-size", token: "--text-sm", value: "14px" },
    { name: "padding", token: "--space-2 --space-4", value: "8px 16px" },
    { name: "transition", token: "--duration-150", value: "150ms" },
  ],
  "Form Elements": [
    { name: "border", token: "--color-border", value: "#E8E6E1" },
    { name: "border-radius", token: "--radius-md", value: "8px" },
    { name: "background", token: "--color-base", value: "#FAFAF8" },
    { name: "focus-ring", token: "--color-accent", value: "#FF5C35" },
    { name: "font-family", token: "--font-body", value: "Plus Jakarta Sans" },
    { name: "padding", token: "--space-3", value: "12px" },
  ],
  Feedback: [
    { name: "success-bg", token: "--color-success-light", value: "#DCFCE7" },
    { name: "warning-bg", token: "--color-warning-light", value: "#FEF3C7" },
    { name: "danger-bg", token: "--color-danger-light", value: "#FEE2E2" },
    { name: "border-radius", token: "--radius-lg", value: "12px" },
    { name: "icon-size", token: "--size-4", value: "16px" },
  ],
  "Data Display": [
    { name: "card-bg", token: "--color-white", value: "#FFFFFF" },
    { name: "card-border", token: "--color-border", value: "#E8E6E1" },
    { name: "border-radius", token: "--radius-xl", value: "16px" },
    {
      name: "shadow",
      token: "--shadow-sm",
      value: "0 1px 4px rgba(0,0,0,0.06)",
    },
    { name: "avatar-size", token: "--size-10", value: "40px" },
    { name: "progress-h", token: "--size-2", value: "8px" },
  ],
};

// ── Code snippets per category ───────────────────────────────────────────────
const SNIPPETS = {
  Buttons: `<Button variant="primary" size="md">
  Save Changes
</Button>

<Button variant="secondary" size="md">
  Cancel
</Button>

<Button variant="ghost" size="sm">
  Learn more →
</Button>

<Button variant="destructive" disabled>
  Delete Account
</Button>`,

  "Form Elements": `<TextInput
  label="Email address"
  placeholder="you@company.com"
  type="email"
  required
/>

<Select label="Role" options={roles} />

<Checkbox label="Send me updates" defaultChecked />

<Toggle
  label="Dark mode"
  onChange={setDarkMode}
/>`,

  Feedback: `<Alert variant="success">
  Changes saved successfully!
</Alert>

<Badge variant="warning">Beta</Badge>

<Tooltip content="Copied to clipboard">
  <button>Copy</button>
</Tooltip>

<Toast
  message="File uploaded"
  action={{ label: 'Undo', onClick: handleUndo }}
/>`,

  "Data Display": `<StatCard
  label="Active Users"
  value="12,480"
  delta="+8.2%"
  trend="up"
/>

<Avatar
  name="Jordan Lee"
  size="md"
/>

<ProgressBar value={72} max={100} />

<Card title="Summary">
  <p>Card content goes here.</p>
</Card>`,
};

// ── Tiny sub-components ──────────────────────────────────────────────────────

function Btn({
  children,
  variant = "primary",
  disabled,
  loading,
  size = "md",
  style: extraStyle = {},
}) {
  const [hov, setHov] = useState(false);
  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontFamily: "Plus Jakarta Sans, sans-serif",
    fontWeight: 600,
    fontSize: size === "sm" ? "13px" : "14px",
    padding: size === "sm" ? "6px 12px" : "9px 18px",
    borderRadius: "12px",
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 150ms ease-out",
    opacity: disabled ? 0.5 : 1,
    transform: hov && !disabled ? "translateY(-1px) scale(1.02)" : "none",
    ...extraStyle,
  };
  const variants = {
    primary: { background: C.accent, color: C.white, borderColor: C.accent },
    secondary: { background: C.white, color: C.text, borderColor: C.border },
    ghost: {
      background: "transparent",
      color: C.accent,
      borderColor: "transparent",
    },
    destructive: {
      background: C.danger,
      color: C.white,
      borderColor: C.danger,
    },
  };
  return (
    <button
      style={{ ...baseStyle, ...variants[variant] }}
      disabled={disabled || loading}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {loading && (
        <span
          style={{
            animation: "spin 1s linear infinite",
            display: "inline-block",
            width: 14,
            height: 14,
            border: "2px solid rgba(255,255,255,0.4)",
            borderTopColor: "#fff",
            borderRadius: "50%",
          }}
        />
      )}
      {children}
    </button>
  );
}

function TextInputDemo() {
  const [val, setVal] = useState("");
  const [focus, setFocus] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        width: "100%",
        maxWidth: "300px",
      }}
    >
      <label
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: C.text,
          fontFamily: "Plus Jakarta Sans, sans-serif",
        }}
      >
        Email address
      </label>
      <input
        type="email"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="you@company.com"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          padding: "10px 12px",
          borderRadius: "8px",
          border: `1.5px solid ${focus ? C.accent : C.border}`,
          background: C.base,
          fontFamily: "Plus Jakarta Sans, sans-serif",
          fontSize: "14px",
          color: C.text,
          outline: "none",
          transition: "border-color 150ms ease-out",
          boxShadow: focus ? `0 0 0 3px ${C.accentLight}` : "none",
          width: "100%",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

function CheckboxDemo() {
  const [checked, setChecked] = useState(true);
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
        fontFamily: "Plus Jakarta Sans, sans-serif",
        fontSize: "14px",
        color: C.text,
      }}
    >
      <span
        onClick={() => setChecked((c) => !c)}
        style={{
          width: "18px",
          height: "18px",
          borderRadius: "4px",
          border: `2px solid ${checked ? C.accent : C.border}`,
          background: checked ? C.accent : C.white,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 150ms ease-out",
          flexShrink: 0,
          cursor: "pointer",
        }}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4l3 3 5-6"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      Send me product updates
    </label>
  );
}

function ToggleDemo() {
  const [on, setOn] = useState(false);
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
        fontFamily: "Plus Jakarta Sans, sans-serif",
        fontSize: "14px",
        color: C.text,
      }}
    >
      <span
        onClick={() => setOn((v) => !v)}
        style={{
          width: "40px",
          height: "22px",
          borderRadius: "11px",
          background: on ? C.accent : C.border,
          position: "relative",
          transition: "background 200ms ease-out",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "3px",
            left: on ? "21px" : "3px",
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            background: C.white,
            transition: "left 200ms ease-out",
            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
          }}
        />
      </span>
      Dark mode
    </label>
  );
}

function SelectDemo() {
  const [val, setVal] = useState("designer");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        width: "100%",
        maxWidth: "300px",
      }}
    >
      <label
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: C.text,
          fontFamily: "Plus Jakarta Sans, sans-serif",
        }}
      >
        Role
      </label>
      <select
        value={val}
        onChange={(e) => setVal(e.target.value)}
        style={{
          padding: "10px 12px",
          borderRadius: "8px",
          border: `1.5px solid ${C.border}`,
          background: C.base,
          fontFamily: "Plus Jakarta Sans, sans-serif",
          fontSize: "14px",
          color: C.text,
          outline: "none",
          cursor: "pointer",
          width: "100%",
        }}
      >
        <option value="designer">Product Designer</option>
        <option value="engineer">Front-end Engineer</option>
        <option value="pm">Product Manager</option>
        <option value="lead">Design Lead</option>
      </select>
    </div>
  );
}

function AlertDemo({ variant }) {
  const config = {
    success: {
      bg: "#DCFCE7",
      border: "#86EFAC",
      icon: "✓",
      color: "#166534",
      label: "Success",
    },
    warning: {
      bg: "#FEF3C7",
      border: "#FCD34D",
      icon: "⚠",
      color: "#92400E",
      label: "Warning",
    },
    danger: {
      bg: "#FEE2E2",
      border: "#FCA5A5",
      icon: "✕",
      color: "#991B1B",
      label: "Error",
    },
    info: {
      bg: "#EFF6FF",
      border: "#93C5FD",
      icon: "ℹ",
      color: "#1E40AF",
      label: "Info",
    },
  };
  const cfg = config[variant];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        padding: "12px 16px",
        borderRadius: "10px",
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        fontFamily: "Plus Jakarta Sans, sans-serif",
      }}
    >
      <span
        style={{
          fontWeight: 700,
          color: cfg.color,
          fontSize: "14px",
          flexShrink: 0,
        }}
      >
        {cfg.icon}
      </span>
      <div>
        <p
          style={{
            margin: 0,
            fontWeight: 700,
            fontSize: "13px",
            color: cfg.color,
          }}
        >
          {cfg.label}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            color: cfg.color,
            opacity: 0.85,
          }}
        >
          {variant === "success" && "Your changes have been saved."}
          {variant === "warning" && "Please review before continuing."}
          {variant === "danger" && "Something went wrong. Try again."}
          {variant === "info" && "A new version is available."}
        </p>
      </div>
    </div>
  );
}

function BadgeDemo() {
  const badges = [
    { label: "Stable", bg: "#DCFCE7", color: "#166534" },
    { label: "Beta", bg: "#FEF3C7", color: "#92400E" },
    { label: "Deprecated", bg: "#FEE2E2", color: "#991B1B" },
    { label: "New", bg: C.accentLight, color: C.accent },
  ];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {badges.map((b) => (
        <span
          key={b.label}
          style={{
            padding: "3px 10px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: 700,
            fontFamily: "Plus Jakarta Sans, sans-serif",
            background: b.bg,
            color: b.color,
          }}
        >
          {b.label}
        </span>
      ))}
    </div>
  );
}

function AvatarDemo({ name, size = 40 }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("");
  const colors = ["#FF5C35", "#3B82F6", "#22C55E", "#F59E0B", "#8B5CF6"];
  const bg = colors[name.length % colors.length];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 700,
          fontSize: size * 0.38,
          fontFamily: "Plus Jakarta Sans, sans-serif",
          flexShrink: 0,
        }}
      >
        {initials}
      </div>
      <div>
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            fontWeight: 600,
            color: C.text,
            fontFamily: "Plus Jakarta Sans, sans-serif",
          }}
        >
          {name}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "12px",
            color: C.secondary,
            fontFamily: "Plus Jakarta Sans, sans-serif",
          }}
        >
          Product Designer
        </p>
      </div>
    </div>
  );
}

function ProgressBarDemo({ value, label }) {
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "6px",
        }}
      >
        <span
          style={{
            fontSize: "13px",
            color: C.text,
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontWeight: 600,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: "13px",
            color: C.secondary,
            fontFamily: "Plus Jakarta Sans, sans-serif",
          }}
        >
          {value}%
        </span>
      </div>
      <div
        style={{
          width: "100%",
          height: "8px",
          borderRadius: "999px",
          background: C.surface,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${value}%`,
            borderRadius: "999px",
            background: `linear-gradient(90deg, ${C.accent}, #FF8A65)`,
            transition: "width 600ms ease-out",
          }}
        />
      </div>
    </div>
  );
}

function StatCardDemo({ label, value, delta, up }) {
  return (
    <div
      style={{
        padding: "16px 20px",
        borderRadius: "12px",
        background: C.white,
        border: `1px solid ${C.border}`,
        fontFamily: "Plus Jakarta Sans, sans-serif",
        flex: "1 1 130px",
      }}
    >
      <p
        style={{
          margin: "0 0 4px",
          fontSize: "12px",
          color: C.secondary,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </p>
      <p
        style={{
          margin: "0 0 6px",
          fontSize: "24px",
          fontWeight: 700,
          color: C.text,
          fontFamily: "Fraunces, serif",
        }}
      >
        {value}
      </p>
      <p
        style={{
          margin: 0,
          fontSize: "12px",
          fontWeight: 600,
          color: up ? C.success : C.danger,
        }}
      >
        {delta}
      </p>
    </div>
  );
}

// ── Component previews by category ──────────────────────────────────────────

function ButtonsPreview() {
  const [loading, setLoading] = useState(false);
  function handleLoad() {
    setLoading(true);
    setTimeout(() => setLoading(false), 1800);
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <p
          style={{
            margin: "0 0 12px",
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: C.secondary,
          }}
        >
          Variants
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Btn variant="primary">Primary</Btn>
          <Btn variant="secondary">Secondary</Btn>
          <Btn variant="ghost">Ghost →</Btn>
          <Btn variant="destructive">Delete</Btn>
        </div>
      </div>
      <div>
        <p
          style={{
            margin: "0 0 12px",
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: C.secondary,
          }}
        >
          Sizes
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Btn size="sm">Small</Btn>
          <Btn size="md">Medium</Btn>
        </div>
      </div>
      <div>
        <p
          style={{
            margin: "0 0 12px",
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: C.secondary,
          }}
        >
          States
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Btn variant="primary" disabled>
            Disabled
          </Btn>
          <Btn variant="primary" loading={loading} onClick={handleLoad}>
            {loading ? "Saving…" : "Click to load"}
          </Btn>
        </div>
      </div>
    </div>
  );
}

function FormPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        maxWidth: "340px",
      }}
    >
      <TextInputDemo />
      <SelectDemo />
      <CheckboxDemo />
      <ToggleDemo />
    </div>
  );
}

function FeedbackPreview() {
  const [toastVisible, setToastVisible] = useState(false);
  function showToast() {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2800);
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <AlertDemo variant="success" />
      <AlertDemo variant="warning" />
      <AlertDemo variant="danger" />
      <AlertDemo variant="info" />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginTop: "4px",
        }}
      >
        <BadgeDemo />
      </div>
      <div style={{ marginTop: "4px" }}>
        <Btn variant="secondary" onClick={showToast}>
          Show Toast
        </Btn>
      </div>
      {toastVisible && (
        <div
          style={{
            padding: "12px 16px",
            borderRadius: "10px",
            background: C.text,
            color: C.white,
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            animation: "fadeInUp 200ms ease-out",
          }}
        >
          <span>✓ File uploaded successfully</span>
          <button
            onClick={() => setToastVisible(false)}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.6)",
              cursor: "pointer",
              fontSize: "18px",
              padding: 0,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

function DataDisplayPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <p
          style={{
            margin: "0 0 10px",
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: C.secondary,
          }}
        >
          Stat Cards
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {STATS.map((s) => (
            <StatCardDemo key={s.label} {...s} />
          ))}
        </div>
      </div>
      <div>
        <p
          style={{
            margin: "0 0 10px",
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: C.secondary,
          }}
        >
          Avatars
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {NAMES.slice(0, 3).map((n) => (
            <AvatarDemo key={n} name={n} />
          ))}
        </div>
      </div>
      <div>
        <p
          style={{
            margin: "0 0 10px",
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: C.secondary,
          }}
        >
          Progress
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <ProgressBarDemo value={72} label="Completion" />
          <ProgressBarDemo value={45} label="Adoption" />
          <ProgressBarDemo value={91} label="Coverage" />
        </div>
      </div>
    </div>
  );
}

const CATEGORIES = ["Buttons", "Form Elements", "Feedback", "Data Display"];
const PREVIEWS = {
  Buttons: <ButtonsPreview />,
  "Form Elements": <FormPreview />,
  Feedback: <FeedbackPreview />,
  "Data Display": <DataDisplayPreview />,
};

// ── Main component ────────────────────────────────────────────────────────────
export default function DesignSystemDemo() {
  const [activeCategory, setActiveCategory] = useState("Buttons");
  const [copied, setCopied] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);

  function copyCode() {
    navigator.clipboard.writeText(SNIPPETS[activeCategory]).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  // reset code panel on category change
  useEffect(() => {
    setCodeOpen(false);
  }, [activeCategory]);

  return (
    <div
      style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: "20px",
        overflow: "hidden",
        margin: "32px 0",
        fontFamily: "Plus Jakarta Sans, sans-serif",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}
    >
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
      `}</style>

      {/* ── Tool bar ── */}
      <div
        style={{
          background: C.surface,
          borderBottom: `1px solid ${C.border}`,
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {/* Traffic lights */}
        {["#FF5F57", "#FFBD2E", "#28C840"].map((c) => (
          <span
            key={c}
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: c,
              display: "inline-block",
            }}
          />
        ))}
        <span
          style={{
            margin: "0 auto",
            fontSize: "12px",
            fontWeight: 700,
            color: C.secondary,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Component Explorer
        </span>
        <span
          style={{
            fontSize: "11px",
            padding: "2px 8px",
            borderRadius: "999px",
            background: C.accentLight,
            color: C.accent,
            fontWeight: 700,
          }}
        >
          v2.4.1
        </span>
      </div>

      {/* ── Category tabs ── */}
      <div
        style={{
          display: "flex",
          gap: "2px",
          padding: "12px 16px 0",
          borderBottom: `1px solid ${C.border}`,
          overflowX: "auto",
        }}
      >
        {CATEGORIES.map((cat) => {
          const active = cat === activeCategory;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px 16px",
                borderRadius: "8px 8px 0 0",
                border: "none",
                background: active ? C.white : "transparent",
                color: active ? C.accent : C.secondary,
                fontWeight: active ? 700 : 500,
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 150ms ease-out",
                borderBottom: active
                  ? `2px solid ${C.accent}`
                  : "2px solid transparent",
                fontFamily: "Plus Jakarta Sans, sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ── Main body ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) 260px",
          minHeight: "400px",
        }}
        className="ds-demo-grid"
      >
        {/* Preview panel */}
        <div
          style={{
            padding: "28px",
            borderRight: `1px solid ${C.border}`,
            overflowY: "auto",
          }}
        >
          <div
            key={activeCategory}
            style={{ animation: "fadeInUp 200ms ease-out" }}
          >
            {PREVIEWS[activeCategory]}
          </div>
        </div>

        {/* Token inspector */}
        <div
          style={{
            padding: "20px",
            background: C.base,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            overflowY: "auto",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: C.secondary,
            }}
          >
            Token Inspector
          </p>
          {TOKENS[activeCategory].map((tok) => (
            <div
              key={tok.name}
              style={{
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: "8px",
                padding: "10px 12px",
              }}
            >
              <p
                style={{
                  margin: "0 0 2px",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: C.secondary,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {tok.name}
              </p>
              <p
                style={{
                  margin: "0 0 4px",
                  fontSize: "12px",
                  color: C.accent,
                  fontFamily: "monospace",
                  fontWeight: 600,
                }}
              >
                {tok.token}
              </p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                {tok.value.startsWith("#") && (
                  <span
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "3px",
                      background: tok.value,
                      border: `1px solid ${C.border}`,
                      flexShrink: 0,
                    }}
                  />
                )}
                <span
                  style={{
                    fontSize: "12px",
                    color: C.secondary,
                    fontFamily: "monospace",
                  }}
                >
                  {tok.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Code panel ── */}
      <div style={{ borderTop: `1px solid ${C.border}` }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 20px",
            background: C.surface,
            cursor: "pointer",
          }}
          onClick={() => setCodeOpen((o) => !o)}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: C.secondary,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {codeOpen ? "▾" : "▸"} Code Snippet
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              copyCode();
            }}
            style={{
              padding: "5px 14px",
              borderRadius: "6px",
              border: `1px solid ${C.border}`,
              background: copied ? "#DCFCE7" : C.white,
              color: copied ? "#166534" : C.text,
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 150ms ease-out",
              fontFamily: "Plus Jakarta Sans, sans-serif",
            }}
          >
            {copied ? "✓ Copied!" : "Copy Code"}
          </button>
        </div>
        {codeOpen && (
          <pre
            style={{
              margin: 0,
              padding: "20px",
              background: "#1A1A18",
              color: "#E8E6E1",
              fontSize: "13px",
              lineHeight: 1.7,
              overflowX: "auto",
              fontFamily: "monospace",
            }}
          >
            {SNIPPETS[activeCategory]}
          </pre>
        )}
      </div>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 640px) {
          .ds-demo-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
