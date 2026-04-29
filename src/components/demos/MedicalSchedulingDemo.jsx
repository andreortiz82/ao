"use client";

import { useState, useEffect, useRef } from "react";
import { faker } from "@faker-js/faker";

// ─── Styles injected once ────────────────────────────────────────────────────
const STYLES = `
@keyframes slideInFromRight {
  from { transform: translateX(40px); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}
@keyframes slideOutToLeft {
  from { transform: translateX(0);    opacity: 1; }
  to   { transform: translateX(-40px); opacity: 0; }
}
@keyframes popIn {
  0%   { transform: scale(1);   }
  50%  { transform: scale(1.1); }
  100% { transform: scale(1.0); }
}
@keyframes bounce {
  0%, 100% { transform: scale(1);    }
  40%       { transform: scale(1.12); }
  70%       { transform: scale(0.95); }
}
@keyframes shake {
  0%, 100% { transform: translateX(0);   }
  20%       { transform: translateX(-8px); }
  40%       { transform: translateX(8px);  }
  60%       { transform: translateX(-6px); }
  80%       { transform: translateX(6px);  }
}
@keyframes fadeOut {
  from { opacity: 1; max-height: 120px; }
  to   { opacity: 0; max-height: 0;     }
}
@keyframes checkDraw {
  from { stroke-dashoffset: 60; }
  to   { stroke-dashoffset: 0;  }
}
@keyframes checkCircle {
  from { stroke-dashoffset: 188; }
  to   { stroke-dashoffset: 0;   }
}
.pb-slide-in  { animation: slideInFromRight 0.25s ease-out forwards; }
.pb-pop       { animation: popIn 0.15s ease-out; }
.pb-bounce    { animation: bounce 0.3s ease-out; }
.pb-shaking   { animation: shake 0.4s ease-out; }
.pb-fading    { animation: fadeOut 0.4s ease-out forwards; overflow: hidden; }
.pb-field:focus {
  outline: none;
  border-color: #2563EB !important;
  box-shadow: 0 0 0 3px rgba(37,99,235,0.2);
}
`;

// ─── Constants ───────────────────────────────────────────────────────────────
const PROVIDERS = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    specialty: "Family Medicine",
    avail: "Available today",
    availColor: "#16A34A",
    availBg: "#F0FDF4",
  },
  {
    id: 2,
    name: "Dr. Marcus Webb",
    specialty: "Internal Medicine",
    avail: "Next available: Tomorrow",
    availColor: "#D97706",
    availBg: "#FFFBEB",
  },
  {
    id: 3,
    name: "Dr. Priya Nair",
    specialty: "Pediatrics",
    avail: "Available today",
    availColor: "#16A34A",
    availBg: "#F0FDF4",
  },
];
const MORNING_SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM"];
const AFTERNOON_SLOTS = ["2:00 PM", "3:00 PM", "4:00 PM"];
const INSURANCE_OPTIONS = [
  "Blue Cross Blue Shield",
  "Aetna",
  "United Healthcare",
  "Cigna",
  "Self-pay",
];
const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function isWeekend(date) {
  const d = date.getDay();
  return d === 0 || d === 6;
}

function isAvailableDay(date, today) {
  if (date < new Date(today.getFullYear(), today.getMonth(), today.getDate()))
    return false;
  if (isWeekend(date)) return Math.random() > 0.8; // 20% weekends available
  return true;
}

function buildCalendarData(year, month, today) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    cells.push({ date, available: isAvailableDay(date, today) });
  }
  return cells;
}

function formatDate(date) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function isSameDay(a, b) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// ─── Subcomponents ───────────────────────────────────────────────────────────

