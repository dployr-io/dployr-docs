<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'
import HeroSection from './HeroSection.vue'

const { isDark } = useData()

// ── Nav ─────────────────────────────────────────────────────────
const scrolled  = ref(false)
const menuOpen  = ref(false)
const scrollY   = ref(0)

// ── Pricing ─────────────────────────────────────────────────────
const indiePrice = ref(0)
const proPrice   = ref(0)
let indieCounted = false, proCounted = false

function animCount(to: number, set: (v: number) => void) {
  let cur = 0
  const steps = 28, dur = 700
  const inc = to / steps
  const t = setInterval(() => {
    cur = Math.min(cur + inc, to)
    set(Math.round(cur))
    if (cur >= to) clearInterval(t)
  }, dur / steps)
}

// ── Terminal ─────────────────────────────────────────────────────
const termLines = ref<{ text: string; cls: string }[]>([])
const termDone  = ref(false)
let termStarted = false

const TERM_SEQ = [
  { text: '$ git push origin main',            cls: 'tw', delay: 0    },
  { text: 'Connecting to dployr cloud...',      cls: 'td', delay: 480  },
  { text: 'Fetching build config',              cls: 'td', delay: 860  },
  { text: '✓  Cache restored (2.4 GB)',         cls: 'tg', delay: 1320 },
  { text: '✓  Dependencies installed',          cls: 'tg', delay: 1760 },
  { text: '✓  Build complete — 4.1s',           cls: 'tg', delay: 2240 },
  { text: '✓  Deployed to 31 edge regions',     cls: 'tg', delay: 2740 },
  { text: '→   https://myapp.dployr.app',       cls: 'tb', delay: 3300 },
]

function startTerminal() {
  if (termStarted) return
  termStarted = true
  TERM_SEQ.forEach(l => {
    setTimeout(() => {
      termLines.value.push(l)
      if (termLines.value.length === TERM_SEQ.length)
        setTimeout(() => termDone.value = true, 300)
    }, l.delay)
  })
}

// ── Theme ────────────────────────────────────────────────────────
function toggleTheme() {
  const btn = document.querySelector<HTMLElement>('.VPSwitchAppearance')
  if (btn) { btn.click(); return }
  document.documentElement.classList.toggle('dark')
}

// ── Pricing card tilt + spotlight ────────────────────────────────
function pCardMove(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  const r = el.getBoundingClientRect()
  const x = e.clientX - r.left, y = e.clientY - r.top
  const cx = r.width / 2, cy = r.height / 2
  el.style.transform = `perspective(1000px) rotateX(${-((y - cy) / cy) * 2.5}deg) rotateY(${((x - cx) / cx) * 2.5}deg) translateY(-4px)`
  el.style.setProperty('--mx', `${x}px`)
  el.style.setProperty('--my', `${y}px`)
}
function pCardLeave(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  el.style.transform = ''
  el.style.removeProperty('--mx')
  el.style.removeProperty('--my')
}
function pCardEnter(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  el.classList.remove('shimmer-play')
  void (el as HTMLElement).offsetWidth
  el.classList.add('shimmer-play')
}

// ── Scroll reveal ────────────────────────────────────────────────
let observer: IntersectionObserver
function initReveal() {
  observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return
      const el = e.target as HTMLElement
      el.classList.add('in')
      if (el.classList.contains('pc-indie') && !indieCounted) {
        indieCounted = true; animCount(5, v => indiePrice.value = v)
      }
      if (el.classList.contains('pc-pro') && !proCounted) {
        proCounted = true; animCount(20, v => proPrice.value = v)
      }
      if (el.classList.contains('term-trigger')) startTerminal()
      observer.unobserve(el)
    })
  }, { threshold: 0.12 })
  document.querySelectorAll(
    '.reveal, .pc-indie, .pc-pro, .term-trigger, .word-row'
  ).forEach(el => observer.observe(el))
}

function onScroll() {
  scrollY.value = window.scrollY
  scrolled.value = window.scrollY > 16
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  setTimeout(initReveal, 120)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})
</script>

<template>
<div :class="['lp', { 'lp-dark': isDark }]">

<!-- ══════════════════════════════════════════════════════════════
     NAVBAR
══════════════════════════════════════════════════════════════ -->
<nav :class="['lnav', { 'lnav--scrolled': scrolled }]">
  <div class="lnav-inner">
    <a href="/" class="lnav-logo">
      <svg class="lnav-mark" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g transform="translate(182.91,42.77) scale(0.484734)">
          <path fill="currentColor" d="M430.07,941.85H429L864.75,506.11a50.63,50.63,0,0,0,14.81-35.77V287.8A50.63,50.63,0,0,0,864.75,252L627.63,14.92c-31.87-31.87-86.35-9.3-86.35,35.76V357.42a50.58,50.58,0,0,1-14.82,35.77L14.82,904.83a50.59,50.59,0,0,0,0,71.55L279.3,1240.72a50.59,50.59,0,0,0,71.53,0L504.1,1087.42a50.59,50.59,0,0,0,0-71.54Z"/>
          <path fill="currentColor" d="M877.49,944.67h1.07L442.82,1380.42A50.55,50.55,0,0,0,428,1416.18v182.54a50.58,50.58,0,0,0,14.82,35.77l237.11,237.12c31.87,31.86,86.35,9.29,86.35-35.77V1529.1a50.59,50.59,0,0,1,14.82-35.77l511.65-511.64a50.6,50.6,0,0,0,0-71.55L1028.26,645.81a50.57,50.57,0,0,0-71.52,0L803.46,799.11a50.58,50.58,0,0,0,0,71.53Z"/>
        </g>
      </svg>
      <span class="lnav-brand">dployr</span>
    </a>

    <div class="lnav-center">
      <a href="/" class="lnav-link">Home</a>
      <a href="/docs/introduction" class="lnav-link">Docs</a>
      <a href="/blog/" class="lnav-link">Blog</a>
      <a href="/changelog" class="lnav-link">Changelog</a>
      <a href="/status" class="lnav-link lnav-status">
        <span class="status-dot" aria-label="All systems operational"></span>
        Status
      </a>
    </div>

    <div class="lnav-right">
      <a href="https://github.com/dployr-io/dployr" target="_blank" rel="noopener" class="lnav-icon" aria-label="GitHub">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
      </a>
      <a href="https://discord.gg/dployr" target="_blank" rel="noopener" class="lnav-icon" aria-label="Discord">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
      </a>
      <div class="lnav-div"></div>
      <button class="lnav-theme" @click="toggleTheme" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
        <svg v-if="isDark" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
        <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
      <div class="lnav-div"></div>
      <a href="https://app.dployr.io" class="lnav-cta">Deploy →</a>
      <button class="lnav-hamburger" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
  <div v-if="menuOpen" class="lnav-mobile">
    <a href="/" class="lnav-mlink">Home</a>
    <a href="/docs/introduction" class="lnav-mlink">Docs</a>
    <a href="/blog/" class="lnav-mlink">Blog</a>
    <a href="/changelog" class="lnav-mlink">Changelog</a>
    <a href="/status" class="lnav-mlink">Status</a>
    <a href="https://app.dployr.io" class="lnav-cta" style="width:100%;justify-content:center">Deploy →</a>
  </div>
