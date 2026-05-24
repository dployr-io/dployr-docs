<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// ─── Scroll parallax ──────────────────────────────────────────────
// Only apply a gentle translateY to the right card — never to the text
// column and never an opacity fade, both of which cause sub-pixel blur.
const diagY = ref(0)
const glowY = ref(0)

let heroH   = 900
let rafId   = 0
let pending = false

function applyParallax() {
  const sy   = window.scrollY
  const pct  = Math.min(sy / heroH, 1)
  const mobile = window.innerWidth <= 960
  diagY.value = mobile ? 0 : 55 * pct
  glowY.value = -30 * pct
  pending = false
}
function onScroll() {
  if (!pending) { pending = true; rafId = requestAnimationFrame(applyParallax) }
}
function onResize() {
  const el = document.querySelector<HTMLElement>('.hs')
  if (el) heroH = el.offsetHeight
}

// ─── Rotating word (no typewriter — no layout shift) ─────────────
// The sizer span always holds "infrastructure!" (longest word),
// so the h1 never changes size during cycling.
const WORDS   = ['your rules!', 'your limits!', 'your choice!', 'your infrastructure!']
const wordIdx = ref(0)
let wordTimer: ReturnType<typeof setInterval>

function startWordCycle() {
  wordTimer = setInterval(() => {
    wordIdx.value = (wordIdx.value + 1) % WORDS.length
  }, 2800)
}

// ─── Deploy animation (right panel) ──────────────────────────────
const CMD = '$ dployr deploy --env prod --region all'

interface LogLine { text: string; cls: string }
const dpTyped   = ref(0)
const dpCursor  = ref(false)
const dpLog     = ref<LogLine[]>([])
const dpBuildGo = ref(false)
const dpNetShow = ref(false)
const dpLiveShow= ref(false)
const dpStats   = ref({ ms: 0, up: '0.0', reg: 0 })

const LOGS: LogLine[] = [
  { text: '  Connecting to control plane...', cls: 'dpl-info' },
  { text: '  ✓ Auth verified · token ok',     cls: 'dpl-ok'   },
  { text: '  ↻ Building node:20-alpine...',   cls: 'dpl-spin' },
  { text: '  ✓ Image pushed · 34s',           cls: 'dpl-ok'   },
  { text: '  ↻ Rolling out to 3 agents...',   cls: 'dpl-spin' },
]

let _tt: ReturnType<typeof setTimeout>[] = []
function _t(fn: () => void, ms: number) { const id = setTimeout(fn, ms); _tt.push(id) }
function _clear() { _tt.forEach(clearTimeout); _tt = [] }

function startDeploy() {
  _clear()
  dpTyped.value   = 0
  dpCursor.value  = true
  dpLog.value     = []
  dpBuildGo.value = false
  dpNetShow.value = false
  dpLiveShow.value= false
  dpStats.value   = { ms: 0, up: '0.0', reg: 0 }

  // type command
  let i = 0
  const typeNext = () => {
    if (i < CMD.length) {
      dpTyped.value = ++i
      _t(typeNext, 38 + Math.random() * 26)
    } else {
      dpCursor.value = false
      emitLogs()
    }
  }
  _t(typeNext, 400)

  function emitLogs() {
    const offsets = [250, 850, 1500, 1600, 2350]
    LOGS.forEach((log, idx) => {
      _t(() => {
        dpLog.value.push(log)
        if (idx === 2) _t(() => { dpBuildGo.value = true }, 80)
        if (idx === LOGS.length - 1) {
          _t(() => { dpNetShow.value = true }, 500)
          _t(() => { dpLiveShow.value = true; animateStats() }, 1300)
          _t(() => startDeploy(), 5200)
        }
      }, offsets[idx])
    })
  }

  function animateStats() {
    let f = 0
    const tick = () => {
      f++
      const p = Math.min(f / 32, 1)
      dpStats.value.ms  = Math.round(12 * p)
      dpStats.value.up  = (99.9 * p).toFixed(1)
      dpStats.value.reg = Math.round(8 * p)
      if (f < 32) _t(tick, 36)
    }
    tick()
  }
}

// ─── Dark mode tracker (watches .dark on <html>) ─────────────────
const isDark = ref(false)
let _themeObs: MutationObserver | null = null

// ─── Entrance ─────────────────────────────────────────────────────
const entered = ref(false)

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
  _themeObs = new MutationObserver(() => {
    isDark.value = document.documentElement.classList.contains('dark')
  })
  _themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  onResize()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize, { passive: true })
  requestAnimationFrame(() => {
    entered.value = true
    startWordCycle()
    setTimeout(() => startDeploy(), 700)
  })
})
onUnmounted(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  clearInterval(wordTimer)
  _clear()
  _themeObs?.disconnect()
})
</script>

