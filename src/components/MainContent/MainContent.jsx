import styles from "./MainContent.module.css";
import NewsList from "../NewsList/NewsList";

export default function MainContent({ selectedCat, readIds }) {
  return (
    <>
      <main className={styles.mainContent}>
        {/* Section header + progress */}
        {/* <div
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
        </div> */}

        {/* Progress bar */}
        {/* {!loading && totalCount > 0 && (
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
        )} */}

        {/* Error */}
        {/* {error && (
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
        )} */}

        {/* Skeleton */}
        {/* {loading &&
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
          ))} */}

        <NewsList selectedCat={selectedCat} readIds={readIds} />
      </main>
    </>
  );
}
