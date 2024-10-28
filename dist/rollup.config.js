"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_commonjs_1 = __importDefault(require("@rollup/plugin-commonjs"));
const plugin_node_resolve_1 = __importDefault(require("@rollup/plugin-node-resolve"));
const plugin_typescript_1 = __importDefault(require("@rollup/plugin-typescript"));
const plugin_terser_1 = __importDefault(require("@rollup/plugin-terser"));
exports.default = {
    input: "index.ts", // Entry point of your library
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
        (0, plugin_node_resolve_1.default)(), // Resolve node_modules
        (0, plugin_commonjs_1.default)(), // Convert CommonJS modules to ES6
        (0, plugin_typescript_1.default)({
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
        (0, plugin_terser_1.default)(), // Minify the output
    ],
};
