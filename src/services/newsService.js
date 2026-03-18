import axios from "axios";
import { timeAgo } from "../utils/datetimeUtils";

const BASE_URL = "https://gnews.io/api/v4";
const apiClient = axios.create();

export const getTopHeadlines = async (
  categoryId = "general",
  country = "us",
) => {
  try {
    // Fix: Use simple string concatenation to avoid the URL() stripping bug
    let targetUrl = `${BASE_URL}/top-headlines?lang=en&country=${country}&max=20&apikey=${import.meta.env.VITE_GNEWS_API_KEY}`;

    if (categoryId !== "all") {
      targetUrl += `&category=${categoryId}`;
    }

    const { data } = await apiClient.get(targetUrl);

    return data.articles.map((a, i) => ({
      id: `${i}-${a.publishedAt}`,
      title: a.title,
      description: a.description || "No description available.",
      category: categoryId,
      source: a.source?.name || "Unknown",
      publishedAt: timeAgo(a.publishedAt),
      url: a.url,
      image: a.image,
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
