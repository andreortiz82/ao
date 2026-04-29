import { useState } from 'react'

const C = {
  base:      '#FAFAF9',
  surface:   '#F4F3EF',
  border:    '#E8E6E1',
  text:      '#1A1A18',
  secondary: '#6B6B64',
  accent:    '#0077BC',
  accentBg:  '#EFF6FF',
  accentLt:  '#DBEAFE',
  white:     '#FFFFFF',
  aiMsg:     '#F0F4F8',
  citeBg:    '#EFF6FF',
  citeBorder:'#BFDBFE',
}

const FILES = [
  {
    folder: 'Design System',
    items: [
      { name: 'brand-guidelines.pdf',    icon: '📄', id: 'brand'  },
      { name: 'component-library.fig',   icon: '🎨', id: 'comp'   },
      { name: 'design-tokens.json',      icon: '📋', id: 'tokens' },
    ],
  },
  {
    folder: 'Contracts',
    items: [
      { name: 'acme-corp-2026.pdf',      icon: '📄', id: 'acme'   },
      { name: 'nda-template.docx',       icon: '📄', id: 'nda'    },
    ],
  },
  {
    folder: 'Research',
    items: [
      { name: 'user-interviews.md',      icon: '📋', id: 'ux'     },
      { name: 'q1-survey-results.xlsx',  icon: '📊', id: 'survey' },
    ],
  },
]

const PROMPTS = [
  { label: 'What are our primary brand colors?', id: 'colors'   },
  { label: 'Summarize the Acme contract terms',  id: 'contract' },
  { label: 'Key findings from user research',    id: 'research' },
]

const RESPONSES = {
  colors: {
    file: 'tokens',
    text: 'Based on your design tokens, your primary brand palette is:',
    swatches: [
      { name: 'Primary',    hex: '#0077BC', label: '--color-primary'   },
      { name: 'Surface',    hex: '#1A1A1A', label: '--color-surface'   },
      { name: 'Text',       hex: '#F0F0F0', label: '--color-text'      },
      { name: 'Accent',     hex: '#2E2E2E', label: '--color-border'    },
    ],
    cite: 'design-tokens.json',
  },
  contract: {
    file: 'acme',
    text: 'The Acme Corp 2026 agreement covers the following key terms:',
    bullets: [
      'Scope: Brand identity, design system setup, and 3-month design support.',
      'Rate: $175/hr with a $2,400/mo retainer for ongoing advisory.',
      'IP: All deliverables transfer to Acme upon final payment.',
      'Termination: 30-day written notice; work completed to date is billable.',
    ],
    cite: 'acme-corp-2026.pdf',
  },
  research: {
    file: 'ux',
    text: 'From 12 interviews and 340 survey responses, the top findings were:',
    bullets: [
      '74% of users said onboarding took longer than expected.',
      'The scheduling flow had the highest task-completion rate (91%).',
      'Mobile users reported friction on the document upload step.',
      'Most-requested feature: saved filter presets on the dashboard.',
    ],
    cite: 'user-interviews.md',
  },
}

function FileIcon({ icon, size = 14 }) {
  return <span style={{ fontSize: size, lineHeight: 1 }}>{icon}</span>
}