<template>
<section class="hs">

  <div class="hs-glow hs-glow-tr" aria-hidden="true"
       :style="{ transform: `translateY(${glowY}px)` }"></div>
  <div class="hs-glow hs-glow-bl" aria-hidden="true"
       :style="{ transform: `translateY(${glowY}px)` }"></div>

  <div class="hs-inner">

    <!-- ══ LEFT ════════════════════════════════════════════════════ -->
    <div class="hs-par-l">
      <div class="hs-col-l" :class="entered && 'hs-col-l--in'">

        <div class="hs-s" style="--d:0.18s">
          <span class="hs-badge">
            <span class="hs-badge-dot" aria-hidden="true"></span>
            NOW IN PUBLIC BETA
          </span>
        </div>

        <div class="hs-s" style="--d:0.28s">
          <h1 class="hs-h1">
            <span class="hs-l1">Your app, your server,</span>
            <!-- Sizer holds the longest word so the line never reflows -->
            <span class="hs-l2" aria-live="polite">
              <span class="hs-word-slot">
                <span class="hs-word-sizer" aria-hidden="true">your infrastructure!</span>
                <span v-for="(w, i) in WORDS" :key="w"
                      class="hs-word-opt"
                      :class="wordIdx === i && 'hs-word-opt--on'">{{ w }}</span>
              </span>
            </span>
          </h1>
        </div>

        <div class="hs-s" style="--d:0.40s">
          <p class="hs-sub">
            Globally distributed control plane and lightweight agents for your own
            infrastructure. Deploy any runtime, any server, zero vendor lock-in.
          </p>
        </div>

        <div class="hs-s" style="--d:0.52s">
          <div class="hs-ctas">
            <a href="https://app.dployr.io" class="hs-btn-p">
              Start Deploying
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2.5"
                   stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="/docs/quickstart" class="hs-btn-s2">View Docs</a>
          </div>
        </div>

        <div class="hs-s" style="--d:0.62s">
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
    </div>

    <!-- ══ RIGHT — Cinematic deploy panel ══════════════════════════ -->
    <div class="hs-par-r"
         :style="{ transform: `translateY(${diagY}px)` }">
      <div class="hs-col-r" :class="entered && 'hs-col-r--in'">

        <!-- ambient bloom behind card -->
        <div class="dp-bloom" aria-hidden="true"></div>

        <div class="dp-card">

          <!-- ── Terminal ── -->
          <div class="dp-term">
            <div class="dp-term-bar">
              <span class="dp-wd dp-wd--r"></span>
              <span class="dp-wd dp-wd--y"></span>
              <span class="dp-wd dp-wd--g"></span>
              <span class="dp-term-lbl">dployr&nbsp;·&nbsp;terminal</span>
              <span class="dp-env">prod</span>
            </div>

            <div class="dp-term-body">
              <!-- Command line -->
              <div class="dp-cmd-row" v-if="dpTyped > 0 || dpCursor">
                <span class="dp-cmd-text">{{ CMD.slice(0, dpTyped) }}</span><span
                  v-if="dpCursor" class="dp-blk-cursor" aria-hidden="true"></span>
              </div>

              <!-- Log lines -->
              <transition-group name="dp-log" tag="div">
                <div v-for="(ln, i) in dpLog" :key="i"
                     class="dp-log-line" :class="ln.cls">{{ ln.text }}</div>
              </transition-group>

              <!-- Progress bar -->
              <Transition name="dp-fade">
                <div v-if="dpBuildGo" class="dp-prog-wrap">
                  <div class="dp-prog-track">
                    <div class="dp-prog-fill"
                         :style="{ width: dpBuildGo ? '100%' : '0%' }"></div>
                    <div class="dp-prog-shine"></div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- ── Network flow ── -->
          <Transition name="dp-rise">
            <div v-if="dpNetShow" class="dp-net">
              <div class="dp-net-label">infrastructure&nbsp;map</div>

              <svg class="dp-net-svg" viewBox="0 0 380 158"
                   preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                <defs>
                  <filter id="dp-glow-f" x="-120%" y="-120%" width="340%" height="340%">
                    <feGaussianBlur stdDeviation="2.5" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                  <linearGradient id="dp-lg1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stop-color="rgba(59,130,246,0.15)"/>
                    <stop offset="100%" stop-color="rgba(139,92,246,0.45)"/>
                  </linearGradient>
                  <linearGradient id="dp-lg2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stop-color="rgba(139,92,246,0.3)"/>
                    <stop offset="100%" stop-color="rgba(16,185,129,0.5)"/>
                  </linearGradient>
                </defs>

                <!-- Hidden motion paths -->
                <path id="dp-p1" d="M58,79 C100,79 110,79 150,79" fill="none"/>
                <path id="dp-p2" d="M212,79 C240,79 256,28 278,28" fill="none"/>
                <path id="dp-p3" d="M212,79 C240,79 260,79 278,79" fill="none"/>
                <path id="dp-p4" d="M212,79 C240,79 256,130 278,130" fill="none"/>

                <!-- Visible connector lines -->
                <path d="M58,79 C100,79 110,79 150,79"
                      stroke="url(#dp-lg1)" stroke-width="1.4"
                      stroke-dasharray="5 4" fill="none"/>
                <path d="M212,79 C240,79 256,28 278,28"
                      stroke="url(#dp-lg2)" stroke-width="1.4"
                      stroke-dasharray="5 4" fill="none"/>
                <path d="M212,79 C240,79 260,79 278,79"
                      stroke="url(#dp-lg2)" stroke-width="1.4"
                      stroke-dasharray="5 4" fill="none"/>
                <path d="M212,79 C240,79 256,130 278,130"
                      stroke="url(#dp-lg2)" stroke-width="1.4"
                      stroke-dasharray="5 4" fill="none"/>

                <!-- Source node -->
                <g>
                  <rect x="8" y="61" width="50" height="36" rx="8"
                        :fill="isDark ? 'rgba(10,14,32,0.92)' : 'rgba(235,242,255,0.95)'"
                        stroke="rgba(59,130,246,0.45)" stroke-width="1"/>
                  <text x="33" y="76" text-anchor="middle"
                        fill="rgba(100,160,255,0.9)" font-size="9"
                        font-weight="700" font-family="ui-monospace,monospace">Push</text>
                  <text x="33" y="89" text-anchor="middle"
                        :fill="isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.38)'" font-size="7.5"
                        font-family="ui-monospace,monospace">→ main</text>
                  <circle cx="33" cy="69" r="2.5" fill="#3B82F6">
                    <animate attributeName="opacity" values="0.4;1;0.4"
                             dur="1.6s" repeatCount="indefinite"/>
                  </circle>
                </g>

                <!-- Registry / Build node -->
                <g>
                  <rect x="150" y="57" width="62" height="44" rx="8"
                        :fill="isDark ? 'rgba(10,14,32,0.92)' : 'rgba(235,242,255,0.95)'"
                        stroke="rgba(139,92,246,0.55)" stroke-width="1"/>
                  <text x="181" y="74" text-anchor="middle"
                        fill="rgba(167,139,250,0.95)" font-size="9"
                        font-weight="700" font-family="ui-monospace,monospace">Build</text>
                  <text x="181" y="87" text-anchor="middle"
                        :fill="isDark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.38)'" font-size="7.5"
                        font-family="ui-monospace,monospace">registry</text>
                  <circle cx="181" cy="67" r="2.5" fill="#8B5CF6">
                    <animate attributeName="opacity" values="0.4;1;0.4"
                             dur="2s" repeatCount="indefinite"/>
                  </circle>
                </g>

                <!-- Agent nodes (right column) -->
                <!-- Agent 1 -->
                <g>
                  <rect x="278" y="10" width="92" height="36" rx="8"
                        :fill="isDark ? 'rgba(10,14,32,0.92)' : 'rgba(235,242,255,0.95)'"
                        stroke="rgba(16,185,129,0.4)" stroke-width="1"/>
                  <circle cx="291" cy="23" r="3" fill="#10B981">
                    <animate attributeName="opacity" values="0.5;1;0.5"
                             dur="1.8s" repeatCount="indefinite"/>
                  </circle>
                  <text x="300" y="26" fill="rgba(52,211,153,0.9)" font-size="8.5"
                        font-weight="700" font-family="ui-monospace,monospace">us-east-1</text>
                  <text x="291" y="39" :fill="isDark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.38)'" font-size="7.5"
                        font-family="ui-monospace,monospace">12ms · live</text>
                </g>

                <!-- Agent 2 -->
                <g>
                  <rect x="278" y="61" width="92" height="36" rx="8"
                        :fill="isDark ? 'rgba(10,14,32,0.92)' : 'rgba(235,242,255,0.95)'"
                        stroke="rgba(16,185,129,0.4)" stroke-width="1"/>
                  <circle cx="291" cy="74" r="3" fill="#10B981">
                    <animate attributeName="opacity" values="0.5;1;0.5"
                             dur="2.2s" repeatCount="indefinite" begin="0.5s"/>
                  </circle>
                  <text x="300" y="77" fill="rgba(52,211,153,0.9)" font-size="8.5"
                        font-weight="700" font-family="ui-monospace,monospace">eu-west-1</text>
                  <text x="291" y="90" :fill="isDark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.38)'" font-size="7.5"
                        font-family="ui-monospace,monospace">24ms · live</text>
                </g>

                <!-- Agent 3 -->
                <g>
                  <rect x="278" y="112" width="92" height="36" rx="8"
                        :fill="isDark ? 'rgba(10,14,32,0.92)' : 'rgba(235,242,255,0.95)'"
                        stroke="rgba(16,185,129,0.4)" stroke-width="1"/>
                  <circle cx="291" cy="125" r="3" fill="#10B981">
                    <animate attributeName="opacity" values="0.5;1;0.5"
                             dur="1.5s" repeatCount="indefinite" begin="1s"/>
                  </circle>
                  <text x="300" y="128" fill="rgba(52,211,153,0.9)" font-size="8.5"
                        font-weight="700" font-family="ui-monospace,monospace">ap-south-1</text>
                  <text x="291" y="141" :fill="isDark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.38)'" font-size="7.5"
                        font-family="ui-monospace,monospace">38ms · live</text>
                </g>

                <!-- Particles -->
                <!-- Path 1: push → build (blue) -->
                <circle r="3.5" fill="rgba(96,165,250,0.9)" filter="url(#dp-glow-f)">
                  <animateMotion dur="1.1s" repeatCount="indefinite" begin="0s">
                    <mpath href="#dp-p1"/>
                  </animateMotion>
                </circle>
                <circle r="2.5" fill="rgba(96,165,250,0.55)" filter="url(#dp-glow-f)">
                  <animateMotion dur="1.1s" repeatCount="indefinite" begin="0.55s">
                    <mpath href="#dp-p1"/>
                  </animateMotion>
                </circle>

                <!-- Path 2: build → agent1 (purple) -->
                <circle r="3.5" fill="rgba(167,139,250,0.9)" filter="url(#dp-glow-f)">
                  <animateMotion dur="0.95s" repeatCount="indefinite" begin="0s">
                    <mpath href="#dp-p2"/>
                  </animateMotion>
                </circle>
                <!-- Path 3: build → agent2 (purple) -->
                <circle r="3.5" fill="rgba(167,139,250,0.9)" filter="url(#dp-glow-f)">
                  <animateMotion dur="0.9s" repeatCount="indefinite" begin="0.35s">
                    <mpath href="#dp-p3"/>
                  </animateMotion>
                </circle>
                <!-- Path 4: build → agent3 (purple) -->
                <circle r="3.5" fill="rgba(167,139,250,0.9)" filter="url(#dp-glow-f)">
                  <animateMotion dur="1.0s" repeatCount="indefinite" begin="0.68s">
                    <mpath href="#dp-p4"/>
                  </animateMotion>
                </circle>
              </svg>
            </div>
          </Transition>

          <!-- ── Live stats bar ── -->
          <Transition name="dp-rise">
            <div v-if="dpLiveShow" class="dp-live-bar">
              <div class="dp-live-pill">
                <span class="dp-live-dot" aria-hidden="true"></span>
                LIVE
              </div>
              <div class="dp-stat-group">
                <div class="dp-stat">
                  <span class="dp-stat-val">{{ dpStats.ms }}ms</span>
                  <span class="dp-stat-lbl">latency</span>
                </div>
                <div class="dp-stat-sep"></div>
                <div class="dp-stat">
                  <span class="dp-stat-val">{{ dpStats.up }}%</span>
                  <span class="dp-stat-lbl">uptime</span>
                </div>
                <div class="dp-stat-sep"></div>
                <div class="dp-stat">
                  <span class="dp-stat-val">{{ dpStats.reg }}</span>
                  <span class="dp-stat-lbl">regions</span>
                </div>
              </div>
            </div>
          </Transition>

        </div><!-- /.dp-card -->
      </div>
    </div>

  </div>