function StepIndicator({ current, total }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background:
                i + 1 === current
                  ? "#2563EB"
                  : i + 1 < current
                    ? "#2563EB"
                    : "#E5E7EB",
              color: i + 1 <= current ? "#fff" : "#9CA3AF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 600,
              transition: "all 0.2s ease-out",
            }}
          >
            {i + 1 < current ? "✓" : i + 1}
          </div>
          {i < total - 1 && (
            <div
              style={{
                width: 24,
                height: 2,
                background: i + 1 < current ? "#2563EB" : "#E5E7EB",
                transition: "background 0.3s",
              }}
            />
          )}
        </div>
      ))}
      <span
        style={{
          marginLeft: 8,
          fontSize: 13,
          color: "#6B7280",
          fontWeight: 500,
        }}
      >
        Step {current} of {total}
      </span>
    </div>
  );
}

function ProviderCard({ provider, selected, onSelect }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Select ${provider.name}, ${provider.specialty}, ${provider.avail}`}
      aria-pressed={selected}
      onClick={() => onSelect(provider)}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && onSelect(provider)
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: selected
          ? "2px solid #2563EB"
          : hovered
            ? "2px solid #93C5FD"
            : "2px solid #E5E7EB",
        borderRadius: 12,
        padding: "16px 20px",
        cursor: "pointer",
        background: selected ? "#EFF6FF" : hovered ? "#F8FAFF" : "#fff",
        transform: selected
          ? "scale(1.02)"
          : hovered
            ? "scale(1.01)"
            : "scale(1)",
        transition: "all 0.15s ease-out",
        display: "flex",
        alignItems: "center",
        gap: 16,
        position: "relative",
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: selected ? "#2563EB" : "#DBEAFE",
          color: selected ? "#fff" : "#2563EB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: 16,
          flexShrink: 0,
          transition: "all 0.2s",
        }}
      >
        {getInitials(provider.name)}
      </div>
      {/* Info */}
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, color: "#111827", fontSize: 15 }}>
          {provider.name}
        </div>
        <div style={{ color: "#6B7280", fontSize: 13, marginTop: 2 }}>
          {provider.specialty}
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            marginTop: 6,
            padding: "2px 10px",
            borderRadius: 20,
            background: provider.availBg,
            color: provider.availColor,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: provider.availColor,
              display: "inline-block",
            }}
          />
          {provider.avail}
        </div>
      </div>
      {/* Check icon when selected */}
      {selected && (
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "#2563EB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2.5 7L5.5 10L11.5 4"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

function CalendarView({
  selectedDate,
  onSelectDate,
  calendarData,
  today,
  year,
  month,
}) {
  const [animKey, setAnimKey] = useState(null);

  function handleSelect(cell) {
    if (!cell || !cell.available) return;
    setAnimKey(cell.date.toISOString());
    onSelectDate(cell.date);
  }

  return (
    <div style={{ userSelect: "none" }}>
      {/* Day headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 2,
          marginBottom: 4,
        }}
      >
        {DAYS_OF_WEEK.map((d) => (
          <div
            key={d}
            style={{
              textAlign: "center",
              fontSize: 12,
              fontWeight: 600,
              color: "#9CA3AF",
              padding: "4px 0",
            }}
          >
            {d}
          </div>
        ))}
      </div>
      {/* Day cells */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 4,
        }}
      >
        {calendarData.map((cell, i) => {
          if (!cell) return <div key={`empty-${i}`} />;
          const isToday = isSameDay(cell.date, today);
          const isSelected = isSameDay(cell.date, selectedDate);
          const isPop = animKey === cell.date.toISOString();
          return (
            <div
              key={cell.date.toISOString()}
              role={cell.available ? "button" : undefined}
              tabIndex={cell.available ? 0 : -1}
              aria-label={
                cell.available
                  ? `Select ${formatDate(cell.date)}`
                  : `${formatDate(cell.date)}, unavailable`
              }
              aria-pressed={isSelected}
              onClick={() => handleSelect(cell)}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && handleSelect(cell)
              }
              onAnimationEnd={() => setAnimKey(null)}
              className={isPop ? "pb-pop" : ""}
              style={{
                aspectRatio: "1",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: isToday ? 700 : 400,
                cursor: cell.available ? "pointer" : "default",
                background: isSelected
                  ? "#2563EB"
                  : cell.available
                    ? "#EFF6FF"
                    : "transparent",
                color: isSelected
                  ? "#fff"
                  : !cell.available
                    ? "#D1D5DB"
                    : "#111827",
                border: isToday ? "2px solid #2563EB" : "2px solid transparent",
                boxSizing: "border-box",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {cell.date.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CheckmarkAnimation() {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden="true"
    >
      <style>{`
        .check-circle { stroke-dasharray: 188; animation: checkCircle 0.5s ease-out forwards; }
        .check-mark   { stroke-dasharray: 60;  animation: checkDraw  0.4s 0.4s ease-out forwards; stroke-dashoffset: 60; }
      `}</style>
      <circle
        className="check-circle"
        cx="36"
        cy="36"
        r="30"
        stroke="#16A34A"
        strokeWidth="3"
        fill="#F0FDF4"
        strokeLinecap="round"
      />
      <path
        className="check-mark"
        d="M22 36L31 45L50 27"
        stroke="#16A34A"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Steps ───────────────────────────────────────────────────────────────────

function Step1({ onNext }) {
  const [selected, setSelected] = useState(null);

  function handleSelect(provider) {
    setSelected(provider);
    setTimeout(() => onNext(provider), 350);
  }

  return (
    <div className="pb-slide-in">
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#111827",
          marginBottom: 4,
        }}
      >
        Choose your provider
      </h2>
      <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 24 }}>
        Select the doctor you'd like to see
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {PROVIDERS.map((p) => (
          <ProviderCard
            key={p.id}
            provider={p}
            selected={selected?.id === p.id}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}

function Step2({ provider, onNext, onBack }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slotAnim, setSlotAnim] = useState(null);

  // Stable calendar data — regenerate when month changes
  const [calendarData, setCalendarData] = useState(() =>
    buildCalendarData(viewYear, viewMonth, today),
  );

  useEffect(() => {
    setCalendarData(buildCalendarData(viewYear, viewMonth, today));
    setSelectedDate(null);
    setSelectedSlot(null);
  }, [viewYear, viewMonth]);

  function prevMonth() {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else setViewMonth((m) => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else setViewMonth((m) => m + 1);
  }

  function handleSlotSelect(slot) {
    setSlotAnim(slot);
    setSelectedSlot(slot);
    setTimeout(() => setSlotAnim(null), 300);
  }

  const allSlots = [...MORNING_SLOTS, ...AFTERNOON_SLOTS];

  return (
    <div className="pb-slide-in">
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#111827",
          marginBottom: 4,
        }}
      >
        Pick a date & time
      </h2>
      <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 24 }}>
        Booking with{" "}
        <strong style={{ color: "#2563EB" }}>{provider.name}</strong>
      </p>

      {/* Calendar header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <button
          onClick={prevMonth}
          aria-label="Previous month"
          style={{
            background: "none",
            border: "1px solid #E5E7EB",
            borderRadius: 8,
            width: 36,
            height: 36,
            cursor: "pointer",
            fontSize: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ‹
        </button>
        <span style={{ fontWeight: 600, fontSize: 16, color: "#111827" }}>
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          aria-label="Next month"
          style={{
            background: "none",
            border: "1px solid #E5E7EB",
            borderRadius: 8,
            width: 36,
            height: 36,
            cursor: "pointer",
            fontSize: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ›
        </button>
      </div>

      <CalendarView
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        calendarData={calendarData}
        today={today}
        year={viewYear}
        month={viewMonth}
      />

      {/* Time slots */}
      {selectedDate && (
        <div style={{ marginTop: 20 }} className="pb-slide-in">
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#374151",
              marginBottom: 10,
            }}
          >
            Available times for{" "}
            {selectedDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </div>
          <div
            style={{
              marginBottom: 8,
              fontSize: 12,
              color: "#9CA3AF",
              fontWeight: 500,
            }}
          >
            MORNING
          </div>
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 12,
            }}
          >
            {MORNING_SLOTS.map((slot) => (
              <button
                key={slot}
                aria-label={`Select ${slot}`}
                aria-pressed={selectedSlot === slot}
                onClick={() => handleSlotSelect(slot)}
                className={slotAnim === slot ? "pb-bounce" : ""}
                style={{
                  padding: "8px 16px",
                  borderRadius: 20,
                  border: "none",
                  cursor: "pointer",
                  background: selectedSlot === slot ? "#2563EB" : "#EFF6FF",
                  color: selectedSlot === slot ? "#fff" : "#2563EB",
                  fontWeight: 600,
                  fontSize: 13,
                  transition: "all 0.15s ease-out",
                }}
              >
                {slot}
              </button>
            ))}
          </div>
          <div
            style={{
              marginBottom: 8,
              fontSize: 12,
              color: "#9CA3AF",
              fontWeight: 500,
            }}
          >
            AFTERNOON
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {AFTERNOON_SLOTS.map((slot) => (
              <button
                key={slot}
                aria-label={`Select ${slot}`}
                aria-pressed={selectedSlot === slot}
                onClick={() => handleSlotSelect(slot)}
                className={slotAnim === slot ? "pb-bounce" : ""}
                style={{
                  padding: "8px 16px",
                  borderRadius: 20,
                  border: "none",
                  cursor: "pointer",
                  background: selectedSlot === slot ? "#2563EB" : "#EFF6FF",
                  color: selectedSlot === slot ? "#fff" : "#2563EB",
                  fontWeight: 600,
                  fontSize: 13,
                  transition: "all 0.15s ease-out",
                }}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
        <button
          onClick={onBack}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "1px solid #E5E7EB",
            background: "#fff",
            cursor: "pointer",
            color: "#374151",
            fontWeight: 500,
          }}
        >
          ← Back
        </button>
        <button
          onClick={() =>
            selectedDate &&
            selectedSlot &&
            onNext({ date: selectedDate, slot: selectedSlot })
          }
          disabled={!selectedDate || !selectedSlot}
          style={{
            flex: 1,
            padding: "10px 20px",
            borderRadius: 8,
            border: "none",
            cursor: selectedDate && selectedSlot ? "pointer" : "not-allowed",
            background: selectedDate && selectedSlot ? "#2563EB" : "#E5E7EB",
            color: selectedDate && selectedSlot ? "#fff" : "#9CA3AF",
            fontWeight: 600,
            transition: "all 0.15s",
          }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}

function Step3({ provider, dateTime, onNext, onBack }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
    email: "",
    reason: "",
    insurance: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Pre-fill with fake data
    const birthDate = faker.date.birthdate({ min: 18, max: 75, mode: "age" });
    const dobStr = `${String(birthDate.getMonth() + 1).padStart(2, "0")}/${String(birthDate.getDate()).padStart(2, "0")}/${birthDate.getFullYear()}`;
    setForm({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dob: dobStr,
      phone: faker.phone.number("(###) ###-####"),
      email: faker.internet.email().toLowerCase(),
      reason: faker.helpers.arrayElement([
        "Annual physical / wellness exam",
        "Follow-up on recent lab results",
        "Persistent cough for 2 weeks",
        "Medication refill request",
        "New patient consultation",
      ]),
      insurance: faker.helpers.arrayElement(INSURANCE_OPTIONS),
    });
  }, []);

  function validate() {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.dob.trim()) e.dob = "Required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.email.trim()) e.email = "Required";
    if (!form.reason.trim()) e.reason = "Required";
    if (!form.insurance) e.insurance = "Required";
    return e;
  }

  function handleSubmit() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) onNext(form);
  }

  const fieldStyle = (name) => ({
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: errors[name] ? "1.5px solid #EF4444" : "1.5px solid #E5E7EB",
    fontSize: 14,
    color: "#111827",
    background: "#fff",
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
  });
  const labelStyle = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 4,
  };
  const errorStyle = { fontSize: 12, color: "#EF4444", marginTop: 3 };

  return (
    <div className="pb-slide-in">
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#111827",
          marginBottom: 4,
        }}
      >
        Your details
      </h2>
      <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 20 }}>
        We've pre-filled what we can. Double-check before continuing.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px 16px",
        }}
      >
        <div>
          <label htmlFor="pb-firstName" style={labelStyle}>
            First Name
          </label>
          <input
            id="pb-firstName"
            className="pb-field"
            aria-required="true"
            aria-invalid={!!errors.firstName}
            value={form.firstName}
            onChange={(e) =>
              setForm((f) => ({ ...f, firstName: e.target.value }))
            }
            style={fieldStyle("firstName")}
          />
          {errors.firstName && (
            <div style={errorStyle} role="alert">
              {errors.firstName}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="pb-lastName" style={labelStyle}>
            Last Name
          </label>
          <input
            id="pb-lastName"
            className="pb-field"
            aria-required="true"
            aria-invalid={!!errors.lastName}
            value={form.lastName}
            onChange={(e) =>
              setForm((f) => ({ ...f, lastName: e.target.value }))
            }
            style={fieldStyle("lastName")}
          />
          {errors.lastName && (
            <div style={errorStyle} role="alert">
              {errors.lastName}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="pb-dob" style={labelStyle}>
            Date of Birth
          </label>
          <input
            id="pb-dob"
            className="pb-field"
            placeholder="MM/DD/YYYY"
            aria-required="true"
            aria-invalid={!!errors.dob}
            value={form.dob}
            onChange={(e) => setForm((f) => ({ ...f, dob: e.target.value }))}
            style={fieldStyle("dob")}
          />
          {errors.dob && (
            <div style={errorStyle} role="alert">
              {errors.dob}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="pb-phone" style={labelStyle}>
            Phone Number
          </label>
          <input
            id="pb-phone"
            className="pb-field"
            type="tel"
            aria-required="true"
            aria-invalid={!!errors.phone}
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            style={fieldStyle("phone")}
          />
          {errors.phone && (
            <div style={errorStyle} role="alert">
              {errors.phone}
            </div>
          )}
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="pb-email" style={labelStyle}>
            Email Address
          </label>
          <input
            id="pb-email"
            className="pb-field"
            type="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            style={fieldStyle("email")}
          />
          {errors.email && (
            <div style={errorStyle} role="alert">
              {errors.email}
            </div>
          )}
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="pb-reason" style={labelStyle}>
            Reason for Visit
          </label>
          <textarea
            id="pb-reason"
            className="pb-field"
            rows={3}
            aria-required="true"
            aria-invalid={!!errors.reason}
            value={form.reason}
            onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
            style={{
              ...fieldStyle("reason"),
              resize: "vertical",
              fontFamily: "inherit",
            }}
          />
          {errors.reason && (
            <div style={errorStyle} role="alert">
              {errors.reason}
            </div>
          )}
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="pb-insurance" style={labelStyle}>
            Insurance Provider
          </label>
          <select
            id="pb-insurance"
            className="pb-field"
            aria-required="true"
            aria-invalid={!!errors.insurance}
            value={form.insurance}
            onChange={(e) =>
              setForm((f) => ({ ...f, insurance: e.target.value }))
            }
            style={{ ...fieldStyle("insurance"), appearance: "auto" }}
          >
            <option value="">Select insurance...</option>
            {INSURANCE_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {errors.insurance && (
            <div style={errorStyle} role="alert">
              {errors.insurance}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
        <button
          onClick={onBack}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "1px solid #E5E7EB",
            background: "#fff",
            cursor: "pointer",
            color: "#374151",
            fontWeight: 500,
          }}
        >
          ← Back
        </button>
        <button
          onClick={handleSubmit}
          style={{
            flex: 1,
            padding: "10px 20px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            background: "#2563EB",
            color: "#fff",
            fontWeight: 600,
          }}
        >
          Review Appointment →
        </button>
      </div>
    </div>
  );
}

function Step4({ provider, dateTime, patient, onConfirm, onBack }) {
  const [confirmed, setConfirmed] = useState(false);
  const [confCode] = useState(() => faker.string.alphanumeric(8).toUpperCase());
  const [calTooltip, setCalTooltip] = useState(false);

  function handleConfirm() {
    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem("pb_bookings") || "[]");
      existing.push({
        id: confCode,
        provider: provider.name,
        specialty: provider.specialty,
        date: dateTime.date.toISOString(),
        slot: dateTime.slot,
        patient: `${patient.firstName} ${patient.lastName}`,
        confCode,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem("pb_bookings", JSON.stringify(existing));
    } catch (_) {}
    setConfirmed(true);
    onConfirm();
  }

  if (confirmed) {
    return (
      <div
        className="pb-slide-in"
        style={{ textAlign: "center", padding: "24px 0" }}
      >
        <CheckmarkAnimation />
        <h2
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "#111827",
            marginTop: 16,
          }}
        >
          You're booked!
        </h2>
        <p
          style={{
            color: "#6B7280",
            fontSize: 14,
            marginTop: 8,
            marginBottom: 24,
          }}
        >
          A confirmation has been sent to {patient.email}
        </p>
        <div
          style={{
            background: "#F0FDF4",
            border: "1px solid #BBF7D0",
            borderRadius: 12,
            padding: "16px 24px",
            display: "inline-block",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: "#16A34A",
              fontWeight: 600,
              marginBottom: 4,
            }}
          >
            CONFIRMATION CODE
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#15803D",
              letterSpacing: 2,
            }}
          >
            {confCode}
          </div>
        </div>
        <div
          style={{
            background: "#F9FAFB",
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
            textAlign: "left",
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "#6B7280",
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            APPOINTMENT SUMMARY
          </div>
          <div style={{ fontSize: 14, color: "#111827" }}>
            <strong>{provider.name}</strong> · {provider.specialty}
          </div>
          <div style={{ fontSize: 14, color: "#374151", marginTop: 4 }}>
            {formatDate(dateTime.date)} at {dateTime.slot}
          </div>
          <div style={{ fontSize: 14, color: "#374151", marginTop: 4 }}>
            Patient: {patient.firstName} {patient.lastName}
          </div>
        </div>
        <div style={{ position: "relative", display: "inline-block" }}>
          <button
            onMouseEnter={() => setCalTooltip(true)}
            onMouseLeave={() => setCalTooltip(false)}
            onFocus={() => setCalTooltip(true)}
            onBlur={() => setCalTooltip(false)}
            style={{
              padding: "10px 24px",
              borderRadius: 8,
              border: "1px solid #E5E7EB",
              background: "#fff",
              cursor: "pointer",
              fontWeight: 600,
              color: "#374151",
              fontSize: 14,
            }}
            aria-label="Add to calendar (coming soon)"
          >
            📅 Add to Calendar
          </button>
          {calTooltip && (
            <div
              role="tooltip"
              style={{
                position: "absolute",
                bottom: "110%",
                left: "50%",
                transform: "translateX(-50%)",
                background: "#1F2937",
                color: "#fff",
                fontSize: 12,
                padding: "6px 12px",
                borderRadius: 6,
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}
            >
              Calendar integration coming soon
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="pb-slide-in">
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#111827",
          marginBottom: 4,
        }}
      >
        Review your appointment
      </h2>
      <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 20 }}>
        Everything look right? Confirm to lock it in.
      </p>

      <div
        style={{
          background: "#F9FAFB",
          borderRadius: 12,
          padding: 20,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "#DBEAFE",
              color: "#2563EB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            {getInitials(provider.name)}
          </div>
          <div>
            <div style={{ fontWeight: 600, color: "#111827" }}>
              {provider.name}
            </div>
            <div style={{ fontSize: 13, color: "#6B7280" }}>
              {provider.specialty}
            </div>
          </div>
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
        >
          {[
            ["📅 Date", formatDate(dateTime.date)],
            ["🕐 Time", dateTime.slot],
            ["👤 Patient", `${patient.firstName} ${patient.lastName}`],
            ["🏥 Insurance", patient.insurance],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                background: "#fff",
                borderRadius: 8,
                padding: "10px 14px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "#9CA3AF",
                  fontWeight: 600,
                  marginBottom: 2,
                }}
              >
                {label}
              </div>
              <div style={{ fontSize: 13, color: "#111827", fontWeight: 500 }}>
                {value}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            background: "#fff",
            borderRadius: 8,
            padding: "10px 14px",
            marginTop: 12,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "#9CA3AF",
              fontWeight: 600,
              marginBottom: 2,
            }}
          >
            📝 Reason
          </div>
          <div style={{ fontSize: 13, color: "#111827" }}>{patient.reason}</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={onBack}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "1px solid #E5E7EB",
            background: "#fff",
            cursor: "pointer",
            color: "#374151",
            fontWeight: 500,
          }}
        >
          ← Back
        </button>
        <button
          onClick={handleConfirm}
          style={{
            flex: 1,
            padding: "10px 20px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            background: "#16A34A",
            color: "#fff",
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          ✓ Confirm Booking
        </button>
      </div>
    </div>
  );
}

function MyAppointments() {
  const [bookings, setBookings] = useState([]);
  const [shakingId, setShakingId] = useState(null);
  const [fadingId, setFadingId] = useState(null);

  useEffect(() => {
    try {
      setBookings(JSON.parse(localStorage.getItem("pb_bookings") || "[]"));
    } catch (_) {
      setBookings([]);
    }
  }, []);

  function handleCancel(id) {
    setShakingId(id);
    setTimeout(() => {
      setShakingId(null);
      setFadingId(id);
      setTimeout(() => {
        const updated = bookings.filter((b) => b.id !== id);
        localStorage.setItem("pb_bookings", JSON.stringify(updated));
        setBookings(updated);
        setFadingId(null);
      }, 400);
    }, 400);
  }

  if (bookings.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>📅</div>
        <div style={{ fontWeight: 600, color: "#374151", fontSize: 16 }}>
          No upcoming appointments
        </div>
        <div style={{ color: "#9CA3AF", fontSize: 14, marginTop: 6 }}>
          Book an appointment and it'll show up here.
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: "#111827",
          marginBottom: 16,
        }}
      >
        My Appointments
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {bookings.map((b) => (
          <div
            key={b.id}
            className={
              shakingId === b.id
                ? "pb-shaking"
                : fadingId === b.id
                  ? "pb-fading"
                  : ""
            }
            style={{
              background: "#fff",
              border: "1px solid #E5E7EB",
              borderRadius: 12,
              padding: 16,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "#DBEAFE",
                color: "#2563EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 15,
                flexShrink: 0,
              }}
            >
              {getInitials(b.provider)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: "#111827", fontSize: 14 }}>
                {b.provider}
              </div>
              <div style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
                {new Date(b.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                · {b.slot}
              </div>
              <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>
                Patient: {b.patient} · Code:{" "}
                <span style={{ fontFamily: "monospace", color: "#374151" }}>
                  {b.confCode}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleCancel(b.id)}
              aria-label={`Cancel appointment with ${b.provider}`}
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                border: "1px solid #FCA5A5",
                background: "#FEF2F2",
                color: "#DC2626",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function MedicalSchedulingDemo() {
  const [tab, setTab] = useState("book"); // 'book' | 'appointments'
  const [step, setStep] = useState(1);
  const [provider, setProvider] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const [patient, setPatient] = useState(null);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [stepKey, setStepKey] = useState(0);

  function goToStep(n) {
    setStepKey((k) => k + 1);
    setStep(n);
  }

  function handleStep1Done(prov) {
    setProvider(prov);
    goToStep(2);
  }
  function handleStep2Done(dt) {
    setDateTime(dt);
    goToStep(3);
  }
  function handleStep3Done(pat) {
    setPatient(pat);
    goToStep(4);
  }
  function handleConfirm() {
    setBookingComplete(true);
  }

  function startOver() {
    setStep(1);
    setProvider(null);
    setDateTime(null);
    setPatient(null);
    setBookingComplete(false);
    setStepKey((k) => k + 1);
  }

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Inject styles once */}
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Demo wrapper */}
      <div
        style={{
          border: "1px solid #E5E7EB",
          borderRadius: 16,
          overflow: "hidden",
          background: "#FAFAFA",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          // maxWidth: 680,
          margin: "0 auto",
        }}
      >
        {/* App header */}
        <div
          style={{
            background: "#fff",
            borderBottom: "1px solid #E5E7EB",
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="2"
                  y="4"
                  width="14"
                  height="12"
                  rx="2"
                  stroke="#fff"
                  strokeWidth="1.5"
                />
                <path
                  d="M6 2v4M12 2v4M2 8h14"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M9 11v3M7.5 12.5h3"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#111827",
                  lineHeight: 1.2,
                }}
              >
                PulseBook
              </div>
              <div style={{ fontSize: 10, color: "#9CA3AF", lineHeight: 1 }}>
                Book your care, your way.
              </div>
            </div>
          </div>
          {/* Nav tabs */}
          <div
            style={{
              display: "flex",
              gap: 4,
              background: "#F3F4F6",
              borderRadius: 8,
              padding: 3,
            }}
          >
            {[
              ["book", "📋 Book"],
              ["appointments", "📅 My Appointments"],
            ].map(([t, label]) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t);
                  if (t === "book" && bookingComplete) startOver();
                }}
                aria-pressed={tab === t}
                style={{
                  padding: "6px 14px",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                  background: tab === t ? "#fff" : "transparent",
                  color: tab === t ? "#111827" : "#6B7280",
                  fontWeight: tab === t ? 600 : 400,
                  fontSize: 13,
                  boxShadow: tab === t ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  transition: "all 0.15s",
                  fontFamily: "inherit",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content area */}
        <div style={{ padding: 28 }}>
          {tab === "appointments" ? (
            <MyAppointments />
          ) : (
            <>
              {/* Step indicator */}
              {!bookingComplete && (
                <div style={{ marginBottom: 24 }}>
                  <StepIndicator current={step} total={4} />
                </div>
              )}

              {/* Step content */}
              <div key={stepKey}>
                {step === 1 && <Step1 onNext={handleStep1Done} />}
                {step === 2 && provider && (
                  <Step2
                    provider={provider}
                    onNext={handleStep2Done}
                    onBack={() => goToStep(1)}
                  />
                )}
                {step === 3 && provider && dateTime && (
                  <Step3
                    provider={provider}
                    dateTime={dateTime}
                    onNext={handleStep3Done}
                    onBack={() => goToStep(2)}
                  />
                )}
                {step === 4 && provider && dateTime && patient && (
                  <Step4
                    provider={provider}
                    dateTime={dateTime}
                    patient={patient}
                    onConfirm={handleConfirm}
                    onBack={() => goToStep(3)}
                  />
                )}
              </div>

              {/* Start over after booking */}
              {bookingComplete && (
                <div style={{ textAlign: "center", marginTop: 20 }}>
                  <button
                    onClick={startOver}
                    style={{
                      padding: "8px 20px",
                      borderRadius: 8,
                      border: "1px solid #E5E7EB",
                      background: "#fff",
                      cursor: "pointer",
                      color: "#6B7280",
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    Book another appointment
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: "1px solid #E5E7EB",
            padding: "10px 24px",
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 11, color: "#D1D5DB" }}>
            🔒 HIPAA-compliant · Prototype demo
          </span>
          <span style={{ fontSize: 11, color: "#D1D5DB" }}>PulseBook v2.4</span>
        </div>
      </div>
    </div>
  );
}