</nav>

<HeroSection />

<!-- ══════════════════════════════════════════════════════════════
     MARQUEE
══════════════════════════════════════════════════════════════ -->
<div class="mq-wrap reveal">
  <div class="mq-label">— Works with your entire stack —</div>
  <div class="mq-sub">Every runtime. Every pipeline.</div>
  <div class="mq-rows">
    <div class="mq-row">
      <div class="mq-track" style="animation:marquee-left 44s linear infinite">
        <div class="mq-set">
          <span class="mq-item"><span class="mq-dot" style="--dc:#68a063"></span>Node.js</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#3572A5"></span>Python</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#00ACD7"></span>Go</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#dea584"></span>Rust</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#CC342D"></span>Ruby</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#8993be"></span>PHP</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#b07219"></span>Java</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#f9f1e1"></span>Bun</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#512BD4"></span>.NET</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#333333"></span>Deno</span><span class="mq-sep">✦</span>
        </div>
        <div class="mq-set" aria-hidden="true">
          <span class="mq-item"><span class="mq-dot" style="--dc:#68a063"></span>Node.js</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#3572A5"></span>Python</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#00ACD7"></span>Go</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#dea584"></span>Rust</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#CC342D"></span>Ruby</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#8993be"></span>PHP</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#b07219"></span>Java</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#f9f1e1"></span>Bun</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#512BD4"></span>.NET</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#333333"></span>Deno</span><span class="mq-sep">✦</span>
        </div>
      </div>
    </div>
    <div class="mq-row" @mouseenter="$el.querySelector('.mq-track')!.style.animationPlayState='paused'" @mouseleave="$el.querySelector('.mq-track')!.style.animationPlayState='running'">
      <div class="mq-track" style="animation:marquee-right 58s linear infinite">
        <div class="mq-set">
          <span class="mq-item"><span class="mq-dot" style="--dc:#2496ED"></span>Docker</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#2088FF"></span>GitHub Actions</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#FC6D26"></span>GitLab CI</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#7B42BC"></span>Terraform</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#326CE5"></span>Kubernetes</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#FF9900"></span>AWS ECR</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#4285F4"></span>Google Cloud</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#0052CC"></span>Bitbucket</span><span class="mq-sep">✦</span>
        </div>
        <div class="mq-set" aria-hidden="true">
          <span class="mq-item"><span class="mq-dot" style="--dc:#2496ED"></span>Docker</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#2088FF"></span>GitHub Actions</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#FC6D26"></span>GitLab CI</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#7B42BC"></span>Terraform</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#326CE5"></span>Kubernetes</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#FF9900"></span>AWS ECR</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#4285F4"></span>Google Cloud</span><span class="mq-sep">✦</span>
          <span class="mq-item"><span class="mq-dot" style="--dc:#0052CC"></span>Bitbucket</span><span class="mq-sep">✦</span>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════════════
     HOW IT WORKS
══════════════════════════════════════════════════════════════ -->
<section class="section" id="how">
  <div class="container">
    <div class="section-label reveal">01 — Workflow</div>
    <div class="word-row reveal" data-words="From push to production">
      <h2 class="section-heading">
        From push to <span class="uw">production</span>
      </h2>
      <p class="section-sub muted">in four steps.</p>
    </div>
    <div class="steps">
      <div class="step reveal" style="--sd:0s">
        <div class="step-num">01</div>
        <div class="step-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>
        <h3 class="step-title">Connect your repo</h3>
        <p class="step-desc">Link any Git provider in seconds. Every push triggers an automatic, hermetic build — no Docker configuration required.</p>
      </div>
      <div class="step reveal" style="--sd:0.09s">
        <div class="step-num">02</div>
        <div class="step-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
        <h3 class="step-title">Push your code</h3>
        <p class="step-desc">Smart caching rebuilds only what changed. Node.js, Python, Go, PHP, Ruby, Java, .NET, Docker — all detected automatically.</p>
      </div>
      <div class="step reveal" style="--sd:0.18s">
        <div class="step-num">03</div>
        <div class="step-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div>
        <h3 class="step-title">Instant build</h3>
        <p class="step-desc">Lightweight agents on your own servers pull and deploy instantly. Zero vendor lock-in. You own the infrastructure.</p>
      </div>
      <div class="step reveal" style="--sd:0.27s">
        <div class="step-num">04</div>
        <div class="step-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg></div>
        <h3 class="step-title">Live globally</h3>
        <p class="step-desc">Real-time logs, health checks, and one-click rollbacks — all from the dashboard or CLI. Know exactly what's happening.</p>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════
     FEATURES
══════════════════════════════════════════════════════════════ -->
<section class="section ft-section" id="features">
  <div class="ft-bg-grid" aria-hidden="true"></div>
  <div class="ft-blob ft-blob-1" aria-hidden="true"></div>
  <div class="ft-blob ft-blob-2" aria-hidden="true"></div>
  <div class="container">
    <div class="section-label reveal">02 — Platform</div>
    <div class="word-row reveal">
      <h2 class="section-heading">Everything you need.<br><span class="muted">Nothing you don't.</span></h2>
    </div>
    <div class="ft-grid">
      <div v-for="(ft, i) in [
        { num:'01', title:'Self-Hosted Control',      desc:'Run dployr on your own infrastructure with full control over your deployments, data, and configurations. No vendor lock-in, ever.', color:'#3B82F6', icon:'server' },
        { num:'02', title:'Globally Distributed',     desc:'Control plane with mTLS-secured agents running on your instances, connecting from anywhere in the world with sub-40ms latency.', color:'#8B5CF6', icon:'globe' },
        { num:'03', title:'Multi-Runtime Support',    desc:'Deploy Node.js, Python, Go, PHP, Ruby, .NET, Java, Docker containers, and static sites through one unified platform with zero config.', color:'#10B981', icon:'code' },
        { num:'04', title:'Simple CLI & Dashboard',   desc:'Manage deployments through an intuitive web dashboard or powerful RBAC-aware CLI — your workflow, your choice.', color:'#06B6D4', icon:'terminal' },
        { num:'05', title:'Automatic HTTPS',          desc:'Zero-touch TLS via Caddy. Every deployment gets a signed certificate in under 5 seconds. Custom domains in one CLI command.', color:'#10B981', icon:'lock' },
        { num:'06', title:'Open Source',              desc:'Apache 2.0 licensed. Audit the code, self-host forever, contribute features. Your data stays yours.', color:'#F59E0B', icon:'git' },
      ]" :key="ft.num"
        class="ft-card reveal"
        :style="`--sd:${i * 0.08}s; --fac:${ft.color}`"
      >
        <div class="ft-num">{{ ft.num }}</div>
        <div class="ft-icon" :style="`background:${ft.color}18;border-color:${ft.color}30`">
          <!-- server -->
          <svg v-if="ft.icon==='server'" width="20" height="20" viewBox="0 0 24 24" fill="none" :stroke="ft.color" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="7" rx="1"/><rect x="2" y="14" width="20" height="7" rx="1"/><line x1="6" y1="7" x2="6" y2="7"/><line x1="6" y1="18" x2="6" y2="18"/></svg>
          <!-- globe -->
          <svg v-if="ft.icon==='globe'" width="20" height="20" viewBox="0 0 24 24" fill="none" :stroke="ft.color" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          <!-- code -->
          <svg v-if="ft.icon==='code'" width="20" height="20" viewBox="0 0 24 24" fill="none" :stroke="ft.color" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          <!-- terminal -->
          <svg v-if="ft.icon==='terminal'" width="20" height="20" viewBox="0 0 24 24" fill="none" :stroke="ft.color" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
          <!-- lock -->
          <svg v-if="ft.icon==='lock'" width="20" height="20" viewBox="0 0 24 24" fill="none" :stroke="ft.color" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <!-- git -->
          <svg v-if="ft.icon==='git'" width="20" height="20" viewBox="0 0 24 24" fill="none" :stroke="ft.color" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>
        </div>
        <h3 class="ft-title">{{ ft.title }}</h3>
        <p class="ft-desc">{{ ft.desc }}</p>
        <div class="ft-bar" :style="`background:linear-gradient(90deg, ${ft.color}, transparent)`"></div>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════
     PRICING
