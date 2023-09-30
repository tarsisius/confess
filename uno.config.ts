import {
  defineConfig,
  presetIcons,
  presetWebFonts,
  presetWind,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  cli: {
    entry: {
      patterns: ['src/**/*.{ts,tsx}'],
      outFile: 'assets/public/generated.min.css',
    },
  },
  presets: [
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Albert Sans',
      },
    }),
    presetIcons({
      cdn:"https://esm.sh/"
    }),
    presetWind(),
  ],
  transformers: [transformerVariantGroup()],
})
