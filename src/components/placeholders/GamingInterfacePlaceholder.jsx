import { useState } from 'react'

const HUD_ELEMENTS = {
  health: {
    id: 'health',
    label: 'Health bar',
    rationale: 'Bottom-left follows convention and keeps critical info in peripheral vision. Bar fills left-to-right — same direction as reading — so dropping health reads as "losing ground."',
  },
  cooldowns: {
    id: 'cooldowns',
    label: 'Ability cooldowns',
    rationale: 'Bottom-center keeps abilities near health. Circular timers with a sweep animation communicate time remaining without requiring players to read numbers mid-match.',
  },
  timer: {
    id: 'timer',
    label: 'Match timer',
    rationale: 'Top-center is the natural place for temporal information. Large enough to glance at, small enough to ignore when it doesn\'t matter.',
  },
  killfeed: {
    id: 'killfeed',
    label: 'Kill feed',
    rationale: 'Top-right keeps social context visible without competing with action. Text fades after 4 seconds — present when relevant, gone when not.',
  },
  minimap: {
    id: 'minimap',
    label: 'Minimap',
    rationale: 'Bottom-right mirrors the kill feed\'s position on the opposite side. Round shape distinguishes it from rectangular UI panels and signals "overview" vs. "action."',
  },
}

function HealthBar({ active, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      aria-label="Health bar — click to see design rationale"
      style={{
        position: 'absolute',
        bottom: '24px',
        left: '24px',
        background: active ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.06)',
        border: `2px solid ${active ? '#6366F1' : 'rgba(255,255,255,0.1)'}`,
        borderRadius: '12px',
        padding: '10px 14px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        minWidth: '140px',
      }}
    >
      <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px', textAlign: 'left' }}>HP</div>
      <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: '72%', background: 'linear-gradient(to right, #22C55E, #4ADE80)', borderRadius: '999px' }} />
      </div>
      <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px', textAlign: 'left' }}>720 / 1000</div>
    </button>
  )
}

function Cooldowns({ active, onClick }) {
  const abilities = [
    { icon: '⚡', pct: 100, key: 'Q' },
    { icon: '🔥', pct: 45, key: 'W' },
    { icon: '❄️', pct: 0, key: 'E' },
    { icon: '🛡', pct: 78, key: 'R' },
  ]
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      aria-label="Ability cooldowns — click to see design rationale"
      style={{
        position: 'absolute',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: active ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.06)',
        border: `2px solid ${active ? '#6366F1' : 'rgba(255,255,255,0.1)'}`,
        borderRadius: '12px',
        padding: '10px 16px',
        cursor: 'pointer',
        display: 'flex',
        gap: '10px',
        transition: 'all 0.2s ease',
      }}
    >
      {abilities.map((a) => (
        <div key={a.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <div style={{ fontSize: '18px', opacity: a.pct === 0 ? 0.3 : 1 }} aria-hidden="true">{a.icon}</div>
          <div style={{ fontSize: '9px', color: a.pct === 0 ? '#EF4444' : '#94A3B8', fontWeight: 700 }}>{a.key}</div>
        </div>
      ))}
    </button>
  )
}