</section>
</template>

<style scoped>
/* ─── Theme tokens ───────────────────────────────────────────────── */
/* :global() strips the scoped attribute so these land on :root/.dark */
:global(:root) {
  --hs-t1:     #0f1117;
  --hs-t2:     #4b5563;
  --hs-t3:     #6b7280;
  --hs-bg:     #ffffff;
  --hs-border: rgba(0, 0, 0, 0.1);

  /* deploy card — light mode */
  --hs-card-bg:     rgba(255, 255, 255, 0.88);
  --hs-card-border: rgba(0, 0, 0, 0.08);
  --hs-card-top:    rgba(0, 0, 0, 0.1);
  --hs-card-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 32px 64px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.9);
  --hs-tbar-bg:     rgba(0, 0, 0, 0.03);
  --hs-tbar-border: rgba(0, 0, 0, 0.06);
  --hs-tlbl:        rgba(0, 0, 0, 0.32);
  --hs-net-bg:      rgba(248, 250, 252, 0.8);
  --hs-net-border:  rgba(0, 0, 0, 0.06);
  --hs-netlbl:      rgba(0, 0, 0, 0.3);
  --hs-live-bg:     rgba(248, 250, 252, 0.6);
  --hs-stat-val:    rgba(15, 17, 25, 0.82);
  --hs-stat-lbl:    rgba(0, 0, 0, 0.35);
  --hs-stat-sep:    rgba(0, 0, 0, 0.1);

  /* terminal body — light mode */
  --hs-tbody-bg:    #f1f5fb;
  --hs-tcmd:        rgba(15, 17, 25, 0.92);
  --hs-tinfo:       rgba(0, 0, 0, 0.35);
  --hs-tok:         #059669;
  --hs-tspin:       #2563eb;
  --hs-tcursor:     rgba(15, 17, 25, 0.7);
  --hs-prog-track:  rgba(0, 0, 0, 0.08);
}
:global(.dark) {
  --hs-t1:     #f1f5f9;
  --hs-t2:     #94a3b8;
  --hs-t3:     #64748b;
  --hs-bg:     #000000;
  --hs-border: rgba(255, 255, 255, 0.1);

  /* deploy card — dark mode */
  --hs-card-bg:     linear-gradient(145deg, rgba(8,12,28,0.97) 0%, rgba(10,8,22,0.97) 100%);
  --hs-card-border: rgba(255, 255, 255, 0.075);
  --hs-card-top:    rgba(255, 255, 255, 0.11);
  --hs-card-shadow: 0 0 0 1px rgba(59,130,246,0.06), 0 0 60px rgba(59,130,246,0.07), 0 0 120px rgba(139,92,246,0.04), 0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.055);
  --hs-tbar-bg:     rgba(255, 255, 255, 0.025);
  --hs-tbar-border: rgba(255, 255, 255, 0.055);
  --hs-tlbl:        rgba(255, 255, 255, 0.28);
  --hs-net-bg:      rgba(0, 0, 0, 0.15);
  --hs-net-border:  rgba(255, 255, 255, 0.055);
  --hs-netlbl:      rgba(255, 255, 255, 0.2);
  --hs-live-bg:     rgba(0, 0, 0, 0.2);
  --hs-stat-val:    rgba(230, 240, 255, 0.82);
  --hs-stat-lbl:    rgba(255, 255, 255, 0.25);
  --hs-stat-sep:    rgba(255, 255, 255, 0.07);

  /* terminal body — dark mode */
  --hs-tbody-bg:    #0d1117;
  --hs-tcmd:        rgba(230, 240, 255, 0.92);
  --hs-tinfo:       rgba(255, 255, 255, 0.38);
  --hs-tok:         rgba(52, 211, 153, 0.85);
  --hs-tspin:       rgba(96, 165, 250, 0.85);
  --hs-tcursor:     rgba(100, 160, 255, 0.8);
  --hs-prog-track:  rgba(255, 255, 255, 0.07);
}

