import { useEffect, useRef, useState } from "react";

const THREAD = [
  {
    role: "user",
    text: "Summarize open action items from yesterday's site visit.",
  },
  {
    role: "assistant",
    text: "Three follow-ups from Site B:",
    bullets: [
      "Update screening script per IRB feedback",
      "Confirm courier pickup window for lab kits",
      "Schedule coordinator sync for Thursday",
    ],
    cite: "Site visit notes · Apr 12",
  },
];

const SUGGESTIONS = [
  "Draft a patient-friendly version",
  "Add to my task list",
];

export default function MobileChatDemo() {
  const [messages, setMessages] = useState([THREAD[0]]);
  const [typing, setTyping] = useState(true);
  const [draft, setDraft] = useState("");
  const threadRef = useRef(null);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setMessages(THREAD);
      setTyping(false);
    }, 1200);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  function send(text) {
    if (!text.trim() || typing) return;
    setMessages((prev) => [...prev, { role: "user", text: text.trim() }]);
    setDraft("");
    setTyping(true);
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Added to your task list. I'll surface a reminder before Thursday's sync.",
          bullets: null,
          cite: "Tasks · Workspace",
        },
      ]);
      setTyping(false);
    }, 900);
  }

  return (
    <div className="mobile-demo">
      <div className="mobile-frame" aria-label="Mobile app simulation">
        <div className="mobile-notch" aria-hidden="true" />
        <header className="mobile-header">
          <button type="button" className="mobile-back" aria-label="Back">
            ←
          </button>
          <div>
            <div className="mobile-title">Study Assistant</div>
            <div className="mobile-subtitle">Online · grounded responses</div>
          </div>
          <span className="mobile-avatar">AO</span>
        </header>

        <div className="mobile-thread" ref={threadRef}>
          {messages.map((msg, i) =>
            msg.role === "user" ? (
              <div key={i} className="mobile-msg mobile-msg--user">
                <div className="mobile-bubble mobile-bubble--user">{msg.text}</div>
              </div>
            ) : (
              <div key={i} className="mobile-msg mobile-msg--assistant">
                <div className="mobile-bubble mobile-bubble--assistant">
                  <p>{msg.text}</p>
                  {msg.bullets && (
                    <ul>
                      {msg.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {msg.cite && <span className="mobile-cite">{msg.cite}</span>}
                </div>
              </div>
            ),
          )}
          {typing && (
            <div className="mobile-msg mobile-msg--assistant">
              <div className="mobile-typing" aria-label="Assistant is typing">
                <span /><span /><span />
              </div>
            </div>
          )}
        </div>

        {!typing && messages.length < 3 && (
          <div className="mobile-chips">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                className="mobile-chip"
                onClick={() => send(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <form
          className="mobile-composer"
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
        >
          <input
            type="text"
            className="mobile-input"
            placeholder="Message"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={typing}
          />
          <button type="submit" className="mobile-send" disabled={!draft.trim() || typing}>
            ↑
          </button>
        </form>
        <div className="mobile-home-indicator" aria-hidden="true" />
      </div>

      <style>{`
        .mobile-demo {
          display: flex;
          justify-content: center;
          padding: 1.5rem 1rem 1.75rem;
          background: var(--color-paper);
          min-height: 560px;
        }

        .mobile-frame {
          width: min(100%, 320px);
          height: 580px;
          background: #111;
          border-radius: 36px;
          border: 8px solid #1a1a1a;
          box-shadow: 0 24px 48px -20px rgba(0,0,0,0.35);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
        }

        .mobile-notch {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 96px;
          height: 22px;
          background: #1a1a1a;
          border-radius: 0 0 14px 14px;
          z-index: 2;
        }

        .mobile-header {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 2rem 0.85rem 0.75rem;
          background: #fff;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }

        .mobile-back {
          border: none;
          background: none;
          font-size: 18px;
          color: #666;
          cursor: default;
          padding: 0;
        }

        .mobile-title {
          font-size: 14px;
          font-weight: 600;
          color: #111;
        }

        .mobile-subtitle {
          font-size: 11px;
          color: #888;
        }

        .mobile-avatar {
          margin-left: auto;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #0a0a0a;
          color: #fff;
          font-size: 10px;
          font-weight: 600;
          display: grid;
          place-items: center;
        }

        .mobile-thread {
          flex: 1;
          overflow-y: auto;
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          background: #f7f7f5;
        }

        .mobile-msg { display: flex; max-width: 88%; }
        .mobile-msg--user { align-self: flex-end; }
        .mobile-msg--assistant { align-self: flex-start; }

        .mobile-bubble {
          font-size: 13px;
          line-height: 1.45;
          padding: 0.6rem 0.75rem;
          border-radius: 16px;
        }

        .mobile-bubble p { margin: 0; }
        .mobile-bubble ul {
          margin: 0.45rem 0 0;
          padding-left: 1rem;
          color: #444;
        }

        .mobile-bubble--user {
          background: #0a0a0a;
          color: #fff;
          border-bottom-right-radius: 4px;
        }

        .mobile-bubble--assistant {
          background: #fff;
          color: #222;
          border: 1px solid rgba(0,0,0,0.06);
          border-bottom-left-radius: 4px;
        }

        .mobile-cite {
          display: block;
          margin-top: 0.5rem;
          font-family: var(--font-mono);
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #dc2626;
        }

        .mobile-typing {
          display: flex;
          gap: 4px;
          padding: 0.6rem 0.75rem;
          background: #fff;
          border-radius: 16px;
          border-bottom-left-radius: 4px;
          border: 1px solid rgba(0,0,0,0.06);
        }

        .mobile-typing span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #999;
          animation: mobile-dot 1.1s ease-in-out infinite;
        }

        .mobile-typing span:nth-child(2) { animation-delay: 0.15s; }
        .mobile-typing span:nth-child(3) { animation-delay: 0.3s; }

        @keyframes mobile-dot {
          0%, 80%, 100% { opacity: 0.35; }
          40% { opacity: 1; }
        }

        .mobile-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          padding: 0 0.75rem 0.5rem;
          background: #f7f7f5;
        }

        .mobile-chip {
          font-size: 11px;
          padding: 0.35rem 0.6rem;
          border-radius: 999px;
          border: 1px solid rgba(0,0,0,0.08);
          background: #fff;
          color: #444;
          cursor: pointer;
        }

        .mobile-composer {
          display: flex;
          gap: 0.45rem;
          padding: 0.55rem 0.75rem 0.35rem;
          background: #fff;
          border-top: 1px solid rgba(0,0,0,0.06);
        }

        .mobile-input {
          flex: 1;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 18px;
          padding: 0.5rem 0.75rem;
          font-size: 13px;
          outline: none;
        }

        .mobile-send {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: #0a0a0a;
          color: #fff;
          font-size: 16px;
          cursor: pointer;
        }

        .mobile-send:disabled { opacity: 0.35; cursor: not-allowed; }

        .mobile-home-indicator {
          height: 18px;
          background: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .mobile-home-indicator::after {
          content: "";
          width: 96px;
          height: 4px;
          background: #111;
          border-radius: 999px;
          opacity: 0.85;
        }
      `}</style>
    </div>
  );
}
