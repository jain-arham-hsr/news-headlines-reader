import { CATEGORIES } from "../../constants/categories";
// import { FeaturedCard } from "../FeaturedCard/FeaturedCard";
import NewsItem from "../NewsItem/NewsItem";

export default function NewsList({
  selectedCat,
  readUrls,
  loading,
  error,
  articles,
  expandedId,
  setExpandedId,
  markAsRead,
}) {
  const accent = CATEGORIES[selectedCat].color;

  return (
    <>
      {/* <FeaturedCard /> */}
      {!loading &&
        !error &&
        articles.slice(1).map((a) => {
          const isRead = readUrls.has(a.url);
          const isExp = expandedId === a.id;
          return (
            <NewsItem
              id={a.id}
              title={a.title}
              description={a.description}
              thumbnail={a.image}
              source={a.source}
              url={a.url}
              publishedAt={a.publishedAt}
              accent={accent}
              isRead={isRead}
              isExpanded={isExp}
              setExpandedId={setExpandedId}
              markAsRead={markAsRead}
            />
          );
        })}

      {/* {!loading && !error && articles.length === 0 && (
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
      )} */}
    </>
  );
}