══════════════════════════════════════════════════════════════ -->
<section class="section" id="pricing">
  <div class="container">
    <div class="section-label reveal">03 — Pricing</div>
    <div class="word-row reveal">
      <h2 class="section-heading">Simple pricing.<br><span class="muted">Scale as you grow.</span></h2>
    </div>
    <p class="section-p reveal" style="--rd:0.1s">Start free, upgrade when you need more. No hidden fees, no per-seat nonsense.</p>
    <div class="price-row">
      <!-- Hobby -->
      <div class="price-card reveal" style="--sd:0s" @mousemove="pCardMove" @mouseleave="pCardLeave" @mouseenter="pCardEnter">
        <div class="price-spot"></div>
        <div class="price-shimmer"></div>
        <div class="price-plan">HOBBY <span class="price-badge">Current</span></div>
        <div class="price-val">Free</div>
        <div class="price-freq">forever</div>
        <p class="price-desc">Perfect for side projects and personal apps. Get started instantly.</p>
        <hr class="price-div"/>
        <ul class="price-feats">
          <li v-for="f in ['1 project','100 deployments/month','Community support','Automatic HTTPS','Basic logs']" :key="f">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            {{ f }}
          </li>
        </ul>
        <button class="price-btn price-btn--ghost" disabled>Current plan</button>
      </div>

      <!-- Indie — featured -->
      <div class="price-card price-card--feat pc-indie reveal" style="--sd:0.13s" @mousemove="pCardMove" @mouseleave="pCardLeave" @mouseenter="pCardEnter">
        <div class="price-pop">Most popular</div>
        <div class="price-spot"></div>
        <div class="price-shimmer"></div>
        <div class="price-plan">INDIE</div>
        <div class="price-val">${{ indiePrice }}</div>
        <div class="price-freq">/month</div>
        <p class="price-desc">For indie developers and small teams shipping real products.</p>
        <hr class="price-div"/>
        <ul class="price-feats">
          <li class="price-inherit">Everything in Hobby, plus:</li>
          <li v-for="f in ['Unlimited projects','1,000 deployments/month','Priority support','Custom domains','Advanced logs & metrics','Team members (3)']" :key="f">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            {{ f }}
          </li>
        </ul>
        <a href="https://app.dployr.io" class="price-btn price-btn--blue">Get started →</a>
      </div>

      <!-- Pro -->
      <div class="price-card pc-pro reveal" style="--sd:0.26s" @mousemove="pCardMove" @mouseleave="pCardLeave" @mouseenter="pCardEnter">
        <div class="price-spot"></div>
        <div class="price-shimmer"></div>
        <div class="price-plan">PRO</div>
        <div class="price-val">${{ proPrice }}</div>
        <div class="price-freq">/month</div>
        <p class="price-desc">For teams that need enterprise features, SLA, and white-glove support.</p>
        <hr class="price-div"/>
        <ul class="price-feats">
          <li class="price-inherit">Everything in Indie, plus:</li>
          <li v-for="f in ['Unlimited deployments','SSO / SAML','99.9% uptime SLA','Dedicated support','Audit logs','RBAC & permissions','Unlimited team members']" :key="f">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            {{ f }}
          </li>
        </ul>
        <a href="https://app.dployr.io" class="price-btn price-btn--outline">Get started →</a>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════
     TERMINAL
══════════════════════════════════════════════════════════════ -->
<section class="section" id="terminal">
  <div class="container" style="max-width:720px">
    <div class="section-label reveal">04 — Developer Experience</div>
    <div class="word-row reveal">
      <h2 class="section-heading">Zero config.<br>Just <span class="uw">push.</span></h2>
    </div>
    <div class="term-wrap term-trigger reveal" style="--rd:0.1s">
      <div class="term-bar">
        <span class="term-dot term-dot--r"></span>
        <span class="term-dot term-dot--y"></span>
        <span class="term-dot term-dot--g"></span>
        <span class="term-title">yourapp — terminal</span>
      </div>
      <div class="term-body">
        <div v-for="(line, i) in termLines" :key="i" :class="['term-line', line.cls]">{{ line.text }}</div>
        <div v-if="!termDone && termLines.length > 0" class="term-cursor" aria-hidden="true"></div>
        <div v-if="termDone" class="term-line tw">
          <span class="term-prompt">$</span>
          <span class="term-cursor" aria-hidden="true"></span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════
     TESTIMONIALS
