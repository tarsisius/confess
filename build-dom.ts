import { build } from 'esbuild'

const buildDOM = async () => {
  await build({
    entryPoints: ['src/www/scripts/*.ts'],
    minify: true,
    sourcemap: true,
    bundle: true,
    target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
    outdir: 'assets/public/js',
  })
}

buildDOM()
