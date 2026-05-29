import satori from 'satori'
import sharp from 'sharp'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir    = join(__dirname, '../public')
const fontDir   = join(__dirname, '../node_modules/geist/dist/fonts/geist-sans')

const geistBold = readFileSync(join(fontDir, 'Geist-Bold.ttf'))

const fonts = [
  { name: 'Geist', data: geistBold, weight: 700, style: 'normal' },
]

const logoSvgDark = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><g transform="translate(182.91,42.77) scale(0.484734)"><path d="M430.07,941.85H429L864.75,506.11a50.63,50.63,0,0,0,14.81-35.77V287.8A50.63,50.63,0,0,0,864.75,252L627.63,14.92c-31.87-31.87-86.35-9.3-86.35,35.76V357.42a50.58,50.58,0,0,1-14.82,35.77L14.82,904.83a50.59,50.59,0,0,0,0,71.55L279.3,1240.72a50.59,50.59,0,0,0,71.53,0L504.1,1087.42a50.59,50.59,0,0,0,0-71.54Z" fill="#0a0a0a"/><path d="M877.49,944.67h1.07L442.82,1380.42A50.55,50.55,0,0,0,428,1416.18v182.54a50.58,50.58,0,0,0,14.82,35.77l237.11,237.12c31.87,31.86,86.35,9.29,86.35-35.77V1529.1a50.59,50.59,0,0,1,14.82-35.77l511.65-511.64a50.6,50.6,0,0,0,0-71.55L1028.26,645.81a50.57,50.57,0,0,0-71.52,0L803.46,799.11a50.58,50.58,0,0,0,0,71.53Z" fill="#0a0a0a"/></g></svg>`)}`

// apple-touch-icon: 180×180, dark bg, logo centered 
const touchIconEl = {
  type: 'div',
  props: {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '180px',
      height: '180px',
      background: '#0a0a0a',
    },
    children: [
      {
        type: 'img',
        props: {
          src: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><g transform="translate(182.91,42.77) scale(0.484734)"><path d="M430.07,941.85H429L864.75,506.11a50.63,50.63,0,0,0,14.81-35.77V287.8A50.63,50.63,0,0,0,864.75,252L627.63,14.92c-31.87-31.87-86.35-9.3-86.35,35.76V357.42a50.58,50.58,0,0,1-14.82,35.77L14.82,904.83a50.59,50.59,0,0,0,0,71.55L279.3,1240.72a50.59,50.59,0,0,0,71.53,0L504.1,1087.42a50.59,50.59,0,0,0,0-71.54Z" fill="#ffffff"/><path d="M877.49,944.67h1.07L442.82,1380.42A50.55,50.55,0,0,0,428,1416.18v182.54a50.58,50.58,0,0,0,14.82,35.77l237.11,237.12c31.87,31.86,86.35,9.29,86.35-35.77V1529.1a50.59,50.59,0,0,1,14.82-35.77l511.65-511.64a50.6,50.6,0,0,0,0-71.55L1028.26,645.81a50.57,50.57,0,0,0-71.52,0L803.46,799.11a50.58,50.58,0,0,0,0,71.53Z" fill="#ffffff"/></g></svg>`)}`,
          width: 110,
          height: 110,
        },
      },
    ],
  },
}

const touchIconSvg = await satori(touchIconEl, { width: 180, height: 180, fonts })
await sharp(Buffer.from(touchIconSvg)).png().toFile(join(outDir, 'apple-touch-icon.png'))
console.log('Generated apple-touch-icon.png')

// email wordmark: 400×80, transparent bg, dark logo + text 
const wordmarkEl = {
  type: 'div',
  props: {
    style: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '400px',
      height: '80px',
      gap: '10px',
    },
    children: [
      {
        type: 'img',
        props: {
          src: logoSvgDark,
          width: 58,
          height: 58,
        },
      },
      {
        type: 'div',
        props: {
          style: {
            fontFamily: 'Geist',
            fontSize: '48px',
            fontWeight: 700,
            color: '#0a0a0a',
            letterSpacing: '-2px',
            lineHeight: 1,
          },
          children: 'dployr',
        },
      },
    ],
  },
}

const svgStr = await satori(wordmarkEl, { width: 400, height: 80, fonts })
await sharp(Buffer.from(svgStr)).png().toFile(join(outDir, 'wordmark.png'))
console.log('Generated wordmark.png')

// PWA icons: 192×192 and 512×512, dark bg 
const logoWhite = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><g transform="translate(182.91,42.77) scale(0.484734)"><path d="M430.07,941.85H429L864.75,506.11a50.63,50.63,0,0,0,14.81-35.77V287.8A50.63,50.63,0,0,0,864.75,252L627.63,14.92c-31.87-31.87-86.35-9.3-86.35,35.76V357.42a50.58,50.58,0,0,1-14.82,35.77L14.82,904.83a50.59,50.59,0,0,0,0,71.55L279.3,1240.72a50.59,50.59,0,0,0,71.53,0L504.1,1087.42a50.59,50.59,0,0,0,0-71.54Z" fill="#ffffff"/><path d="M877.49,944.67h1.07L442.82,1380.42A50.55,50.55,0,0,0,428,1416.18v182.54a50.58,50.58,0,0,0,14.82,35.77l237.11,237.12c31.87,31.86,86.35,9.29,86.35-35.77V1529.1a50.59,50.59,0,0,1,14.82-35.77l511.65-511.64a50.6,50.6,0,0,0,0-71.55L1028.26,645.81a50.57,50.57,0,0,0-71.52,0L803.46,799.11a50.58,50.58,0,0,0,0,71.53Z" fill="#ffffff"/></g></svg>`)}`

for (const size of [192, 512]) {
  const logoSize = Math.round(size * 0.6)
  const pwaEl = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${size}px`,
        height: `${size}px`,
        background: '#0a0a0a',
      },
      children: [
        {
          type: 'img',
          props: { src: logoWhite, width: logoSize, height: logoSize },
        },
      ],
    },
  }
  const pwaSvg = await satori(pwaEl, { width: size, height: size, fonts })
  await sharp(Buffer.from(pwaSvg)).png().toFile(join(outDir, `icon-${size}.png`))
  console.log(`Generated icon-${size}.png`)
}