══════════════════════════════════════════════════════════════ -->
<section class="section" id="testimonials">
  <div class="container">
    <p class="trust-label reveal">Trusted by engineering teams at world-class companies</p>
    <div class="trust-logos reveal">
      <span v-for="(c, i) in ['Stripe','Linear','Notion','Figma','Loom','Vercel']" :key="c" class="trust-logo" :style="`--tld:${i*0.07}s`">{{ c }}</span>
    </div>
    <hr class="trust-div reveal"/>
    <div class="testi-grid">
      <div v-for="(t, i) in [
        { quote:'dployr cut our deploy times by 60%. The agent model means we keep our servers, lose the headache. Setup took 20 minutes.', name:'Alex Chen', role:'CTO @ Rocketship', init:'AC', color:'#3B82F6' },
        { quote:'Finally a deployment tool that doesn\'t try to own my infrastructure. Apache 2.0, self-hosted, and it just works beautifully.', name:'Sarah Kim', role:'Staff Eng @ TechFlow', init:'SK', color:'#8B5CF6' },
        { quote:'The CLI is intuitive and the dashboard is gorgeous. Our whole team went from zero to deploying in an afternoon.', name:'Marcus Silva', role:'Lead Dev @ BuildFast', init:'MS', color:'#10B981' },
      ]" :key="i"
        class="testi-card reveal"
        :style="`--sd:${i * 0.1}s`"
      >
        <div class="testi-stars">
          <svg v-for="s in 5" :key="s" width="14" height="14" viewBox="0 0 24 24" fill="#3B82F6"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>
        <p class="testi-quote">"{{ t.quote }}"</p>
        <div class="testi-author">
          <span class="testi-av" :style="`background:${t.color}20;border-color:${t.color}40;color:${t.color}`">{{ t.init }}</span>
          <div>
            <div class="testi-name">{{ t.name }}</div>
            <div class="testi-role">{{ t.role }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════
     FINAL CTA
══════════════════════════════════════════════════════════════ -->
<section class="section">
  <div class="container">
    <div class="cta-wrap reveal">
      <div class="cta-glow" aria-hidden="true"></div>
      <div class="cta-topline" aria-hidden="true"></div>
      <div class="section-label" style="text-align:center;margin-bottom:20px">GET STARTED FOR FREE</div>
      <h2 class="cta-h2">
        Start <span class="uw">deploying</span><br>
        <span class="muted">in seconds.</span>
      </h2>
      <p class="cta-sub">From git push to live app in under 5 minutes. No credit card required.</p>
      <div class="cta-btns">
        <a href="https://app.dployr.io" class="btn-primary btn-lg">Start Deploying — Free →</a>
        <a href="mailto:hello@dployr.io" class="btn-ghost btn-lg">Talk to Sales</a>
      </div>
      <p class="cta-fine">Free tier includes 100 deployments/month · No credit card needed</p>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════════════
     FOOTER
══════════════════════════════════════════════════════════════ -->
<footer class="footer">
  <div class="container">
    <div class="foot-grid">
      <div class="foot-brand">
        <a href="/" class="foot-logo">
          <svg class="lnav-mark" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="width:22px;height:22px">
            <g transform="translate(182.91,42.77) scale(0.484734)">
              <path fill="currentColor" d="M430.07,941.85H429L864.75,506.11a50.63,50.63,0,0,0,14.81-35.77V287.8A50.63,50.63,0,0,0,864.75,252L627.63,14.92c-31.87-31.87-86.35-9.3-86.35,35.76V357.42a50.58,50.58,0,0,1-14.82,35.77L14.82,904.83a50.59,50.59,0,0,0,0,71.55L279.3,1240.72a50.59,50.59,0,0,0,71.53,0L504.1,1087.42a50.59,50.59,0,0,0,0-71.54Z"/>
              <path fill="currentColor" d="M877.49,944.67h1.07L442.82,1380.42A50.55,50.55,0,0,0,428,1416.18v182.54a50.58,50.58,0,0,0,14.82,35.77l237.11,237.12c31.87,31.86,86.35,9.29,86.35-35.77V1529.1a50.59,50.59,0,0,1,14.82-35.77l511.65-511.64a50.6,50.6,0,0,0,0-71.55L1028.26,645.81a50.57,50.57,0,0,0-71.52,0L803.46,799.11a50.58,50.58,0,0,0,0,71.53Z"/>
            </g>
          </svg>
          <span class="lnav-brand">dployr</span>
        </a>
        <p class="foot-tagline">Self-hosted deployment for teams who own their infrastructure.</p>
      </div>
      <div class="foot-col">
        <h4 class="foot-head">Product</h4>
        <a href="/features" class="foot-link">Features</a>
        <a href="#pricing" class="foot-link">Pricing</a>
        <a href="/changelog" class="foot-link">Changelog</a>
        <a href="/roadmap" class="foot-link">Roadmap</a>
      </div>
      <div class="foot-col">
        <h4 class="foot-head">Docs</h4>
        <a href="/docs/introduction" class="foot-link">Getting Started</a>
        <a href="/docs/cli" class="foot-link">CLI Reference</a>
        <a href="/docs/api" class="foot-link">API</a>
        <a href="/docs/integrations" class="foot-link">Integrations</a>
      </div>
      <div class="foot-col">
        <h4 class="foot-head">Company</h4>
        <a href="/about" class="foot-link">About</a>
        <a href="/blog/" class="foot-link">Blog</a>
        <a href="/careers" class="foot-link">Careers</a>
        <a href="mailto:hello@dployr.io" class="foot-link">Contact</a>
      </div>
      <div class="foot-col">
        <h4 class="foot-head">Legal</h4>
        <a href="/legal/privacy" class="foot-link">Privacy</a>
        <a href="/legal/terms" class="foot-link">Terms</a>
        <a href="/legal/security" class="foot-link">Security</a>
        <a href="/status" class="foot-link">Status</a>
      </div>
    </div>
    <div class="foot-bar">
      <span class="foot-copy">© {{ new Date().getFullYear() }} dployr · Apache 2.0</span>
      <div class="foot-social">
        <a href="https://github.com/dployr-io/dployr" target="_blank" class="foot-soc">GitHub</a>
        <a href="https://twitter.com/dployr" target="_blank" class="foot-soc">Twitter</a>
        <a href="https://discord.gg/dployr" target="_blank" class="foot-soc">Discord</a>
      </div>
    </div>
  </div>
</footer>

</div>
</template>

<style>
/* ── Design tokens ───────────────────────────────────────────── */
.lp {
  --blue:    #3B82F6;
  --purple:  #8B5CF6;
  --green:   #10B981;
  --cyan:    #06B6D4;
  --amber:   #F59E0B;

  /* Light mode */
  --bg:      #ffffff;
  --bg1:     #f8faff;
  --bg2:     #f1f4fb;
  --card:    rgba(255,255,255,0.72);
  --border:  rgba(0,0,0,0.08);
  --t1:      #0f1117;
  --t2:      #374151;
  --t3:      #6b7280;
  --t4:      #9ca3af;
  --line:    rgba(0,0,0,0.07);

  font-family: 'Nunito Sans', 'Inter', system-ui, -apple-system, sans-serif;
  background: var(--bg);
  color: var(--t1);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

.lp-dark {
  --bg:    #080c14;
  --bg1:   #0d1120;
  --bg2:   #111827;
  --card:  rgba(255,255,255,0.04);
  --border:rgba(255,255,255,0.08);
  --t1:    #f3f4f8;
  --t2:    #c9d0df;
  --t3:    #7b8698;
  --t4:    #4b5465;
  --line:  rgba(255,255,255,0.06);
}

/* ── Shared layout ───────────────────────────────────────────── */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}
.section {
  padding: 120px 0;
  position: relative;
}
.muted { color: var(--t3); }

/* ── Reveal animation ────────────────────────────────────────── */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1);
  transition-delay: var(--rd, var(--sd, 0s));
}
.reveal.in { opacity: 1; transform: translateY(0); }

