import { useState } from 'react'

const C = {
  base:       '#FAFAF9',
  surface:    '#F4F3EF',
  border:     '#E8E6E1',
  text:       '#1A1A18',
  secondary:  '#6B6B64',
  accent:     '#0077BC',
  accentBg:   '#EFF6FF',
  success:    '#16A34A',
  successBg:  '#F0FDF4',
  warning:    '#D97706',
  warningBg:  '#FFFBEB',
  danger:     '#DC2626',
  dangerBg:   '#FEF2F2',
  neutralBg:  '#F4F3EF',
  neutralText:'#6B6B64',
  white:      '#FFFFFF',
}

const TABS = ['Invoice', 'Budget', 'Payables']

const LINE_ITEMS = [
  { desc: 'UI Design Consultation',  qty: 40, unit: 'hrs',  rate: 175,  amount: 7000 },
  { desc: 'Design System Audit',     qty: 1,  unit: 'flat', rate: 2400, amount: 2400 },
  { desc: 'Brand Identity Kit',      qty: 1,  unit: 'flat', rate: 3200, amount: 3200 },
]
const SUBTOTAL = 12600
const TAX      = 1008
const TOTAL    = 13608

const BUDGET_ROWS = [
  { label: 'Design',      planned: 12000, actual: 14500 },
  { label: 'Development', planned: 20000, actual: 18300 },
  { label: 'Marketing',   planned: 8000,  actual: 6240  },
  { label: 'Operations',  planned: 5000,  actual: 4800  },
]
const B_PLANNED = BUDGET_ROWS.reduce((s, r) => s + r.planned, 0)
const B_ACTUAL  = BUDGET_ROWS.reduce((s, r) => s + r.actual,  0)

const PAYABLES = [
  { vendor: 'Figma',              amount: 432,  due: 'May 1',  status: 'Paid'     },
  { vendor: 'AWS Cloud Services', amount: 1240, due: 'May 15', status: 'Due Soon' },
  { vendor: 'Adobe Creative',     amount: 659,  due: 'May 22', status: 'Pending'  },
  { vendor: 'Design Contractor',  amount: 4500, due: 'Jun 1',  status: 'Pending'  },
  { vendor: 'Office Lease',       amount: 3200, due: 'Jun 1',  status: 'Pending'  },
]

const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
const pct = (a, b) => Math.min(100, Math.round((a / b) * 100))

