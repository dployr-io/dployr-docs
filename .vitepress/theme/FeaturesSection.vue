<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()
const isHome = computed(() => frontmatter.value.layout === 'home')

// ── Scroll reveal ────────────────────────────────────────────
const rootRef = ref<HTMLElement | null>(null)
const visible = ref(false)
let observer: IntersectionObserver | null = null

// ── How It Works — step tabs + terminal ─────────────────────
interface HWStep {
  n: string
  title: string
  desc: string
  lines: Array<{ text: string; type: 'cmd' | 'ok' | 'info' | 'dim' }>
}

const hwSteps: HWStep[] = [
  {
    n: '01', title: 'Install Agent', desc: 'Run one command on your server. Works on any Linux distro or container.',
    lines: [
      { text: '$ curl -sSL https://get.dployr.io | bash', type: 'cmd' },
      { text: '  Downloading dployr agent v2.4.1…', type: 'info' },
      { text: '  Verifying checksum… ✓', type: 'info' },
      { text: '  Installing to /usr/local/bin…', type: 'info' },
      { text: '✓ Agent installed successfully', type: 'ok' },
      { text: '', type: 'dim' },
      { text: '$ dployr --version', type: 'cmd' },
      { text: '  dployr agent v2.4.1 (linux/amd64)', type: 'dim' },
    ],
  },
  {
    n: '02', title: 'Connect & Secure', desc: 'Agent links to the control plane via mTLS. Your server, your keys.',
    lines: [
      { text: '$ dployr connect --server prod-01', type: 'cmd' },
      { text: '  Generating mTLS keypair…', type: 'info' },
      { text: '  Registering with control plane…', type: 'info' },
      { text: '✓ mTLS handshake complete', type: 'ok' },
      { text: '✓ Agent "prod-01" is now online', type: 'ok' },
      { text: '', type: 'dim' },
      { text: '$ dployr agents ls', type: 'cmd' },
      { text: '  NAME      STATUS   REGION', type: 'dim' },
      { text: '  prod-01   online   us-east-1', type: 'dim' },
    ],
  },
  {
    n: '03', title: 'Deploy & Scale', desc: 'Push code from the CLI or dashboard. Zero-downtime deploys, every time.',
    lines: [
      { text: '$ dployr deploy ./api --env production', type: 'cmd' },
      { text: '  Building Docker image…', type: 'info' },
      { text: '  Pushing to registry…', type: 'info' },
      { text: '  Rolling out to prod-01…', type: 'info' },
      { text: '  Health check passed ✓', type: 'info' },
      { text: '✓ Deployed in 3.2s', type: 'ok' },
      { text: '  → https://api.prod-01.dployr.io', type: 'ok' },
    ],
  },
]

const activeStep = ref(0)
const termLines = ref<HWStep['lines']>([])
let lineTimer: ReturnType<typeof setTimeout>
let cycleTimer: ReturnType<typeof setTimeout>

function runLines(stepIdx: number) {
  clearTimeout(lineTimer)
  termLines.value = []
  const lines = hwSteps[stepIdx].lines
  let i = 0
  const delays = [0, 600, 1100, 1600, 2050, 2500, 3000, 3500, 4000]
  function next() {
    if (i >= lines.length) return
    termLines.value.push(lines[i])
    i++
    lineTimer = setTimeout(next, (delays[i] ?? delays[delays.length - 1]) - (delays[i - 1] ?? 0))
  }
  next()
}

function setStep(i: number) {
  activeStep.value = i
  clearTimeout(cycleTimer)
  scheduleCycle()
}

function scheduleCycle() {
  cycleTimer = setTimeout(() => {
    activeStep.value = (activeStep.value + 1) % hwSteps.length
  }, 5500)
}

watch(activeStep, (idx) => runLines(idx))

// ── Theme switcher ───────────────────────────────────────────
type ThemeMode = 'light' | 'dark' | 'system'
const themeMode = ref<ThemeMode>('system')