/* ─── Section layout ─────────────────────────────────────────────── */
.hs {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 110px 0 80px;
  overflow: hidden;
  background: var(--hs-bg);
  transition: background-color 0.3s ease;
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

/* ─── Background glows ───────────────────────────────────────────── */
.hs-glow { position: absolute; border-radius: 50%; pointer-events: none; }
.hs-glow-tr {
  width: 700px; height: 700px; top: -140px; right: -100px;
  background: radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%);
  filter: blur(60px);
}
.hs-glow-bl {
  width: 500px; height: 500px; bottom: -60px; left: -80px;
  background: radial-gradient(circle, rgba(139,92,246,0.045) 0%, transparent 70%);
  filter: blur(70px);
}

/* ─── Parallax wrappers ──────────────────────────────────────────── */
.hs-par-l { /* left column — no scroll transform, stays crisp */ }
.hs-par-r { /* right card only gets a gentle translateY on scroll */ }

/* ─── Left entrance ──────────────────────────────────────────────── */
.hs-col-l {
  display: flex; flex-direction: column;
  opacity: 0; transform: translateY(24px);
  transition:
    opacity  0.55s cubic-bezier(0.22,1,0.36,1) 0.05s,
    transform 0.65s cubic-bezier(0.22,1,0.36,1) 0.05s;
}
.hs-col-l--in { opacity: 1; transform: translateY(0); }