function MatchTimer({ active, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      aria-label="Match timer — click to see design rationale"
      style={{
        position: 'absolute',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: active ? 'rgba(99,102,241,0.2)' : 'rgba(0,0,0,0.4)',
        border: `2px solid ${active ? '#6366F1' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '999px',
        padding: '6px 18px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      <span style={{ color: '#fff', fontSize: '14px', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.05em' }}>
        12:47
      </span>
    </button>
  )
}

function KillFeed({ active, onClick }) {
  const events = [
    { text: 'NightFox → Zephyr', icon: '⚡' },
    { text: 'SYSTEM → Blaze', icon: '💀' },
    { text: 'Kira → NightFox', icon: '🔥' },
  ]
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      aria-label="Kill feed — click to see design rationale"
      style={{
        position: 'absolute',
        top: '12px',
        right: '16px',
        background: active ? 'rgba(99,102,241,0.2)' : 'transparent',
        border: `2px solid ${active ? '#6366F1' : 'transparent'}`,
        borderRadius: '10px',
        padding: '6px 8px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        transition: 'all 0.2s ease',
      }}
    >
      {events.map((e, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 1 - i * 0.3 }}>
          <span style={{ fontSize: '10px' }} aria-hidden="true">{e.icon}</span>
          <span style={{ fontSize: '10px', color: '#CBD5E1', whiteSpace: 'nowrap', fontFamily: 'JetBrains Mono, monospace' }}>{e.text}</span>
        </div>
      ))}
    </button>
  )
}

function Minimap({ active, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      aria-label="Minimap — click to see design rationale"
      style={{
        position: 'absolute',
        bottom: '24px',
        right: '24px',
        width: '80px',
        height: '80px',
        background: active ? 'rgba(99,102,241,0.2)' : 'rgba(0,0,0,0.5)',
        border: `2px solid ${active ? '#6366F1' : 'rgba(255,255,255,0.1)'}`,
        borderRadius: '50%',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label="Minimap — click to see design rationale"
    >
      <svg width="60" height="60" viewBox="0 0 60 60" aria-hidden="true">
        <circle cx="30" cy="30" r="28" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
        <rect x="10" y="15" width="20" height="12" rx="2" fill="rgba(255,255,255,0.06)"/>
        <rect x="35" y="25" width="15" height="18" rx="2" fill="rgba(255,255,255,0.06)"/>
        <path d="M10 35 Q25 28 40 38" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none"/>
        <circle cx="30" cy="30" r="3" fill="#6366F1"/>
        <circle cx="20" cy="38" r="2" fill="#EF4444" opacity="0.8"/>
        <circle cx="42" cy="22" r="2" fill="#EF4444" opacity="0.8"/>
      </svg>
    </button>
  )
}

export default function GamingInterfacePlaceholder() {
  const [activeElement, setActiveElement] = useState(null)

  const toggle = (id) => setActiveElement(activeElement === id ? null : id)
  const active = activeElement ? HUD_ELEMENTS[activeElement] : null

  return (
    <div
      style={{
        margin: '2rem 0',
        fontFamily: 'DM Sans, sans-serif',
      }}
      role="region"
      aria-label="Interactive game HUD mockup"
    >
      <div style={{ marginBottom: '16px' }}>
        <div style={{ color: '#6366F1', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
          HUD redesign
        </div>
        <h3 style={{ color: '#111827', fontSize: '20px', fontWeight: 700, margin: 0 }}>
          Three elements. Everything else, contextual.
        </h3>
        <p style={{ color: '#6B7280', fontSize: '14px', margin: '6px 0 0' }}>
          Click any HUD element to see the design rationale.
        </p>
      </div>

      {/* Game screen */}
      <div
        style={{
          background: '#0f0f1a',
          borderRadius: '12px',
          position: 'relative',
          height: '280px',
          overflow: 'hidden',
          border: '1px solid #1e1e30',
        }}
      >
        {/* Background game world */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 40% 60%, rgba(30,30,60,1) 0%, rgba(10,10,20,1) 100%)' }} aria-hidden="true">
          {/* Grid lines for depth */}
          <svg width="100%" height="100%" style={{ opacity: 0.05 }} aria-hidden="true">
            {[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9].map(x => (
              <line key={`v${x}`} x1={`${x*100}%`} y1="0" x2={`${x*100}%`} y2="100%" stroke="white" strokeWidth="1"/>
            ))}
            {[0.25,0.5,0.75].map(y => (
              <line key={`h${y}`} x1="0" y1={`${y*100}%`} x2="100%" y2={`${y*100}%`} stroke="white" strokeWidth="1"/>
            ))}
          </svg>
          <div style={{ position: 'absolute', top: '40%', left: '45%', transform: 'translate(-50%,-50%)', fontSize: '11px', color: 'rgba(255,255,255,0.08)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em' }}>SECTOR 7 — RANKED</div>
        </div>

        <MatchTimer active={activeElement === 'timer'} onClick={() => toggle('timer')} />
        <KillFeed active={activeElement === 'killfeed'} onClick={() => toggle('killfeed')} />
        <HealthBar active={activeElement === 'health'} onClick={() => toggle('health')} />
        <Cooldowns active={activeElement === 'cooldowns'} onClick={() => toggle('cooldowns')} />
        <Minimap active={activeElement === 'minimap'} onClick={() => toggle('minimap')} />
      </div>

      {/* Rationale panel */}
      <div
        style={{
          marginTop: '12px',
          background: '#141428',
          borderRadius: '12px',
          padding: '20px 24px',
          minHeight: '72px',
          border: '1px solid #1e1e30',
        }}
        role="status"
        aria-live="polite"
      >
        {active ? (
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#6366F1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              {active.label}
            </div>
            <p style={{ color: '#CBD5E1', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
              {active.rationale}
            </p>
          </div>
        ) : (
          <p style={{ color: '#475569', fontSize: '14px', margin: 0 }}>
            Click any element to see the design rationale.
          </p>
        )}
      </div>
    </div>
  )
}
