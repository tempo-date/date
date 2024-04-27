import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vitest/config";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  mode: "test",
  test: {
    dir: path.resolve(__dirname, "src"),
    environment: "jsdom",
  },
});
