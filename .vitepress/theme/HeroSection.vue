<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// ─── Spring physics ───────────────────────────────────────────────
function spring(stiffness: number, damping: number, mass: number) {
  let pos = 0, vel = 0, target = 0
  return {
    set(v: number) { target = v },
    tick(dt: number) {
      if (dt <= 0) return pos
      const f = -stiffness * (pos - target) - damping * vel
      vel += (f / mass) * dt
      pos += vel * dt
      return pos
    },
    get v() { return pos },
  }
}

// ─── Reactive parallax values ─────────────────────────────────────
const glowY  = ref(0)
const textY  = ref(0)
const diagY  = ref(0)
const textOp = ref(1)

const spGlow = spring(60, 20, 0.6)
const spText = spring(80, 22, 0.4)
const spDiag = spring(80, 22, 0.4)
const spOp   = spring(80, 22, 0.4)

let heroEl: HTMLElement | null = null
let rafId = 0
let prevT = 0

function loop(t: number) {
  const dt = Math.min((t - prevT) / 1000, 0.05)
  prevT = t

  const sy = window.scrollY
  const h  = heroEl ? heroEl.offsetHeight : window.innerHeight

  spGlow.set(-40 * Math.min(sy / h, 1))
  spText.set(-90 * Math.min(sy / h, 1))
  spDiag.set( 70 * Math.min(sy / h, 1))
  spOp.set(Math.max(0, 1 - sy / (h * 0.55)))

  glowY.value  = spGlow.tick(dt)
  textY.value  = spText.tick(dt)
  diagY.value  = spDiag.tick(dt)
  textOp.value = spOp.tick(dt)

  rafId = requestAnimationFrame(loop)
}

// ─── Typewriter ───────────────────────────────────────────────────
const LINE1   = 'Your app, your server,'
const LINE2   = 'your '
const WORDS   = ['rules!', 'infrastructure!', 'limits!', 'choice!']
const CHAR_MS = 44
const PAUSE   = 180
const HOLD    = 2600
const SCR_MS  = 560
const SCR_FPS = 26
const CHARS   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

const PH_WAIT = 0, PH_T1 = 1, PH_GAP = 2, PH_T2 = 3, PH_CYCLE = 4

const phase    = ref(PH_WAIT)
const line1    = ref('')
const line2    = ref('')
const wordIdx  = ref(0)
const wordText = ref('')

let tTimer: ReturnType<typeof setTimeout>
let sIval:  ReturnType<typeof setInterval>
let hTimer: ReturnType<typeof setTimeout>

function scramble() {
  const tgt    = WORDS[wordIdx.value]
  const frames = Math.ceil((SCR_MS / 1000) * SCR_FPS)
  const fdelay = Math.round(1000 / SCR_FPS)
  let f = 0
  sIval = setInterval(() => {
    f++
    const settled = Math.floor((f / frames) * tgt.length)
    let s = ''
    for (let i = 0; i < tgt.length; i++)
      s += i < settled ? tgt[i] : CHARS[Math.floor(Math.random() * CHARS.length)]
    wordText.value = s
    if (f >= frames) {
      clearInterval(sIval)
      wordText.value = tgt
      hTimer = setTimeout(() => {
        wordIdx.value = (wordIdx.value + 1) % WORDS.length
        scramble()
      }, HOLD)
    }
  }, fdelay)
}

function typewriter() {
  tTimer = setTimeout(() => {
    phase.value = PH_T1
    let i = 0
    const i1 = setInterval(() => {
      line1.value = LINE1.slice(0, ++i)
      if (i >= LINE1.length) {
        clearInterval(i1)
        tTimer = setTimeout(() => {
          phase.value = PH_GAP
          setTimeout(() => {
            phase.value = PH_T2
            let j = 0
            const i2 = setInterval(() => {
              line2.value = LINE2.slice(0, ++j)
              if (j >= LINE2.length) {
                clearInterval(i2)
                tTimer = setTimeout(() => { phase.value = PH_CYCLE; scramble() }, PAUSE)
              }
            }, CHAR_MS)
          }, 60)
        }, PAUSE)
      }
    }, CHAR_MS)
  }, 980)
}

// ─── Entrance trigger ─────────────────────────────────────────────
const entered = ref(false)