function getSystemPreference(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(mode: ThemeMode) {
  themeMode.value = mode
  localStorage.setItem('vitepress-theme-appearance', mode)
  const resolved = mode === 'system' ? getSystemPreference() : mode
  document.documentElement.classList.toggle('dark', resolved === 'dark')
}

function initTheme() {
  const stored = localStorage.getItem('vitepress-theme-appearance') as ThemeMode | null
  themeMode.value = (stored === 'light' || stored === 'dark' || stored === 'system') ? stored : 'system'
}

onMounted(() => {
  initTheme()

  observer = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) {
        visible.value = true
        observer?.disconnect()
        setTimeout(() => { runLines(0); scheduleCycle() }, 400)
      }
    },
    { threshold: 0.08 }
  )
  if (rootRef.value) observer.observe(rootRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
  clearTimeout(lineTimer)
  clearTimeout(cycleTimer)
})
</script>

<template>
  <div v-if="isHome" ref="rootRef" class="fs-root">

    <!-- ════════════════════════════════════════════
         FEATURES — bento grid
    ════════════════════════════════════════════ -->
    <section class="fs-section">
      <div class="fs-wrap">

        <div class="fs-header" :class="{ 'fs-in': visible }">
          <p class="fs-eyebrow">Why dployr</p>
          <h2 class="fs-title">Everything you need.<br>Nothing you don't.</h2>
          <p class="fs-sub">Built for teams who want full control of their infrastructure without the ops overhead.</p>
        </div>

        <div class="fs-bento">

          <!-- Card 1: Self-hosted — wide -->
          <div class="fs-card fs-card-wide" :class="{ 'fs-in': visible }" style="transition-delay:0ms">
            <div class="fs-card-body">
              <div class="fs-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                </svg>
              </div>
              <h3 class="fs-card-title">Self-Hosted Control</h3>
              <p class="fs-card-desc">Run dployr on your own infrastructure. Your data never leaves your servers. No vendor lock-in, no surprises, no per-seat pricing.</p>
            </div>
            <!-- Mini server diagram -->
            <div class="fs-diagram" aria-hidden="true">
              <div class="fs-server fs-s1">
                <span class="fs-server-dot"></span>Control Plane
              </div>
              <div class="fs-conn fs-conn-1"></div>
              <div class="fs-conn fs-conn-2"></div>
              <div class="fs-server fs-s2">
                <span class="fs-server-dot"></span>Agent 01
              </div>
              <div class="fs-server fs-s3">
                <span class="fs-server-dot"></span>Agent 02
              </div>
            </div>
          </div>

          <!-- Card 2: Globally distributed -->
          <div class="fs-card" :class="{ 'fs-in': visible }" style="transition-delay:80ms">
            <div class="fs-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <h3 class="fs-card-title">Globally Distributed</h3>
            <p class="fs-card-desc">mTLS-secured agents on your instances connect from anywhere. Enterprise-grade security with zero configuration.</p>
            <div class="fs-globe" aria-hidden="true">
              <span class="fs-ping fs-p1"></span>
              <span class="fs-ping fs-p2"></span>
              <span class="fs-ping fs-p3"></span>
            </div>
          </div>

          <!-- Card 3: Auto HTTPS — tall -->
          <div class="fs-card fs-card-accent" :class="{ 'fs-in': visible }" style="transition-delay:160ms">
            <div class="fs-icon-wrap fs-icon-light">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h3 class="fs-card-title fs-light-title">Automatic HTTPS</h3>
            <p class="fs-card-desc fs-light-desc">Built-in Caddy integration handles SSL/TLS automatically. Secure by default, zero configuration needed.</p>
            <div class="fs-lock-anim" aria-hidden="true">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect x="8" y="22" width="32" height="22" rx="5" fill="rgba(255,255,255,.15)" stroke="rgba(255,255,255,.4)" stroke-width="1.5"/>
                <path d="M16 22V18a8 8 0 0 1 16 0v4" stroke="rgba(255,255,255,.4)" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="24" cy="33" r="3" fill="rgba(255,255,255,.7)" class="fs-lock-dot"/>
              </svg>
              <span class="fs-ssl-badge">SSL · TLS · HTTPS</span>
            </div>
          </div>

          <!-- Card 4: Multi-runtime -->
          <div class="fs-card" :class="{ 'fs-in': visible }" style="transition-delay:240ms">
            <div class="fs-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
              </svg>
            </div>
            <h3 class="fs-card-title">Multi-Runtime Support</h3>
            <p class="fs-card-desc">Node.js, Python, Go, PHP, Ruby, .NET, Java, Docker, and static sites — one platform for everything.</p>
            <div class="fs-runtimes" aria-hidden="true">
              <span class="fs-rt">🟢 Node</span>
              <span class="fs-rt">🐍 Python</span>
              <span class="fs-rt">🐹 Go</span>
              <span class="fs-rt">🐳 Docker</span>
              <span class="fs-rt">💎 Ruby</span>
              <span class="fs-rt">☕ Java</span>
            </div>
          </div>

          <!-- Card 5: CLI & Dashboard -->
          <div class="fs-card" :class="{ 'fs-in': visible }" style="transition-delay:320ms">
            <div class="fs-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
              </svg>
            </div>
            <h3 class="fs-card-title">CLI & Dashboard</h3>
            <p class="fs-card-desc">Powerful RBAC-aware CLI or intuitive web dashboard. Choose the workflow that fits your team.</p>
            <div class="fs-cli" aria-hidden="true">
              <span class="fs-cli-ps">$</span>
              <span class="fs-cli-cmd"> dployr deploy</span>
              <span class="fs-cli-cursor">_</span>
            </div>
          </div>

          <!-- Card 6: Open source — full width -->
          <div class="fs-card fs-card-full fs-card-dark" :class="{ 'fs-in': visible }" style="transition-delay:400ms">
            <div class="fs-oss-content">
              <div class="fs-icon-wrap fs-icon-light">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </div>
              <div>
                <h3 class="fs-card-title fs-light-title">100% Open Source</h3>
                <p class="fs-card-desc fs-light-desc" style="max-width:480px">Apache 2.0 licensed. Full transparency, community-driven development. Built in the open, for the community. Fork it, extend it, own it.</p>
              </div>
            </div>
            <a href="https://github.com/dployr-io/dployr" target="_blank" rel="noopener" class="fs-gh-btn">
              View on GitHub →
            </a>
          </div>

        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════════
         HOW IT WORKS — tabs + live terminal
    ════════════════════════════════════════════ -->
    <section class="hw-section">
      <div class="fs-wrap">

        <div class="fs-header" :class="{ 'fs-in': visible }">
          <p class="fs-eyebrow">Get started in minutes</p>
          <h2 class="fs-title">How it works</h2>
          <p class="fs-sub">Three commands. Your app is live.</p>
        </div>

        <div class="hw-body" :class="{ 'fs-in': visible }">

          <!-- Left: step tabs -->
          <div class="hw-tabs">
            <button
              v-for="(step, i) in hwSteps"
              :key="i"
              class="hw-tab"
              :class="{ 'hw-tab-active': activeStep === i }"
              @click="setStep(i)"
            >
              <div class="hw-tab-top">
                <span class="hw-tab-num">{{ step.n }}</span>
                <span class="hw-tab-title">{{ step.title }}</span>
              </div>
              <p class="hw-tab-desc">{{ step.desc }}</p>
              <div class="hw-tab-bar">
                <div
                  class="hw-tab-progress"
                  :class="{ 'hw-tab-progress-run': activeStep === i }"
                ></div>
              </div>
            </button>
          </div>

          <!-- Right: animated terminal -->
          <div class="hw-terminal">
            <div class="hw-term-bar">
              <span class="hw-dot hw-rd"></span>
              <span class="hw-dot hw-yw"></span>
              <span class="hw-dot hw-gn"></span>
              <span class="hw-term-label">dployr — bash</span>
              <span class="hw-term-step">step {{ hwSteps[activeStep].n }}</span>
            </div>
            <div class="hw-term-body">
              <TransitionGroup name="hwl" tag="div" class="hw-term-lines">
                <div
                  v-for="(ln, i) in termLines"
                  :key="`${activeStep}-${i}`"
                  :class="['hw-ln', `hw-ln-${ln.type}`]"
                >{{ ln.text }}</div>
              </TransitionGroup>
              <span class="hw-blink" aria-hidden="true">█</span>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════════
         STATS BAR
    ════════════════════════════════════════════ -->
    <section class="st-section">
      <div class="fs-wrap">
        <div class="st-grid" :class="{ 'fs-in': visible }">
          <div class="st-item" v-for="s in [
            { n:'10K+',  l:'Deployments' },
            { n:'99.9%', l:'Uptime SLA'  },
            { n:'50+',   l:'Contributors'},
            { n:'9',     l:'Runtimes'    },
          ]" :key="s.l">
            <strong class="st-num">{{ s.n }}</strong>
            <span class="st-label">{{ s.l }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════════
         FINAL CTA
    ════════════════════════════════════════════ -->
    <section class="cta-section">
      <div class="fs-wrap">
        <div class="cta-box" :class="{ 'fs-in': visible }">
          <div class="cta-orb" aria-hidden="true"></div>
          <p class="fs-eyebrow" style="color:#a78bfa">Start today</p>
          <h2 class="cta-title">Ready to deploy?</h2>
          <p class="cta-sub">Self-host in minutes. No credit card. No seat fees. Just your infrastructure.</p>
          <div class="cta-actions">
            <a href="https://app.dployr.io" class="cta-btn-primary">Get Started Free →</a>
            <a href="https://github.com/dployr-io/dployr" target="_blank" rel="noopener" class="cta-btn-ghost">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              Star on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════════
         THEME SWITCHER BAR
    ════════════════════════════════════════════ -->
    <div class="tb-wrap">
      <p class="tb-label">Appearance</p>
      <div class="tb-pill" role="group" aria-label="Choose theme">

        <button
          class="tb-btn"
          :class="{ 'tb-active': themeMode === 'light' }"
          @click="applyTheme('light')"
          aria-label="Light mode"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          Light
        </button>

        <button
          class="tb-btn"
          :class="{ 'tb-active': themeMode === 'dark' }"
          @click="applyTheme('dark')"
          aria-label="Dark mode"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
          Dark
        </button>

        <button
          class="tb-btn"
          :class="{ 'tb-active': themeMode === 'system' }"
          @click="applyTheme('system')"
          aria-label="System preference"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
          </svg>
          System
        </button>

      </div>
    </div>

  </div>
</template>

<style scoped>
/* ── Shared ───────────────────────────────────────────── */
.fs-root { overflow: hidden; }

.fs-wrap {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 2rem;
}

.fs-section  { padding: 100px 2rem; background: var(--vp-c-bg); }
.hw-section  { padding: 100px 2rem; background: var(--vp-c-bg-soft); }
.st-section  { padding: 64px 2rem;  background: var(--vp-c-bg); border-top: 1px solid var(--vp-c-border); border-bottom: 1px solid var(--vp-c-border); }
.cta-section { padding: 100px 2rem; background: var(--vp-c-bg); }

/* Scroll reveal base */
.fs-in { opacity: 1 !important; transform: translateY(0) !important; }

/* ── Section header ──────────────────────────────────── */
.fs-header {
  text-align: center;
  margin-bottom: 56px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity .7s ease, transform .7s ease;
}
.fs-eyebrow {
  font-size: .75rem;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--color-primary);
  margin: 0 0 .75rem;
}
.fs-title {
  font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif;
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1.12;
  color: var(--vp-c-text-1);
  margin: 0 0 1rem;
}
.fs-sub {
  font-size: 1.05rem;
  color: var(--vp-c-text-2);
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.7;
}

