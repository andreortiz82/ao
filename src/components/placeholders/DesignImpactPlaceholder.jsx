import { useState, useEffect } from 'react'

const STATS = [
  { value: 40, suffix: '%', label: 'faster handoffs', sublabel: 'across all four teams' },
  { value: 200, suffix: '+', label: 'engineers', sublabel: 'actively using the system' },
  { value: 3, suffix: '', label: 'themes shipped', sublabel: 'default, dark, high-contrast' },
  { value: 94, suffix: '%', label: 'satisfaction', sublabel: 'six months post-adoption' },
]

function useCounter(target, duration, started) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return
    let startTime = null
    let frame

    const tick = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration, started])

  return count
}

function StatCard({ stat, started, index }) {
  const count = useCounter(stat.value, 1500, started)

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '32px 28px',
        border: '1px solid #E0E7FF',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        animation: `fadeUp 0.5s ease-out ${index * 0.1}s both`,
      }}
    >
      <div
        style={{
          fontSize: '52px',
          fontWeight: 700,
          lineHeight: 1,
          color: '#6366F1',
          fontFamily: 'DM Serif Display, serif',
          letterSpacing: '-0.02em',
        }}
      >
        {count}{stat.suffix}
      </div>
      <div style={{ fontSize: '16px', fontWeight: 600, color: '#1E1B4B', marginTop: '4px' }}>
        {stat.label}
      </div>
      <div style={{ fontSize: '13px', color: '#6B7280' }}>
        {stat.sublabel}
      </div>
    </div>
  )
}

export default function DesignImpactPlaceholder() {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    const el = document.getElementById('design-impact-root')
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      id="design-impact-root"
      style={{
        background: 'linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 100%)',
        borderRadius: '16px',
        padding: '40px 32px',
        margin: '2rem 0',
        fontFamily: 'DM Sans, sans-serif',
      }}
      role="region"
      aria-label="Design system impact metrics"
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div style={{ marginBottom: '28px' }}>
        <div style={{ color: '#6366F1', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
          Outcomes
        </div>
        <h3 style={{ color: '#1E1B4B', fontSize: '22px', fontWeight: 700, margin: 0 }}>
          18 months after we started
        </h3>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px',
        }}
      >
        {STATS.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} started={started} index={i} />
        ))}
      </div>
    </div>
  )
}
