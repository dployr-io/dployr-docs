<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import PageShell from './PageShell.vue'

const heroRef = ref<HTMLElement | null>(null)
let rafId: number | null = null
function onScroll() {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() => {
    heroRef.value?.style.setProperty('--dot-y', `${window.scrollY * 0.25}px`)
  })
}
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => { window.removeEventListener('scroll', onScroll); if (rafId) cancelAnimationFrame(rafId) })
</script>

<template>
  <PageShell>
    <section class="nf-hero" ref="heroRef">
      <div class="nf-inner">
        <p class="nf-label">Page not found</p>
        <h1 class="nf-code">404</h1>
        <p class="nf-sub">This page doesn't exist or was moved.<br>The docs are still here though.</p>
        <div class="nf-actions">
          <a href="/docs/quickstart" class="lp-btn lp-btn--brand">Go to Docs</a>
          <a href="/" class="lp-btn lp-btn--ghost">Back to Home</a>
        </div>
      </div>
    </section>
  </PageShell>
</template>

<style scoped>
.nf-hero {
  position: relative;
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

.nf-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, var(--text) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: 0 var(--dot-y, 0px);
  -webkit-mask-image: radial-gradient(ellipse 65% 70% at 50% 35%, transparent 45%, black 72%);
  mask-image: radial-gradient(ellipse 65% 70% at 50% 35%, transparent 45%, black 72%);
  opacity: 0.13;
  pointer-events: none;
  z-index: 0;
}

.nf-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  padding: 4rem 1.5rem;
}

.nf-label {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-3);
  margin: 0;
}

.nf-code {
  font-size: clamp(7rem, 22vw, 14rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--text);
  margin: 0;
}

.nf-sub {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--text-2);
  line-height: 1.6;
  margin: 0;
  max-width: 420px;
}

.nf-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0.5rem;
}
</style>
