import { useState, useEffect } from 'react'

const STATS = [
  { value: 210, suffix: '×', label: 'session length', sublabel: '2.1× increase in first 60 days', displayValue: '2.1' },
  { value: 38, suffix: '%', label: 'fewer early quits', sublabel: 'early exit rate dropped in 60 days', displayValue: '38' },
  { value: 47, suffix: '/5', label: 'player satisfaction', sublabel: 'from in-app survey, 4,200 responses', displayValue: '4.7' },
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
  const rawCount = useCounter(stat.value, 1600, started)

  const display = () => {
    if (stat.suffix === '×') return `${(rawCount / 100).toFixed(1)}×`
    if (stat.suffix === '/5') return `${(rawCount / 10).toFixed(1)}/5`
    return `${rawCount}%`
  }

  return (
    <div
      style={{
        background: '#1A1A1A',
        border: '1px solid #2E2E2E',
        borderRadius: '16px',
        padding: '32px 28px',
        animation: `fadeUp 0.5s ease-out ${index * 0.12}s both`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Accent glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,119,188,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          fontSize: '52px',
          fontWeight: 700,
          lineHeight: 1,
          color: '#7AB8D9',
          fontFamily: 'Archivo Black, sans-serif',
          letterSpacing: '-0.02em',
          marginBottom: '8px',
        }}
        aria-label={`${stat.displayValue}${stat.suffix}`}
      >
        {display()}
      </div>
      <div style={{ fontSize: '15px', fontWeight: 600, color: '#F0F0F0', marginBottom: '4px' }}>
        {stat.label}
      </div>
      <div style={{ fontSize: '12px', color: '#888888' }}>
        {stat.sublabel}
      </div>
    </div>
  )
}

export default function GamingImpactPlaceholder() {
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
    const el = document.getElementById('gaming-impact-root')
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      id="gaming-impact-root"
      style={{
        background: '#0f0f1a',
        borderRadius: '16px',
        padding: '40px 32px',
        margin: '2rem 0',
        fontFamily: 'DM Sans, sans-serif',
        border: '1px solid #1e1e30',
      }}
      role="region"
      aria-label="Gaming platform impact metrics"
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ marginBottom: '28px' }}>
        <div style={{ color: '#0077BC', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
          60-day results
        </div>
        <h3 style={{ color: '#F0F0F0', fontSize: '22px', fontWeight: 700, margin: 0, fontFamily: 'Archivo Black, sans-serif' }}>
          Players don't quit games. They quit friction.
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
