import { useState } from 'react'

const ELEMENTS = [
  {
    id: 'button',
    label: 'Button',
    inconsistency: 'Team A uses 8px radius, Team B uses 0px, Team C uses 24px (pill). Engineers picked their favorite.',
    preview: (
      <div className="flex flex-col gap-2 items-start">
        <button style={{ background: '#0077BC', color: '#fff', borderRadius: '8px', padding: '8px 16px', border: 'none', fontSize: '13px', cursor: 'default' }}>Save changes</button>
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
        <input readOnly value="Patient name" style={{ border: '1px solid #2E2E2E', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', width: '100%', background: '#222222', color: '#F0F0F0' }} />
        <input readOnly value="Patient name" style={{ border: '1px dashed #888888', borderRadius: '4px', padding: '8px 10px', fontSize: '13px', width: '100%', background: '#222222', color: '#F0F0F0' }} />
        <input readOnly value="Patient name" style={{ border: 'none', borderBottom: '2px solid #0077BC', padding: '8px 10px', fontSize: '13px', width: '100%', background: '#1A1A1A', color: '#F0F0F0' }} />
      </div>
    ),
  },
  {
    id: 'modal',
    label: 'Modal trigger',
    inconsistency: 'Modal backgrounds range from 40% black to 80% black. Shadow depths differ. Close button placement inconsistent.',
    preview: (
      <div className="flex flex-col gap-2 items-start">
        <div style={{ background: '#1A1A1A', border: '1px solid #2E2E2E', borderRadius: '8px', padding: '12px 16px', fontSize: '13px', boxShadow: '0 1px 4px rgba(0,0,0,0.3)', width: '160px' }}>
          <div style={{ fontWeight: 600, marginBottom: 4, fontSize: '12px', color: '#F0F0F0' }}>Confirm action</div>
          <div style={{ color: '#888888', fontSize: '11px' }}>Are you sure?</div>
        </div>
        <div style={{ background: '#1A1A1A', border: '1px solid #2E2E2E', borderRadius: '16px', padding: '12px 16px', fontSize: '13px', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', width: '160px' }}>
          <div style={{ fontWeight: 600, marginBottom: 4, fontSize: '12px', color: '#F0F0F0' }}>Confirm action</div>
          <div style={{ color: '#888888', fontSize: '11px' }}>Are you sure?</div>
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
        <input type="date" readOnly defaultValue="2024-03-15" style={{ border: '1px solid #2E2E2E', borderRadius: '6px', padding: '7px 10px', fontSize: '12px', width: '100%', background: '#222222', color: '#F0F0F0' }} />
        <div style={{ background: '#1A1A1A', border: '1px solid #2E2E2E', borderRadius: '8px', padding: '8px', fontSize: '11px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {[10,11,12,13,14,15,16].map(d => (
            <span key={d} style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: d === 15 ? '50%' : 4, background: d === 15 ? '#0077BC' : 'transparent', color: d === 15 ? '#fff' : '#888888', fontSize: '11px' }}>{d}</span>
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
      <div style={{ background: '#1A1A1A', border: '1px solid #2E2E2E', borderRadius: '8px', overflow: 'hidden', fontSize: '12px', width: '140px' }}>
        {['Option A', 'Option B', 'Option C'].map((opt, i) => (
          <div key={opt} style={{ padding: '8px 12px', background: i === 1 ? '#001F33' : 'transparent', color: i === 1 ? '#7AB8D9' : '#888888', fontWeight: i === 1 ? 600 : 400, borderBottom: i < 2 ? '1px solid #2E2E2E' : 'none' }}>{opt}</div>
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
          <span style={{ fontSize: '12px', color: '#888888', textDecoration: 'underline dotted', cursor: 'help' }}>Hover me</span>
          <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, background: '#222222', color: '#F0F0F0', fontSize: '11px', padding: '4px 8px', borderRadius: 4, whiteSpace: 'nowrap', border: '1px solid #2E2E2E' }}>Team A tooltip</div>
        </div>
        <div style={{ position: 'relative', display: 'inline-block', marginTop: 20 }}>
          <span style={{ fontSize: '12px', color: '#888888', textDecoration: 'underline dotted', cursor: 'help' }}>Hover me</span>
          <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, background: '#0077BC', color: '#fff', fontSize: '11px', padding: '4px 8px', borderRadius: 8, whiteSpace: 'nowrap' }}>Team B tooltip</div>
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
        background: '#111111',
        borderRadius: '16px',
        padding: '32px',
        margin: '2rem 0',
        fontFamily: 'DM Sans, sans-serif',
        border: '1px solid #2E2E2E',
      }}
      role="region"
      aria-label="Design inconsistency audit"
    >
      <div style={{ marginBottom: '24px' }}>
        <div style={{ color: '#0077BC', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
          Audit snapshot
        </div>
        <h3 style={{ color: '#F0F0F0', fontSize: '20px', fontWeight: 600, margin: 0, lineHeight: 1.3, fontFamily: 'Archivo Black, sans-serif' }}>
          Before: 4 teams, 4 codebases, zero shared language
        </h3>
        <p style={{ color: '#888888', fontSize: '14px', marginTop: '8px', marginBottom: 0 }}>
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
            <div
              key={el.id}
              role="button"
              tabIndex={0}
              onClick={() => setActiveId(isActive ? null : el.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveId(isActive ? null : el.id) } }}
              aria-pressed={isActive}
              aria-label={`${el.label} — click to see inconsistency`}
              style={{
                background: '#1A1A1A',
                borderRadius: '12px',
                padding: '20px',
                border: `2px solid ${isActive ? '#0077BC' : '#2E2E2E'}`,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                boxShadow: isActive ? '0 0 0 4px rgba(0,119,188,0.15)' : 'none',
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#0077BC', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
                {el.label}
              </div>
              <div style={{ marginBottom: '12px', minHeight: '80px' }}>
                {el.preview}
              </div>
              {isActive && (
                <div
                  style={{
                    background: 'rgba(217,119,6,0.1)',
                    border: '1px solid #D97706',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    fontSize: '12px',
                    color: '#FCD34D',
                    lineHeight: 1.5,
                    marginTop: '8px',
                  }}
                  role="tooltip"
                >
                  {el.inconsistency}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
