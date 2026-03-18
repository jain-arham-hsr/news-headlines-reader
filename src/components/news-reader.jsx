import { useState, useEffect } from "react";
import { getTopHeadlines } from "../services/newsService";

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
  const [readIds, setReadIds] = useState(
    () => new Set(storageGet("ns_read_ids", [])),
  );

  useEffect(() => {
    storageSet("ns_category", selectedCat);
  }, [selectedCat]);
  useEffect(() => {
    storageSet("ns_read_ids", [...readIds]);
  }, [readIds]);
  useEffect(() => {
    storageSet("ns_dark", dark);
  }, [dark]);

  function markAsRead(e, id) {
    e.stopPropagation();
    setReadIds((prev) => new Set([...prev, id]));
  }

  const accent = CAT_ACCENT[selectedCat];
  const readCount = readIds.size;
  const totalCount = articles.length;
  const catInfo = CATEGORIES.find((c) => c.id === selectedCat);
  const pct = totalCount > 0 ? Math.round((readCount / totalCount) * 100) : 0;

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

      {/* ── MAIN CONTENT ── */}

      <style>{`
        @keyframes shimmer { 0%,100%{opacity:1} 50%{opacity:0.45} }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
