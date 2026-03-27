import { useState } from 'react'

const INSIGHTS = [
  {
    id: 'confirm',
    quote: "I always call to confirm anyway. Just to make sure it went through.",
    source: 'Patient, 54',
    keyInsight: 'Patients don\'t trust digital confirmation',
    designResponse: 'We rebuilt the confirmation screen to look like a receipt — specific date, time, provider name, location. Something you could screenshot. The goal was to make "it worked" feel undeniable, not just technically correct.',
    color: '#0077BC',
    lightColor: '#001F33',
    textColor: '#7AB8D9',
  },
  {
    id: 'spreadsheet',
    quote: "I have my own spreadsheet. The software is technically in use, but…",
    source: 'Front desk coordinator',
    keyInsight: 'Staff built parallel systems',
    designResponse: 'The existing software had the data but not the right views. We interviewed five front desk coordinators to understand exactly what their spreadsheets tracked — then rebuilt the scheduling queue to surface that information directly. No more parallel system needed.',
    color: '#0EA5E9',
    lightColor: '#001828',
    textColor: '#7AB8D9',
  },
  {
    id: 'hours',
    quote: "Three hours a day, just scheduling calls.",
    source: 'Practice manager',
    keyInsight: 'Phone volume was the symptom, not the cause',
    designResponse: 'We treated the phone calls as failure demand — calls that happened because the digital system didn\'t do its job. Every time we eliminated a reason someone had to call, we measured the drop. That framing turned vague "reduce calls" into a specific, trackable design goal.',
    color: '#10B981',
    lightColor: '#001810',
    textColor: '#6EE7B7',
  },
]

export default function SchedulingResearchPlaceholder() {
  const [expandedId, setExpandedId] = useState(null)

  return (
    <div
      style={{
        margin: '2rem 0',
        fontFamily: 'DM Sans, sans-serif',
      }}
      role="region"
      aria-label="Research insights"
    >
      <div style={{ marginBottom: '20px' }}>
        <div style={{ color: '#0077BC', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
          Field research
        </div>
        <h3 style={{ color: '#F0F0F0', fontSize: '20px', fontWeight: 700, margin: 0, fontFamily: 'Archivo Black, sans-serif' }}>
          What we heard
        </h3>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '16px',
          overflowX: 'auto',
          paddingBottom: '8px',
          WebkitOverflowScrolling: 'touch',
        }}
        role="list"
      >
        {INSIGHTS.map((insight) => {
          const isExpanded = expandedId === insight.id
          return (
            <button
              key={insight.id}
              role="listitem"
              onClick={() => setExpandedId(isExpanded ? null : insight.id)}
              aria-pressed={isExpanded}
              aria-label={`Research insight: ${insight.keyInsight}. Click to ${isExpanded ? 'collapse' : 'expand'}.`}
              style={{
                flex: '0 0 300px',
                background: '#1A1A1A',
                border: `2px solid ${isExpanded ? insight.color : '#2E2E2E'}`,
                borderRadius: '16px',
                padding: '28px 24px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                boxShadow: isExpanded ? `0 0 0 4px ${insight.lightColor}` : 'none',
              }}
            >
              <div
                style={{
                  fontSize: '48px',
                  lineHeight: 0.8,
                  color: insight.color,
                  fontFamily: 'Archivo Black, sans-serif',
                  marginBottom: '16px',
                  opacity: 0.7,
                }}
                aria-hidden="true"
              >
                "
              </div>
              <blockquote
                style={{
                  margin: 0,
                  fontSize: '15px',
                  lineHeight: 1.6,
                  color: '#F0F0F0',
                  fontStyle: 'italic',
                  marginBottom: '16px',
                  background: 'transparent',
                  padding: 0,
                  border: 'none',
                  borderRadius: 0,
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 400,
                }}
              >
                {insight.quote}
              </blockquote>
              <div style={{ fontSize: '12px', color: '#888888', marginBottom: '16px' }}>
                — {insight.source}
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: insight.lightColor,
                  color: insight.textColor,
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '5px 10px',
                  borderRadius: '999px',
                }}
              >
                Key insight: {insight.keyInsight}
              </div>

              {isExpanded && (
                <div
                  style={{
                    marginTop: '20px',
                    paddingTop: '20px',
                    borderTop: `1px solid #2E2E2E`,
                  }}
                >
                  <div style={{ fontSize: '11px', fontWeight: 700, color: insight.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                    Design response
                  </div>
                  <p style={{ fontSize: '14px', color: '#888888', lineHeight: 1.7, margin: 0 }}>
                    {insight.designResponse}
                  </p>
                </div>
              )}
            </button>
          )
        })}
      </div>
      <p style={{ fontSize: '12px', color: '#444444', marginTop: '8px' }}>
        Click any card to see the design response.
      </p>
    </div>
  )
}
