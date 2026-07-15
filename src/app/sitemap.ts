import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE.url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/privacidad`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/terminos`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
