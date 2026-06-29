import { useMemo, useState } from "react";

const MENU = [
  {
    category: "Pit",
    items: [
      {
        id: "brisket",
        name: "Sliced Brisket",
        desc: "Salt, pepper, post oak — no shortcuts",
        price: 18,
      },
      {
        id: "ribs",
        name: "St. Louis Ribs",
        desc: "Half rack, house rub, smoke ring included",
        price: 22,
      },
      {
        id: "sausage",
        name: "Jalapeño Cheddar Link",
        desc: "House-made, snap when you bite",
        price: 8,
      },
    ],
  },
  {
    category: "Sides",
    items: [
      {
        id: "mac",
        name: "Mac & Cheese",
        desc: "Sharp cheddar, baked to order",
        price: 6,
      },
      {
        id: "slaw",
        name: "Texas Slaw",
        desc: "Creamy, tangy, not too sweet",
        price: 5,
      },
      {
        id: "beans",
        name: "Pinto Beans",
        desc: "Smoked ham hock, slow simmered",
        price: 5,
      },
    ],
  },
];

const fmt = (n) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

export default function FoodOrderingDemo() {
  const [cart, setCart] = useState({});
  const [step, setStep] = useState("menu");

  const itemsById = useMemo(() => {
    const map = {};
    MENU.forEach((group) =>
      group.items.forEach((item) => {
        map[item.id] = item;
      }),
    );
    return map;
  }, []);

  const lines = Object.entries(cart)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => ({ ...itemsById[id], qty }));

  const total = lines.reduce((sum, line) => sum + line.price * line.qty, 0);
  const itemCount = lines.reduce((sum, line) => sum + line.qty, 0);

  function addItem(id) {
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }

  function updateQty(id, delta) {
    setCart((prev) => {
      const next = Math.max(0, (prev[id] ?? 0) + delta);
      if (next === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  }

  return (
    <div className="order-demo">
      <header className="order-header">
        <div>
          <div className="order-brand">Snyder&apos;s BBQ</div>
          <div className="order-tagline">Order online · Pickup at 5th &amp; Lamar</div>
        </div>
        <button
          type="button"
          className="order-cart-btn"
          onClick={() => setStep(step === "cart" ? "menu" : "cart")}
        >
          Cart ({itemCount})
        </button>
      </header>

      {step === "menu" && (
        <div className="order-body">
          <div className="order-menu">
            {MENU.map((group) => (
              <section key={group.category}>
                <h3 className="order-category">{group.category}</h3>
                <div className="order-items">
                  {group.items.map((item) => (
                    <article key={item.id} className="order-item">
                      <div>
                        <div className="order-item-name">{item.name}</div>
                        <div className="order-item-desc">{item.desc}</div>
                      </div>
                      <div className="order-item-actions">
                        <span className="order-price">{fmt(item.price)}</span>
                        <button
                          type="button"
                          className="order-add"
                          onClick={() => addItem(item.id)}
                        >
                          Add
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <aside className="order-sidebar">
            <div className="order-sidebar-label">Your order</div>
            {lines.length === 0 ? (
              <p className="order-empty">Add items from the menu to get started.</p>
            ) : (
              <ul className="order-lines">
                {lines.map((line) => (
                  <li key={line.id}>
                    <span>
                      {line.name} × {line.qty}
                    </span>
                    <span>{fmt(line.price * line.qty)}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="order-total-row">
              <span>Total</span>
              <strong>{fmt(total)}</strong>
            </div>
            <button
              type="button"
              className="order-checkout"
              disabled={lines.length === 0}
              onClick={() => setStep("checkout")}
            >
              Checkout
            </button>
          </aside>
        </div>
      )}

      {step === "cart" && (
        <div className="order-cart-panel">
          {lines.map((line) => (
            <div key={line.id} className="order-cart-line">
              <div>
                <div className="order-item-name">{line.name}</div>
                <div className="order-item-desc">{fmt(line.price)} each</div>
              </div>
              <div className="order-qty">
                <button type="button" onClick={() => updateQty(line.id, -1)}>
                  −
                </button>
                <span>{line.qty}</span>
                <button type="button" onClick={() => updateQty(line.id, 1)}>
                  +
                </button>
              </div>
            </div>
          ))}
          <div className="order-total-row">
            <span>Total</span>
            <strong>{fmt(total)}</strong>
          </div>
          <button
            type="button"
            className="order-checkout"
            disabled={lines.length === 0}
            onClick={() => setStep("checkout")}
          >
            Continue to checkout
          </button>
          <button
            type="button"
            className="order-back"
            onClick={() => setStep("menu")}
          >
            ← Back to menu
          </button>
        </div>
      )}

      {step === "checkout" && (
        <div className="order-checkout-panel">
          <div className="order-checkout-icon">✓</div>
          <h3 className="order-checkout-title">Order placed</h3>
          <p className="order-checkout-body">
            Pickup ready in <strong>25–35 minutes</strong>. We&apos;ll text you when
            it&apos;s at the window.
          </p>
          <div className="order-checkout-summary">
            {lines.map((line) => (
              <div key={line.id} className="order-checkout-line">
                <span>
                  {line.qty}× {line.name}
                </span>
                <span>{fmt(line.price * line.qty)}</span>
              </div>
            ))}
            <div className="order-total-row">
              <span>Total paid</span>
              <strong>{fmt(total)}</strong>
            </div>
          </div>
          <button
            type="button"
            className="order-checkout"
            onClick={() => {
              setCart({});
              setStep("menu");
            }}
          >
            Start another order
          </button>
        </div>
      )}

      <style>{`
        .order-demo {
          --bbq-ink: #1a1410;
          --bbq-cream: #f5f0e8;
          --bbq-orange: #c45c26;
          --bbq-smoke: #3d2e24;
          font-family: var(--font-sans);
          background: var(--bbq-cream);
          color: var(--bbq-ink);
          min-height: 520px;
          display: flex;
          flex-direction: column;
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: var(--bbq-ink);
          color: var(--bbq-cream);
        }

        .order-brand {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-variation-settings: "opsz" 32, "wght" 450;
          letter-spacing: -0.02em;
        }

        .order-tagline {
          font-size: 12px;
          opacity: 0.75;
          margin-top: 0.15rem;
        }

        .order-cart-btn {
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 0.45rem 0.7rem;
          border-radius: 4px;
          border: 1px solid rgba(245,240,232,0.25);
          background: transparent;
          color: var(--bbq-cream);
          cursor: pointer;
        }

        .order-body {
          display: grid;
          grid-template-columns: 1.4fr 0.8fr;
          gap: 0;
          flex: 1;
        }

        @media (max-width: 720px) {
          .order-body { grid-template-columns: 1fr; }
          .order-sidebar { border-left: none; border-top: 1px solid rgba(26,20,16,0.1); }
        }

        .order-menu {
          padding: 1rem 1.25rem 1.25rem;
          display: grid;
          gap: 1.25rem;
        }

        .order-category {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--bbq-orange);
          margin: 0 0 0.6rem;
        }

        .order-items { display: grid; gap: 0.65rem; }

        .order-item {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(26,20,16,0.08);
        }

        .order-item-name {
          font-weight: 600;
          font-size: 14px;
        }

        .order-item-desc {
          font-size: 12px;
          color: var(--bbq-smoke);
          margin-top: 0.15rem;
          opacity: 0.85;
        }

        .order-item-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.35rem;
          flex-shrink: 0;
        }

        .order-price {
          font-size: 13px;
          font-weight: 600;
        }

        .order-add {
          font-size: 12px;
          font-weight: 500;
          padding: 0.35rem 0.7rem;
          border: none;
          border-radius: 4px;
          background: var(--bbq-orange);
          color: #fff;
          cursor: pointer;
        }

        .order-sidebar {
          padding: 1rem 1.25rem;
          background: #fff;
          border-left: 1px solid rgba(26,20,16,0.08);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .order-sidebar-label {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--bbq-smoke);
        }

        .order-empty {
          font-size: 13px;
          color: var(--bbq-smoke);
          margin: 0;
          line-height: 1.5;
        }

        .order-lines {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0.45rem;
          font-size: 13px;
        }

        .order-lines li {
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .order-total-row {
          display: flex;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(26,20,16,0.1);
          font-size: 14px;
        }

        .order-checkout {
          width: 100%;
          padding: 0.7rem 1rem;
          border: none;
          border-radius: 4px;
          background: var(--bbq-ink);
          color: var(--bbq-cream);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
        }

        .order-checkout:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .order-cart-panel,
        .order-checkout-panel {
          padding: 1.25rem;
          display: grid;
          gap: 0.85rem;
          align-content: start;
          max-width: 480px;
          margin: 0 auto;
          width: 100%;
        }

        .order-cart-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          padding-bottom: 0.65rem;
          border-bottom: 1px solid rgba(26,20,16,0.08);
        }

        .order-qty {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .order-qty button {
          width: 28px;
          height: 28px;
          border: 1px solid rgba(26,20,16,0.15);
          border-radius: 4px;
          background: #fff;
          cursor: pointer;
        }

        .order-back {
          background: none;
          border: none;
          font-size: 13px;
          color: var(--bbq-smoke);
          cursor: pointer;
          text-align: left;
          padding: 0;
        }

        .order-checkout-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--bbq-orange);
          color: #fff;
          display: grid;
          place-items: center;
          font-size: 22px;
          margin: 0 auto;
        }

        .order-checkout-title {
          font-family: var(--font-serif);
          text-align: center;
          margin: 0;
          font-size: 1.5rem;
        }

        .order-checkout-body {
          text-align: center;
          font-size: 14px;
          line-height: 1.55;
          color: var(--bbq-smoke);
          margin: 0;
        }

        .order-checkout-summary {
          background: #fff;
          border: 1px solid rgba(26,20,16,0.08);
          border-radius: 6px;
          padding: 0.85rem;
          display: grid;
          gap: 0.45rem;
        }

        .order-checkout-line {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }
      `}</style>
    </div>
  );
}