/* ── Section typography ──────────────────────────────────────── */
.section-label {
  font-size: 11.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--blue); margin-bottom: 20px;
}
.section-heading {
  font-family: 'Bricolage Grotesque', 'Nunito Sans', system-ui, sans-serif;
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 800; letter-spacing: -0.03em; line-height: 1.1;
  color: var(--t1); margin: 0 0 12px;
}
.section-sub { font-size: clamp(18px, 2vw, 24px); color: var(--t3); margin: 0; }
.section-p { font-size: 16px; color: var(--t3); margin: -8px 0 56px; }

/* Underline word */
.uw { position: relative; display: inline-block; }
.uw::after {
  content: '';
  position: absolute; bottom: -3px; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--blue), var(--purple));
  border-radius: 2px;
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.55s cubic-bezier(0.22,1,0.36,1) 0.2s;
}
.word-row.in .uw::after { transform: scaleX(1); }

/* ── Buttons ─────────────────────────────────────────────────── */
.btn-primary {
  display: inline-flex; align-items: center; gap: 6px;
  height: 46px; padding: 0 24px; border-radius: 10px;
  background: var(--blue); color: #fff; font-weight: 600; font-size: 15px;
  text-decoration: none; border: none; cursor: pointer;
  transition: box-shadow 0.25s, transform 0.25s, background 0.2s;
}
.btn-primary:hover {
  background: #2563eb;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.3), 0 8px 24px rgba(59,130,246,0.35);
  transform: translateY(-1px);
}
.btn-ghost {
  display: inline-flex; align-items: center; height: 46px; padding: 0 24px;
  border-radius: 10px; border: 1px solid var(--border);
  color: var(--t2); font-weight: 600; font-size: 15px;
  text-decoration: none; background: var(--card); backdrop-filter: blur(10px);
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}
.btn-ghost:hover { border-color: var(--blue); color: var(--blue); }
.btn-lg { height: 52px; padding: 0 28px; font-size: 16px; }

/* ═══════════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════════ */
.lnav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 9000;
  height: 64px;
  transition: height 0.38s cubic-bezier(0.22,1,0.36,1), background 0.38s, box-shadow 0.38s, border-color 0.38s;
  animation: nav-in 0.6s cubic-bezier(0.22,1,0.36,1) both;
}
@keyframes nav-in {
  from { opacity: 0; transform: translateY(-14px); }
  to   { opacity: 1; transform: translateY(0); }
}
.lnav--scrolled {
  height: 54px;
  background: rgba(var(--_bg, 255,255,255), 0.88);
  backdrop-filter: blur(18px) saturate(150%);
  border-bottom: 1px solid var(--border);
  box-shadow: 0 1px 24px rgba(0,0,0,0.06);
}
.lp-dark .lnav--scrolled { --_bg: 8,12,20; }
.lp-dark .lnav--scrolled { background: rgba(8,12,20,0.88); }

.lnav-inner {
  max-width: 1200px; margin: 0 auto;
  padding: 0 32px;
  display: flex; align-items: center;
  height: 100%;
}
.lnav-logo {
  display: flex; align-items: center; gap: 9px;
  text-decoration: none; color: var(--t1); font-weight: 800; font-size: 17px;
  letter-spacing: -0.03em;
}
.lnav-mark { width: 24px; height: 24px; flex-shrink: 0; }
.lnav-brand { font-family: 'Bricolage Grotesque', system-ui, sans-serif; }

.lnav-center {
  position: absolute; left: 50%; transform: translateX(-50%);
  display: flex; align-items: center; gap: 4px;
}
.lnav-link {
  padding: 6px 13px; border-radius: 8px;
  font-size: 14px; font-weight: 500; color: var(--t2); text-decoration: none;
  transition: background 0.18s, color 0.18s;
}
.lnav-link:hover { background: var(--bg2); color: var(--t1); }
.lnav-status { display: flex; align-items: center; gap: 7px; }

.status-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #10B981; box-shadow: 0 0 6px #10B981;
  animation: pulse-green 2.8s ease-in-out infinite;
}
@keyframes pulse-green {
  0%,100% { opacity: 0.75; transform: scale(1); }
  50%      { opacity: 1;    transform: scale(1.15); }
}

.lnav-right {
  margin-left: auto;
  display: flex; align-items: center; gap: 4px;
}
.lnav-icon {
  display: flex; align-items: center; justify-content: center;
  width: 34px; height: 34px; border-radius: 8px;
  color: var(--t3); text-decoration: none;
  transition: background 0.18s, color 0.18s;
}
.lnav-icon:hover { background: var(--bg2); color: var(--t1); }
.lnav-div { width: 1px; height: 18px; background: var(--border); margin: 0 4px; }
.lnav-theme {
  display: flex; align-items: center; justify-content: center;
  width: 30px; height: 30px; border-radius: 8px; border: none;
  background: transparent; color: var(--t3); cursor: pointer;
  transition: background 0.18s, color 0.18s, transform 0.16s;
}
.lnav-theme:hover { background: var(--bg2); color: var(--t1); transform: rotate(12deg); }
.lnav-cta {
  display: inline-flex; align-items: center; height: 34px; padding: 0 14px;
  border-radius: 8px; background: var(--blue); color: #fff;
  font-size: 13.5px; font-weight: 600; text-decoration: none;
  border: 1px solid transparent;
  transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
}
.lnav-cta:hover {
  background: #2563eb;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.25);
  transform: translateY(-1px);
}
.lnav-hamburger {
  display: none; flex-direction: column; justify-content: center; gap: 5px;
  width: 34px; height: 34px; border: none; background: none; cursor: pointer; padding: 6px;
}
.lnav-hamburger span { display: block; width: 100%; height: 1.5px; background: var(--t2); border-radius: 2px; }

.lnav-mobile {
  position: absolute; top: 100%; left: 0; right: 0;
  background: var(--bg); border-bottom: 1px solid var(--border);
  padding: 16px; display: flex; flex-direction: column; gap: 4px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}
.lnav-mlink {
  padding: 10px 14px; border-radius: 8px; font-weight: 500;
  color: var(--t2); text-decoration: none; transition: background 0.15s;
}
.lnav-mlink:hover { background: var(--bg2); color: var(--t1); }

