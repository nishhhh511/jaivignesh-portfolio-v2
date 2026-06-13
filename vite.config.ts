import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import path from "node:path";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    resolve: {
      alias: {
        "next/image": path.resolve(__dirname, "src/lib/next-shims/image.tsx"),
        "next/link": path.resolve(__dirname, "src/lib/next-shims/link.tsx"),
        "next/dynamic": path.resolve(__dirname, "src/lib/next-shims/dynamic.tsx"),
        "next/font/google": path.resolve(__dirname, "src/lib/next-shims/font.ts"),
        "@vercel/analytics/next": path.resolve(__dirname, "src/lib/next-shims/analytics.tsx"),
      },
    },
  },
});
