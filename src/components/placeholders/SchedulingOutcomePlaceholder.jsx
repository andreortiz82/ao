import { useState, useEffect } from 'react'

const METRICS = [
  {
    label: 'Booking completion',
    before: { value: 52, display: '52%' },
    after: { value: 89, display: '89%' },
  },
  {
    label: 'Daily scheduling calls',
    before: { value: 100, display: '3+ hrs/day' },
    after: { value: 29, display: '71% reduction' },
    invertBar: true,
  },
  {
    label: 'Staff time reclaimed',
    before: { value: 0, display: 'Workarounds' },
    after: { value: 100, display: '2.5 hrs/day' },
  },
]

function Bar({ value, color, animate, invertBar }) {
  const displayWidth = invertBar ? (100 - value) : value
  return (
    <div
      style={{
        height: '8px',
        background: '#F3F4F6',
        borderRadius: '999px',
        overflow: 'hidden',
      }}
      role="presentation"
    >
      <div
        style={{
          height: '100%',
          width: animate ? `${displayWidth}%` : '0%',
          background: color,
          borderRadius: '999px',
          transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </div>
  )
}

export default function SchedulingOutcomePlaceholder() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    const el = document.getElementById('scheduling-outcome-root')
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      id="scheduling-outcome-root"
      style={{
        background: '#fff',
        border: '1px solid #E5E7EB',
        borderRadius: '16px',
        overflow: 'hidden',
        margin: '2rem 0',
        fontFamily: 'DM Sans, sans-serif',
      }}
      role="region"
      aria-label="Before and after outcomes comparison"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}
      >
        {/* Before column */}
        <div style={{ padding: '32px', borderRight: '1px solid #F3F4F6', background: '#FAFAFA' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#6B7280',
              background: '#F3F4F6',
              padding: '4px 10px',
              borderRadius: '999px',
              marginBottom: '24px',
            }}
          >
            Before
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {METRICS.map((m) => (
              <div key={`before-${m.label}`}>
                <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '6px' }}>{m.label}</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>{m.before.display}</div>
                <Bar value={m.before.value} color="#D1D5DB" animate={animate} invertBar={false} />
              </div>
            ))}
          </div>
        </div>

        {/* After column */}
        <div style={{ padding: '32px', background: '#fff' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#6366F1',
              background: '#EEF2FF',
              padding: '4px 10px',
              borderRadius: '999px',
              marginBottom: '24px',
            }}
          >
            After
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {METRICS.map((m) => (
              <div key={`after-${m.label}`}>
                <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '6px' }}>{m.label}</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#6366F1', marginBottom: '8px' }}>{m.after.display}</div>
                <Bar value={m.after.value} color="#6366F1" animate={animate} invertBar={m.invertBar} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 32px', background: '#EEF2FF', borderTop: '1px solid #E0E7FF', fontSize: '13px', color: '#4338CA' }}>
        90-day results from three independent medical practices.
      </div>
    </div>
  )
}
