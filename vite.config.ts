import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), dts({ tsconfigPath: path.resolve(__dirname, "tsconfig.json") }), svgr({ svgrOptions: { memo: true } })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
