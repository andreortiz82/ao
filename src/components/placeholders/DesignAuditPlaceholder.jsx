import { useState } from 'react'

const ELEMENTS = [
  {
    id: 'button',
    label: 'Button',
    inconsistency: 'Team A uses 8px radius, Team B uses 0px, Team C uses 24px (pill). Engineers picked their favorite.',
    preview: (
      <div className="flex flex-col gap-2 items-start">
        <button style={{ background: '#3B82F6', color: '#fff', borderRadius: '8px', padding: '8px 16px', border: 'none', fontSize: '13px', cursor: 'default' }}>Save changes</button>
        <button style={{ background: '#10B981', color: '#fff', borderRadius: '0px', padding: '8px 16px', border: 'none', fontSize: '13px', cursor: 'default' }}>Submit</button>
        <button style={{ background: '#8B5CF6', color: '#fff', borderRadius: '24px', padding: '8px 16px', border: 'none', fontSize: '13px', cursor: 'default' }}>Confirm</button>
      </div>
    ),
  },
  {
    id: 'input',
    label: 'Input field',
    inconsistency: 'Four different border styles across products — solid, dashed, bottom-only, and no border at all with a shadow.',
    preview: (
      <div className="flex flex-col gap-2 w-full">
        <input readOnly value="Patient name" style={{ border: '1px solid #D1D5DB', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', width: '100%', background: '#fff' }} />
        <input readOnly value="Patient name" style={{ border: '1px dashed #6B7280', borderRadius: '4px', padding: '8px 10px', fontSize: '13px', width: '100%', background: '#fff' }} />
        <input readOnly value="Patient name" style={{ border: 'none', borderBottom: '2px solid #3B82F6', padding: '8px 10px', fontSize: '13px', width: '100%', background: '#F9FAFB' }} />
      </div>
    ),
  },
  {
    id: 'modal',
    label: 'Modal trigger',
    inconsistency: 'Modal backgrounds range from 40% black to 80% black. Shadow depths differ. Close button placement inconsistent.',
    preview: (
      <div className="flex flex-col gap-2 items-start">
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '12px 16px', fontSize: '13px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', width: '160px' }}>
          <div style={{ fontWeight: 600, marginBottom: 4, fontSize: '12px' }}>Confirm action</div>
          <div style={{ color: '#6B7280', fontSize: '11px' }}>Are you sure?</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '12px 16px', fontSize: '13px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', width: '160px' }}>
          <div style={{ fontWeight: 600, marginBottom: 4, fontSize: '12px' }}>Confirm action</div>
          <div style={{ color: '#6B7280', fontSize: '11px' }}>Are you sure?</div>
        </div>
      </div>
    ),
  },
  {
    id: 'datepicker',
    label: 'Date picker',
    inconsistency: 'Three separate implementations. One uses a native input, one a custom calendar, one a third-party library — all with different keyboard behavior.',
    preview: (
      <div className="flex flex-col gap-2 w-full">
        <input type="date" readOnly defaultValue="2024-03-15" style={{ border: '1px solid #D1D5DB', borderRadius: '6px', padding: '7px 10px', fontSize: '12px', width: '100%' }} />
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '8px', fontSize: '11px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {[10,11,12,13,14,15,16].map(d => (
            <span key={d} style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: d === 15 ? '50%' : 4, background: d === 15 ? '#6366F1' : 'transparent', color: d === 15 ? '#fff' : '#374151', fontSize: '11px' }}>{d}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'dropdown',
    label: 'Dropdown',
    inconsistency: 'Selection state shown differently in each product — checkmark, highlight, bold text, or nothing at all.',
    preview: (
      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden', fontSize: '12px', width: '140px' }}>
        {['Option A', 'Option B', 'Option C'].map((opt, i) => (
          <div key={opt} style={{ padding: '8px 12px', background: i === 1 ? '#EEF2FF' : 'transparent', color: i === 1 ? '#6366F1' : '#374151', fontWeight: i === 1 ? 600 : 400, borderBottom: i < 2 ? '1px solid #F3F4F6' : 'none' }}>{opt}</div>
        ))}
      </div>
    ),
  },
  {
    id: 'tooltip',
    label: 'Tooltip',
    inconsistency: 'Tooltip delays range from 0ms to 1000ms. Background colors vary from black to dark gray to brand color.',
    preview: (
      <div className="flex flex-col gap-3 items-start">
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <span style={{ fontSize: '12px', color: '#6B7280', textDecoration: 'underline dotted', cursor: 'help' }}>Hover me</span>
          <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, background: '#111827', color: '#fff', fontSize: '11px', padding: '4px 8px', borderRadius: 4, whiteSpace: 'nowrap' }}>Team A tooltip</div>
        </div>
        <div style={{ position: 'relative', display: 'inline-block', marginTop: 20 }}>
          <span style={{ fontSize: '12px', color: '#6B7280', textDecoration: 'underline dotted', cursor: 'help' }}>Hover me</span>
          <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, background: '#6366F1', color: '#fff', fontSize: '11px', padding: '4px 8px', borderRadius: 8, whiteSpace: 'nowrap' }}>Team B tooltip</div>
        </div>
      </div>
    ),
  },
]

export default function DesignAuditPlaceholder() {
  const [activeId, setActiveId] = useState(null)

  return (
    <div
      style={{
        background: '#1a1a2e',
        borderRadius: '16px',
        padding: '32px',
        margin: '2rem 0',
        fontFamily: 'DM Sans, sans-serif',
      }}
      role="region"
      aria-label="Design inconsistency audit"
    >
      <div style={{ marginBottom: '24px' }}>
        <div style={{ color: '#6366F1', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
          Audit snapshot
        </div>
        <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 600, margin: 0, lineHeight: 1.3 }}>
          Before: 4 teams, 4 codebases, zero shared language
        </h3>
        <p style={{ color: '#94A3B8', fontSize: '14px', marginTop: '8px', marginBottom: 0 }}>
          Click any component to see the inconsistency.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px',
        }}
      >
        {ELEMENTS.map((el) => {
          const isActive = activeId === el.id
          return (
            <button
              key={el.id}
              onClick={() => setActiveId(isActive ? null : el.id)}
              aria-pressed={isActive}
              aria-label={`${el.label} — click to see inconsistency`}
              style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '20px',
                border: `2px solid ${isActive ? '#6366F1' : 'transparent'}`,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                boxShadow: isActive ? '0 0 0 4px rgba(99,102,241,0.2)' : '0 2px 8px rgba(0,0,0,0.15)',
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#6366F1', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
                {el.label}
              </div>
              <div style={{ marginBottom: '12px', minHeight: '80px' }}>
                {el.preview}
              </div>
              {isActive && (
                <div
                  style={{
                    background: '#FEF3C7',
                    border: '1px solid #F59E0B',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    fontSize: '12px',
                    color: '#92400E',
                    lineHeight: 1.5,
                    marginTop: '8px',
                  }}
                  role="tooltip"
                >
                  {el.inconsistency}
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
