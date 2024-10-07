import * as esbuild from 'esbuild'

let result = await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    keepNames: true,
    minify: true,
    sourcemap: true,
    outdir: 'scripts',
    logLevel: 'info'
});