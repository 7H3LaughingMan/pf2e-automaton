import { resolve } from "path";
import { defineConfig } from "vite";
import module from './module.json' with { type: "json"}

export default defineConfig({
    build: {
        sourcemap: true,
        minify: 'terser',
        terserOptions: {
            mangle: {
                toplevel: true,
                keep_classnames: true,
                keep_fnames: true
            },
            module: true
        },
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            formats: ["es"],
            fileName: module.id
        }
    }
})