onMounted(() => {
  heroEl = document.querySelector<HTMLElement>('.hs')
  prevT  = performance.now()
  rafId  = requestAnimationFrame(loop)
  requestAnimationFrame(() => { entered.value = true; typewriter() })
})
onUnmounted(() => {
  cancelAnimationFrame(rafId)
  clearTimeout(tTimer); clearTimeout(hTimer); clearInterval(sIval)
})
</script>

<template>
<section class="hs">

  <!-- Ambient glows -->
  <div class="hs-glow hs-glow-tr" aria-hidden="true"
       :style="{ transform: `translateY(${glowY}px)` }"></div>
  <div class="hs-glow hs-glow-bl" aria-hidden="true"
       :style="{ transform: `translateY(${glowY}px)` }"></div>

  <div class="hs-inner">

    <!-- ══ LEFT: text column ═══════════════════════════════════════ -->
    <div class="hs-col-l"
         :style="{ transform: `translateY(${textY}px)`, opacity: textOp }">

      <!-- 1 · Badge -->
      <div :class="['hs-s', entered && 'hs-s--in']" style="--d:0.22s">
        <span class="hs-badge">
          <span class="hs-badge-dot" aria-hidden="true"></span>
          NOW IN PUBLIC BETA
        </span>
      </div>

      <!-- 2 · Headline -->
      <div :class="['hs-s', entered && 'hs-s--in']" style="--d:0.32s">
        <h1 class="hs-h1">
          <span class="hs-l1">{{ line1 }}<span
            v-if="phase === PH_T1" class="hs-caret" aria-hidden="true"></span></span>
          <span class="hs-l2" :class="phase >= PH_GAP && 'hs-l2--vis'">
            {{ line2 }}<span
              v-if="phase === PH_CYCLE" class="hs-word">{{ wordText }}</span><span
              v-if="phase >= PH_T2" class="hs-caret"
              :class="phase === PH_CYCLE && 'hs-caret--blue'" aria-hidden="true"></span>
          </span>
        </h1>
      </div>

      <!-- 3 · Subtext -->
      <div :class="['hs-s', entered && 'hs-s--in']" style="--d:0.42s">
        <p class="hs-sub">
          Globally distributed control plane and lightweight agents for your own infrastructure.
          Deploy any runtime, any server, zero vendor lock-in.
        </p>
      </div>

      <!-- 4 · CTAs -->
      <div :class="['hs-s', entered && 'hs-s--in']" style="--d:0.52s">
        <div class="hs-ctas">
          <a href="https://app.dployr.io" class="hs-btn-p">
            Start Deploying
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2.5"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="/docs/introduction" class="hs-btn-s2">View Docs</a>
        </div>
      </div>

      <!-- 5 · Social proof -->
      <div :class="['hs-s', entered && 'hs-s--in']" style="--d:0.62s">
        <div class="hs-social">
          <div class="hs-avs">
            <span class="hs-av" style="background:#3B82F6"></span>
            <span class="hs-av" style="background:#8B5CF6"></span>
            <span class="hs-av" style="background:#10B981"></span>
            <span class="hs-av" style="background:#F59E0B"></span>
          </div>
          <span class="hs-social-txt">12,000+ developers deploying today</span>
        </div>
      </div>
    </div>

    <!-- ══ RIGHT: deploy flow diagram ══════════════════════════════ -->
    <div class="hs-col-r"
         :class="entered && 'hs-col-r--in'"
         :style="{ transform: `translateY(${diagY}px)`, opacity: textOp }">

      <!-- Shared defs (filter) -->
      <svg width="0" height="0" style="position:absolute;overflow:hidden" aria-hidden="true">
        <defs>
          <filter id="hsgf" x="-80%" y="-80%" width="360%" height="360%">
            <feGaussianBlur stdDeviation="1.8" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
      </svg>

      <!-- Node 1: GitHub Push -->
      <div class="hs-node hs-node--top">
        <span class="hs-node-ico">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="1.8"
               stroke-linecap="round" stroke-linejoin="round">
            <line x1="6" y1="3" x2="6" y2="15"/>
            <circle cx="18" cy="6" r="3"/>
            <circle cx="6" cy="18" r="3"/>
            <path d="M18 9a9 9 0 0 1-9 9"/>
          </svg>
        </span>
        <div>
          <div class="hs-node-lbl">GitHub Push</div>
          <div class="hs-node-sub">→ main</div>
        </div>
      </div>

      <!-- Connector: top → mid 3 -->
      <svg class="hs-conn" viewBox="0 0 300 90" overflow="visible" aria-hidden="true">
        <line x1="150" y1="0" x2="46"  y2="90" stroke="rgba(59,130,246,0.2)" stroke-width="1.2" stroke-dasharray="3 3"/>
        <line x1="150" y1="0" x2="150" y2="90" stroke="rgba(59,130,246,0.2)" stroke-width="1.2" stroke-dasharray="3 3"/>
        <line x1="150" y1="0" x2="254" y2="90" stroke="rgba(59,130,246,0.2)" stroke-width="1.2" stroke-dasharray="3 3"/>
        <path id="hsp1" d="M150,0 L46,90"  fill="none"/>
        <path id="hsp2" d="M150,0 L150,90" fill="none"/>
        <path id="hsp3" d="M150,0 L254,90" fill="none"/>
        <circle r="4" fill="rgba(59,130,246,0.7)" filter="url(#hsgf)">
          <animateMotion dur="1.4s" repeatCount="indefinite" begin="0s"><mpath href="#hsp1"/></animateMotion>
        </circle>
        <circle r="4" fill="rgba(59,130,246,0.7)" filter="url(#hsgf)">
          <animateMotion dur="1.7s" repeatCount="indefinite" begin="0.38s"><mpath href="#hsp2"/></animateMotion>
        </circle>
        <circle r="4" fill="rgba(59,130,246,0.7)" filter="url(#hsgf)">
          <animateMotion dur="1.5s" repeatCount="indefinite" begin="0.72s"><mpath href="#hsp3"/></animateMotion>
        </circle>
      </svg>

      <!-- Nodes 2/3/4: Build / Test / Lint -->
      <div class="hs-mid">
        <div class="hs-node hs-node--sm">
          <span class="hs-dot hs-dot--blue"></span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
          <span>Build</span>
        </div>
        <div class="hs-node hs-node--sm">
          <span class="hs-dot hs-dot--green" style="animation-delay:.3s"></span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>Test</span>
        </div>
        <div class="hs-node hs-node--sm">
          <span class="hs-dot hs-dot--green" style="animation-delay:.6s"></span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" y1="6" x2="20" y2="6"/>
            <line x1="4" y1="12" x2="14" y2="12"/>
            <line x1="4" y1="18" x2="18" y2="18"/>
          </svg>
          <span>Lint</span>
        </div>
      </div>

      <!-- Connector: mid 3 → bottom -->
      <svg class="hs-conn" viewBox="0 0 300 90" overflow="visible" aria-hidden="true">
        <line x1="46"  y1="0" x2="150" y2="90" stroke="rgba(59,130,246,0.2)" stroke-width="1.2" stroke-dasharray="3 3"/>
        <line x1="150" y1="0" x2="150" y2="90" stroke="rgba(59,130,246,0.2)" stroke-width="1.2" stroke-dasharray="3 3"/>
        <line x1="254" y1="0" x2="150" y2="90" stroke="rgba(59,130,246,0.2)" stroke-width="1.2" stroke-dasharray="3 3"/>
        <path id="hsp4" d="M46,0 L150,90"  fill="none"/>
        <path id="hsp5" d="M150,0 L150,90" fill="none"/>
        <path id="hsp6" d="M254,0 L150,90" fill="none"/>
        <circle r="4" fill="rgba(59,130,246,0.7)" filter="url(#hsgf)">
          <animateMotion dur="1.3s" repeatCount="indefinite" begin="0.25s"><mpath href="#hsp4"/></animateMotion>
        </circle>
        <circle r="4" fill="rgba(59,130,246,0.7)" filter="url(#hsgf)">
          <animateMotion dur="1.6s" repeatCount="indefinite" begin="0.6s"><mpath href="#hsp5"/></animateMotion>
        </circle>
        <circle r="4" fill="rgba(59,130,246,0.7)" filter="url(#hsgf)">
          <animateMotion dur="1.45s" repeatCount="indefinite" begin="0.95s"><mpath href="#hsp6"/></animateMotion>
        </circle>
      </svg>

      <!-- Node 5: Deploy -->
      <div class="hs-node hs-node--deploy">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
        Deploy
        <span class="hs-live">✓ LIVE</span>
      </div>

    </div>
  </div>
