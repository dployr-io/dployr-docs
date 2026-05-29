import satori from 'satori'
import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir    = join(__dirname, '../public')
const fontDir   = join(__dirname, '../node_modules/geist/dist/fonts/geist-sans')

const geistBold    = readFileSync(join(fontDir, 'Geist-Bold.ttf'))
const geistRegular = readFileSync(join(fontDir, 'Geist-Regular.ttf'))

// Logo paths as inline SVG data URL (1000x1000 viewBox)
const logoSvgDark = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><g transform="translate(182.91,42.77) scale(0.484734)"><path d="M430.07,941.85H429L864.75,506.11a50.63,50.63,0,0,0,14.81-35.77V287.8A50.63,50.63,0,0,0,864.75,252L627.63,14.92c-31.87-31.87-86.35-9.3-86.35,35.76V357.42a50.58,50.58,0,0,1-14.82,35.77L14.82,904.83a50.59,50.59,0,0,0,0,71.55L279.3,1240.72a50.59,50.59,0,0,0,71.53,0L504.1,1087.42a50.59,50.59,0,0,0,0-71.54Z" fill="#ffffff"/><path d="M877.49,944.67h1.07L442.82,1380.42A50.55,50.55,0,0,0,428,1416.18v182.54a50.58,50.58,0,0,0,14.82,35.77l237.11,237.12c31.87,31.86,86.35,9.29,86.35-35.77V1529.1a50.59,50.59,0,0,1,14.82-35.77l511.65-511.64a50.6,50.6,0,0,0,0-71.55L1028.26,645.81a50.57,50.57,0,0,0-71.52,0L803.46,799.11a50.58,50.58,0,0,0,0,71.53Z" fill="#ffffff"/></g></svg>`)}`

const logoSvgLight = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><g transform="translate(182.91,42.77) scale(0.484734)"><path d="M430.07,941.85H429L864.75,506.11a50.63,50.63,0,0,0,14.81-35.77V287.8A50.63,50.63,0,0,0,864.75,252L627.63,14.92c-31.87-31.87-86.35-9.3-86.35,35.76V357.42a50.58,50.58,0,0,1-14.82,35.77L14.82,904.83a50.59,50.59,0,0,0,0,71.55L279.3,1240.72a50.59,50.59,0,0,0,71.53,0L504.1,1087.42a50.59,50.59,0,0,0,0-71.54Z" fill="#0a0a0a"/><path d="M877.49,944.67h1.07L442.82,1380.42A50.55,50.55,0,0,0,428,1416.18v182.54a50.58,50.58,0,0,0,14.82,35.77l237.11,237.12c31.87,31.86,86.35,9.29,86.35-35.77V1529.1a50.59,50.59,0,0,1,14.82-35.77l511.65-511.64a50.6,50.6,0,0,0,0-71.55L1028.26,645.81a50.57,50.57,0,0,0-71.52,0L803.46,799.11a50.58,50.58,0,0,0,0,71.53Z" fill="#0a0a0a"/></g></svg>`)}`

const fonts = [
  { name: 'Geist', data: geistBold,    weight: 700, style: 'normal' },
  { name: 'Geist', data: geistRegular, weight: 400, style: 'normal' },
]

const themes = [
  { name: 'dark',  bg: '#0a0a0a', text: '#ffffff', sub: '#999999', logo: logoSvgDark  },
  { name: 'light', bg: '#ffffff', text: '#0a0a0a', sub: '#999999', logo: logoSvgLight },
]

for (const t of themes) {
  const el = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '1200px',
        height: '630px',
        background: t.bg,
        gap: '0px',
      },
      children: [
        // Logo icon
        {
          type: 'img',
          props: {
            src: t.logo,
            width: 130,
            height: 130,
            style: { marginBottom: '24px' },
          },
        },
        // Wordmark
        {
          type: 'div',
          props: {
            style: {
              fontFamily: 'Geist',
              fontSize: '96px',
              fontWeight: 700,
              color: t.text,
              letterSpacing: '-4px',
              lineHeight: 1,
              marginBottom: '20px',
            },
            children: 'dployr',
          },
        },
        // Slogan
        {
          type: 'div',
          props: {
            style: {
              fontFamily: 'Geist',
              fontSize: '32px',
              fontWeight: 400,
              color: t.sub,
              letterSpacing: '0.5px',
              lineHeight: 1,
            },
            children: 'Ship apps, not infrastructure.',
          },
        },
      ],
    },
  }

  const svgStr = await satori(el, { width: 1200, height: 630, fonts })

  // Composite dot grid on top via sharp
  // Build a dot-grid SVG overlay with center mask
  const dotOverlay = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs>
      <pattern id="d" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="1.3" fill="${t.text}"/>
      </pattern>
      <radialGradient id="g" cx="50%" cy="45%" rx="60%" ry="55%">
        <stop offset="25%" stop-color="white" stop-opacity="0"/>
        <stop offset="72%" stop-color="white" stop-opacity="1"/>
      </radialGradient>
      <mask id="m">
        <rect width="1200" height="630" fill="url(#g)"/>
      </mask>
    </defs>
    <rect width="1200" height="630" fill="url(#d)" mask="url(#m)" opacity="0.13"/>
  </svg>`

  const outPath = join(outDir, `og-${t.name}.png`)

  await sharp(Buffer.from(svgStr))
    .png()
    .composite([{ input: Buffer.from(dotOverlay), blend: 'over' }])
    .toFile(outPath)

  console.log(`Generated ${outPath}`)
}
