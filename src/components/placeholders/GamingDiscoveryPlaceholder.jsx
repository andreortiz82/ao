import { useState } from 'react'

const STAGES = [
  {
    id: 'lobby',
    label: 'Lobby',
    icon: '🏠',
    painPoint: 'Players felt stranded. No social layer, no activity feed, nothing to do while waiting. First point of churn.',
    opportunity: 'Add a social presence layer — show what friends are queuing for, recent match highlights, and live leaderboard updates.',
  },
  {
    id: 'queue',
    label: 'Queue',
    icon: '⏳',
    painPoint: 'Estimated wait times were inaccurate by 2–4×. Players hit "accept" on a match they\'d mentally abandoned.',
    opportunity: 'Surface accurate, frequently-updated estimates alongside something to do — profile review, stat comparison, patch notes.',
  },
  {
    id: 'match',
    label: 'Match',
    icon: '⚔️',
    painPoint: 'HUD clutter was constant. Players reported the UI as visually noisy even when describing matches as fun.',
    opportunity: 'Reduce permanent HUD to three elements. Make everything else contextual — visible when relevant, gone when not.',
  },
  {
    id: 'result',
    label: 'Result',
    icon: '🏆',
    painPoint: 'Post-match screen was a dead end. Win or lose, the next step was navigating back to the lobby manually.',
    opportunity: 'Transform the result screen into a hook: personalized highlights, rank trajectory, one-tap rematch or new queue.',
  },
  {
    id: 'retry',
    label: 'Retry',
    icon: '🔄',
    painPoint: 'Seven taps to queue again. Players who lost were most likely to quit at this exact moment.',
    opportunity: 'Two taps from result to queue. Reduce the friction cost of losing — make playing again the path of least resistance.',
  },
]

export default function GamingDiscoveryPlaceholder() {
  const [activeId, setActiveId] = useState(null)
  const active = STAGES.find((s) => s.id === activeId)

  return (
    <div
      style={{
        background: '#0f0f1a',
        borderRadius: '16px',
        padding: '36px 32px',
        margin: '2rem 0',
        fontFamily: 'DM Sans, sans-serif',
        border: '1px solid #1e1e30',
      }}
      role="region"
      aria-label="Player journey map"
    >
      <div style={{ marginBottom: '32px' }}>
        <div style={{ color: '#0077BC', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
          Player journey
        </div>
        <h3 style={{ color: '#F0F0F0', fontSize: '20px', fontWeight: 700, margin: 0, fontFamily: 'Archivo Black, sans-serif' }}>
          Where players dropped off
        </h3>
        <p style={{ color: '#888888', fontSize: '14px', margin: '6px 0 0' }}>
          Click a stage to see the pain point and design opportunity.
        </p>
      </div>

      {/* Journey nodes */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0',
          overflowX: 'auto',
          paddingBottom: '8px',
          WebkitOverflowScrolling: 'touch',
        }}
        role="list"
        aria-label="Journey stages"
      >
        {STAGES.map((stage, i) => {
          const isActive = activeId === stage.id
          return (
            <div key={stage.id} style={{ display: 'flex', alignItems: 'center' }} role="listitem">
              <button
                onClick={() => setActiveId(isActive ? null : stage.id)}
                aria-pressed={isActive}
                aria-label={`${stage.label} — click to see details`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0 4px',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: isActive ? '#0077BC' : '#1A1A1A',
                    border: `2px solid ${isActive ? '#0077BC' : '#2E2E2E'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    transition: 'background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                    boxShadow: isActive ? '0 0 0 4px rgba(0,119,188,0.25)' : 'none',
                  }}
                  aria-hidden="true"
                >
                  {stage.icon}
                </div>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#7AB8D9' : '#888888',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {stage.label}
                </span>
              </button>

              {i < STAGES.length - 1 && (
                <div
                  aria-hidden="true"
                  style={{
                    width: '40px',
                    height: '2px',
                    background: '#2E2E2E',
                    flexShrink: 0,
                    margin: '0 4px',
                    marginBottom: '20px',
                  }}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Detail card */}
      <div
        style={{
          marginTop: '24px',
          minHeight: '120px',
          background: '#1A1A1A',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #2E2E2E',
          transition: 'opacity 0.2s ease',
        }}
        role="status"
        aria-live="polite"
      >
        {active ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#EF4444', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                Pain point
              </div>
              <p style={{ color: '#888888', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                {active.painPoint}
              </p>
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#0077BC', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                Design opportunity
              </div>
              <p style={{ color: '#888888', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                {active.opportunity}
              </p>
            </div>
          </div>
        ) : (
          <p style={{ color: '#444444', fontSize: '14px', margin: 0 }}>
            Select a stage above.
          </p>
        )}
      </div>
    </div>
  )
}
