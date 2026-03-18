import React, { useState } from "react";
import { getFaviconUrl } from "../../services/faviconService";
import styles from "./NewsItem.module.css";

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

export default function NewsItem({
  id,
  title,
  description,
  thumbnail,
  source,
  url,
  publishedAt,
  accent,
  isRead,
  markAsRead,
  isExpanded,
  setExpandedId,
}) {
  return (
    <div
      key={id}
      onClick={() => setExpandedId((currId) => (currId === id ? null : id))}
      className={styles.newsItem}
      data-read={isRead}
      data-expanded={isExpanded}
    >
      <div className={styles.layout}>
        <div className={styles.content}>
          {/* Source row */}
          <div className={styles.sourceRow}>
            <SourceBadge name={source} accent={accent} url={url} />
            <span className={styles.sourceName}>{source}</span>
            <span className={styles.dot}>·</span>
            <span className={styles.publishedAt}>{publishedAt}</span>
            {isRead && <span className={styles.readCheck}>✓</span>}
          </div>

          {/* Title */}
          <h3 className={`${styles.title} ${isRead ? styles.titleRead : ""}`}>
            {title}
          </h3>

          {/* Expanded */}
          {isExpanded && (
            <div className={styles.expanded}>
              <p className={styles.description}>{description}</p>
              <div className={styles.actions}>
                {!isRead && (
                  <button
                    onClick={(e) => markAsRead(e, url)}
                    className={styles.markReadBtn}
                    style={{ background: accent }}
                  >
                    ✓ Mark as read
                  </button>
                )}
                {isRead && <span className={styles.readLabel}>✓ Read</span>}
                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={styles.fullStoryLink}
                  >
                    Full story →
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Thumbnail */}
        {thumbnail ? (
          <img
            src={thumbnail}
            alt=""
            className={styles.thumbnail}
            onError={(e) => (e.target.style.display = "none")}
          />
        ) : (
          <div
            className={styles.placeholderThumb}
            style={{
              background: accent + "10",
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
