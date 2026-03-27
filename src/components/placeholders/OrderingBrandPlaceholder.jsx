import { useState } from 'react'

const PALETTE = [
  {
    id: 'cream',
    name: 'Warm cream',
    hex: '#FAF5E9',
    textColor: '#3D2B1F',
    role: 'The background. Feels like linen, like tablecloths. Approachable and warm without being beige.',
  },
  {
    id: 'amber',
    name: 'Warm amber',
    hex: '#E8A84C',
    textColor: '#fff',
    role: 'The primary accent. Shows up on CTAs and highlighted items. Feels like candlelight, not warning signs.',
  },
  {
    id: 'brown',
    name: 'Deep brown',
    hex: '#3D2B1F',
    textColor: '#FAF5E9',
    role: 'The anchor. Used for text, headers, and the footer. Rich and grounded — the equivalent of dark wood and leather.',
  },
  {
    id: 'terracotta',
    name: 'Terracotta',
    hex: '#C4623A',
    textColor: '#fff',
    role: 'The secondary accent. Category labels, hover states, borders. Earthy and confident.',
  },
  {
    id: 'softblack',
    name: 'Soft black',
    hex: '#1A1209',
    textColor: '#FAF5E9',
    role: 'For high-contrast moments — modal overlays, premium sections. Darker than the brown but still warm.',
  },
]

export default function OrderingBrandPlaceholder() {
  const [activeId, setActiveId] = useState(null)
  const active = PALETTE.find((p) => p.id === activeId)

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #E5E7EB',
        borderRadius: '16px',
        padding: '36px 32px',
        margin: '2rem 0',
        fontFamily: 'DM Sans, sans-serif',
      }}
      role="region"
      aria-label="Visual identity explorer"
    >
      <div style={{ marginBottom: '28px' }}>
        <div style={{ color: '#6366F1', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
          Visual identity
        </div>
        <h3 style={{ color: '#111827', fontSize: '20px', fontWeight: 700, margin: 0 }}>
          The palette
        </h3>
        <p style={{ color: '#6B7280', fontSize: '14px', margin: '6px 0 0' }}>
          Click any swatch to learn its role.
        </p>
      </div>

      {/* Swatches */}
      <div
        style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}
        role="list"
        aria-label="Color swatches"
      >
        {PALETTE.map((color) => {
          const isActive = activeId === color.id
          return (
            <button
              key={color.id}
              role="listitem"
              onClick={() => setActiveId(isActive ? null : color.id)}
              aria-pressed={isActive}
              aria-label={`${color.name}: ${color.hex}. Click for details.`}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '12px',
                background: color.hex,
                border: `3px solid ${isActive ? '#6366F1' : 'transparent'}`,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: '8px',
                transition: 'border-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease',
                boxShadow: isActive ? '0 0 0 4px rgba(99,102,241,0.25)' : '0 2px 8px rgba(0,0,0,0.1)',
                transform: isActive ? 'scale(1.08)' : 'scale(1)',
              }}
            >
              <span style={{ fontSize: '10px', fontWeight: 600, color: color.textColor, opacity: 0.8, fontFamily: 'JetBrains Mono, monospace' }}>
                {color.hex}
              </span>
            </button>
          )
        })}
      </div>

      {/* Color detail */}
      <div
        style={{
          minHeight: '72px',
          background: active ? active.hex : '#F9FAFB',
          borderRadius: '12px',
          padding: '20px 24px',
          transition: 'background 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
        role="status"
        aria-live="polite"
      >
        {active ? (
          <>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: active.textColor, marginBottom: '4px' }}>
                {active.name}
              </div>
              <div style={{ fontSize: '13px', color: active.textColor, opacity: 0.8, lineHeight: 1.6, maxWidth: '500px' }}>
                {active.role}
              </div>
            </div>
          </>
        ) : (
          <span style={{ color: '#9CA3AF', fontSize: '14px' }}>Select a swatch above.</span>
        )}
      </div>

      {/* Typography preview */}
      <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid #F3F4F6' }}>
        <div style={{ color: '#6B7280', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
          Typography
        </div>
        <div
          style={{
            background: '#FAF5E9',
            borderRadius: '12px',
            padding: '28px 28px',
          }}
        >
          <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '32px', color: '#3D2B1F', lineHeight: 1.2, marginBottom: '12px' }}>
            Casa del Fuego
          </div>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#6B5C52', lineHeight: 1.7, marginBottom: '16px' }}>
            A family restaurant since 1994. Everything made from scratch, every day.
          </div>
          <button style={{ background: '#E8A84C', color: '#3D2B1F', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '13px', fontWeight: 700, fontFamily: 'DM Sans, sans-serif', cursor: 'default' }}>
            Order online →
          </button>
        </div>
      </div>
    </div>
  )
}
