import axios from "axios";
import { timeAgo } from "../utils/datetimeUtils";

const BASE = "https://newsapi.org/v2";
const proxied = (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`;

const apiClient = axios.create();

apiClient.interceptors.request.use((config) => {
  const target = new URL(BASE + config.url);
  target.searchParams.append("apiKey", import.meta.env.VITE_NEWS_API_KEY);
  config.url = proxied(target);
  return config;
});

export const getTopHeadlines = async (categoryId = "all", country = "us") => {
  try {
    const target = new URL("/top-headlines", BASE);
    target.searchParams.set("country", country);
    target.searchParams.set("pageSize", "20");
    if (categoryId !== "all") target.searchParams.set("category", categoryId);

    const { data } = await apiClient.get(target.pathname + target.search);
    if (data.status !== "ok") throw new Error(data.message || "API error");

    return data.articles
      .filter((a) => a.title && a.title !== "[Removed]")
      .map((a, i) => ({
        id: `${i}-${a.publishedAt}`,
        title: a.title,
        description: a.description || "No description available.",
        category: categoryId,
        source: a.source?.name || "Unknown",
        publishedAt: timeAgo(a.publishedAt),
        url: a.url,
        image: a.urlToImage,
      }));
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