/* ═══════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════ */
.hero {
  position: relative; min-height: 100vh;
  display: flex; align-items: center;
  padding: 100px 0 80px;
  overflow: hidden;
}
.hero-glow {
  position: absolute; border-radius: 50%;
  pointer-events: none; filter: blur(50px);
}
.hero-glow-tr {
  width: 640px; height: 640px;
  top: -100px; right: -80px;
  background: radial-gradient(circle, rgba(59,130,246,0.055), transparent 70%);
}
.hero-glow-bl {
  width: 420px; height: 420px;
  bottom: 0; left: -60px;
  background: radial-gradient(circle, rgba(59,130,246,0.035), transparent 70%);
  filter: blur(60px);
}
.hero-inner {
  max-width: 1200px; margin: 0 auto; padding: 0 40px;
  display: grid; grid-template-columns: 1fr 1fr;
  align-items: center; gap: 72px;
  width: 100%;
}

/* Hero text */
.hero-text {
  display: flex; flex-direction: column; gap: 28px;
  will-change: transform, opacity;
}
.hero-text .reveal { opacity: 0; transform: translateY(32px); }
.hero-text .reveal.in { opacity: 1; transform: translateY(0); }

.hero-badge {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 6px 14px; border-radius: 999px; width: fit-content;
  background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.28);
  font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: var(--blue);
}
.badge-pulse {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--blue); box-shadow: 0 0 8px var(--blue);
  animation: pulse-glow 2s ease-in-out infinite;
}
@keyframes pulse-glow {
  0%,100% { opacity: 0.6; transform: scale(1);    }
  50%      { opacity: 1;   transform: scale(1.1);  }
}

.hero-h1 {
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-size: clamp(42px, 5.2vw, 70px);
  font-weight: 800; letter-spacing: -0.034em; line-height: 1.06;
  margin: 0; color: var(--t1);
  display: flex; flex-direction: column;
}
.h1-line1 { display: block; }
.h1-line2 {
  display: block;
  opacity: 0; transform: translateY(10px);
  transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1);
}
.h1-line2--vis { opacity: 1; transform: translateY(0); }

/* Typewriter */
.tw-caret {
  display: inline-block; width: 3px; height: 0.84em;
  border-radius: 2px; background: var(--t1);
  margin-left: 3px; vertical-align: text-bottom;
  animation: tw-blink 0.9s step-start infinite;
}
.tw-caret--blue { background: var(--blue); box-shadow: 0 0 10px rgba(59,130,246,0.6); }
@keyframes tw-blink { 0%,100%{opacity:1} 50%{opacity:0} }
.tw-word {
  color: var(--blue);
  text-shadow: 0 0 28px rgba(59,130,246,0.4);
  display: inline-block;
}

.hero-sub {
  font-size: 17px; color: var(--t2); line-height: 1.68;
  max-width: 430px; margin: 0;
  border-left: 2px solid rgba(59,130,246,0.35);
  padding-left: 16px;
}
.hero-cta { display: flex; gap: 12px; flex-wrap: wrap; }
.hero-social { display: flex; align-items: center; gap: 12px; }
.hero-avs { display: flex; }
.hero-av {
  width: 28px; height: 28px; border-radius: 50%;
  background: var(--ac); border: 2px solid var(--bg);
  margin-left: -8px;
}
.hero-av:first-child { margin-left: 0; }
.hero-social-txt { font-size: 13px; color: var(--t3); font-weight: 500; }

/* Hero flow diagram */
.hero-flow {
  background: var(--card); border: 1px solid var(--border);
  border-radius: 16px; backdrop-filter: blur(16px);
  padding: 24px; will-change: transform, opacity;
  box-shadow: 0 4px 48px rgba(0,0,0,0.06);
}
.flow-wrap {
  display: flex; flex-direction: column; align-items: center; gap: 0;
}
.flow-node {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 16px; border-radius: 10px;
  background: var(--bg2); border: 1px solid var(--border);
  font-size: 13px; font-weight: 600; color: var(--t1);
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: default;
}
.flow-node:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(59,130,246,0.15); }
.flow-node--top { width: 100%; justify-content: flex-start; }
.flow-node-icon { color: var(--t3); }
.flow-node-label { font-weight: 700; }
.flow-node-sub { font-size: 11px; color: var(--t3); font-weight: 400; }
.flow-svg { width: 100%; height: 80px; overflow: visible; }
.flow-mid { display: flex; gap: 8px; width: 100%; justify-content: space-between; }
.flow-node--sm { flex: 1; justify-content: center; font-size: 12px; }
.flow-dot {
  width: 7px; height: 7px; border-radius: 50%;
  animation: pulse-glow 2s ease-in-out infinite;
}
.flow-dot--blue   { background: var(--blue);   box-shadow: 0 0 6px var(--blue); }
.flow-dot--purple { background: var(--purple); box-shadow: 0 0 6px var(--purple); animation-delay: 0.4s; }
.flow-dot--green  { background: var(--green);  box-shadow: 0 0 6px var(--green); animation-delay: 0.8s; }
.flow-node--deploy {
  width: 100%; justify-content: center;
  background: rgba(59,130,246,0.12); border-color: rgba(59,130,246,0.35);
  color: var(--blue); font-size: 14px; font-weight: 700; gap: 8px;
}
.flow-live {
  font-size: 9px; font-weight: 700; letter-spacing: 0.1em;
  background: #10B981; color: #fff; padding: 2px 6px; border-radius: 4px;
}

/* ═══════════════════════════════════════════════════════════════
   MARQUEE
═══════════════════════════════════════════════════════════════ */
.mq-wrap {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 40px 0 36px;
  text-align: center;
  overflow: hidden;
}
.mq-label {
  font-size: 11.5px; font-weight: 600; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--blue);
  display: flex; align-items: center; justify-content: center; gap: 10px;
  margin-bottom: 10px;
}
.mq-sub {
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-size: clamp(22px, 2.8vw, 32px); font-weight: 700; color: var(--t1);
  margin-bottom: 28px; letter-spacing: -0.02em;
}
.mq-rows { display: flex; flex-direction: column; gap: 10px; }
.mq-row {
  overflow: hidden; position: relative;
  mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
}
.mq-row:hover .mq-track { animation-play-state: paused; }
.mq-track { display: flex; width: max-content; }
.mq-set { display: flex; align-items: center; }
.mq-item {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 0 20px; font-size: 14px; font-weight: 600; color: var(--t2);
  white-space: nowrap;
}
.mq-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--dc); box-shadow: 0 0 8px var(--dc);
}
.mq-sep { color: var(--t4); font-size: 10px; }

@keyframes marquee-left  { from { transform: translateX(0); }   to { transform: translateX(-50%); } }
@keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }

/* ═══════════════════════════════════════════════════════════════
   HOW IT WORKS
═══════════════════════════════════════════════════════════════ */
.steps {
  display: grid; grid-template-columns: repeat(4, 1fr);
  border: 1px solid var(--border); border-radius: 16px;
  overflow: hidden; margin-top: 48px;
}
.step {
  padding: 28px 24px; border-right: 1px solid var(--border);
  transition: background 0.2s;
  display: flex; flex-direction: column; gap: 12px;
}
.step:last-child { border-right: none; }
.step:hover { background: var(--bg2); }
.step-num { font-size: 11px; font-weight: 700; color: var(--blue); letter-spacing: 0.06em; }
.step-icon {
  width: 42px; height: 42px; border-radius: 10px;
  border: 1px solid var(--border); background: var(--bg2);
  display: flex; align-items: center; justify-content: center; color: var(--t2);
}
.step-title { font-size: 15px; font-weight: 700; color: var(--t1); margin: 0; }
.step-desc  { font-size: 13.5px; color: var(--t3); line-height: 1.65; margin: 0; }