.hs-s {
  opacity: 0; transform: translateY(18px);
  transition:
    opacity  0.60s cubic-bezier(0.22,1,0.36,1) var(--d, 0.2s),
    transform 0.60s cubic-bezier(0.22,1,0.36,1) var(--d, 0.2s);
}
.hs-col-l--in .hs-s { opacity: 1; transform: translateY(0); }

/* ─── Badge ──────────────────────────────────────────────────────── */
.hs-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 14px; border-radius: 999px;
  border: 1px solid rgba(59,130,246,0.2);
  background: rgba(59,130,246,0.06);
  color: rgba(100,160,255,0.9);
  font-size: 12px; font-weight: 500; letter-spacing: 0.04em;
  text-transform: uppercase; margin-bottom: 30px; width: fit-content;
}
.hs-badge-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: currentColor; flex-shrink: 0;
  animation: hs-pulse 2s ease-in-out infinite;
}
@keyframes hs-pulse { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.1)} }

/* ─── Headline ───────────────────────────────────────────────────── */
.hs-h1 {
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-size: clamp(42px, 5.2vw, 70px);
  font-weight: 700; letter-spacing: -2.4px; line-height: 1.06;
  margin: 0 0 24px; color: var(--hs-t1);
  display: flex; flex-direction: column; gap: 0.04em;
  transition: color 0.3s ease;
}
.hs-l1 { display: block; }
.hs-l2 { display: block; }

