import React from "react";

export default function NewsList({ loading, error, articles }) {
  return (
    <>
      {!loading &&
        !error &&
        articles.slice(1).map((a) => {
          const isRead = readIds.has(a.id);
          const isExp = expandedId === a.id;
          return a;
        })}

      {!loading && !error && articles.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "70px 0",
            color: T.textMuted,
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 10, opacity: 0.4 }}>◌</div>
          <p>No stories found</p>
        </div>
      )}
    </>
  );
}
