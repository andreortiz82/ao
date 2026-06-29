import { useEffect, useRef, useState } from "react";

const PROMPTS = [
  {
    id: "trials",
    label: "How many active trials are running at Site A?",
  },
  {
    id: "enrollment",
    label: "Summarize enrollment trends for Q2",
  },
  {
    id: "low-confidence",
    label: "Which sites are behind on screening targets?",
  },
];

const RESPONSES = {
  trials: {
    confidence: "high",
    body: "There are **24 active trials** at Site A as of this morning.",
    retrieved: [
      { label: "Active trials", value: "24" },
      { label: "Last synced", value: "Today, 8:14 AM" },
    ],
    citation: "trial-registry · Site A dashboard",
    interpretation:
      "This count includes trials in Screening and Enrollment phases. Trials marked On Hold are excluded.",
  },
  enrollment: {
    confidence: "high",
    body: "Q2 enrollment is **up 18%** compared to Q1 across your portfolio.",
    retrieved: [
      { label: "Q2 enrolled", value: "312 patients" },
      { label: "Q1 enrolled", value: "264 patients" },
    ],
    citation: "enrollment-analytics · Q2 rollup",
    interpretation:
      "Growth is concentrated in oncology studies. Two sites account for most of the increase.",
  },
  "low-confidence": {
    confidence: "low",
    body: "I found **partial data** for screening targets — two sites may be behind, but source records conflict.",
    retrieved: [
      { label: "Sites flagged", value: "2 of 14" },
      { label: "Data freshness", value: "Mixed · 1–4 days old" },
    ],
    citation: "screening-ops · weekly snapshot",
    interpretation:
      "Recommend verifying against the live ops dashboard before acting. I can narrow by therapeutic area if you specify one.",
  },
};

