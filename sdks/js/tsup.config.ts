import { defineConfig } from "tsup";

// tsup.config.ts
export default defineConfig({
  entry: ["src/index.ts", "src/react/index.ts"],
  outDir: "dist",
  format: ["esm", "cjs"],

  dts: true,
  external: ["react"],
  esbuildOptions(options) {
    options.outExtension = {
      ".js": ".mjs", // apply .mjs for both formats initially
    };
  },
});
