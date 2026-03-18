import styles from "./MainContent.module.css";
import NewsList from "../NewsList/NewsList";
import { CATEGORIES } from "../../constants/categories";

export default function MainContent({
  selectedCat,
  readUrls,
  setReadUrls,
  loading,
  error,
  articles,
  expandedId,
  load,
  setExpandedId,
}) {
  const catInfo = CATEGORIES[selectedCat];

  const readCount = articles.filter((a) => readUrls.has(a.url)).length;
  const totalCount = articles.length;
  const pct = totalCount > 0 ? Math.round((readCount / totalCount) * 100) : 0;

  function markAsRead(e, url) {
    e.stopPropagation();
    setReadUrls((prev) => new Set([...prev, url]));
  }

  return (
    <>
      <main className={styles.mainContent}>
        {/* Section header + progress */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderLeft}>
            <h1 className={styles.sectionTitle}>{catInfo?.label}</h1>
            {!loading && !error && (
              <p className={styles.sectionSubtitle}>
                {totalCount} stories · {readCount} read
              </p>
            )}
          </div>
          {!loading && !error && pct > 0 && (
            <div className={styles.completionBlock}>
              <div
                className={styles.completionPct}
                style={{ color: catInfo.color }}
              >
                {pct}%
              </div>
              <div className={styles.completionLabel}>complete</div>
            </div>
          )}
        </div>

        {/* Progress bar */}
        {!loading && totalCount > 0 && (
          <div className={styles.progressBarTrack}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${pct}%`, background: catInfo.color }}
            />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>⚠</div>
            <p className={styles.errorMessage}>{error}</p>
            <button
              onClick={() => load(selectedCat)}
              className={styles.retryButton}
              style={{ background: catInfo.color }}
            >
              Try again
            </button>
          </div>
        )}

        {/* Skeleton */}
        {/* {loading &&
          Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className={styles.skeletonCard}>
              <div className={styles.skeletonBody}>
                <div className={styles.skeletonLineSource} />
                <div className={styles.skeletonLineTitleFull} />
                <div className={styles.skeletonLineTitlePartial} />
              </div>
              <div className={styles.skeletonThumb} />
            </div>
          ))} */}

        <NewsList
          selectedCat={selectedCat}
          readUrls={readUrls}
          loading={loading}
          error={error}
          articles={articles}
          expandedId={expandedId}
          setExpandedId={setExpandedId}
          markAsRead={markAsRead}
        />
      </main>
    </>
  );
}
