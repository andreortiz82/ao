import { useCallback, useEffect, useRef, useState } from "react";

const BREAKPOINTS = [
  { id: "mobile", label: "Mobile", min: 0, max: 479 },
  { id: "tablet", label: "Tablet", min: 480, max: 767 },
  { id: "desktop", label: "Desktop", min: 768, max: Infinity },
];

function getBreakpoint(width) {
  return (
    BREAKPOINTS.find((bp) => width >= bp.min && width <= bp.max)?.label ??
    "Desktop"
  );
}

export default function ResponsiveResizeDemo() {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(720);
  const [dragging, setDragging] = useState(false);

  const breakpoint = getBreakpoint(width);
  const isStacked = width < 560;

  const onMove = useCallback((clientX) => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    const next = Math.min(Math.max(clientX - rect.left, 280), rect.width - 16);
    setWidth(next);
  }, []);

  useEffect(() => {
    if (!dragging) return;

    function onMouseMove(e) {
      onMove(e.clientX);
    }
    function onTouchMove(e) {
      onMove(e.touches[0].clientX);
    }
    function stop() {
      setDragging(false);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
    };
  }, [dragging, onMove]);

  return (
    <div className="resize-demo">
      <div className="resize-toolbar">
        <div>
          <span className="resize-label">Viewport</span>
          <strong>{Math.round(width)}px</strong>
        </div>
        <span className="resize-bp">{breakpoint}</span>
        <span className="resize-hint">Drag the handle →</span>
      </div>

      <div className="resize-stage">
        <div
          ref={containerRef}
          className="resize-frame"
          style={{ width: `${width}px` }}
        >
          <header className="resize-app-header">
            <span className="resize-logo">◆ Product</span>
            <nav className={`resize-nav${isStacked ? " is-hidden" : ""}`}>
              <span>Overview</span>
              <span>Reports</span>
              <span>Settings</span>
            </nav>
            <button type="button" className="resize-menu-btn">
              {isStacked ? "☰" : "Account"}
            </button>
          </header>

          <div className={`resize-layout${isStacked ? " is-stacked" : ""}`}>
            <aside className="resize-sidebar">
              <div className="resize-sidebar-label">Filters</div>
              <div className="resize-filter">Active studies</div>
              <div className="resize-filter">This quarter</div>
              <div className="resize-filter">My sites</div>
            </aside>

            <main className="resize-main">
              <h3 className="resize-title">Enrollment summary</h3>
              <div className={`resize-cards${width < 420 ? " is-single" : ""}`}>
                <div className="resize-card">
                  <span className="resize-card-label">Enrolled</span>
                  <strong>312</strong>
                </div>
                <div className="resize-card">
                  <span className="resize-card-label">Screening</span>
                  <strong>48</strong>
                </div>
                <div className="resize-card">
                  <span className="resize-card-label">Conversion</span>
                  <strong>67%</strong>
                </div>
              </div>
              <div className="resize-table">
                <div className="resize-table-row resize-table-head">
                  <span>Site</span>
                  <span>Status</span>
                  {!isStacked && <span>Delta</span>}
                </div>
                {[
                  ["Site A", "On track", "+12%"],
                  ["Site B", "At risk", "-4%"],
                  ["Site C", "On track", "+3%"],
                ].map(([site, status, delta]) => (
                  <div key={site} className="resize-table-row">
                    <span>{site}</span>
                    <span>{status}</span>
                    {!isStacked && <span>{delta}</span>}
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>

        <button
          type="button"
          className="resize-handle"
          style={{ left: `${width}px` }}
          aria-label="Resize preview width"
          onMouseDown={() => setDragging(true)}
          onTouchStart={() => setDragging(true)}
        >
          <span />
        </button>
      </div>

      <style>{`
        .resize-demo {
          font-family: var(--font-sans);
          background: var(--color-background);
          min-height: 500px;
          padding: 1.25rem;
        }

        .resize-toolbar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.75rem 1rem;
          margin-bottom: 1rem;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid var(--color-line);
        }

        .resize-label {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-ink-3);
          display: block;
        }

        .resize-toolbar strong {
          font-size: 15px;
        }

        .resize-bp {
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 0.3rem 0.55rem;
          border-radius: 4px;
          background: var(--color-paper);
          border: 1px solid var(--color-line);
          color: var(--color-ink);
        }

        .resize-hint {
          margin-left: auto;
          font-size: 12px;
          color: var(--color-ink-3);
        }

        .resize-stage {
          position: relative;
          overflow: hidden;
          border: 1px solid var(--color-line);
          border-radius: 6px;
          background: var(--color-paper);
          min-height: 380px;
        }

        .resize-frame {
          max-width: 100%;
          border-right: 2px solid var(--color-ink);
          background: #fff;
          transition: width 0.05s linear;
          min-height: 380px;
        }

        .resize-app-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--color-line);
        }

        .resize-logo {
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-ink);
          white-space: nowrap;
        }

        .resize-nav {
          display: flex;
          gap: 0.75rem;
          margin-left: auto;
          font-size: 12px;
          color: var(--color-ink-2);
        }

        .resize-nav.is-hidden { display: none; }

        .resize-menu-btn {
          margin-left: auto;
          font-size: 12px;
          padding: 0.35rem 0.6rem;
          border: 1px solid var(--color-line);
          border-radius: 4px;
          background: #fff;
          cursor: default;
        }

        .resize-layout {
          display: grid;
          grid-template-columns: 160px 1fr;
          min-height: 300px;
        }

        .resize-layout.is-stacked {
          grid-template-columns: 1fr;
        }

        .resize-sidebar {
          padding: 0.85rem;
          border-right: 1px solid var(--color-line);
          background: var(--color-paper);
          display: grid;
          gap: 0.45rem;
          align-content: start;
        }

        .resize-layout.is-stacked .resize-sidebar {
          border-right: none;
          border-bottom: 1px solid var(--color-line);
          grid-template-columns: repeat(3, 1fr);
          display: grid;
        }

        .resize-sidebar-label {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-ink-3);
        }

        .resize-layout.is-stacked .resize-sidebar-label {
          grid-column: 1 / -1;
        }

        .resize-filter {
          font-size: 12px;
          padding: 0.4rem 0.55rem;
          border-radius: 4px;
          border: 1px solid var(--color-line);
          background: #fff;
          color: var(--color-ink-2);
        }

        .resize-main {
          padding: 1rem;
          display: grid;
          gap: 0.85rem;
          align-content: start;
        }

        .resize-title {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          margin: 0;
          font-variation-settings: "opsz" 24, "wght" 400;
        }

        .resize-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
        }

        .resize-cards.is-single {
          grid-template-columns: 1fr;
        }

        .resize-card {
          border: 1px solid var(--color-line);
          border-radius: 4px;
          padding: 0.6rem 0.7rem;
          background: var(--color-paper);
        }

        .resize-card-label {
          display: block;
          font-size: 10px;
          color: var(--color-ink-3);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.2rem;
        }

        .resize-card strong {
          font-size: 18px;
        }

        .resize-table {
          border: 1px solid var(--color-line);
          border-radius: 4px;
          overflow: hidden;
          font-size: 12px;
        }

        .resize-table-row {
          display: grid;
          grid-template-columns: 1fr 1fr 0.6fr;
          gap: 0.5rem;
          padding: 0.45rem 0.65rem;
          border-bottom: 1px solid var(--color-line-soft);
        }

        .resize-layout.is-stacked .resize-table-row {
          grid-template-columns: 1fr 1fr;
        }

        .resize-table-row:last-child { border-bottom: none; }

        .resize-table-head {
          background: var(--color-paper);
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-ink-3);
        }

        .resize-handle {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 14px;
          border: none;
          background: transparent;
          cursor: ew-resize;
          transform: translateX(-7px);
        }

        .resize-handle span {
          display: block;
          width: 4px;
          height: 48px;
          margin: auto;
          border-radius: 999px;
          background: var(--color-ink);
          opacity: 0.35;
        }
      `}</style>
    </div>
  );
}