/* ═══════════════════════════════════════════════════════════════
   FEATURES
═══════════════════════════════════════════════════════════════ */
.ft-section { overflow: hidden; }
.ft-bg-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%);
}
.ft-blob {
  position: absolute; border-radius: 50%; pointer-events: none;
  filter: blur(80px);
}
.ft-blob-1 {
  width: 600px; height: 600px; top: -100px; left: 50%;
  background: radial-gradient(circle, rgba(59,130,246,0.07), transparent 70%);
  animation: breathe 9s ease-in-out infinite;
}
.ft-blob-2 {
  width: 500px; height: 500px; bottom: 0; right: -100px;
  background: radial-gradient(circle, rgba(139,92,246,0.06), transparent 70%);
  animation: breathe 12s ease-in-out infinite 2s;
}
@keyframes breathe {
  0%,100% { transform: scale(1);    opacity: 0.5; }
  50%      { transform: scale(1.14); opacity: 0.75; }
}

.ft-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 16px; margin-top: 48px;
}
.ft-card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: 16px; backdrop-filter: blur(12px);
  padding: 24px; position: relative; overflow: hidden;
  display: flex; flex-direction: column; gap: 10px;
  transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), border-color 0.25s, box-shadow 0.25s;
  cursor: default; transition-delay: var(--sd, 0s);
}
.ft-card:hover {
  transform: translateY(-4px);
  border-color: rgba(var(--fac-rgb, 59,130,246), 0.35);
  box-shadow: 0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(59,130,246,0.05);
}
.ft-card:hover { border-color: color-mix(in srgb, var(--fac) 35%, transparent); }
.ft-num { font-size: 10.5px; font-weight: 700; color: var(--fac); letter-spacing: 0.08em; }
.ft-icon {
  width: 44px; height: 44px; border-radius: 10px;
  border: 1px solid; background: transparent;
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.2s;
}
.ft-card:hover .ft-icon { transform: translateY(-3px); }
.ft-title { font-size: 15px; font-weight: 700; color: var(--t1); margin: 0; }
.ft-desc  { font-size: 13.5px; color: var(--t3); line-height: 1.65; margin: 0; flex: 1; transition: color 0.2s; }
.ft-card:hover .ft-desc { color: var(--t2); }
.ft-bar {
  height: 2px; border-radius: 2px; width: 28px;
  opacity: 0.5; margin-top: 4px;
  transition: width 0.3s, opacity 0.3s;
}
.ft-card:hover .ft-bar { width: 52px; opacity: 1; }

/* ═══════════════════════════════════════════════════════════════
   PRICING
═══════════════════════════════════════════════════════════════ */
.price-row {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 20px; margin-top: 48px; align-items: start;
}
.price-card {
  position: relative; overflow: hidden;
  background: var(--card); border: 1px solid var(--border);
  border-radius: 16px; backdrop-filter: blur(12px);
  padding: 28px 24px; display: flex; flex-direction: column; gap: 6px;
  transition: border-color 0.25s, box-shadow 0.25s;
  transition-delay: var(--sd, 0s);
  cursor: default;
}
/* Spotlight on hover */
.price-spot {
  position: absolute; inset: 0; pointer-events: none; border-radius: inherit;
  background: radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgba(59,130,246,0.07), transparent 70%);
  opacity: 0; transition: opacity 0.3s;
}
.price-card:hover .price-spot { opacity: 1; }

/* Shimmer on mouse enter */
.price-shimmer {
  position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.055), transparent);
  transform: skewX(-20deg); pointer-events: none;
}
.price-card.shimmer-play .price-shimmer {
  animation: card-shimmer 0.5s ease forwards;
}
@keyframes card-shimmer {
  from { left: -100%; }
  to   { left: 150%;  }
}

.price-card--feat {
  border-color: rgba(59,130,246,0.35);
  animation: price-ring 3s ease-in-out infinite;
}
@keyframes price-ring {
  0%,100% { box-shadow: 0 0 0 3px rgba(59,130,246,0.28); }
  50%      { box-shadow: 0 0 0 3px rgba(59,130,246,0.55); }
}
.price-pop {
  position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
  background: var(--blue); color: #fff; font-size: 11px; font-weight: 700;
  padding: 3px 12px; border-radius: 999px; white-space: nowrap;
  letter-spacing: 0.04em;
}
.price-plan {
  font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
  color: var(--t3); display: flex; align-items: center; gap: 8px;
  margin-bottom: 8px;
}
.price-badge {
  background: var(--bg2); border: 1px solid var(--border);
  font-size: 10px; padding: 1px 7px; border-radius: 4px; color: var(--t3);
}
.price-val {
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-size: 48px; font-weight: 800; color: var(--t1);
  letter-spacing: -0.03em; line-height: 1;
}
.price-freq { font-size: 13px; color: var(--t3); margin-bottom: 8px; }
.price-desc { font-size: 13.5px; color: var(--t3); line-height: 1.55; }
.price-div { border: none; border-top: 1px solid var(--border); margin: 16px 0; }
.price-feats { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 9px; flex: 1; }
.price-feats li { display: flex; align-items: center; gap: 9px; font-size: 13.5px; color: var(--t2); }
.price-inherit { font-style: italic; color: var(--t4); font-size: 12.5px; }
.price-btn {
  display: block; text-align: center; margin-top: 20px;
  height: 44px; line-height: 44px;
  border-radius: 9px; font-size: 14px; font-weight: 600;
  text-decoration: none; cursor: pointer; border: none;
  transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
}
.price-btn--ghost {
  background: var(--bg2); color: var(--t3); border: 1px solid var(--border);
  cursor: not-allowed; opacity: 0.6;
}
.price-btn--blue {
  background: var(--blue); color: #fff;
}
.price-btn--blue:hover {
  background: #2563eb;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.3), 0 4px 16px rgba(59,130,246,0.3);
  transform: translateY(-1px);
}
.price-btn--outline {
  background: transparent; color: var(--t1);
  border: 1px solid var(--border);
}
.price-btn--outline:hover { border-color: var(--blue); color: var(--blue); }

