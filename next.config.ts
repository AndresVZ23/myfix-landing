import type { NextConfig } from "next";
import { ASSET_VERSION } from "./src/lib/site";

const nextConfig: NextConfig = {
  images: {
    // Los assets versionados (?v=N) y los logos sin query. Cualquier otra
    // ruta o query queda bloqueada por el optimizador de imágenes.
    localPatterns: [
      { pathname: "/assets/**", search: ASSET_VERSION },
      { pathname: "/assets/**", search: "" },
    ],
  },
};

export default nextConfig;