/* Word slot — always occupies the width/height of the longest word.
   All variants are absolutely stacked inside and crossfade. */
.hs-word-slot {
  position: relative;
  display: inline-block;
}
.hs-word-sizer {
  /* reserves space — invisible but occupies layout */
  visibility: hidden;
  pointer-events: none;
  display: inline-block;
  color: transparent;
}
.hs-word-opt {
  position: absolute;
  left: 0; top: 0;
  white-space: nowrap;
  color: rgba(59,130,246,0.92);
  opacity: 0;
  transform: translateY(10px) scale(0.97);
  filter: blur(4px);
  transition:
    opacity   0.55s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    filter    0.55s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}
.hs-word-opt--on {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0px);
  pointer-events: auto;
}

/* ─── Subtext ────────────────────────────────────────────────────── */
.hs-sub {
  font-size: 16px; color: var(--hs-t2); line-height: 1.68;
  max-width: 430px; margin: 0 0 28px;
  border-left: 2px solid rgba(59,130,246,0.3); padding-left: 16px;
  transition: color 0.3s ease;
}

/* ─── Buttons ────────────────────────────────────────────────────── */
.hs-ctas { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 48px; }
.hs-btn-p {
  display: inline-flex; align-items: center; gap: 8px;
  height: 46px; padding: 0 24px; border-radius: 10px;
  background: #3B82F6; border: 1px solid #3B82F6;
  color: #fff; font-size: 14.5px; font-weight: 600;
  text-decoration: none; white-space: nowrap;
  transition: background .18s, border-color .18s, box-shadow .18s;
}
.hs-btn-p:hover {
  background: #06B6D4; border-color: #06B6D4;
  box-shadow: 0 0 28px rgba(59,130,246,0.4);
}
.hs-btn-s2 {
  display: inline-flex; align-items: center;
  height: 46px; padding: 0 24px; border-radius: 10px;
  background: transparent; border: 1px solid var(--hs-border);
  color: var(--hs-t3); font-size: 14.5px; font-weight: 600;
  text-decoration: none; white-space: nowrap;
  transition: border-color .18s, color .18s;
}
.hs-btn-s2:hover { border-color: rgba(59,130,246,0.3); color: var(--hs-t1); }

/* ─── Social proof ───────────────────────────────────────────────── */
.hs-social { display: flex; align-items: center; gap: 10px; }
.hs-avs    { display: flex; }
.hs-av {
  width: 24px; height: 24px; border-radius: 50%;
  border: 2px solid var(--hs-bg);
  margin-left: -8px; opacity: 0.75; flex-shrink: 0;
}
.hs-av:first-child { margin-left: 0; }
.hs-social-txt { font-size: 13px; color: var(--hs-t3); }

/* ─── Right column entrance ──────────────────────────────────────── */
.hs-col-r {
  position: relative;
  opacity: 0;
  transform: translateX(36px) translateY(6px);
  transition:
    opacity  0.85s cubic-bezier(0.22,1,0.36,1) 0.28s,
    transform 0.85s cubic-bezier(0.22,1,0.36,1) 0.28s;
}
.hs-col-r--in { opacity: 1; transform: translateX(0) translateY(0); }
/* On stacked layout override to vertical-only entrance */
@media (max-width: 960px) {
  .hs-col-r { transform: translateY(20px); }
  .hs-col-r--in { transform: translateY(0); }
}

