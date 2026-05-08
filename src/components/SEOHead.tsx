import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, any> | Record<string, any>[];
  /** GEO targeting: ISO country code or city (helps AIO/Geo SEO) */
  geoRegion?: string;
  geoPlacename?: string;
  keywords?: string[];
}

/**
 * Reusable SEO + AIO + GEO head manager.
 * Sets title, description, canonical, OpenGraph, Twitter, JSON-LD (LD+JSON),
 * geo.region / geo.placename / ICBM, and AI-friendly metadata.
 */
export function SEOHead({
  title,
  description,
  canonical,
  image = "https://denta.health/og.png",
  type = "website",
  jsonLd,
  geoRegion,
  geoPlacename,
  keywords,
}: SEOHeadProps) {
  useEffect(() => {
    document.title = title;
    const url = canonical || (typeof window !== "undefined" ? window.location.href : "https://denta.health");

    const setMeta = (selector: string, attr: "name" | "property", key: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta('meta[name="description"]', "name", "description", description);
    if (keywords?.length) setMeta('meta[name="keywords"]', "name", "keywords", keywords.join(", "));

    // OpenGraph
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:type"]', "property", "og:type", type);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[property="og:image"]', "property", "og:image", image);
    setMeta('meta[property="og:site_name"]', "property", "og:site_name", "Denta.Health");

    // Twitter
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", image);

    // GEO
    if (geoRegion) setMeta('meta[name="geo.region"]', "name", "geo.region", geoRegion);
    if (geoPlacename) setMeta('meta[name="geo.placename"]', "name", "geo.placename", geoPlacename);

    // AIO hints (helps LLM crawlers understand the page)
    setMeta('meta[name="ai-content-declaration"]', "name", "ai-content-declaration", "human-curated wellness guidance, not medical diagnosis");
    setMeta('meta[name="content-language"]', "name", "content-language", "en");

    // Canonical
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", url);

    // JSON-LD (managed under data-managed flag so we can clean it up)
    document.head.querySelectorAll('script[data-seo-jsonld="true"]').forEach((n) => n.remove());
    const blocks = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
    blocks.forEach((block) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.dataset.seoJsonld = "true";
      s.text = JSON.stringify(block);
      document.head.appendChild(s);
    });

    return () => {
      document.head.querySelectorAll('script[data-seo-jsonld="true"]').forEach((n) => n.remove());
    };
  }, [title, description, canonical, image, type, JSON.stringify(jsonLd), geoRegion, geoPlacename, keywords?.join(",")]);

  return null;
}

export default SEOHead;
