import React from "react";

export default function NewsItem({
  id,
  title,
  description,
  thumbnailImage,
  source,
  url,
  publishedAt,
  T,
  accent,
  isRead,
  isExp,
  setExpandedId,
  markAsRead,
}) {
  return (
    <div
      key={id}
      onClick={() => setExpandedId((id) => (id === id ? null : id))}
      style={{
        padding: "14px 0",
        borderBottom: `1px solid ${T.border}`,
        cursor: "pointer",
        opacity: isRead && !isExp ? 0.45 : 1,
        transition: "opacity 0.2s",
      }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
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
            <SourceBadge name={source} accent={accent} url={url} />
            <span
              style={{
                fontSize: 12,
                color: T.textMuted,
                fontWeight: 500,
              }}
            >
              {source}
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
              {publishedAt}
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
            {title}
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
                {description}
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {!isRead && (
                  <button
                    onClick={(e) => markAsRead(e, id)}
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
                {url && (
                  <a
                    href={url}
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
        {thumbnailImage ? (
          <img
            src={thumbnailImage}
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
}