/* Bloom behind card */
.dp-bloom {
  position: absolute;
  inset: -60px -40px;
  background: radial-gradient(ellipse at 50% 50%,
    rgba(59,130,246,0.12) 0%,
    rgba(139,92,246,0.06) 40%,
    transparent 70%);
  filter: blur(40px);
  pointer-events: none;
  z-index: 0;
}

/* ─── Deploy card ────────────────────────────────────────────────── */
.dp-card {
  position: relative;
  z-index: 1;
  border-radius: 16px;
  background: var(--hs-card-bg);
  border: 1px solid var(--hs-card-border);
  border-top: 1px solid var(--hs-card-top);
  box-shadow: var(--hs-card-shadow);
  overflow: hidden;
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

/* ─── Terminal ───────────────────────────────────────────────────── */
.dp-term-bar {
  display: flex; align-items: center; gap: 7px;
  padding: 11px 16px;
  background: var(--hs-tbar-bg);
  border-bottom: 1px solid var(--hs-tbar-border);
}
.dp-wd {
  width: 11px; height: 11px; border-radius: 50%; flex-shrink: 0;
}
.dp-wd--r { background: #ff5f57; }
.dp-wd--y { background: #febc2e; }
.dp-wd--g { background: #28c840; }
.dp-term-lbl {
  flex: 1;
  font-size: 11.5px; font-weight: 500; letter-spacing: 0.03em;
  color: var(--hs-tlbl);
  font-family: 'ui-monospace', 'SFMono-Regular', monospace;
}
.dp-env {
  font-size: 10.5px; font-weight: 600; letter-spacing: 0.05em;
  padding: 3px 9px; border-radius: 5px; text-transform: uppercase;
  background: rgba(59,130,246,0.13); border: 1px solid rgba(59,130,246,0.28);
  color: rgba(100,160,255,0.8);
  font-family: 'ui-monospace', 'SFMono-Regular', monospace;
}

.dp-term-body {
  padding: 14px 18px 16px;
  font-family: 'ui-monospace', 'SFMono-Regular', 'Menlo', monospace;
  font-size: 12.5px;
  line-height: 1.7;
  min-height: 148px;
  background: var(--hs-tbody-bg);
  transition: background 0.3s ease;
}

/* Typed command */
.dp-cmd-row { color: var(--hs-tcmd); white-space: pre-wrap; word-break: break-all; }
.dp-blk-cursor {
  display: inline-block;
  width: 7px; height: 13px;
  background: var(--hs-tcursor);
  border-radius: 1px;
  vertical-align: text-bottom;
  margin-left: 1px;
  animation: hs-blink 0.85s ease-in-out infinite;
}

/* Log lines */
.dp-log-line { white-space: pre-wrap; word-break: break-word; }
.dpl-info { color: var(--hs-tinfo); }
.dpl-ok   { color: var(--hs-tok); }
.dpl-spin {
  color: var(--hs-tspin);
  display: flex; align-items: center; gap: 6px;
}
.dpl-spin::before {
  content: '';
  display: inline-block;
  width: 8px; height: 8px; flex-shrink: 0;
  border: 1.5px solid rgba(59,130,246,0.3);
  border-top-color: #60a5fa;
  border-radius: 50%;
  animation: dp-spin 0.75s linear infinite;
}
@keyframes dp-spin { to { transform: rotate(360deg); } }

/* Log line transition */
.dp-log-enter-active { transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1); }
.dp-log-enter-from   { opacity: 0; transform: translateY(6px); }
.dp-log-enter-to     { opacity: 1; transform: translateY(0); }

/* Progress bar */
.dp-prog-wrap { margin-top: 10px; }
.dp-prog-track {
  position: relative;
  height: 3px; border-radius: 3px;
  background: var(--hs-prog-track);
  overflow: hidden;
}
.dp-prog-fill {
  position: absolute; inset: 0 auto 0 0;
  height: 100%; width: 0;
  background: linear-gradient(90deg, #3B82F6 0%, #8B5CF6 60%, #06b6d4 100%);
  border-radius: 3px;
  transition: width 3.8s cubic-bezier(0.25, 0, 0.4, 1);
}
.dp-prog-shine {
  position: absolute; inset: 0;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(255,255,255,0.22) 50%,
    transparent 100%);
  background-size: 200% 100%;
  animation: dp-shimmer 1.6s linear infinite;
}
@keyframes dp-shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* ─── Network section ────────────────────────────────────────────── */
.dp-net {
  border-top: 1px solid var(--hs-net-border);
  padding: 12px 16px 10px;
  background: var(--hs-net-bg);
}
.dp-net-label {
  font-size: 10px; font-weight: 600; letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--hs-netlbl);
  font-family: 'ui-monospace', 'SFMono-Regular', monospace;
  margin-bottom: 8px;
}
.dp-net-svg {
  width: 100%;
  height: auto;
  display: block;
}

/* ─── Live bar ───────────────────────────────────────────────────── */
.dp-live-bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 11px 18px;
  border-top: 1px solid var(--hs-net-border);
  background: var(--hs-live-bg);
}
.dp-live-pill {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
  color: #34d399; text-transform: uppercase;
  background: rgba(16,185,129,0.1);
  border: 1px solid rgba(16,185,129,0.25);
  border-radius: 6px; padding: 4px 10px;
}
.dp-live-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #10B981; flex-shrink: 0;
  animation: hs-pulse 1.2s ease-in-out infinite;
}
.dp-stat-group { display: flex; align-items: center; gap: 12px; }
.dp-stat {
  display: flex; flex-direction: column; align-items: center; gap: 1px;
}
.dp-stat-val {
  font-size: 13px; font-weight: 700;
  color: var(--hs-stat-val);
  font-family: 'ui-monospace', 'SFMono-Regular', monospace;
  font-variant-numeric: tabular-nums;
}
.dp-stat-lbl {
  font-size: 10px; color: var(--hs-stat-lbl);
  font-family: 'ui-monospace', 'SFMono-Regular', monospace;
  letter-spacing: 0.04em;
}
.dp-stat-sep {
  width: 1px; height: 24px;
  background: var(--hs-stat-sep);
}

