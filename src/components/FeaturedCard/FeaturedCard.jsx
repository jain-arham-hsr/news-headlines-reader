import styles from "./FeaturedCard.module.css";

export default function FeaturedCard({
  loading,
  error,
  articles,
  readUrls,
  expandedId,
  setExpandedId,
  markAsRead,
  accent,
}) {
  if (loading || error || !articles[0]) return null;

  const a = articles[0];
  const isRead = readUrls.has(a.id);
  const isExp = expandedId === a.id;

  return (
    <div
      className={`${styles.card} ${isRead ? styles.cardRead : ""}`}
      onClick={() => setExpandedId((id) => (id === a.id ? null : a.id))}
    >
      {a.image ? (
        <img
          src={a.image}
          alt=""
          className={styles.image}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      ) : (
        <div
          className={styles.imageFallback}
          style={{ background: `${accent}12`, color: `${accent}40` }}
        >
          ◈
        </div>
      )}

      <div className={styles.body}>
        <div className={styles.meta}>
          <span
            className={styles.featuredBadge}
            style={{ color: accent, background: `${accent}18` }}
          >
            Featured
          </span>
          <span className={styles.metaText}>
            {a.source} · {a.publishedAt}
          </span>
        </div>

        <h2 className={`${styles.title} ${isRead ? styles.titleRead : ""}`}>
          {a.title}
        </h2>

        {isExp && (
          <div className={styles.expanded}>
            <p className={styles.description}>{a.description}</p>
            <div className={styles.actions}>
              {!isRead && (
                <button
                  className={styles.markReadBtn}
                  style={{ background: accent }}
                  onClick={(e) => markAsRead(e, a.id)}
                >
                  ✓ Mark as read
                </button>
              )}
              {isRead && <span className={styles.readConfirm}>✓ Read</span>}
              {a.url && (
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.fullStory}
                  onClick={(e) => e.stopPropagation()}
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
}