/* ── Bento grid ──────────────────────────────────────── */
.fs-bento {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 16px;
}

/* ── Card base ───────────────────────────────────────── */
.fs-card {
  position: relative;
  padding: 32px;
  border-radius: 20px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
  overflow: hidden;
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity .55s ease,
    transform .55s ease,
    border-color .25s ease,
    box-shadow .25s ease;
}
.fs-card:hover {
  border-color: rgba(45,39,199,.25);
  box-shadow: 0 8px 32px rgba(45,39,199,.08);
  transform: translateY(-3px);
}

.fs-card-wide { grid-column: span 2; display: flex; gap: 32px; align-items: flex-start; }
.fs-card-full { grid-column: span 3; display: flex; align-items: center; justify-content: space-between; gap: 2rem; flex-wrap: wrap; }

/* Accent (purple) card */
.fs-card-accent {
  background: linear-gradient(145deg, var(--color-primary) 0%, #4338ca 100%);
  border-color: transparent;
}
.fs-card-accent:hover {
  border-color: transparent;
  box-shadow: 0 12px 40px rgba(45,39,199,.4);
}

/* Dark card */
.fs-card-dark {
  background: #07070f;
  border-color: rgba(255,255,255,.07);
}
.fs-card-dark:hover {
  border-color: rgba(255,255,255,.14);
  box-shadow: 0 8px 32px rgba(0,0,0,.4);
}

/* ── Card elements ───────────────────────────────────── */
.fs-icon-wrap {
  width: 40px; height: 40px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  display: flex; align-items: center; justify-content: center;
  color: var(--color-primary);
  margin-bottom: 18px;
  flex-shrink: 0;
}
.fs-icon-light {
  border-color: rgba(255,255,255,.2);
  background: rgba(255,255,255,.1);
  color: #fff;
}

.fs-card-body { flex: 1; min-width: 0; }

.fs-card-title {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
  margin: 0 0 10px;
}
.fs-light-title { color: #fff; }

.fs-card-desc {
  font-size: .88rem;
  line-height: 1.65;
  color: var(--vp-c-text-2);
  margin: 0;
}
.fs-light-desc { color: rgba(255,255,255,.65); }

/* ── Server diagram (card 1) ─────────────────────────── */
.fs-diagram {
  position: relative;
  flex-shrink: 0;
  width: 200px;
  height: 120px;
  margin-top: 8px;
}
.fs-server {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  font-size: .72rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}
.fs-s1 { top: 0;   left: 50%; transform: translateX(-50%); }
.fs-s2 { bottom: 0; left: 0; }
.fs-s3 { bottom: 0; right: 0; }

.fs-server-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 5px #22c55e;
  animation: dotBeat 2s ease-in-out infinite;
}
@keyframes dotBeat {
  0%,100% { box-shadow: 0 0 4px #22c55e; }
  50%      { box-shadow: 0 0 9px #22c55e; }
}

.fs-conn {
  position: absolute;
  background: linear-gradient(to bottom, rgba(45,39,199,.3), transparent);
  width: 1px;
  height: 40px;
  animation: connPulse 2s ease-in-out infinite;
}
.fs-conn-1 { top: 32px; left: calc(25% + 14px); transform: rotate(25deg); }
.fs-conn-2 { top: 32px; right: calc(25% + 14px); transform: rotate(-25deg); }
@keyframes connPulse {
  0%,100% { opacity: .4; }
  50%      { opacity: 1; }
}

/* ── Globe pings (card 2) ────────────────────────────── */
.fs-globe {
  position: absolute;
  bottom: 20px; right: 20px;
  width: 80px; height: 80px;
}
.fs-ping {
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid var(--color-primary);
  opacity: 0;
  animation: pingRing 3s ease-out infinite;
}
.fs-p1 { width:24px;height:24px; top:28px;left:28px; }
.fs-p2 { width:46px;height:46px; top:17px;left:17px; animation-delay:.8s; }
.fs-p3 { width:68px;height:68px; top: 6px;left: 6px; animation-delay:1.6s; }
@keyframes pingRing {
  0%   { opacity:.7; transform:scale(.6); }
  100% { opacity:0;  transform:scale(1); }
}

/* ── Lock animation (card 3 accent) ─────────────────── */
.fs-lock-anim {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}
.fs-lock-dot { animation: lockBeat 2s ease-in-out infinite; }
@keyframes lockBeat {
  0%,100% { opacity:.6; r:3; }
  50%      { opacity:1;  r:4; }
}
.fs-ssl-badge {
  font-size: .68rem;
  font-weight: 700;
  letter-spacing: .1em;
  color: rgba(255,255,255,.5);
  font-family: var(--vp-font-family-mono);
}

/* ── Runtime chips (card 4) ──────────────────────────── */
.fs-runtimes {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 18px;
}
.fs-rt {
  padding: 4px 11px;
  border-radius: 100px;
  font-size: .72rem;
  font-weight: 600;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-2);
}

/* ── CLI snippet (card 5) ────────────────────────────── */
.fs-cli {
  margin-top: 20px;
  padding: 12px 16px;
  border-radius: 10px;
  background: #0d0d14;
  border: 1px solid rgba(255,255,255,.07);
  font-family: var(--vp-font-family-mono);
  font-size: .82rem;
}
.fs-cli-ps  { color: #a78bfa; }
.fs-cli-cmd { color: #e5e7eb; }
.fs-cli-cursor {
  color: #34d399;
  animation: blink 1s step-end infinite;
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

/* ── Open source card (card 6) ───────────────────────── */
.fs-oss-content { display: flex; align-items: flex-start; gap: 20px; flex-wrap: wrap; }
.fs-gh-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: .7rem 1.6rem;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,.15);
  font-size: .88rem;
  font-weight: 650;
  color: #fff;
  text-decoration: none;
  white-space: nowrap;
  transition: all .25s ease;
  flex-shrink: 0;
}
.fs-gh-btn:hover {
  background: rgba(255,255,255,.08);
  border-color: rgba(255,255,255,.3);
}

/* ── How it works ────────────────────────────────────── */
.hw-body {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 32px;
  align-items: start;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity .7s ease, transform .7s ease;
}

/* Step tabs */
.hw-tabs {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hw-tab {
  all: unset;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px 20px 16px;
  border-radius: 14px;
  border: 1px solid var(--vp-c-border);
  background: transparent;
  transition: all .25s ease;
  text-align: left;
  position: relative;
  overflow: hidden;
}
.hw-tab:hover { background: var(--vp-c-bg-soft); }
.hw-tab-active {
  background: var(--vp-c-bg-soft);
  border-color: rgba(45,39,199,.3);
  box-shadow: 0 0 0 1px rgba(45,39,199,.08);
}

.hw-tab-top {
  display: flex;
  align-items: center;
  gap: 10px;
}
.hw-tab-num {
  font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif;
  font-size: 1rem;
  font-weight: 800;
  color: var(--color-primary);
  opacity: .35;
  letter-spacing: -0.03em;
  transition: opacity .25s ease;
}
.hw-tab-active .hw-tab-num { opacity: 1; }

.hw-tab-title {
  font-size: .95rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.hw-tab-desc {
  font-size: .82rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height .35s ease, opacity .35s ease;
}
.hw-tab-active .hw-tab-desc {
  max-height: 60px;
  opacity: 1;
}

/* Progress bar */
.hw-tab-bar {
  height: 2px;
  border-radius: 2px;
  background: var(--vp-c-border);
  overflow: hidden;
  margin-top: 4px;
}
.hw-tab-progress {
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, var(--color-primary), var(--color-primary-light));
  border-radius: 2px;
}
.hw-tab-progress-run {
  width: 100%;
  transition: width 5.5s linear;
}

/* Terminal */
.hw-terminal {
  background: #0d0d16;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,.07);
  box-shadow:
    0 0 0 1px rgba(45,39,199,.1),
    0 20px 60px rgba(0,0,0,.4),
    0 40px 80px rgba(45,39,199,.08);
  overflow: hidden;
  min-height: 340px;
}

.hw-term-bar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 13px 18px;
  background: rgba(255,255,255,.03);
  border-bottom: 1px solid rgba(255,255,255,.06);
}
.hw-dot { width:12px; height:12px; border-radius:50%; flex-shrink:0; }
.hw-rd { background:#ff5f57; }
.hw-yw { background:#febc2e; }
.hw-gn { background:#28c840; }
.hw-term-label {
  font-family: var(--vp-font-family-mono);
  font-size: .75rem;
  color: rgba(255,255,255,.28);
  margin-left: 6px;
}
.hw-term-step {
  margin-left: auto;
  font-family: var(--vp-font-family-mono);
  font-size: .7rem;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 100px;
  background: rgba(45,39,199,.2);
  border: 1px solid rgba(45,39,199,.25);
  color: #a78bfa;
}

.hw-term-body {
  padding: 22px;
  font-family: var(--vp-font-family-mono);
  font-size: .84rem;
  line-height: 1.9;
  position: relative;
  min-height: 290px;
}
.hw-term-lines { display: flex; flex-direction: column; }
.hw-ln       { white-space: pre-wrap; }
.hw-ln-cmd   { color: #e5e7eb; }
.hw-ln-ok    { color: #34d399; }
.hw-ln-info  { color: #60a5fa; }
.hw-ln-dim   { color: rgba(255,255,255,.25); }
.hw-blink {
  color: #34d399;
  animation: blink 1s step-end infinite;
  font-size: .9rem;
}

/* Line enter transition */
.hwl-enter-active { transition: all .3s cubic-bezier(.4,0,.2,1); }
.hwl-enter-from   { opacity:0; transform:translateX(-8px); }

/* ── Stats bar ───────────────────────────────────────── */
.st-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity .7s ease, transform .7s ease;
}
.st-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 32px 16px;
  text-align: center;
}
.st-item:not(:last-child) { border-right: 1px solid var(--vp-c-border); }
.st-num {
  font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif;
  font-size: 2.4rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.st-label {
  font-size: .82rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

/* ── Final CTA ───────────────────────────────────────── */
.cta-box {
  position: relative;
  text-align: center;
  padding: 80px 40px;
  border-radius: 24px;
  background: #07070f;
  border: 1px solid rgba(255,255,255,.07);
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity .7s ease, transform .7s ease;
}
.cta-orb {
  position: absolute;
  width: 500px; height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(45,39,199,.3) 0%, transparent 70%);
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  filter: blur(60px);
  pointer-events: none;
  animation: ctaPulse 8s ease-in-out infinite;
}
@keyframes ctaPulse {
  0%,100% { transform:translate(-50%,-50%) scale(1); }
  50%      { transform:translate(-50%,-50%) scale(1.15); }
}
.cta-title {
  font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  color: #f1f1f3;
  margin: .5rem 0 1rem;
  position: relative;
}
.cta-sub {
  font-size: 1.05rem;
  color: rgba(255,255,255,.5);
  max-width: 460px;
  margin: 0 auto 2.5rem;
  line-height: 1.7;
  position: relative;
}
.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
}
.cta-btn-primary {
  display: inline-flex;
  align-items: center;
  padding: .8rem 2rem;
  background: #fff;
  color: #07070f;
  border-radius: 10px;
  font-size: .95rem;
  font-weight: 700;
  text-decoration: none;
  transition: all .3s ease;
  letter-spacing: -0.01em;
}
.cta-btn-primary:hover {
  background: #e8e8ff;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255,255,255,.12);
}
.cta-btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: .8rem 1.75rem;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 10px;
  font-size: .95rem;
  font-weight: 600;
  color: rgba(255,255,255,.75);
  text-decoration: none;
  transition: all .3s ease;
  letter-spacing: -0.01em;
}
.cta-btn-ghost:hover {
  border-color: rgba(255,255,255,.3);
  color: #fff;
  background: rgba(255,255,255,.05);
  transform: translateY(-2px);
}

/* ── Theme switcher bar ──────────────────────────────── */
.tb-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 40px 2rem 56px;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-border);
}

.tb-label {
  font-size: .72rem;
  font-weight: 600;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
  margin: 0;
}

.tb-pill {
  display: inline-flex;
  padding: 4px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
  gap: 2px;
}

.tb-btn {
  all: unset;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 18px;
  border-radius: 8px;
  font-size: .85rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: all .2s cubic-bezier(.4,0,.2,1);
  user-select: none;
}

.tb-btn:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
}

.tb-active {
  background: var(--vp-c-bg) !important;
  color: var(--color-primary) !important;
  box-shadow:
    0 1px 3px rgba(0,0,0,.08),
    0 0 0 1px rgba(45,39,199,.12);
  font-weight: 600;
}

.dark .tb-active {
  color: var(--color-primary-lighter) !important;
  box-shadow:
    0 1px 3px rgba(0,0,0,.3),
    0 0 0 1px rgba(223,224,252,.12);
}

/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 900px) {
  .fs-bento { grid-template-columns: 1fr 1fr; }
  .fs-card-wide { grid-column: span 2; flex-direction: column; }
  .fs-card-full { grid-column: span 2; }
  .hw-body { grid-template-columns: 1fr; }
  .hw-terminal { min-height: 280px; }
  .st-grid { grid-template-columns: repeat(2, 1fr); }
  .st-item:nth-child(2) { border-right: none; }
  .st-item:nth-child(1),.st-item:nth-child(2) { border-bottom: 1px solid var(--vp-c-border); }
}

@media (max-width: 600px) {
  .fs-section,.hw-section,.cta-section { padding: 72px 1.25rem; }
  .fs-bento { grid-template-columns: 1fr; }
  .fs-card-wide,.fs-card-full { grid-column: span 1; }
  .st-grid { grid-template-columns: repeat(2, 1fr); }
  .cta-box { padding: 56px 24px; }
}
</style>