/* ─── Vue transitions ────────────────────────────────────────────── */
.dp-fade-enter-active { transition: opacity 0.4s ease; }
.dp-fade-enter-from   { opacity: 0; }

.dp-rise-enter-active {
  transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1),
              transform 0.5s cubic-bezier(0.22,1,0.36,1);
}
.dp-rise-enter-from { opacity: 0; transform: translateY(10px); }
.dp-rise-enter-to   { opacity: 1; transform: translateY(0); }

/* ─── Responsive ─────────────────────────────────────────────────── */

/* Tablet: collapse to single column, animation BELOW text (natural DOM order) */
@media (max-width: 960px) {
  .hs {
    min-height: 0;
    padding: 100px 0 70px;
    align-items: flex-start;
  }
  .hs-inner {
    grid-template-columns: 1fr;
    gap: 40px;
    align-items: stretch;
  }
  /* animation stays below — no order override needed */
  .hs-col-r {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    /* switch entrance to translateY since there's no side-by-side layout */
    transform: translateY(20px);
  }
  .hs-col-r--in { transform: translateY(0); }
  .hs-sub { max-width: 100%; }
}

/* Large phone / small tablet */
@media (max-width: 680px) {
  .hs { padding: 88px 0 56px; }
  .hs-inner { padding: 0 20px; gap: 32px; }
  .hs-h1 {
    font-size: clamp(34px, 9vw, 52px);
    letter-spacing: -1.8px;
  }
  .hs-badge { margin-bottom: 20px; font-size: 11px; }
  .hs-sub { font-size: 15px; }
  .hs-ctas { margin-bottom: 32px; }
  .hs-btn-p, .hs-btn-s2 { height: 44px; font-size: 14px; }
  /* Card inner spacing */
  .dp-term-bar { padding: 10px 14px; }
  .dp-term-body { padding: 12px 14px 14px; font-size: 11.5px; min-height: 120px; }
  .dp-net { padding: 10px 12px 8px; }
  .dp-live-bar { padding: 10px 14px; }
}

/* Small phone */
@media (max-width: 480px) {
  .hs { padding: 80px 0 48px; }
  .hs-inner { padding: 0 16px; gap: 28px; }
  .hs-h1 {
    font-size: clamp(30px, 8.5vw, 44px);
    letter-spacing: -1.4px;
  }
  .hs-sub { font-size: 14.5px; }
  .hs-ctas { gap: 10px; }
  .hs-btn-p, .hs-btn-s2 {
    height: 42px; padding: 0 18px; font-size: 13.5px;
  }
  .dp-term-body { font-size: 11px; }
  /* Compact live bar */
  .dp-live-bar { flex-wrap: wrap; gap: 10px; }
  .dp-stat-group { gap: 10px; }
  .dp-stat-val { font-size: 12px; }
  .dp-stat-lbl { font-size: 9.5px; }
}

/* Very small (≤360px) */
@media (max-width: 360px) {
  .hs-inner { padding: 0 14px; }
  .hs-h1 { font-size: clamp(28px, 8vw, 38px); }
  .hs-badge { padding: 5px 11px; }
  .dp-term-bar { padding: 9px 12px; }
  .dp-term-body { padding: 10px 12px; font-size: 10.5px; }
  .dp-live-pill { font-size: 10px; padding: 3px 8px; }
  .dp-stat-val { font-size: 11px; }
}
</style>
