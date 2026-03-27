import { useEffect, useState } from 'react'

const METRICS = [
  {
    icon: '📈',
    metric: '3×',
    label: 'online orders',
    detail: 'Biggest single-month revenue driver in the restaurant\'s four-year history.',
    delay: 0,
  },
  {
    icon: '⏱',
    metric: '45%',
    label: 'longer sessions',
    detail: 'Customers spent more time browsing the menu before ordering.',
    delay: 120,
  },
  {
    icon: '💬',
    metric: '0',
    label: 'support contacts about the menu',
    detail: '"Where\'s the menu?" messages dropped to zero within the first week.',
    delay: 240,
  },
]

export default function OrderingResultsPlaceholder() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    const el = document.getElementById('ordering-results-root')
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      id="ordering-results-root"
      style={{
        margin: '2rem 0',
        fontFamily: 'DM Sans, sans-serif',
      }}
      role="region"
      aria-label="Restaurant ordering results"
    >
      <style>{`
        @keyframes fadeUpCard {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ color: '#0077BC', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
          60 days post-launch
        </div>
        <h3 style={{ color: '#F0F0F0', fontSize: '20px', fontWeight: 700, margin: 0, fontFamily: 'Archivo Black, sans-serif' }}>
          The numbers
        </h3>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px',
        }}
      >
        {METRICS.map((m) => (
          <div
            key={m.label}
            style={{
              background: '#1A1A1A',
              border: '1px solid #2E2E2E',
              borderRadius: '16px',
              padding: '28px 24px',
              animation: visible ? `fadeUpCard 0.5s ease-out ${m.delay}ms both` : 'none',
              opacity: visible ? undefined : 0,
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '12px' }} role="img" aria-hidden="true">
              {m.icon}
            </div>
            <div
              style={{
                fontSize: '48px',
                fontWeight: 700,
                color: '#0077BC',
                fontFamily: 'Archivo Black, sans-serif',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                marginBottom: '4px',
              }}
            >
              {m.metric}
            </div>
            <div style={{ fontSize: '15px', fontWeight: 600, color: '#F0F0F0', marginBottom: '8px' }}>
              {m.label}
            </div>
            <div style={{ fontSize: '13px', color: '#888888', lineHeight: 1.6 }}>
              {m.detail}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
