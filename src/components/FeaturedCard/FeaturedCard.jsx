import React from "react";

export default function FeaturedCard() {
  return (
    <>
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
              onClick={() => setExpandedId((id) => (id === a.id ? null : a.id))}
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
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
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
    </>
  );
}
