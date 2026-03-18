import React from "react";
import { CATEGORIES } from "../../constants/categories";
import styles from "./Header.module.css";

export default function Header({
  selectedCat,
  readUrls,
  articles,
  setSelectedCat,
  theme,
  setTheme,
}) {
  const accent = CATEGORIES[selectedCat].color;
  const totalCount = articles.length;
  const readCount = articles.filter((a) => readUrls.has(a.url)).length;

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <div className={styles.header}>
      {/* Top bar */}
      <div className={styles.topBar}>
        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoIcon} style={{ background: accent }}>
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
            <div className={styles.logoName}>Newsstand</div>
            <div className={styles.logoDate}>
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
        <div className={styles.controls}>
          <div className={styles.readPill}>
            <div
              className={styles.readDot}
              style={{ background: readCount > 0 ? "#22c55e" : undefined }}
            />
            <span className={styles.readText}>
              <span className={styles.readCount}>{readCount}</span>
              <span className={styles.readTotal}> / {totalCount} read</span>
            </span>
          </div>
          <button className={styles.themeToggle} onClick={toggleTheme}>
            {theme === "light" ? "☀" : "☾"}
          </button>
        </div>
      </div>

      {/* Category tabs */}
      <div className={styles.tabs}>
        {Object.values(CATEGORIES).map((cat) => {
          const active = cat.id === selectedCat;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`${styles.tab} ${active ? styles.tabActive : ""}`}
              style={
                active
                  ? { color: cat.color, borderBottomColor: cat.color }
                  : undefined
              }
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