export default function AIFileDemo() {
  const [activeFile,   setActiveFile]   = useState('tokens')
  const [activePrompt, setActivePrompt] = useState('colors')
  const [folderOpen,   setFolderOpen]   = useState({ 'Design System': true, Contracts: false, Research: false })

  const response = RESPONSES[activePrompt]

  function selectPrompt(pid) {
    setActivePrompt(pid)
    setActiveFile(RESPONSES[pid].file)
  }

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: C.base, border: `1px solid ${C.border}`, borderRadius: 14, overflow: 'hidden', display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: 420 }}>

      {/* ── File tree ── */}
      <div style={{ borderRight: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '12px 14px', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: C.secondary }}>Files</div>
        </div>
        <div style={{ overflowY: 'auto', flex: 1, padding: '8px 0' }}>
          {FILES.map((group) => (
            <div key={group.folder}>
              <button
                onClick={() => setFolderOpen(f => ({ ...f, [group.folder]: !f[group.folder] }))}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 6, padding: '5px 14px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: C.secondary, textAlign: 'left' }}
              >
                <span style={{ fontSize: 10, transform: folderOpen[group.folder] ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s', display: 'inline-block' }}>▶</span>
                <span style={{ fontSize: 12 }}>📁</span>
                {group.folder}
              </button>
              {folderOpen[group.folder] && group.items.map((file) => {
                const isActive = activeFile === file.id
                return (
                  <button
                    key={file.id}
                    onClick={() => setActiveFile(file.id)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 6, padding: '5px 14px 5px 28px', background: isActive ? C.accentBg : 'none', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.1s' }}
                  >
                    <FileIcon icon={file.icon} />
                    <span style={{ fontSize: 12, color: isActive ? C.accent : C.text, fontWeight: isActive ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ── Chat panel ── */}
      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Chat header */}
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 12 }}>✦</span>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>AI Assistant</div>
            <div style={{ fontSize: 10, color: C.secondary }}>Grounded in your files</div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Prompt suggestions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 11, color: C.secondary, marginBottom: 2 }}>Try asking:</div>
            {PROMPTS.map((p) => (
              <button
                key={p.id}
                onClick={() => selectPrompt(p.id)}
                style={{ textAlign: 'left', padding: '8px 12px', background: activePrompt === p.id ? C.accentBg : C.surface, border: `1px solid ${activePrompt === p.id ? C.accentLt : C.border}`, borderRadius: 8, fontSize: 12, color: activePrompt === p.id ? C.accent : C.text, cursor: 'pointer', fontWeight: activePrompt === p.id ? 600 : 400, transition: 'all 0.15s' }}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div style={{ borderTop: `1px solid ${C.border}` }} />

          {/* User message */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ background: C.accent, color: C.white, padding: '8px 12px', borderRadius: '10px 10px 2px 10px', fontSize: 12, maxWidth: '80%' }}>
              {PROMPTS.find(p => p.id === activePrompt)?.label}
            </div>
          </div>

          {/* AI response */}
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: 5, background: C.accent, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
              <span style={{ fontSize: 11, color: C.white }}>✦</span>
            </div>
            <div style={{ background: C.aiMsg, padding: '10px 12px', borderRadius: '2px 10px 10px 10px', fontSize: 12, color: C.text, lineHeight: 1.6, flex: 1 }}>
              <p style={{ margin: '0 0 8px' }}>{response.text}</p>

              {response.swatches && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '8px 0' }}>
                  {response.swatches.map((sw) => (
                    <div key={sw.name} style={{ display: 'flex', alignItems: 'center', gap: 6, background: C.white, border: `1px solid ${C.border}`, borderRadius: 6, padding: '4px 8px' }}>
                      <div style={{ width: 12, height: 12, borderRadius: 3, background: sw.hex, border: `1px solid ${C.border}` }} />
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 600, color: C.text }}>{sw.name}</div>
                        <div style={{ fontSize: 9, color: C.secondary, fontFamily: 'monospace' }}>{sw.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {response.bullets && (
                <ul style={{ margin: '4px 0', paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {response.bullets.map((b, i) => (
                    <li key={i} style={{ fontSize: 12, color: C.text }}>{b}</li>
                  ))}
                </ul>
              )}

              {/* Citation */}
              <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6, background: C.citeBg, border: `1px solid ${C.citeBorder}`, borderRadius: 6, padding: '5px 8px' }}>
                <span style={{ fontSize: 11 }}>📄</span>
                <span style={{ fontSize: 11, color: C.accent, fontWeight: 600 }}>Source: {response.cite}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div style={{ padding: '10px 14px', borderTop: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 12px' }}>
            <input
              readOnly
              placeholder="Ask anything about your files…"
              style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: 12, color: C.secondary, cursor: 'default' }}
            />
            <div style={{ width: 24, height: 24, borderRadius: 6, background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