</section>
</template>

<style scoped>
/* ─── Layout ─────────────────────────────────────────────────────── */
.hs {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 110px 0 80px;
  overflow: hidden;
}
.hs-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
  align-items: center;
}

/* ─── Glows ──────────────────────────────────────────────────────── */
.hs-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.hs-glow-tr {
  width: 640px; height: 640px;
  top: -120px; right: -80px;
  background: radial-gradient(circle, rgba(59,130,246,0.055) 0%, transparent 70%);
  filter: blur(50px);
}
.hs-glow-bl {
  width: 420px; height: 420px;
  bottom: 0; left: -60px;
  background: radial-gradient(circle, rgba(59,130,246,0.035) 0%, transparent 70%);
  filter: blur(60px);
}

/* ─── Stagger entrance ───────────────────────────────────────────── */
.hs-s {
  opacity: 0;
  transform: translateY(32px);
}
.hs-s--in {
  animation: hs-enter 0.72s cubic-bezier(0.22,1,0.36,1) var(--d, 0s) forwards;
}
@keyframes hs-enter {
  to { opacity: 1; transform: translateY(0); }
}

/* ─── Text column ────────────────────────────────────────────────── */
.hs-col-l {
  display: flex;
  flex-direction: column;
  will-change: transform, opacity;
}

