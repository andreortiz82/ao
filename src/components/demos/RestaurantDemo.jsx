import { useState, useEffect, useRef } from 'react';

// ─── Menu Data ────────────────────────────────────────────────────────────────
const MENU = {
  'Small Plates': [
    { id: 'sp1', name: 'Miso Soup Dumplings', desc: 'Pork & ginger filling, dashi consommé inside each fold, togarashi dipping sauce', price: 14 },
    { id: 'sp2', name: 'Crispy Rice with Spicy Tuna', desc: 'Sushi-grade ahi, sriracha aioli, avocado, tobiko, scallion', price: 18 },
    { id: 'sp3', name: 'Edamame Hummus & Naan', desc: 'Housemade edamame hummus, toasted sesame oil, charred naan, pickled carrots', price: 12 },
    { id: 'sp4', name: 'Wagyu Beef Tataki', desc: 'Seared A5 wagyu, ponzu gel, shaved truffle, micro shiso, fried shallots', price: 22 },
  ],
  'Mains': [
    { id: 'ma1', name: 'Stone-Grilled Salmon', desc: 'Atlantic salmon on a heated river stone, miso-citrus glaze, bok choy, jasmine rice', price: 34 },
    { id: 'ma2', name: 'Miso-Glazed Black Cod', desc: 'Three-day Nobu-style marinade, grilled eggplant, pickled daikon, yuzu beurre blanc', price: 38 },
    { id: 'ma3', name: 'Short Rib Ramen', desc: '48-hour tonkotsu broth, braised short rib, soft egg, nori, bamboo shoots, scallion', price: 29 },
    { id: 'ma4', name: 'Mushroom & Tofu Hot Pot', desc: 'Kombu dashi, king oyster mushrooms, silken tofu, glass noodles, sesame-miso paste', price: 26 },
  ],
  'Desserts': [
    { id: 'de1', name: 'Matcha Tiramisu', desc: 'Ceremonial matcha, mascarpone, ladyfingers soaked in hojicha, dark chocolate shavings', price: 12 },
    { id: 'de2', name: 'Mochi Ice Cream Trio', desc: 'Black sesame, yuzu sorbet, and toasted coconut — housemade daily', price: 10 },
    { id: 'de3', name: 'Black Sesame Cheesecake', desc: 'New York–style, black sesame swirl, gingersnap crust, raspberry-yuzu coulis', price: 13 },
  ],
  'Drinks': [
    { id: 'dr1', name: 'Yuzu Margarita', desc: 'Reposado tequila, yuzu juice, Cointreau, tajín rim', price: 16 },
    { id: 'dr2', name: 'Sake Old Fashioned', desc: 'Junmai daiginjo, rye whisky, demerara, aromatic bitters, expressed orange peel', price: 18 },
    { id: 'dr3', name: 'Sparkling Yuzu Lemonade', desc: 'Fresh yuzu, Meyer lemon, cane syrup, sparkling water — non-alcoholic', price: 8 },
    { id: 'dr4', name: 'Japanese Whisky Neat', desc: "Nikka from the Barrel, served at room temperature with a side of still water", price: 22 },
  ],
};

const MENU_CATEGORIES = Object.keys(MENU);

// ─── Helpers ──────────────────────────────────────────────────────────────────
const LS_KEY = 'miso-stone-cart';

