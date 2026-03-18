import { useState, useEffect } from "react";
import { getTopHeadlines } from "../services/newsService";
import { CAT_ACCENT } from "../constants/theme";
import { getFaviconUrl } from "../services/faviconService";

const CATEGORIES = [
  { id: "all", label: "Top Stories" },
  { id: "technology", label: "Tech" },
  { id: "business", label: "Business" },
  { id: "sports", label: "Sports" },
  { id: "health", label: "Health" },
  { id: "science", label: "Science" },
  { id: "entertainment", label: "Arts" },
];

function SourceBadge({ name, accent, url }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const faviconUrl = !failed ? getFaviconUrl(url) : null;

  return (
    <div>
      {faviconUrl ? (
        <img
          src={faviconUrl}
          alt={name}
          width={16}
          height={16}
          style={{ display: "block" }}
          onError={() => setFailed(true)}
        />
      ) : (
        <span style={{ fontSize: 9, fontWeight: 700, color: accent }}>
          {initials}
        </span>
      )}
    </div>
  );
}

function storageGet(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v !== null ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}
function storageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export default function NewsReader() {
  const [articles, setArticles] = useState([]);
  const [selectedCat, setSelectedCat] = useState(() =>
    storageGet("ns_category", "all"),
  );
  const [readIds, setReadIds] = useState(
    () => new Set(storageGet("ns_read_ids", [])),
  );
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(() => storageGet("ns_dark", false));
  const [error, setError] = useState(null);

  useEffect(() => {
    load(selectedCat);
  }, [selectedCat]);

  useEffect(() => {
    storageSet("ns_category", selectedCat);
  }, [selectedCat]);
  useEffect(() => {
    storageSet("ns_read_ids", [...readIds]);
  }, [readIds]);
  useEffect(() => {
    storageSet("ns_dark", dark);
  }, [dark]);

  async function load(cat) {
    setLoading(true);
    setError(null);
    setExpandedId(null);
    try {
      setArticles(await getTopHeadlines(cat));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function markAsRead(e, id) {
    e.stopPropagation();
    setReadIds((prev) => new Set([...prev, id]));
  }

  const accent = CAT_ACCENT[selectedCat];
  const readCount = readIds.size;
  const totalCount = articles.length;
  const catInfo = CATEGORIES.find((c) => c.id === selectedCat);
  const pct = totalCount > 0 ? Math.round((readCount / totalCount) * 100) : 0;

  const T = {
    bg: dark ? "#0d0d12" : "#f5f5f7",
    surface: dark ? "#17171f" : "#ffffff",
    surface2: dark ? "#1f1f2a" : "#f0f0f4",
    border: dark ? "#24242f" : "#e5e5eb",
    text: dark ? "#ededf5" : "#0d0d14",
    textSub: dark ? "#9090aa" : "#66667a",
    textMuted: dark ? "#50505e" : "#aaaab8",
    card: dark ? "#1a1a24" : "#ffffff",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        fontFamily:
          "-apple-system, 'SF Pro Display', BlinkMacSystemFont, 'Segoe UI', sans-serif",
        color: T.text,
      }}
    >
      {/* ── STICKY HEADER ── */}
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

      {/* ── MAIN CONTENT ── */}
      <main
        style={{ maxWidth: 680, margin: "0 auto", padding: "0 16px 100px" }}
      >
        {/* Section header + progress */}
        <div
          style={{
            padding: "18px 0 12px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: "-0.5px",
                color: T.text,
              }}
            >
              {catInfo?.label}
            </h1>
            {!loading && !error && (
              <p
                style={{ margin: "2px 0 0", fontSize: 13, color: T.textMuted }}
              >
                {totalCount} stories · {readCount} read
              </p>
            )}
          </div>
          {!loading && !error && pct > 0 && (
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: accent,
                  lineHeight: 1,
                }}
              >
                {pct}%
              </div>
              <div style={{ fontSize: 10, color: T.textMuted, marginTop: 1 }}>
                complete
              </div>
            </div>
          )}
        </div>

        {/* Progress bar */}
        {!loading && totalCount > 0 && (
          <div
            style={{
              height: 3,
              background: T.border,
              borderRadius: 2,
              overflow: "hidden",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${pct}%`,
                background: accent,
                borderRadius: 2,
                transition: "width 0.4s ease",
              }}
            />
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ marginTop: 60, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.3 }}>
              ⚠
            </div>
            <p style={{ color: T.textSub, fontSize: 15, marginBottom: 16 }}>
              {error}
            </p>
            <button
              onClick={() => load(selectedCat)}
              style={{
                padding: "9px 22px",
                background: accent,
                border: "none",
                borderRadius: 9,
                color: "#fff",
                cursor: "pointer",
                fontSize: 14,
                fontFamily: "inherit",
                fontWeight: 600,
              }}
            >
              Try again
            </button>
          </div>
        )}

        {/* Skeleton */}
        {loading &&
          Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              style={{
                padding: "15px 0",
                borderBottom: `1px solid ${T.border}`,
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    height: 9,
                    width: "28%",
                    background: T.surface2,
                    borderRadius: 4,
                    marginBottom: 10,
                    animation: "shimmer 1.4s ease infinite",
                  }}
                />
                <div
                  style={{
                    height: 14,
                    width: "100%",
                    background: T.surface2,
                    borderRadius: 4,
                    marginBottom: 7,
                  }}
                />
                <div
                  style={{
                    height: 14,
                    width: "65%",
                    background: T.surface2,
                    borderRadius: 4,
                  }}
                />
              </div>
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: 10,
                  background: T.surface2,
                  flexShrink: 0,
                }}
              />
            </div>
          ))}

        {/* ── FEATURED CARD ── */}
        {!loading &&
          !error &&
          articles[0] &&
          (() => {
            const a = articles[0];
            const isRead = readIds.has(a.id);
            const isExp = expandedId === a.id;
            return (
              <div
                key={a.id}
                onClick={() =>
                  setExpandedId((id) => (id === a.id ? null : a.id))
                }
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  border: `1px solid ${T.border}`,
                  background: T.card,
                  cursor: "pointer",
                  marginBottom: 6,
                  opacity: isRead ? 0.6 : 1,
                  transition: "opacity 0.2s",
                }}
              >
                {a.image ? (
                  <img
                    src={a.image}
                    alt=""
                    style={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                      display: "block",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: 130,
                      background: `${accent}12`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 44,
                      color: accent + "40",
                    }}
                  >
                    ◈
                  </div>
                )}
                <div style={{ padding: "14px 16px 16px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.07em",
                        textTransform: "uppercase",
                        color: accent,
                        background: accent + "18",
                        padding: "3px 8px",
                        borderRadius: 5,
                      }}
                    >
                      Featured
                    </span>
                    <span style={{ fontSize: 11, color: T.textMuted }}>
                      {a.source} · {a.publishedAt}
                    </span>
                  </div>
                  <h2
                    style={{
                      margin: "0 0 4px",
                      fontSize: 19,
                      fontWeight: 800,
                      lineHeight: 1.32,
                      color: isRead ? T.textMuted : T.text,
                      textDecoration: isRead ? "line-through" : "none",
                      letterSpacing: "-0.35px",
                    }}
                  >
                    {a.title}
                  </h2>
                  {isExp && (
                    <div style={{ marginTop: 10 }}>
                      <p
                        style={{
                          margin: "0 0 12px",
                          fontSize: 14,
                          color: T.textSub,
                          lineHeight: 1.65,
                        }}
                      >
                        {a.description}
                      </p>
                      <div
                        style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
                      >
                        {!isRead && (
                          <button
                            onClick={(e) => markAsRead(e, a.id)}
                            style={{
                              padding: "7px 15px",
                              background: accent,
                              border: "none",
                              borderRadius: 8,
                              color: "#fff",
                              cursor: "pointer",
                              fontSize: 13,
                              fontFamily: "inherit",
                              fontWeight: 600,
                            }}
                          >
                            ✓ Mark as read
                          </button>
                        )}
                        {isRead && (
                          <span
                            style={{
                              fontSize: 13,
                              color: "#22c55e",
                              fontWeight: 600,
                              padding: "7px 0",
                            }}
                          >
                            ✓ Read
                          </span>
                        )}
                        {a.url && (
                          <a
                            href={a.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              padding: "7px 15px",
                              background: T.surface2,
                              border: `1px solid ${T.border}`,
                              borderRadius: 8,
                              color: T.textSub,
                              fontSize: 13,
                              fontFamily: "inherit",
                              textDecoration: "none",
                            }}
                          >
                            Full story →
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

        {/* ── ARTICLE LIST ── */}
        {!loading &&
          !error &&
          articles.slice(1).map((a) => {
            const isRead = readIds.has(a.id);
            const isExp = expandedId === a.id;
            return (
              <div
                key={a.id}
                onClick={() =>
                  setExpandedId((id) => (id === a.id ? null : a.id))
                }
                style={{
                  padding: "14px 0",
                  borderBottom: `1px solid ${T.border}`,
                  cursor: "pointer",
                  opacity: isRead && !isExp ? 0.45 : 1,
                  transition: "opacity 0.2s",
                }}
              >
                <div
                  style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Source row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginBottom: 6,
                      }}
                    >
                      {/* <SourceBadge name={a.source} accent={accent} /> */}
                      <SourceBadge
                        name={a.source}
                        accent={accent}
                        url={a.url}
                      />
                      <span
                        style={{
                          fontSize: 12,
                          color: T.textMuted,
                          fontWeight: 500,
                        }}
                      >
                        {a.source}
                      </span>
                      <span
                        style={{
                          color: T.textMuted,
                          fontSize: 10,
                          margin: "0 1px",
                        }}
                      >
                        ·
                      </span>
                      <span style={{ fontSize: 12, color: T.textMuted }}>
                        {a.publishedAt}
                      </span>
                      {isRead && (
                        <span
                          style={{
                            marginLeft: "auto",
                            fontSize: 11,
                            color: "#22c55e",
                            fontWeight: 600,
                          }}
                        >
                          ✓
                        </span>
                      )}
                    </div>
                    {/* Title */}
                    <h3
                      style={{
                        margin: 0,
                        fontSize: 15,
                        fontWeight: 700,
                        lineHeight: 1.4,
                        color: isRead ? T.textMuted : T.text,
                        textDecoration: isRead ? "line-through" : "none",
                        textDecorationColor: T.textMuted,
                        letterSpacing: "-0.15px",
                      }}
                    >
                      {a.title}
                    </h3>
                    {/* Expanded */}
                    {isExp && (
                      <div style={{ marginTop: 10 }}>
                        <p
                          style={{
                            margin: "0 0 10px",
                            fontSize: 13,
                            color: T.textSub,
                            lineHeight: 1.65,
                          }}
                        >
                          {a.description}
                        </p>
                        <div
                          style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
                        >
                          {!isRead && (
                            <button
                              onClick={(e) => markAsRead(e, a.id)}
                              style={{
                                padding: "6px 13px",
                                background: accent,
                                border: "none",
                                borderRadius: 7,
                                color: "#fff",
                                cursor: "pointer",
                                fontSize: 12,
                                fontFamily: "inherit",
                                fontWeight: 600,
                              }}
                            >
                              ✓ Mark as read
                            </button>
                          )}
                          {isRead && (
                            <span
                              style={{
                                fontSize: 12,
                                color: "#22c55e",
                                fontWeight: 600,
                                padding: "6px 0",
                              }}
                            >
                              ✓ Read
                            </span>
                          )}
                          {a.url && (
                            <a
                              href={a.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                padding: "6px 13px",
                                background: T.surface2,
                                border: `1px solid ${T.border}`,
                                borderRadius: 7,
                                color: T.textSub,
                                fontSize: 12,
                                fontFamily: "inherit",
                                textDecoration: "none",
                              }}
                            >
                              Full story →
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Thumbnail */}
                  {a.image ? (
                    <img
                      src={a.image}
                      alt=""
                      style={{
                        width: 78,
                        height: 78,
                        borderRadius: 10,
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  ) : (
                    <div
                      style={{
                        width: 78,
                        height: 78,
                        borderRadius: 10,
                        flexShrink: 0,
                        background: accent + "10",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        color: accent + "50",
                      }}
                    >
                      ◈
                    </div>
                  )}
                </div>
              </div>
            );
          })}

        {!loading && !error && articles.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "70px 0",
              color: T.textMuted,
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 10, opacity: 0.4 }}>
              ◌
            </div>
            <p>No stories found</p>
          </div>
        )}
      </main>

      <style>{`
        @keyframes shimmer { 0%,100%{opacity:1} 50%{opacity:0.45} }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
