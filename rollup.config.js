import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.ts", // Entry point of your library
  output: [
    {
      dir: "dist", // Output directory
      format: "cjs", // CommonJS format
      sourcemap: true, // Generate source maps
      entryFileNames: "[name].cjs", // Output file name pattern
      chunkFileNames: "[name]-[hash].cjs", // Chunk file name pattern
    },
    {
      dir: "dist", // Output directory
      format: "esm", // ES Module format
      sourcemap: true, // Generate source maps
      entryFileNames: "[name].esm.js", // Output file name pattern
      chunkFileNames: "[name]-[hash].esm.js", // Chunk file name pattern
    },
  ],
  plugins: [
    resolve(), // Resolve node_modules
    commonjs(), // Convert CommonJS modules to ES6
    typescript({
      exclude: [
        "**/__tests__",
        "**/*.test.ts",
        "coverage",
        "dist",
        "eslint.config.mjs",
        "jest.config.js",
        "rollup.config.js",
      ], // Exclude files from compilation
    }), // Compile TypeScript
    terser(), // Minify the output
  ],
};