function StatusBadge({ status }) {
  const map = {
    'Paid':     { bg: C.successBg, color: C.success  },
    'Due Soon': { bg: C.warningBg, color: C.warning  },
    'Pending':  { bg: C.neutralBg, color: C.secondary},
    'Sent':     { bg: C.accentBg,  color: C.accent   },
    'Draft':    { bg: C.neutralBg, color: C.secondary},
  }
  const s = map[status] || map['Pending']
  return (
    <span style={{ background: s.bg, color: s.color, padding: '2px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, letterSpacing: '0.03em' }}>
      {status}
    </span>
  )
}

function InvoiceTab() {
  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Invoice header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: C.secondary, marginBottom: 4 }}>Invoice</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.text, letterSpacing: '-0.01em' }}>INV-2026-0047</div>
          <div style={{ fontSize: 13, color: C.secondary, marginTop: 2 }}>Issued April 15, 2026 · Due June 15, 2026</div>
        </div>
        <StatusBadge status="Sent" />
      </div>

      {/* Parties */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ background: C.surface, borderRadius: 10, padding: '14px 16px' }}>
          <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: C.secondary, marginBottom: 6 }}>From</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Andre Ortiz</div>
          <div style={{ fontSize: 12, color: C.secondary, marginTop: 2 }}>Austin, TX · hello@andreortiz.com</div>
        </div>
        <div style={{ background: C.surface, borderRadius: 10, padding: '14px 16px' }}>
          <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: C.secondary, marginBottom: 6 }}>Bill To</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Acme Corp</div>
          <div style={{ fontSize: 12, color: C.secondary, marginTop: 2 }}>accounts@acmecorp.io</div>
        </div>
      </div>

      {/* Line items */}
      <div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {['Description', 'Qty', 'Rate', 'Amount'].map((h, i) => (
                <th key={h} style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.secondary, padding: '0 0 8px', textAlign: i === 0 ? 'left' : 'right' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LINE_ITEMS.map((item, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                <td style={{ padding: '10px 0', fontSize: 13, color: C.text }}>{item.desc}</td>
                <td style={{ padding: '10px 0', fontSize: 13, color: C.secondary, textAlign: 'right' }}>{item.qty} {item.unit}</td>
                <td style={{ padding: '10px 0', fontSize: 13, color: C.secondary, textAlign: 'right' }}>{fmt(item.rate)}</td>
                <td style={{ padding: '10px 0', fontSize: 13, fontWeight: 600, color: C.text, textAlign: 'right' }}>{fmt(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ minWidth: 220, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[['Subtotal', fmt(SUBTOTAL)], ['Tax (8%)', fmt(TAX)]].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: C.secondary }}>
              <span>{label}</span><span>{val}</span>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 8, marginTop: 2, display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 700, color: C.text }}>
            <span>Total Due</span><span>{fmt(TOTAL)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function BudgetTab() {
  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: C.secondary, marginBottom: 2 }}>Period</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Q2 2026</div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.secondary }}>Planned</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{fmt(B_PLANNED)}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.secondary }}>Actual</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: B_ACTUAL > B_PLANNED ? C.danger : C.success }}>{fmt(B_ACTUAL)}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {BUDGET_ROWS.map((row) => {
          const over    = row.actual > row.planned
          const barPct  = pct(Math.min(row.actual, row.planned), row.planned)
          const overPct = over ? pct(row.actual - row.planned, row.planned) : 0
          return (
            <div key={row.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{row.label}</span>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ fontSize: 12, color: C.secondary }}>{fmt(row.planned)}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: over ? C.danger : C.success }}>{fmt(row.actual)}</span>
                </div>
              </div>
              <div style={{ height: 8, background: C.surface, borderRadius: 99, overflow: 'visible', position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, height: 8, width: `${barPct}%`, background: over ? C.danger : C.success, borderRadius: 99, transition: 'width 0.4s ease' }} />
                {over && (
                  <div style={{ position: 'absolute', left: '100%', top: 0, height: 8, width: `${Math.min(overPct, 20)}%`, background: C.danger, opacity: 0.35, borderRadius: '0 99px 99px 0' }} />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function PayablesTab() {
  return (
    <div style={{ padding: '24px 28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Accounts Payable</div>
        <div style={{ fontSize: 12, color: C.secondary }}>5 vendors · {fmt(PAYABLES.reduce((s,p)=>s+p.amount,0))} outstanding</div>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${C.border}` }}>
            {['Vendor', 'Amount', 'Due', 'Status'].map((h, i) => (
              <th key={h} style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.secondary, padding: '0 0 8px', textAlign: i === 0 ? 'left' : 'right' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PAYABLES.map((row, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
              <td style={{ padding: '10px 0', fontSize: 13, fontWeight: 500, color: C.text }}>{row.vendor}</td>
              <td style={{ padding: '10px 0', fontSize: 13, color: C.text, textAlign: 'right' }}>{fmt(row.amount)}</td>
              <td style={{ padding: '10px 0', fontSize: 12, color: C.secondary, textAlign: 'right' }}>{row.due}</td>
              <td style={{ padding: '10px 0', textAlign: 'right' }}><StatusBadge status={row.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function FinanceDemo() {
  const [tab, setTab] = useState(0)

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: C.base, border: `1px solid ${C.border}`, borderRadius: 14, overflow: 'hidden' }}>
      {/* Tab bar */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, padding: '0 28px', gap: 2 }}>
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            style={{
              padding: '12px 16px',
              fontSize: 13,
              fontWeight: tab === i ? 600 : 400,
              color: tab === i ? C.accent : C.secondary,
              background: 'none',
              border: 'none',
              borderBottom: `2px solid ${tab === i ? C.accent : 'transparent'}`,
              cursor: 'pointer',
              transition: 'color 0.15s, border-color 0.15s',
              marginBottom: -1,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 0 && <InvoiceTab />}
      {tab === 1 && <BudgetTab />}
      {tab === 2 && <PayablesTab />}
    </div>
  )
}
