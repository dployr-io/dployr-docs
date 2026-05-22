<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()
const isHome = computed(() => frontmatter.value.layout === 'home')

const services = [
  { icon: '🟢', name: 'Node.js',     tag: 'JavaScript',  desc: 'Express, Fastify, NestJS' },
  { icon: '🐍', name: 'Python',      tag: 'FastAPI / Django', desc: 'Flask, Gunicorn, Uvicorn' },
  { icon: '🐹', name: 'Go',          tag: 'High performance', desc: 'Gin, Echo, net/http' },
  { icon: '🐘', name: 'PHP',         tag: 'Web',          desc: 'Laravel, Symfony, WordPress' },
  { icon: '💎', name: 'Ruby',        tag: 'Rails & Sinatra', desc: 'Puma, Unicorn, Rack' },
  { icon: '☕', name: 'Java',        tag: 'JVM',          desc: 'Spring Boot, Quarkus, Micronaut' },
  { icon: '🔷', name: '.NET',        tag: 'Microsoft',    desc: 'ASP.NET Core, Blazor' },
  { icon: '🐳', name: 'Docker',      tag: 'Containers',   desc: 'Any image, any registry' },
  { icon: '⚡', name: 'Static Sites',tag: 'CDN',          desc: 'Vite, Next.js, Nuxt, Astro' },
]

// Intersection observer for stagger reveal
const sectionRef = ref<HTMLElement | null>(null)
const visible = ref(false)

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) { visible.value = true; observer?.disconnect() } },
    { threshold: 0.15 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section v-if="isHome" class="sv" ref="sectionRef">
    <div class="sv-wrap">
      <!-- Header -->
      <div class="sv-head" :class="{ 'sv-visible': visible }">
        <p class="sv-eyebrow">Runtimes & Stacks</p>
        <h2 class="sv-title">Deploy anything.</h2>
        <p class="sv-sub">
          One platform, every runtime. dployr handles the deployment
          so you can focus on shipping.
        </p>
      </div>

      <!-- Grid -->
      <div class="sv-grid">
        <div
          v-for="(s, i) in services"
          :key="s.name"
          class="sv-card"
          :class="{ 'sv-card-visible': visible }"
          :style="{ transitionDelay: visible ? `${i * 60}ms` : '0ms' }"
        >
          <div class="sv-card-top">
            <span class="sv-icon" role="img" :aria-label="s.name">{{ s.icon }}</span>
            <span class="sv-tag">{{ s.tag }}</span>
          </div>
          <h3 class="sv-card-name">{{ s.name }}</h3>
          <p class="sv-card-desc">{{ s.desc }}</p>
          <div class="sv-card-footer">
            <span class="sv-ready-dot"></span>
            <span class="sv-ready-text">Production ready</span>
          </div>
        </div>
      </div>

      <!-- Bottom CTA strip -->
      <div class="sv-cta" :class="{ 'sv-visible': visible }">
        <p>Don't see your stack? If it runs on Linux, dployr supports it.</p>
        <a href="/docs/quickstart" class="sv-cta-link">
          See all runtimes →
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sv {
  background: var(--vp-c-bg);
  padding: 100px 2rem;
  position: relative;
}

.sv-wrap {
  max-width: 1160px;
  margin: 0 auto;
}

/* ── Header ─────────────────────────────────────────── */
.sv-head {
  text-align: center;
  margin-bottom: 56px;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity .7s ease, transform .7s ease;
}
.sv-head.sv-visible { opacity: 1; transform: translateY(0); }

.sv-eyebrow {
  font-size: .78rem;
  font-weight: 600;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--color-primary);
  margin: 0 0 .75rem;
}

.sv-title {
  font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif;
  font-size: clamp(2rem, 4.5vw, 3.4rem);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1.1;
  color: var(--vp-c-text-1);
  margin: 0 0 1rem;
}

.sv-sub {
  font-size: 1.05rem;
  color: var(--vp-c-text-2);
  max-width: 480px;
  margin: 0 auto;
  line-height: 1.7;
}

/* ── Grid ───────────────────────────────────────────── */
.sv-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

/* ── Card ───────────────────────────────────────────── */
.sv-card {
  position: relative;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
  cursor: default;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity .55s ease,
    transform .55s ease,
    border-color .25s ease,
    box-shadow .25s ease,
    background .25s ease;
}
.sv-card.sv-card-visible { opacity: 1; transform: translateY(0); }

.sv-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  opacity: 0;
  background: radial-gradient(
    120px circle at var(--mx, 50%) var(--my, 50%),
    rgba(45,39,199,.06) 0%,
    transparent 100%
  );
  transition: opacity .3s ease;
  pointer-events: none;
}
.sv-card:hover::before { opacity: 1; }

.sv-card:hover {
  border-color: rgba(45,39,199,.3);
  box-shadow:
    0 0 0 1px rgba(45,39,199,.08),
    0 8px 32px rgba(45,39,199,.08);
  background: var(--vp-c-bg);
  transform: translateY(-4px);
}

/* Card inner */
.sv-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.sv-icon {
  font-size: 1.8rem;
  line-height: 1;
}
.sv-tag {
  font-size: .68rem;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 100px;
  background: rgba(45,39,199,.07);
  color: var(--color-primary);
  border: 1px solid rgba(45,39,199,.12);
  white-space: nowrap;
}

.sv-card-name {
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
  margin: 0 0 6px;
}

.sv-card-desc {
  font-size: .82rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0 0 16px;
}

.sv-card-footer {
  display: flex;
  align-items: center;
  gap: 7px;
}
.sv-ready-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 6px rgba(34,197,94,.6);
  flex-shrink: 0;
  animation: pulse 2.5s ease-in-out infinite;
}
@keyframes pulse {
  0%,100% { box-shadow: 0 0 4px rgba(34,197,94,.5); }
  50%      { box-shadow: 0 0 10px rgba(34,197,94,.8); }
}
.sv-ready-text { font-size: .72rem; font-weight: 600; color: #22c55e; }

/* Dark tweaks */
.dark .sv-tag {
  background: rgba(223,224,252,.08);
  color: var(--color-primary-lighter);
  border-color: rgba(223,224,252,.12);
}

/* ── CTA strip ─────────────────────────────────────── */
.sv-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 48px;
  padding: 24px 32px;
  border-radius: 16px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
  opacity: 0;
  transform: translateY(16px);
  transition: opacity .7s .5s ease, transform .7s .5s ease;
}
.sv-cta.sv-visible { opacity: 1; transform: translateY(0); }

.sv-cta p {
  margin: 0;
  font-size: .95rem;
  color: var(--vp-c-text-2);
}

.sv-cta-link {
  font-size: .9rem;
  font-weight: 650;
  color: var(--color-primary);
  text-decoration: none;
  white-space: nowrap;
  transition: all .2s ease;
}
.sv-cta-link:hover {
  color: var(--color-primary-light);
  letter-spacing: .01em;
}

/* ── Responsive ─────────────────────────────────────── */
@media (max-width: 640px) {
  .sv { padding: 72px 1.25rem; }
  .sv-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
  .sv-cta { flex-direction: column; text-align: center; }
}
</style>
