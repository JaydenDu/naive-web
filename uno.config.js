import { defineConfig, presetUno, presetIcons, presetAttributify } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import { getIcons } from './build'

const icons = getIcons()
export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      warn: true,
      prefix: ['i-'],
      extraProperties: {
        display: 'inline-block',
      },
      collections: {
        me: FileSystemIconLoader('./src/assets/icons/isme'),
        fe: FileSystemIconLoader('./src/assets/icons/feather'),
      },
    }),
    presetRemToPx({ baseFontSize: 4 }),
  ],
  safelist: icons.map((icon) => `${icon} ${icon}?mask`.split(' ')).flat(),
  shortcuts: [['card-border', 'border border-solid border-light_border dark:border-dark_border']],
  rules: [
    [
      'card-shadow',
      { 'box-shadow': '0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017' },
    ],
  ],
  theme: {
    colors: {
      primary: 'rgba(var(--primary-color))',
      dark: '#18181c',
      light_border: '#efeff5',
      dark_border: '#2d2d30',
    },
  },
})
