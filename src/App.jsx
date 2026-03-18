import { useEffect, useState } from "react";
import "./App.css";
import MainContent from "./components/MainContent/MainContent";
import Header from "./components/Header/Header";
import { getTopHeadlines } from "./services/newsService";
import { storageGet, storageSet } from "./services/storageService";

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const [selectedCat, setSelectedCat] = useState(() =>
    storageGet("ns_category", "all"),
  );
  const [readUrls, setReadUrls] = useState(
    () => new Set(storageGet("ns_read_ids", [])),
  );

  useEffect(() => {
    storageSet("ns_category", selectedCat);
  }, [selectedCat]);
  useEffect(() => {
    storageSet("ns_read_ids", [...readUrls]);
  }, [readUrls]);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

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
    <div className="app-wrap">
      <Header
        readUrls={readUrls}
        selectedCat={selectedCat}
        articles={articles}
        setSelectedCat={setSelectedCat}
        theme={theme}
        setTheme={setTheme}
      />
      <MainContent
        selectedCat={selectedCat}
        readUrls={readUrls}
        setReadUrls={setReadUrls}
        loading={loading}
        error={error}
        expandedId={expandedId}
        setExpandedId={setExpandedId}
        articles={articles}
        load={load}
      />
    </div>
  );
}

export default App;
