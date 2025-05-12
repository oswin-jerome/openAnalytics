import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/react/index.ts", "src/js/index.ts"],
  outDir: "dist",
  format: ["esm", "cjs"],
  dts: true, // Generate .d.ts type definitions
  clean: true, // Clean dist folder before build
  splitting: false,
  sourcemap: true,
  treeshake: true,
  external: ["react"],
  esbuildOptions(options) {
    // ✅ correct usage:
    options.outExtension = {
      ".js": ".js", // Keep default .js for both formats
    };
  },
});
