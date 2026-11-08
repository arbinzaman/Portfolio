import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import contactHandler from "./api/contact.js";

function localContactApiPlugin(mode) {
  return {
    name: "local-contact-api",
    configureServer(server) {
      server.middlewares.use("/api/contact", (req, res, next) => {
        if (req.method !== "POST") return next();
        // Reload .env on every request so changes take effect immediately
        const latestEnv = loadEnv(mode, process.cwd(), "");
        Object.assign(process.env, latestEnv);

        let rawBody = "";
        req.on("data", (chunk) => {
          rawBody += chunk.toString("utf8");
        });
        req.on("end", async () => {
          try {
            req.body = rawBody ? JSON.parse(rawBody) : {};
          } catch {
            req.body = {};
          }
          await contactHandler(req, res);
        });
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    plugins: [react(), localContactApiPlugin(mode)],
    server: {
      watch: {
        ignored: ["**/dist/**", "**/*.crdownload", "**/*.tmp"],
        usePolling: true,
        interval: 1000,
      },
    },
    build: {
      outDir: "dist",
    },
  };
});
