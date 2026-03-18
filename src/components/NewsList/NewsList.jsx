import { useState, useEffect } from "react";
import { CATEGORIES } from "../../constants/categories";
// import { FeaturedCard } from "../FeaturedCard/FeaturedCard";
import NewsItem from "../NewsItem/NewsItem";
import { getTopHeadlines } from "../../services/newsService";

export default function NewsList({ selectedCat, readIds }) {
  const accent = CATEGORIES[selectedCat].color;
  const [articles, setArticles] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load(cat) {
    setLoading(true);
    setError(null);
    setExpandedId(null);
    try {
      setArticles(await getTopHeadlines(cat));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(selectedCat);
  }, [selectedCat]);

  return (
    <>
      {/* <FeaturedCard /> */}
      {!loading &&
        !error &&
        articles.slice(1).map((a) => {
          const isRead = readIds.has(a.id);
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
