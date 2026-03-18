import axios from "axios";

const FAVICON_BASE = "https://www.google.com/s2/favicons";
const cache = new Map();

const client = axios.create({ baseURL: FAVICON_BASE });

export const getFaviconUrl = (url, size = 32) => {
  try {
    const { hostname } = new URL(url);
    return `${FAVICON_BASE}?domain=${hostname}&sz=${size}`;
  } catch {
    return null;
  }
};

export const prefetchFavicons = (urls, size = 32) =>
  Promise.allSettled(
    urls.map((url) => {
      const faviconUrl = getFaviconUrl(url, size);
      if (!faviconUrl || cache.has(faviconUrl)) return Promise.resolve();

      return client
        .get("", {
          params: { domain: new URL(url).hostname, sz: size },
          responseType: "blob",
        })
        .then(() => cache.set(faviconUrl, true))
        .catch(() => cache.set(faviconUrl, false));
    }),
  );

export const isFaviconCached = (url, size = 32) => {
  const faviconUrl = getFaviconUrl(url, size);
  return faviconUrl ? (cache.get(faviconUrl) ?? null) : null;
};
