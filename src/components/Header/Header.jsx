import React from "react";

export default function Header() {
  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 200,
          background: T.surface,
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        {/* Top bar */}
        <div
          style={{
            maxWidth: 680,
            margin: "0 auto",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 54,
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 9,
                background: accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.3s",
                flexShrink: 0,
              }}
            >
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <rect
                  x="1.5"
                  y="2"
                  width="14"
                  height="2.5"
                  rx="1.2"
                  fill="white"
                />
                <rect
                  x="1.5"
                  y="6.5"
                  width="9"
                  height="2"
                  rx="1"
                  fill="white"
                  opacity="0.75"
                />
                <rect
                  x="1.5"
                  y="11"
                  width="11"
                  height="2"
                  rx="1"
                  fill="white"
                  opacity="0.5"
                />
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: "-0.4px",
                  lineHeight: 1.1,
                  color: T.text,
                }}
              >
                Newsstand
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: T.textMuted,
                  letterSpacing: "0.05em",
                }}
              >
                {new Date()
                  .toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })
                  .toUpperCase()}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Read pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: T.surface2,
                border: `1px solid ${T.border}`,
                borderRadius: 20,
                padding: "5px 11px 5px 9px",
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: readCount > 0 ? "#22c55e" : T.textMuted,
                  transition: "background 0.3s",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  color: T.textSub,
                  fontVariantNumeric: "tabular-nums",
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ color: T.text, fontWeight: 600 }}>
                  {readCount}
                </span>
                <span style={{ color: T.textMuted }}> / {totalCount} read</span>
              </span>
            </div>
            <button
              onClick={() => setDark((d) => !d)}
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: T.surface2,
                border: `1px solid ${T.border}`,
                cursor: "pointer",
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {dark ? "☀" : "☾"}
            </button>
          </div>
        </div>

        {/* Category tabs */}
        <div
          style={{
            maxWidth: 680,
            margin: "0 auto",
            padding: "0 16px",
            display: "flex",
            gap: 0,
            overflowX: "auto",
            scrollbarWidth: "none",
          }}
        >
          {CATEGORIES.map((cat) => {
            const active = cat.id === selectedCat;
            const a = CAT_ACCENT[cat.id];
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                style={{
                  padding: "9px 14px",
                  border: "none",
                  background: "none",
                  color: active ? a : T.textSub,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: active ? 700 : 400,
                  whiteSpace: "nowrap",
                  borderBottom: active
                    ? `2.5px solid ${a}`
                    : "2.5px solid transparent",
                  fontFamily: "inherit",
                  transition: "all 0.15s",
                  marginBottom: -1,
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
