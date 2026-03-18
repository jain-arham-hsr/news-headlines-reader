import axios from "axios";
import { timeAgo } from "../utils/datetimeUtils";

const BASE_URL = "https://api.thenewsapi.com/v1";
const apiClient = axios.create();

// TheNewsAPI category names differ slightly from GNews
const CATEGORY_MAP = {
  general: "general",
  world: "world",
  business: "business",
  technology: "tech",
  entertainment: "entertainment",
  sports: "sports",
  science: "science",
  health: "health",
};

export const getTopHeadlines = async (
  categoryId = "general",
  country = "us",
) => {
  try {
    const params = {
      api_token: import.meta.env.VITE_THENEWSAPI_KEY,
      language: "en",
      locale: country,
      limit: 20,
    };

    if (categoryId !== "all") {
      params.categories = CATEGORY_MAP[categoryId] ?? categoryId;
    }

    const { data } = await apiClient.get(`${BASE_URL}/news/top`, { params });

    return data.data.map((a, i) => ({
      id: a.uuid ?? `${i}-${a.published_at}`,
      title: a.title,
      description: a.description || "No description available.",
      category: categoryId,
      source: a.source ?? "Unknown",
      publishedAt: timeAgo(a.published_at),
      url: a.url,
      image: a.image_url,
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