function loadCart() {
  if (typeof localStorage === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; }
}
function saveCart(cart) {
  if (typeof localStorage !== 'undefined') localStorage.setItem(LS_KEY, JSON.stringify(cart));
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function NavBar({ activeTab, setActiveTab, cartCount, cartPulse }) {
  const tabs = ['Home', 'Menu', 'Order Online', 'Reserve', 'About'];
  return (
    <nav style={{
      background: '#1A1512',
      borderBottom: '1px solid rgba(212,168,83,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      height: '60px',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
        onClick={() => setActiveTab('Home')}>
        <span style={{ fontSize: '20px', fontWeight: 700, color: '#D4A853', letterSpacing: '-0.02em', fontFamily: 'Georgia, serif' }}>
          Miso & Stone
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: activeTab === tab ? 'rgba(212,168,83,0.15)' : 'transparent',
              border: 'none',
              color: activeTab === tab ? '#D4A853' : '#C4B99A',
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: activeTab === tab ? 600 : 400,
              transition: 'all 150ms ease-out',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {tab}
            {tab === 'Order Online' && cartCount > 0 && (
              <span style={{
                background: '#D4A853',
                color: '#1A1512',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: cartPulse ? 'scale(1.4)' : 'scale(1)',
                transition: 'transform 200ms ease-out',
              }}>
                {cartCount}
              </span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}

function HomeView({ setActiveTab }) {
  return (
    <div>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0D0B08 0%, #1A1208 30%, #2C1A0A 60%, #3D2410 100%)',
        minHeight: '420px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(212,168,83,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p style={{ color: '#D4A853', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 500 }}>
            Tonight's Featured Dish
          </p>
          <h1 style={{
            color: '#F5EDD6',
            fontSize: '48px',
            fontWeight: 700,
            fontFamily: 'Georgia, serif',
            lineHeight: 1.1,
            marginBottom: '12px',
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}>
            Miso-Glazed<br />Black Cod
          </h1>
          <p style={{ color: '#C4B99A', fontSize: '16px', marginBottom: '36px', maxWidth: '380px', lineHeight: 1.6 }}>
            Three-day marinade, grilled eggplant, pickled daikon, yuzu beurre blanc.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <HeroButton primary onClick={() => setActiveTab('Order Online')}>Order Now</HeroButton>
            <HeroButton onClick={() => setActiveTab('Reserve')}>Reserve a Table</HeroButton>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div style={{
        background: '#211B13',
        padding: '20px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        borderBottom: '1px solid rgba(212,168,83,0.15)',
      }}>
        <span style={{ color: '#D4A853', fontSize: '13px' }}>◆</span>
        <p style={{ color: '#C4B99A', fontSize: '14px', letterSpacing: '0.05em' }}>
          Japanese-American fusion, rooted in Austin
        </p>
        <span style={{ color: '#D4A853', fontSize: '13px' }}>◆</span>
      </div>

      {/* Feature callouts */}
      <div style={{
        background: '#1A1512',
        padding: '48px 40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '32px',
      }}>
        {[
          { icon: '🌿', title: 'Fresh Daily', desc: 'Every dish prepared from scratch. No freezers, no shortcuts.' },
          { icon: '🏡', title: 'Locally Sourced', desc: "We partner with 12 Texas farms and ranches within 150 miles." },
          { icon: '👨‍🍳', title: 'Family Recipes', desc: "Chef Marco's grandmother's miso is still in every bowl." },
        ].map(({ icon, title, desc }) => (
          <div key={title} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>{icon}</div>
            <h3 style={{ color: '#D4A853', fontSize: '16px', fontWeight: 600, marginBottom: '8px', fontFamily: 'Georgia, serif' }}>{title}</h3>
            <p style={{ color: '#8A7F6E', fontSize: '13px', lineHeight: 1.6 }}>{desc}</p>
          </div>
        ))}
      </div>

      {/* Hours + address bar */}
      <div style={{
        background: '#211B13',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'center',
        gap: '48px',
        flexWrap: 'wrap',
        borderTop: '1px solid rgba(212,168,83,0.1)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#D4A853', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Hours</p>
          <p style={{ color: '#C4B99A', fontSize: '13px' }}>Tue–Sun 5pm–10pm · Sat Brunch 11am–3pm</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#D4A853', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Location</p>
          <p style={{ color: '#C4B99A', fontSize: '13px' }}>2847 South Lamar Blvd, Austin, TX 78704</p>
        </div>
      </div>
    </div>
  );
}

function HeroButton({ primary, onClick, children }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: primary
          ? (hover ? '#C49843' : '#D4A853')
          : 'transparent',
        border: primary ? 'none' : '1px solid rgba(212,168,83,0.5)',
        color: primary ? '#1A1512' : (hover ? '#D4A853' : '#C4B99A'),
        padding: '12px 28px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: primary ? 700 : 500,
        cursor: 'pointer',
        transition: 'all 150ms ease-out',
        transform: hover ? 'translateY(-1px)' : 'translateY(0)',
        boxShadow: primary && hover ? '0 4px 16px rgba(212,168,83,0.3)' : 'none',
      }}
    >
      {children}
    </button>
  );
}

function MenuView({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0]);
  const [addedIds, setAddedIds] = useState({});
  const [contentVisible, setContentVisible] = useState(true);

  function switchCategory(cat) {
    setContentVisible(false);
    setTimeout(() => {
      setActiveCategory(cat);
      setContentVisible(true);
    }, 150);
  }

  function handleAdd(item) {
    onAddToCart(item);
    setAddedIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => setAddedIds(prev => ({ ...prev, [item.id]: false })), 1200);
  }

  return (
    <div style={{ background: '#1A1512', minHeight: '400px' }}>
      {/* Category tabs */}
      <div style={{
        background: '#211B13',
        borderBottom: '1px solid rgba(212,168,83,0.15)',
        padding: '0 32px',
        display: 'flex',
        gap: '4px',
      }}>
        {MENU_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => switchCategory(cat)}
            style={{
              background: activeCategory === cat ? 'rgba(212,168,83,0.15)' : 'transparent',
              border: 'none',
              borderBottom: activeCategory === cat ? '2px solid #D4A853' : '2px solid transparent',
              color: activeCategory === cat ? '#D4A853' : '#8A7F6E',
              padding: '16px 20px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: activeCategory === cat ? 600 : 400,
              transition: 'all 150ms ease-out',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items */}
      <div style={{
        padding: '32px',
        opacity: contentVisible ? 1 : 0,
        transition: 'opacity 150ms ease-out',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px',
      }}>
        {MENU[activeCategory].map(item => (
          <MenuItem key={item.id} item={item} added={addedIds[item.id]} onAdd={handleAdd} />
        ))}
      </div>
    </div>
  );
}

function MenuItem({ item, added, onAdd }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? 'rgba(212,168,83,0.06)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hover ? 'rgba(212,168,83,0.25)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: '12px',
        padding: '20px',
        transition: 'all 150ms ease-out',
        cursor: 'default',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <h4 style={{ color: '#F5EDD6', fontSize: '15px', fontWeight: 600, fontFamily: 'Georgia, serif', flex: 1, marginRight: '12px', lineHeight: 1.3 }}>
          {item.name}
        </h4>
        <span style={{
          color: hover ? '#D4A853' : '#A89060',
          fontSize: '15px',
          fontWeight: 700,
          transition: 'color 150ms ease-out',
          whiteSpace: 'nowrap',
        }}>
          ${item.price}
        </span>
      </div>
      <p style={{ color: '#8A7F6E', fontSize: '12px', lineHeight: 1.6, marginBottom: '16px' }}>
        {item.desc}
      </p>
      <AddButton added={added} onAdd={() => onAdd(item)} />
    </div>
  );
}

function AddButton({ added, onAdd }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onAdd}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: added ? 'rgba(74,190,100,0.15)' : (hover ? 'rgba(212,168,83,0.2)' : 'rgba(212,168,83,0.1)'),
        border: `1px solid ${added ? 'rgba(74,190,100,0.4)' : 'rgba(212,168,83,0.3)'}`,
        color: added ? '#4ABE64' : '#D4A853',
        padding: '7px 16px',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 150ms ease-out',
        width: '100%',
        transform: added ? 'scale(0.98)' : 'scale(1)',
      }}
    >
      {added ? '✓ Added' : '+ Add to Order'}
    </button>
  );
}