/* ─── Badge ──────────────────────────────────────────────────────── */
.hs-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid rgba(59,130,246,0.2);
  background: rgba(59,130,246,0.06);
  color: rgba(100,160,255,0.9);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 30px;
  width: fit-content;
}
.hs-badge-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
  animation: hs-pulse 2s ease-in-out infinite;
}
@keyframes hs-pulse {
  0%, 100% { opacity: 0.6; transform: scale(1);   }
  50%       { opacity: 1;   transform: scale(1.1); }
}

/* ─── Headline ───────────────────────────────────────────────────── */
.hs-h1 {
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-size: clamp(42px, 5.2vw, 70px);
  font-weight: 700;
  letter-spacing: -2.4px;
  line-height: 1.06;
  margin: 0 0 24px;
  color: var(--t1, #0f1117);
  display: flex;
  flex-direction: column;
  gap: 0.04em;
}
.hs-l1 { display: block; min-height: 1.1em; }
.hs-l2 {
  display: block;
  min-height: 1.1em;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.38s cubic-bezier(0.22,1,0.36,1),
              transform 0.38s cubic-bezier(0.22,1,0.36,1);
}
.hs-l2--vis { opacity: 1; transform: translateY(0); }

.hs-caret {
  display: inline-block;
  width: 3px;
  height: 0.82em;
  border-radius: 1.5px;
  background: var(--t2, #374151);
  margin-left: 3px;
  vertical-align: text-bottom;
  animation: hs-blink 0.95s ease-in-out infinite;
}
.hs-caret--blue { background: rgba(59,130,246,0.75); }
@keyframes hs-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
.hs-word {
  color: rgba(59,130,246,0.9);
  font-variant-numeric: tabular-nums;
}

/* ─── Subtext ────────────────────────────────────────────────────── */
.hs-sub {
  font-size: 16px;
  color: var(--t2, #4b5563);
  line-height: 1.68;
  max-width: 430px;
  margin: 0 0 28px;
  border-left: 2px solid rgba(59,130,246,0.3);
  padding-left: 16px;
}

/* ─── Buttons ────────────────────────────────────────────────────── */
.hs-ctas {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 48px;
}
.hs-btn-p {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 46px;
  padding: 0 24px;
  border-radius: 10px;
  background: rgba(59,130,246,0.15);
  border: 1px solid rgba(59,130,246,0.3);
  color: #fff;
  font-size: 14.5px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}
.hs-btn-p:hover {
  background: rgba(59,130,246,0.25);
  border-color: rgba(59,130,246,0.55);
  box-shadow: 0 0 20px rgba(59,130,246,0.2);
}
.hs-btn-s2 {
  display: inline-flex;
  align-items: center;
  height: 46px;
  padding: 0 24px;
  border-radius: 10px;
  background: transparent;
  border: 1px solid var(--border, rgba(0,0,0,0.1));
  color: var(--t3, #6b7280);
  font-size: 14.5px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  transition: border-color 0.18s ease, color 0.18s ease;
}
.hs-btn-s2:hover {
  border-color: rgba(59,130,246,0.3);
  color: var(--t1, #0f1117);
}

/* ─── Social proof ───────────────────────────────────────────────── */
.hs-social { display: flex; align-items: center; gap: 10px; }
.hs-avs    { display: flex; }
.hs-av {
  width: 24px; height: 24px;
  border-radius: 50%;
  border: 2px solid var(--bg, #ffffff);
  margin-left: -8px;
  opacity: 0.75;
  flex-shrink: 0;
}
.hs-av:first-child { margin-left: 0; }
.hs-social-txt { font-size: 13px; color: var(--t3, #6b7280); font-weight: 400; }

/* ─── Diagram column ─────────────────────────────────────────────── */
.hs-col-r {
  display: flex;
  flex-direction: column;
  align-items: center;
  will-change: transform, opacity;
  opacity: 0;
  transform: translateX(24px);
}
.hs-col-r--in {
  animation: hs-diag-in 0.85s cubic-bezier(0.22,1,0.36,1) 0.3s forwards;
}
@keyframes hs-diag-in {
  to { opacity: 1; transform: translateX(0); }
}

/* ─── Nodes ──────────────────────────────────────────────────────── */
.hs-node {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 12px 18px;
  border-radius: 10px;
  background: var(--card, rgba(255,255,255,0.05));
  border: 1px solid var(--border, rgba(255,255,255,0.09));
  font-size: 13px;
  font-weight: 600;
  color: var(--t1, #f3f4f8);
  backdrop-filter: blur(10px);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: default;
}
.hs-node:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(59,130,246,0.14);
}
.hs-node--top {
  width: 100%;
  justify-content: flex-start;
}
.hs-node-ico { color: var(--t3, #7b8698); display: flex; }
.hs-node-lbl { font-weight: 700; font-size: 14px; }
.hs-node-sub { font-size: 11px; color: var(--t3, #7b8698); font-weight: 400; margin-top: 1px; }

.hs-mid { display: flex; gap: 8px; width: 100%; }
.hs-node--sm {
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 8px;
  font-size: 12px;
  gap: 5px;
  text-align: center;
  color: var(--t2, #c9d0df);
}

.hs-node--deploy {
  width: 100%;
  justify-content: center;
  background: rgba(59,130,246,0.08);
  border-color: rgba(59,130,246,0.3);
  color: rgba(100,160,255,0.95);
  font-weight: 700;
  font-size: 14px;
}
.hs-node--deploy:hover { box-shadow: 0 8px 32px rgba(59,130,246,0.22); }
.hs-live {
  margin-left: 4px;
  font-size: 10px;
  background: #10B981;
  color: #fff;
  padding: 2px 7px;
  border-radius: 4px;
  letter-spacing: 0.05em;
  font-weight: 700;
}

/* Status dots */
.hs-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  animation: hs-dot-pulse 2s ease-in-out infinite;
}
.hs-dot--blue  { background: #3B82F6; box-shadow: 0 0 6px rgba(59,130,246,0.8); }
.hs-dot--green { background: #10B981; box-shadow: 0 0 6px rgba(16,185,129,0.8); }
@keyframes hs-dot-pulse {
  0%, 100% { opacity: 0.8; transform: scale(1);   }
  50%       { opacity: 1;   transform: scale(1.2); }
}

/* SVG connectors */
.hs-conn {
  width: 100%;
  height: 56px;
  overflow: visible;
  flex-shrink: 0;
  display: block;
}

/* ─── Responsive ─────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .hs-inner { grid-template-columns: 1fr; gap: 48px; }
  .hs-col-r { order: -1; max-width: 420px; }
}
@media (max-width: 640px) {
  .hs { padding: 80px 0 60px; }
  .hs-inner { padding: 0 24px; gap: 36px; }
  .hs-h1 { letter-spacing: -1.5px; }
}
</style>
