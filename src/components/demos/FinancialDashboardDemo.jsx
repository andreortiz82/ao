import { useMemo, useState } from "react";

const CATEGORIES = [
  { id: "ops", label: "Operations", color: "#0a0a0a" },
  { id: "labor", label: "Labor", color: "#404040" },
  { id: "infra", label: "Infrastructure", color: "#737373" },
  { id: "growth", label: "Growth", color: "#dc2626" },
];

const DEFAULTS = { ops: 45, labor: 25, infra: 15, growth: 15 };

const fmt = (n) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export default function FinancialDashboardDemo() {
  const [budgetTotal, setBudgetTotal] = useState(250000);
  const [allocations, setAllocations] = useState(DEFAULTS);

  const amounts = useMemo(() => {
    const totalPct = Object.values(allocations).reduce((s, v) => s + v, 0) || 1;
    return CATEGORIES.map((cat) => ({
      ...cat,
      pct: allocations[cat.id],
      amount: Math.round((allocations[cat.id] / totalPct) * budgetTotal),
    }));
  }, [allocations, budgetTotal]);

  const actualSpend = useMemo(
    () =>
      amounts.reduce(
        (sum, row) => sum + Math.round(row.amount * (row.id === "growth" ? 0.72 : 0.91)),
        0,
      ),
    [amounts],
  );

  const variance = budgetTotal - actualSpend;

  function updateAllocation(id, value) {
    setAllocations((prev) => ({ ...prev, [id]: value }));
  }

  return (
    <div className="fin-demo">
      <div className="fin-top">
        <div>
          <div className="fin-label">Quarterly budget</div>
          <div className="fin-total">{fmt(budgetTotal)}</div>
        </div>
        <div className="fin-kpis">
          <div>
            <span className="fin-kpi-label">Actual spend</span>
            <strong>{fmt(actualSpend)}</strong>
          </div>
          <div>
            <span className="fin-kpi-label">Variance</span>
            <strong className={variance >= 0 ? "is-good" : "is-bad"}>
              {variance >= 0 ? "+" : ""}
              {fmt(variance)}
            </strong>
          </div>
        </div>
      </div>

      <div className="fin-body">
        <section className="fin-panel">
          <div className="fin-panel-head">
            <span className="fin-label">Allocation mix</span>
            <span className="fin-hint">Drag sliders to rebalance</span>
          </div>

          <div className="fin-bars" aria-hidden="true">
            {amounts.map((row) => (
              <div
                key={row.id}
                className="fin-bar-segment"
                style={{
                  flex: row.pct,
                  background: row.color,
                }}
                title={`${row.label} ${row.pct}%`}
              />
            ))}
          </div>

          <div className="fin-sliders">
            {amounts.map((row) => (
              <label key={row.id} className="fin-slider-row">
                <div className="fin-slider-meta">
                  <span>{row.label}</span>
                  <span>
                    {row.pct}% · {fmt(row.amount)}
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={60}
                  value={row.pct}
                  onChange={(e) =>
                    updateAllocation(row.id, Number(e.target.value))
                  }
                  style={{ accentColor: row.color }}
                />
              </label>
            ))}
          </div>
        </section>

        <section className="fin-panel">
          <div className="fin-panel-head">
            <span className="fin-label">Budget ceiling</span>
          </div>
          <label className="fin-slider-row">
            <div className="fin-slider-meta">
              <span>Total planned</span>
              <span>{fmt(budgetTotal)}</span>
            </div>
            <input
              type="range"
              min={150000}
              max={400000}
              step={5000}
              value={budgetTotal}
              onChange={(e) => setBudgetTotal(Number(e.target.value))}
            />
          </label>

          <div className="fin-breakdown">
            {amounts.map((row) => (
              <div key={row.id} className="fin-breakdown-row">
                <span className="fin-dot" style={{ background: row.color }} />
                <span className="fin-breakdown-label">{row.label}</span>
                <span className="fin-breakdown-value">{fmt(row.amount)}</span>
              </div>
            ))}
          </div>

          <p className="fin-note">
            Summary layer stays legible; detail is one interaction away — matching
            the progressive disclosure model from the case study.
          </p>
        </section>
      </div>

      <style>{`
        .fin-demo {
          font-family: var(--font-sans);
          color: var(--color-ink);
          background: var(--color-background);
          padding: 1.25rem;
          min-height: 480px;
        }

        .fin-top {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--color-line);
          margin-bottom: 1rem;
        }

        .fin-label {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-ink-3);
        }

        .fin-total {
          font-family: var(--font-serif);
          font-size: clamp(1.75rem, 3vw, 2.25rem);
          font-variation-settings: "opsz" 48, "wght" 400;
          line-height: 1;
          margin-top: 0.25rem;
        }

        .fin-kpis {
          display: flex;
          gap: 1.5rem;
        }

        .fin-kpis div {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          text-align: right;
        }

        .fin-kpi-label {
          font-size: 11px;
          color: var(--color-ink-3);
        }

        .fin-kpis strong {
          font-size: 15px;
        }

        .is-good { color: #16a34a; }
        .is-bad { color: #dc2626; }

        .fin-body {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 1rem;
        }

        @media (max-width: 760px) {
          .fin-body { grid-template-columns: 1fr; }
        }

        .fin-panel {
          border: 1px solid var(--color-line);
          border-radius: 6px;
          padding: 1rem;
          background: var(--color-paper);
        }

        .fin-panel-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 0.85rem;
        }

        .fin-hint {
          font-size: 11px;
          color: var(--color-ink-3);
        }

        .fin-bars {
          display: flex;
          height: 12px;
          border-radius: 999px;
          overflow: hidden;
          margin-bottom: 1rem;
          border: 1px solid var(--color-line);
        }

        .fin-bar-segment {
          min-width: 4px;
          transition: flex 0.2s ease;
        }

        .fin-sliders {
          display: grid;
          gap: 0.85rem;
        }

        .fin-slider-row {
          display: grid;
          gap: 0.35rem;
        }

        .fin-slider-meta {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: var(--color-ink-2);
        }

        .fin-slider-row input[type="range"] {
          width: 100%;
        }

        .fin-breakdown {
          display: grid;
          gap: 0.55rem;
          margin: 1rem 0;
        }

        .fin-breakdown-row {
          display: grid;
          grid-template-columns: 10px 1fr auto;
          gap: 0.5rem;
          align-items: center;
          font-size: 13px;
        }

        .fin-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .fin-breakdown-label { color: var(--color-ink-2); }
        .fin-breakdown-value { font-weight: 600; color: var(--color-ink); }

        .fin-note {
          margin: 0;
          font-size: 12px;
          line-height: 1.5;
          color: var(--color-ink-3);
        }
      `}</style>
    </div>
  );
}