function TypingIndicator() {
  return (
    <div className="chat-msg chat-msg--assistant" aria-label="Assistant is typing">
      <div className="chat-typing" role="status">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function RetrievedBlock({ items, citation }) {
  return (
    <div className="chat-retrieved">
      <div className="chat-retrieved-label">Retrieved from source</div>
      <dl className="chat-retrieved-grid">
        {items.map(({ label, value }) => (
          <div key={label} className="chat-retrieved-row">
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <div className="chat-citation">{citation}</div>
    </div>
  );
}

function AssistantMessage({ response }) {
  const isLow = response.confidence === "low";

  return (
    <div className="chat-msg chat-msg--assistant">
      {isLow && (
        <div className="chat-confidence chat-confidence--low">
          Low confidence — verify before acting
        </div>
      )}
      <div
        className="chat-bubble chat-bubble--assistant"
        dangerouslySetInnerHTML={{
          __html: response.body.replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>",
          ),
        }}
      />
      <RetrievedBlock
        items={response.retrieved}
        citation={response.citation}
      />
      <div className="chat-interpretation">
        <span className="chat-interpretation-label">Interpretation</span>
        <p>{response.interpretation}</p>
      </div>
      <div className="chat-actions">
        <button type="button" className="chat-action-btn">
          Copy
        </button>
        <button type="button" className="chat-action-btn">
          Regenerate
        </button>
      </div>
    </div>
  );
}

export default function ChatbotDemo() {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const threadRef = useRef(null);

  const showPrompts = messages.length === 0 && !isTyping;

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  function sendMessage(text, promptId = null) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setDraft("");
    setIsTyping(true);

    window.setTimeout(() => {
      const id =
        promptId ??
        PROMPTS.find(
          (p) => p.label.toLowerCase() === trimmed.toLowerCase(),
        )?.id ??
        "trials";
      const response = RESPONSES[id] ?? RESPONSES.trials;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", response },
      ]);
      setIsTyping(false);
    }, 1400);
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(draft);
  }

  return (
    <div className="chatbot-demo">
      <header className="chat-header">
        <div className="chat-header-main">
          <span className="chat-status" aria-hidden="true" />
          <div>
            <div className="chat-title">Study Assistant</div>
            <div className="chat-subtitle">Embedded in enterprise SaaS</div>
          </div>
        </div>
        <div className="chat-model">GPT-4o · Workspace</div>
      </header>

      <div className="chat-thread" ref={threadRef}>
        {messages.length === 0 && (
          <div className="chat-empty">
            <p className="chat-empty-title">Ask about your study data</p>
            <p className="chat-empty-body">
              Responses distinguish retrieved records from model interpretation.
              Low-confidence answers are surfaced explicitly.
            </p>
          </div>
        )}

        {messages.map((msg, index) =>
          msg.role === "user" ? (
            <div key={index} className="chat-msg chat-msg--user">
              <div className="chat-bubble chat-bubble--user">{msg.text}</div>
            </div>
          ) : (
            <AssistantMessage key={index} response={msg.response} />
          ),
        )}

        {isTyping && <TypingIndicator />}
      </div>

      {showPrompts && (
        <div className="chat-prompts">
          <span className="chat-prompts-label">Suggested prompts</span>
          <div className="chat-prompts-list">
            {PROMPTS.map((prompt) => (
              <button
                key={prompt.id}
                type="button"
                className="chat-prompt-btn"
                onClick={() => sendMessage(prompt.label, prompt.id)}
              >
                {prompt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <form className="chat-composer" onSubmit={handleSubmit}>
        <label htmlFor="chat-input" className="sr-only">
          Message the assistant
        </label>
        <input
          id="chat-input"
          type="text"
          className="chat-input"
          placeholder="Ask a question about your studies…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          disabled={isTyping}
          autoComplete="off"
        />
        <button
          type="submit"
          className="chat-send"
          disabled={!draft.trim() || isTyping}
        >
          Send
        </button>
      </form>

      <style>{`
        .chatbot-demo {
          --chat-surface: var(--color-paper);
          --chat-border: var(--color-line);
          font-family: var(--font-sans);
          color: var(--color-ink);
          display: flex;
          flex-direction: column;
          min-height: 520px;
          max-height: min(72vh, 640px);
          background: var(--color-background);
        }

        .chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.875rem 1.25rem;
          border-bottom: 1px solid var(--chat-border);
          background: var(--color-background);
        }

        .chat-header-main {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .chat-status {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #16a34a;
          box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.15);
          flex-shrink: 0;
        }

        .chat-title {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .chat-subtitle {
          font-size: 12px;
          color: var(--color-ink-3);
          margin-top: 0.1rem;
        }

        .chat-model {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-ink-3);
          padding: 0.35rem 0.6rem;
          border: 1px solid var(--chat-border);
          border-radius: 4px;
          white-space: nowrap;
        }

        .chat-thread {
          flex: 1;
          overflow-y: auto;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: var(--chat-surface);
        }

        .chat-empty {
          margin: auto;
          text-align: center;
          max-width: 28rem;
          padding: 1rem 0;
        }

        .chat-empty-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-variation-settings: "opsz" 24, "wght" 400;
          color: var(--color-ink);
          margin: 0 0 0.5rem;
        }

        .chat-empty-body {
          font-size: 14px;
          line-height: 1.55;
          color: var(--color-ink-2);
          margin: 0;
        }

        .chat-msg {
          display: flex;
          flex-direction: column;
          max-width: 92%;
        }

        .chat-msg--user {
          align-self: flex-end;
        }

        .chat-msg--assistant {
          align-self: flex-start;
          gap: 0.65rem;
        }

        .chat-bubble {
          font-size: 14px;
          line-height: 1.55;
          padding: 0.75rem 1rem;
          border-radius: 8px;
        }

        .chat-bubble--user {
          background: var(--color-ink);
          color: #fff;
          border-bottom-right-radius: 2px;
        }

        .chat-bubble--assistant {
          background: var(--color-background);
          border: 1px solid var(--chat-border);
          color: var(--color-ink);
          border-bottom-left-radius: 2px;
        }

        .chat-bubble--assistant strong {
          font-weight: 600;
          color: var(--color-ink);
        }

        .chat-confidence {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.35rem 0.55rem;
          border-radius: 4px;
          width: fit-content;
        }

        .chat-confidence--low {
          color: #b45309;
          background: #fffbeb;
          border: 1px solid #fde68a;
        }

        .chat-retrieved {
          background: var(--color-accent-soft);
          border: 1px solid #fecaca;
          border-radius: 6px;
          padding: 0.75rem 0.875rem;
        }

        .chat-retrieved-label,
        .chat-interpretation-label,
        .chat-prompts-label {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-ink-3);
        }

        .chat-retrieved-grid {
          margin: 0.5rem 0 0.65rem;
          display: grid;
          gap: 0.35rem;
        }

        .chat-retrieved-row {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          font-size: 13px;
        }

        .chat-retrieved-row dt {
          color: var(--color-ink-2);
        }

        .chat-retrieved-row dd {
          margin: 0;
          font-weight: 600;
          color: var(--color-ink);
        }

        .chat-citation {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--color-accent);
          letter-spacing: 0.04em;
        }

        .chat-interpretation {
          padding: 0.65rem 0.75rem;
          border: 1px dashed var(--chat-border);
          border-radius: 6px;
          background: var(--color-background);
        }

        .chat-interpretation p {
          margin: 0.35rem 0 0;
          font-size: 13px;
          line-height: 1.5;
          color: var(--color-ink-2);
        }

        .chat-actions {
          display: flex;
          gap: 0.5rem;
        }

        .chat-action-btn {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-ink-3);
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }

        .chat-action-btn:hover {
          color: var(--color-ink);
        }

        .chat-typing {
          display: flex;
          gap: 4px;
          padding: 0.75rem 1rem;
          background: var(--color-background);
          border: 1px solid var(--chat-border);
          border-radius: 8px;
          border-bottom-left-radius: 2px;
        }

        .chat-typing span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-ink-3);
          animation: chat-typing 1.2s ease-in-out infinite;
        }

        .chat-typing span:nth-child(2) { animation-delay: 0.15s; }
        .chat-typing span:nth-child(3) { animation-delay: 0.3s; }

        @keyframes chat-typing {
          0%, 80%, 100% { opacity: 0.35; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-3px); }
        }

        .chat-prompts {
          padding: 0.75rem 1.25rem 0;
          border-top: 1px solid var(--chat-border);
          background: var(--color-background);
        }

        .chat-prompts-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.5rem;
          padding-bottom: 0.75rem;
        }

        .chat-prompt-btn {
          font-family: var(--font-sans);
          font-size: 12px;
          line-height: 1.4;
          text-align: left;
          padding: 0.5rem 0.75rem;
          border-radius: 999px;
          border: 1px solid var(--chat-border);
          background: var(--color-paper);
          color: var(--color-ink-2);
          cursor: pointer;
          transition: border-color 0.15s ease, color 0.15s ease;
        }

        .chat-prompt-btn:hover {
          border-color: var(--color-ink-3);
          color: var(--color-ink);
        }

        .chat-composer {
          display: flex;
          gap: 0.5rem;
          padding: 0.875rem 1.25rem;
          border-top: 1px solid var(--chat-border);
          background: var(--color-background);
        }

        .chat-input {
          flex: 1;
          font-family: var(--font-sans);
          font-size: 14px;
          padding: 0.65rem 0.85rem;
          border: 1px solid var(--chat-border);
          border-radius: 6px;
          background: var(--color-background);
          color: var(--color-ink);
          outline: none;
        }

        .chat-input:focus {
          border-color: var(--color-ink-3);
        }

        .chat-input:disabled {
          opacity: 0.6;
        }

        .chat-send {
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 500;
          padding: 0.65rem 1rem;
          border: none;
          border-radius: 6px;
          background: var(--color-ink);
          color: #fff;
          cursor: pointer;
          transition: opacity 0.15s ease;
        }

        .chat-send:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .chat-send:not(:disabled):hover {
          opacity: 0.85;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </div>
  );
}
