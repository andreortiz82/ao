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
        background: '#2E2E2E',
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
        background: '#111111',
        border: '1px solid #2E2E2E',
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
        <div style={{ padding: '32px', borderRight: '1px solid #2E2E2E', background: '#1A1A1A' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#888888',
              background: '#2E2E2E',
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
                <div style={{ fontSize: '13px', color: '#888888', marginBottom: '6px' }}>{m.label}</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#F0F0F0', marginBottom: '8px' }}>{m.before.display}</div>
                <Bar value={m.before.value} color="#444444" animate={animate} invertBar={false} />
              </div>
            ))}
          </div>
        </div>

        {/* After column */}
        <div style={{ padding: '32px', background: '#111111' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#7AB8D9',
              background: '#001F33',
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
                <div style={{ fontSize: '13px', color: '#888888', marginBottom: '6px' }}>{m.label}</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#0077BC', marginBottom: '8px' }}>{m.after.display}</div>
                <Bar value={m.after.value} color="#0077BC" animate={animate} invertBar={m.invertBar} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 32px', background: '#001F33', borderTop: '1px solid #2E2E2E', fontSize: '13px', color: '#7AB8D9' }}>
        90-day results from three independent medical practices.
      </div>
    </div>
  )
}
