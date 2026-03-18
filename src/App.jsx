import { useEffect, useState } from "react";
import "./App.css";
import MainContent from "./components/MainContent/MainContent";

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

  // const [selectedCat, setSelectedCat] = useState(() =>
  //   storageGet("ns_category", "all"),
  // );
  // const [readIds, setReadIds] = useState(
  //   () => new Set(storageGet("ns_read_ids", [])),
  // );
  const [selectedCat, setSelectedCat] = useState("all");
  const [readIds, setReadIds] = useState(new Set([]));
  return (
    <div className="app-wrap">
      <MainContent selectedCat={selectedCat} readIds={readIds} />
    </div>
  );
}

export default App;
