import * as esbuild from 'esbuild'
import ImportGlobPlugin from 'esbuild-plugin-import-glob';

let context = await esbuild.context({
    entryPoints: ['src/index.ts'],
    bundle: true,
    keepNames: true,
    sourcemap: true,
    outdir: 'scripts',
    logLevel: 'info',
    plugins: [
        ImportGlobPlugin.default()
    ]
});

await context.watch();