/* ═══════════════════════════════════════════════════════════════
   TERMINAL
═══════════════════════════════════════════════════════════════ */
.term-wrap {
  background: #0d1117; border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px; overflow: hidden; margin-top: 40px;
  box-shadow: 0 24px 64px rgba(0,0,0,0.22);
}
.term-bar {
  display: flex; align-items: center;
  padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.03); gap: 6px;
}
.term-dot {
  width: 12px; height: 12px; border-radius: 50%;
}
.term-dot--r { background: #ff5f57; }
.term-dot--y { background: #febc2e; }
.term-dot--g { background: #28c840; }
.term-title {
  flex: 1; text-align: center; font-family: 'Geist Mono', 'Menlo', monospace;
  font-size: 12px; color: rgba(255,255,255,0.35);
}
.term-body {
  padding: 24px 28px; min-height: 280px;
  font-family: 'Geist Mono', 'Menlo', ui-monospace, monospace;
  font-size: 13px; line-height: 1.85; color: rgba(255,255,255,0.85);
}
.term-line { animation: term-appear 0.15s ease both; }
@keyframes term-appear { from { opacity: 0; transform: translateX(-4px); } to { opacity: 1; transform: translateX(0); } }
.tw  { color: rgba(255,255,255,0.9); }
.td  { color: rgba(255,255,255,0.4); }
.tg  { color: #28c840; }
.tb  { color: #3b82f6; }
.term-cursor {
  display: inline-block; width: 7px; height: 13px;
  background: rgba(255,255,255,0.65);
  animation: tw-blink 0.9s step-end infinite;
  vertical-align: text-bottom; margin-left: 2px;
}
.term-prompt { color: rgba(255,255,255,0.35); margin-right: 8px; }

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIALS
═══════════════════════════════════════════════════════════════ */
.trust-label { font-size: 13px; color: var(--t4); text-align: center; margin-bottom: 24px; }
.trust-logos {
  display: flex; align-items: center; justify-content: center;
  gap: 32px; flex-wrap: wrap; margin-bottom: 32px;
}
.trust-logo {
  font-size: 15px; font-weight: 700; letter-spacing: -0.02em; color: var(--t4);
  opacity: 0; animation: logo-in 0.5s cubic-bezier(0.22,1,0.36,1) forwards;
  animation-delay: var(--tld, 0s);
  filter: blur(3px);
}
.trust-logos.in .trust-logo {
  opacity: 0.55; filter: blur(0);
}
@keyframes logo-in {
  to { opacity: 0.55; filter: blur(0); transform: translateY(0); }
  from { opacity: 0; filter: blur(3px); transform: translateY(10px); }
}
.trust-div { border: none; border-top: 1px solid var(--border); margin-bottom: 48px; }

.testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.testi-card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: 14px; backdrop-filter: blur(12px);
  padding: 24px; display: flex; flex-direction: column; gap: 14px;
  transition-delay: var(--sd, 0s);
}
.testi-stars { display: flex; gap: 3px; }
.testi-quote { font-size: 14.5px; color: var(--t2); line-height: 1.72; margin: 0; flex: 1; }
.testi-author { display: flex; align-items: center; gap: 12px; }
.testi-av {
  width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
  border: 1px solid; display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700;
}
.testi-name { font-size: 13px; font-weight: 700; color: var(--t1); }
.testi-role { font-size: 12px; color: var(--t4); }

/* ═══════════════════════════════════════════════════════════════
   FINAL CTA
═══════════════════════════════════════════════════════════════ */
.cta-wrap {
  position: relative; overflow: hidden;
  background: var(--card); border: 1px solid var(--border);
  border-radius: 20px; backdrop-filter: blur(16px);
  padding: 80px 48px; text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 20px;
}
.cta-glow {
  position: absolute; width: 800px; height: 480px;
  top: 50%; left: 50%; transform: translate(-50%, -50%);
  background: radial-gradient(ellipse, rgba(59,130,246,0.07), transparent 70%);
  filter: blur(48px); pointer-events: none;
}
.cta-topline {
  position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  width: 55%; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(59,130,246,0.5) 45%, transparent);
}
.cta-h2 {
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 800; letter-spacing: -0.034em; line-height: 1.1;
  color: var(--t1); margin: 0;
}
.cta-sub { font-size: 17px; color: var(--t3); max-width: 400px; line-height: 1.6; margin: 0; }
.cta-btns { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
.cta-fine { font-size: 12.5px; color: var(--t4); margin: 0; }

/* ═══════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════ */
.footer {
  border-top: 1px solid var(--border);
  padding: 80px 0 48px;
  background: var(--bg);
}
.foot-grid {
  display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr 1fr;
  gap: 32px; margin-bottom: 48px;
}
.foot-logo {
  display: flex; align-items: center; gap: 9px;
  text-decoration: none; color: var(--t1);
  font-family: 'Bricolage Grotesque', system-ui, sans-serif;
  font-size: 17px; font-weight: 800; letter-spacing: -0.03em;
  margin-bottom: 12px;
}
.foot-tagline { font-size: 13px; color: var(--t4); line-height: 1.55; max-width: 240px; }
.foot-col { display: flex; flex-direction: column; gap: 10px; }
.foot-head {
  font-size: 11.5px; font-weight: 700; letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--t4); margin-bottom: 4px;
}
.foot-link {
  font-size: 13.5px; color: var(--t3); text-decoration: none;
  transition: color 0.18s;
}
.foot-link:hover { color: var(--t1); }
.foot-bar {
  border-top: 1px solid var(--border); padding-top: 28px;
  display: flex; align-items: center; justify-content: space-between;
}
.foot-copy { font-size: 12.5px; color: var(--t4); }
.foot-social { display: flex; gap: 20px; }
.foot-soc {
  font-size: 12.5px; color: var(--t4); text-decoration: none;
  transition: color 0.18s;
}
.foot-soc:hover { color: var(--t2); }

/* ═══════════════════════════════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════════════════════════════ */
@media (max-width: 900px) {
  .hero-inner { grid-template-columns: 1fr; gap: 48px; }
  .hero-flow { order: 2; }
  .lnav-center { display: none; }
  .lnav-hamburger { display: flex; }
}
@media (max-width: 768px) {
  .hero { padding: 80px 0 60px; }
  .hero-inner { padding: 0 24px; }
  .container { padding: 0 24px; }
  .section { padding: 80px 0; }
  .ft-grid { grid-template-columns: 1fr; }
  .price-row { grid-template-columns: 1fr; }
  .testi-grid { grid-template-columns: 1fr; }
  .steps { grid-template-columns: 1fr 1fr; }
  .step { border-right: none; border-bottom: 1px solid var(--border); }
  .step:nth-child(odd) { border-right: 1px solid var(--border); }
  .step:nth-last-child(-n+2) { border-bottom: none; }
}
@media (max-width: 640px) {
  .foot-grid { grid-template-columns: 1fr 1fr; }
  .foot-brand { grid-column: 1 / -1; }
  .steps { grid-template-columns: 1fr; }
  .step { border-right: none; }
  .step:last-child { border-bottom: none; }
  .hero-h1 { font-size: clamp(38px, 11vw, 58px); }
  .h1-line2 { white-space: normal; }
}
</style>
