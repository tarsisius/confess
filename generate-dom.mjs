import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['src/www/scripts/*.ts'],
  minify: true,
  sourcemap: true,
  bundle: true,
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  outdir: 'assets/public/js',
//   outfile: ['assets/public/js/dom.js'],
})