function OrderView({ cart, onRemove, onClearCart }) {
  const [orderType, setOrderType] = useState('pickup');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('idle'); // idle | loading | success
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = +(subtotal * 0.0825).toFixed(2);

  function handlePlaceOrder() {
    setState('loading');
    setTimeout(() => {
      setState('success');
      onClearCart();
    }, 1600);
  }

  if (state === 'success') {
    return (
      <div style={{
        background: '#1A1512',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 40px',
        textAlign: 'center',
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          background: 'rgba(74,190,100,0.15)',
          border: '2px solid #4ABE64',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          marginBottom: '24px',
          animation: 'popIn 300ms ease-out',
        }}>✓</div>
        <h2 style={{ color: '#F5EDD6', fontSize: '28px', fontFamily: 'Georgia, serif', marginBottom: '12px' }}>
          Order Received!
        </h2>
        <p style={{ color: '#8A7F6E', fontSize: '14px', lineHeight: 1.7, maxWidth: '320px' }}>
          We'll have your order ready in about 25–35 minutes. You'll get a text when it's ready — or just follow your nose.
        </p>
        <p style={{ color: '#D4A853', fontSize: '13px', marginTop: '20px' }}>
          Order #MS-{Math.floor(Math.random() * 9000) + 1000}
        </p>
      </div>
    );
  }

  return (
    <div style={{ background: '#1A1512', minHeight: '400px', padding: '32px' }}>
      <h2 style={{ color: '#D4A853', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px', fontWeight: 600 }}>
        Your Order
      </h2>

      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <p style={{ fontSize: '32px', marginBottom: '16px' }}>🍜</p>
          <p style={{ color: '#8A7F6E', fontSize: '14px' }}>Your cart is empty. Head to the Menu tab to start your order.</p>
        </div>
      ) : (
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          {/* Cart items */}
          <div style={{ marginBottom: '24px' }}>
            {cart.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{ flex: 1 }}>
                  <p style={{ color: '#F5EDD6', fontSize: '14px', fontWeight: 500 }}>{item.name}</p>
                  <p style={{ color: '#8A7F6E', fontSize: '12px' }}>Qty: {item.qty}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ color: '#D4A853', fontSize: '14px', fontWeight: 600 }}>${(item.price * item.qty).toFixed(2)}</span>
                  <button
                    onClick={() => onRemove(item.id)}
                    style={{
                      background: 'rgba(255,80,80,0.1)',
                      border: '1px solid rgba(255,80,80,0.2)',
                      color: '#FF6060',
                      borderRadius: '4px',
                      width: '24px',
                      height: '24px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0,
                    }}
                  >×</button>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div style={{ padding: '16px 0', borderBottom: '1px solid rgba(212,168,83,0.2)', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#8A7F6E', fontSize: '13px' }}>Subtotal</span>
              <span style={{ color: '#C4B99A', fontSize: '13px' }}>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#8A7F6E', fontSize: '13px' }}>Tax (8.25%)</span>
              <span style={{ color: '#C4B99A', fontSize: '13px' }}>${tax}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
              <span style={{ color: '#F5EDD6', fontSize: '15px', fontWeight: 700 }}>Total</span>
              <span style={{ color: '#D4A853', fontSize: '15px', fontWeight: 700 }}>${(subtotal + tax).toFixed(2)}</span>
            </div>
          </div>

          {/* Pickup / Delivery toggle */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: '#8A7F6E', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>Order Type</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['pickup', 'delivery'].map(type => (
                <button
                  key={type}
                  onClick={() => setOrderType(type)}
                  style={{
                    flex: 1,
                    background: orderType === type ? 'rgba(212,168,83,0.15)' : 'transparent',
                    border: `1px solid ${orderType === type ? '#D4A853' : 'rgba(255,255,255,0.1)'}`,
                    color: orderType === type ? '#D4A853' : '#8A7F6E',
                    padding: '10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: orderType === type ? 600 : 400,
                    textTransform: 'capitalize',
                    transition: 'all 150ms ease-out',
                  }}
                >
                  {type === 'pickup' ? '🏃 Pickup' : '🛵 Delivery'}
                </button>
              ))}
            </div>
          </div>

          {/* Address (delivery only) */}
          {orderType === 'delivery' && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{ color: '#8A7F6E', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Delivery Address</p>
              <input
                type="text"
                placeholder="123 Main St, Austin, TX"
                value={address}
                onChange={e => setAddress(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#F5EDD6',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          )}

          {/* Place order */}
          <button
            onClick={handlePlaceOrder}
            disabled={state === 'loading'}
            style={{
              width: '100%',
              background: state === 'loading' ? 'rgba(212,168,83,0.5)' : '#D4A853',
              border: 'none',
              color: '#1A1512',
              padding: '14px',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: state === 'loading' ? 'wait' : 'pointer',
              transition: 'all 150ms ease-out',
            }}
          >
            {state === 'loading' ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      )}
    </div>
  );
}

function ReserveView() {
  const [form, setForm] = useState({ name: '', size: '2', date: '', time: '7pm', requests: '' });
  const [state, setState] = useState('idle');

  function handleSubmit(e) {
    e.preventDefault();
    setState('loading');
    setTimeout(() => setState('success'), 1400);
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#F5EDD6',
    fontSize: '13px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    color: '#8A7F6E',
    fontSize: '11px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '6px',
    display: 'block',
  };

  if (state === 'success') {
    return (
      <div style={{
        background: '#1A1512',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 40px',
        textAlign: 'center',
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          background: 'rgba(212,168,83,0.15)',
          border: '2px solid #D4A853',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '30px',
          marginBottom: '24px',
        }}>🥢</div>
        <h2 style={{ color: '#F5EDD6', fontSize: '26px', fontFamily: 'Georgia, serif', marginBottom: '12px' }}>
          Reservation Requested
        </h2>
        <p style={{ color: '#8A7F6E', fontSize: '14px', lineHeight: 1.7, maxWidth: '320px' }}>
          Thanks, {form.name || 'friend'}! We'll confirm your table for {form.size} at {form.time} by text or email within a few hours.
        </p>
        <button
          onClick={() => setState('idle')}
          style={{
            marginTop: '24px',
            background: 'transparent',
            border: '1px solid rgba(212,168,83,0.3)',
            color: '#D4A853',
            padding: '8px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13px',
          }}
        >
          Make another reservation
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: '#1A1512', minHeight: '400px', padding: '32px' }}>
      <h2 style={{ color: '#D4A853', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px', fontWeight: 600 }}>
        Reserve a Table
      </h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div>
          <label style={labelStyle}>Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            style={inputStyle}
            required
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={labelStyle}>Party Size</label>
            <select
              value={form.size}
              onChange={e => setForm(p => ({ ...p, size: e.target.value }))}
              style={{ ...inputStyle, cursor: 'pointer' }}
            >
              {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n} style={{ background: '#211B13' }}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Time</label>
            <select
              value={form.time}
              onChange={e => setForm(p => ({ ...p, time: e.target.value }))}
              style={{ ...inputStyle, cursor: 'pointer' }}
            >
              {['5pm', '6pm', '7pm', '8pm', '9pm'].map(t => <option key={t} value={t} style={{ background: '#211B13' }}>{t}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label style={labelStyle}>Date</label>
          <input
            type="date"
            value={form.date}
            onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
            style={{ ...inputStyle, colorScheme: 'dark' }}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Special Requests</label>
          <textarea
            placeholder="Allergies, celebrations, seating preferences..."
            value={form.requests}
            onChange={e => setForm(p => ({ ...p, requests: e.target.value }))}
            rows={3}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
          />
        </div>
        <button
          type="submit"
          disabled={state === 'loading'}
          style={{
            background: state === 'loading' ? 'rgba(212,168,83,0.5)' : '#D4A853',
            border: 'none',
            color: '#1A1512',
            padding: '14px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 700,
            cursor: state === 'loading' ? 'wait' : 'pointer',
            transition: 'all 150ms ease-out',
          }}
        >
          {state === 'loading' ? 'Requesting...' : 'Request Reservation'}
        </button>
      </form>
    </div>
  );
}

function AboutView() {
  return (
    <div style={{ background: '#1A1512', minHeight: '400px', padding: '48px 40px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <h2 style={{ color: '#D4A853', fontSize: '28px', fontFamily: 'Georgia, serif', marginBottom: '32px', fontWeight: 400 }}>
          Our Story
        </h2>
        <div style={{ color: '#C4B99A', fontSize: '14px', lineHeight: 1.9, display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '48px' }}>
          <p>
            Miso & Stone was born out of a long layover in Tokyo and a recurring dream about Texas barbecue. Chef Marco Tanaka spent a decade cooking traditional Japanese cuisine in the Shinjuku district before a family move brought him back to Austin, where he grew up eating brisket at Franklin and fishing the Colorado River with his grandfather.
          </p>
          <p>
            The restaurant opened in 2019 with a simple goal: to cook the food that Marco actually wanted to eat — the kind that exists nowhere else because no one else has lived exactly this combination of places. Japanese precision applied to Texas ingredients. Dashi made from Hill Country springs. Wagyu raised an hour west of here.
          </p>
          <p>
            We're a small team and we like it that way. Every dish on this menu has been made by someone who cares about it. We hope that comes through. If it doesn't, come back and we'll try harder.
          </p>
        </div>

        {/* Team */}
        <h3 style={{ color: '#D4A853', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px', fontWeight: 600 }}>
          The Team
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[
            { name: 'Marco Tanaka', role: 'Executive Chef & Co-owner', note: 'Tokyo-trained. Austin-grown. Obsessed with ramen balance.' },
            { name: 'Elena Reyes', role: 'General Manager & Co-owner', note: 'Hospitality veteran. The reason every table feels taken care of.' },
          ].map(({ name, role, note }) => (
            <div key={name} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px',
              padding: '20px',
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(212,168,83,0.3) 0%, rgba(212,168,83,0.1) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                marginBottom: '12px',
              }}>
                {name[0]}
              </div>
              <p style={{ color: '#F5EDD6', fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>{name}</p>
              <p style={{ color: '#D4A853', fontSize: '11px', marginBottom: '8px', letterSpacing: '0.03em' }}>{role}</p>
              <p style={{ color: '#8A7F6E', fontSize: '12px', lineHeight: 1.5 }}>{note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RestaurantDemo() {
  const [activeTab, setActiveTab] = useState('Home');
  const [cart, setCart] = useState([]);
  const [cartPulse, setCartPulse] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const prevTab = useRef(activeTab);

  // Load cart from localStorage
  useEffect(() => {
    setCart(loadCart());
  }, []);

  // Persist cart
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  function switchTab(tab) {
    if (tab === activeTab) return;
    setContentVisible(false);
    setTimeout(() => {
      prevTab.current = tab;
      setActiveTab(tab);
      setContentVisible(true);
    }, 150);
  }

  function addToCart(item) {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
    setCartPulse(true);
    setTimeout(() => setCartPulse(false), 300);
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const renderView = () => {
    switch (activeTab) {
      case 'Home': return <HomeView setActiveTab={switchTab} />;
      case 'Menu': return <MenuView onAddToCart={addToCart} />;
      case 'Order Online': return <OrderView cart={cart} onRemove={removeFromCart} onClearCart={clearCart} />;
      case 'Reserve': return <ReserveView />;
      case 'About': return <AboutView />;
      default: return null;
    }
  };

  return (
    <div style={{
      border: '1px solid rgba(212,168,83,0.2)',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
      marginTop: '32px',
      marginBottom: '32px',
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      background: '#1A1512',
    }}>
      {/* Browser chrome */}
      <div style={{
        background: '#0D0B08',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E', display: 'inline-block' }} />
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28CA41', display: 'inline-block' }} />
        <div style={{
          flex: 1,
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '6px',
          padding: '5px 12px',
          fontSize: '11px',
          color: '#8A7F6E',
          marginLeft: '8px',
          fontFamily: 'monospace',
        }}>
          misoandstoneatx.com
        </div>
      </div>

      <NavBar activeTab={activeTab} setActiveTab={switchTab} cartCount={cartCount} cartPulse={cartPulse} />

      <div style={{ opacity: contentVisible ? 1 : 0, transition: 'opacity 150ms ease-out' }}>
        {renderView()}
      </div>
    </div>
  );
}
