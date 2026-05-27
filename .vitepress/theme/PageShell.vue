<template>
  <div :class="['lp', mode === 'light' ? 'lp--light' : '']">

    <nav class="lp-nav">
      <div class="lp-nav__inner">
        <a href="/" class="lp-nav__logo" aria-label="dployr home">
          <span class="lp-mark">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" fill="currentColor" aria-hidden="true">
              <g transform="translate(182.91, 42.77) scale(0.484734)">
                <path d="M430.07,941.85H429L864.75,506.11a50.63,50.63,0,0,0,14.81-35.77V287.8A50.63,50.63,0,0,0,864.75,252L627.63,14.92c-31.87-31.87-86.35-9.3-86.35,35.76V357.42a50.58,50.58,0,0,1-14.82,35.77L14.82,904.83a50.59,50.59,0,0,0,0,71.55L279.3,1240.72a50.59,50.59,0,0,0,71.53,0L504.1,1087.42a50.59,50.59,0,0,0,0-71.54Z"/>
                <path d="M877.49,944.67h1.07L442.82,1380.42A50.55,50.55,0,0,0,428,1416.18v182.54a50.58,50.58,0,0,0,14.82,35.77l237.11,237.12c31.87,31.86,86.35,9.29,86.35-35.77V1529.1a50.59,50.59,0,0,1,14.82-35.77l511.65-511.64a50.6,50.6,0,0,0,0-71.55L1028.26,645.81a50.57,50.57,0,0,0-71.52,0L803.46,799.11a50.58,50.58,0,0,0,0,71.53Z"/>
              </g>
            </svg>
          </span>
          <span class="lp-wordmark">dployr</span>
        </a>
        <div class="lp-nav__links">
          <a href="/docs/quickstart">Docs</a>
          <a :href="pricingHref">Pricing</a>
          <a href="/changelog">Changelog</a>
          <a href="https://github.com/dployr-io/dployr" target="_blank" rel="noopener">GitHub</a>
          <a href="https://discord.gg/tY8ZbjvrSZ" target="_blank" rel="noopener">Discord</a>
        </div>
        <button class="lp-toggle" @click="toggle" :aria-label="mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'">
          <svg v-if="mode === 'dark'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
        <a href="https://app.dployr.io" class="lp-btn lp-btn--brand lp-nav__cta" target="_blank" rel="noopener">
          Get Started, it's free
        </a>
        <button class="lp-nav__burger" :aria-label="menuOpen ? 'Close menu' : 'Open menu'" @click="menuOpen = !menuOpen">
          <span /><span /><span />
        </button>
      </div>
    </nav>

    <div v-if="menuOpen" class="lp-nav__mobile" @click="menuOpen = false">
      <a href="/docs/quickstart">Docs</a>
      <a :href="pricingHref">Pricing</a>
      <a href="/changelog">Changelog</a>
      <a href="https://github.com/dployr-io/dployr" target="_blank" rel="noopener">GitHub</a>
      <a href="https://discord.gg/tY8ZbjvrSZ" target="_blank" rel="noopener">Discord</a>
      <a href="https://app.dployr.io" class="lp-btn lp-btn--brand lp-btn--full" target="_blank" rel="noopener" style="margin-top:0.5rem">Get Started, it's free</a>
    </div>

    <slot />

    <footer class="lp-footer">
      <div class="lp-footer__watermark" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" fill="currentColor">
          <g transform="translate(182.91, 42.77) scale(0.484734)">
            <path d="M430.07,941.85H429L864.75,506.11a50.63,50.63,0,0,0,14.81-35.77V287.8A50.63,50.63,0,0,0,864.75,252L627.63,14.92c-31.87-31.87-86.35-9.3-86.35,35.76V357.42a50.58,50.58,0,0,1-14.82,35.77L14.82,904.83a50.59,50.59,0,0,0,0,71.55L279.3,1240.72a50.59,50.59,0,0,0,71.53,0L504.1,1087.42a50.59,50.59,0,0,0,0-71.54Z"/>
            <path d="M877.49,944.67h1.07L442.82,1380.42A50.55,50.55,0,0,0,428,1416.18v182.54a50.58,50.58,0,0,0,14.82,35.77l237.11,237.12c31.87,31.86,86.35,9.29,86.35-35.77V1529.1a50.59,50.59,0,0,1,14.82-35.77l511.65-511.64a50.6,50.6,0,0,0,0-71.55L1028.26,645.81a50.57,50.57,0,0,0-71.52,0L803.46,799.11a50.58,50.58,0,0,0,0,71.53Z"/>
          </g>
        </svg>
      </div>

      <div class="lp-container">
        <div class="lp-footer__top">
          <div class="lp-footer__brand">
            <a href="/" class="lp-nav__logo" aria-label="dployr home">
              <span class="lp-mark lp-mark--sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" fill="currentColor" aria-hidden="true">
                  <g transform="translate(182.91, 42.77) scale(0.484734)">
                    <path d="M430.07,941.85H429L864.75,506.11a50.63,50.63,0,0,0,14.81-35.77V287.8A50.63,50.63,0,0,0,864.75,252L627.63,14.92c-31.87-31.87-86.35-9.3-86.35,35.76V357.42a50.58,50.58,0,0,1-14.82,35.77L14.82,904.83a50.59,50.59,0,0,0,0,71.55L279.3,1240.72a50.59,50.59,0,0,0,71.53,0L504.1,1087.42a50.59,50.59,0,0,0,0-71.54Z"/>
                    <path d="M877.49,944.67h1.07L442.82,1380.42A50.55,50.55,0,0,0,428,1416.18v182.54a50.58,50.58,0,0,0,14.82,35.77l237.11,237.12c31.87,31.86,86.35,9.29,86.35-35.77V1529.1a50.59,50.59,0,0,1,14.82-35.77l511.65-511.64a50.6,50.6,0,0,0,0-71.55L1028.26,645.81a50.57,50.57,0,0,0-71.52,0L803.46,799.11a50.58,50.58,0,0,0,0,71.53Z"/>
                  </g>
                </svg>
              </span>
              <span class="lp-wordmark">dployr</span>
            </a>
            <p class="lp-footer__tagline">Ship apps, not infrastructure.</p>
          </div>

          <div class="lp-footer__newsletter">
            <p class="lp-footer__nl-heading">Stay in the loop</p>
            <p class="lp-footer__nl-sub">No marketing. No spam. No bs.</p>
            <NewsletterForm />
          </div>
        </div>

        <div class="lp-footer__cols">
          <div class="lp-footer__col">
            <h4 class="lp-footer__col-heading">Product</h4>
            <a href="/docs/quickstart">Docs</a>
            <a href="/changelog">Changelog</a>
            <a :href="pricingHref">Pricing</a>
            <a href="https://status.dployr.io/" target="_blank" rel="noopener">Status</a>
          </div>
          <div class="lp-footer__col">
            <h4 class="lp-footer__col-heading">Community</h4>
            <a href="https://github.com/dployr-io/dployr" target="_blank" rel="noopener">GitHub</a>
            <a href="https://discord.gg/tY8ZbjvrSZ" target="_blank" rel="noopener">Discord</a>
            <a href="https://x.com/@dployr" target="_blank" rel="noopener">Twitter</a>
            <a href="/blog/">Blog</a>
          </div>
          <div class="lp-footer__col">
            <h4 class="lp-footer__col-heading">Get help</h4>
            <a href="mailto:hello@dployr.io">hello@dployr.io</a>
            <a href="/docs/troubleshooting">Troubleshooting</a>
            <a href="/docs/quickstart">Getting started</a>
          </div>
        </div>

        <div class="lp-footer__bottom">
          <nav class="lp-footer__legal" aria-label="Legal links">
            <a href="/legal/privacy-policy">Privacy</a>
            <a href="/legal/terms-of-service">Terms</a>
            <a href="/legal/data-processing-addendum">DPA</a>
          </nav>
          <p class="lp-footer__copy">© 2025 Dployr · Open source under Apache 2.0</p>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vitepress'
import { useColorMode } from './useColorMode'
import NewsletterForm from './NewsletterForm.vue'

const { mode, toggle } = useColorMode()
const route = useRoute()
const pricingHref = computed(() => route.path === '/' ? '#pricing' : '/#pricing')
const menuOpen = ref(false)
</script>

<style>
.lp {
  --bg:       oklch(0.147 0.004 49.25);
  --bg-soft:  oklch(0.216 0.006 56.043);
  --bg-mute:  oklch(0.268 0.007 34.298);
  --text:     oklch(0.985 0.001 106.423);
  --text-2:   oklch(0.709 0.01 56.259);
  --text-3:   oklch(0.553 0.013 58.071);
  --border:   oklch(1 0 0 / 0.10);
  --brand:    oklch(0.923 0.003 48.717);
  --radius:   0.625rem;
  --font:     'Instrument Sans', ui-sans-serif, system-ui, sans-serif;

  background: var(--bg);
  color: var(--text);
  font-family: var(--font);
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.lp--light {
  --bg:      oklch(0.985 0.001 90);
  --bg-soft: oklch(0.955 0.003 90);
  --bg-mute: oklch(0.928 0.005 90);
  --text:    oklch(0.147 0.004 49.25);
  --text-2:  oklch(0.38  0.008 90);
  --text-3:  oklch(0.56  0.006 90);
  --border:  oklch(0.15  0.005 90 / 0.12);
  --brand:   oklch(0.147 0.004 49.25);
}

*, *::before, *::after { box-sizing: border-box; }

.lp-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
.lp-container--narrow { max-width: 720px; }

.lp-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.625rem 1.25rem;
  border-radius: var(--radius);
  font-family: var(--font);
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
  white-space: nowrap;
  line-height: 1.4;
}
.lp-btn--brand {
  background: var(--brand);
  color: var(--bg);
  border-color: var(--brand);
}
.lp-btn--brand:hover {
  background: var(--text);
  border-color: var(--text);
  color: var(--bg);
}
.lp-btn--ghost {
  background: transparent;
  color: var(--text);
  border-color: var(--border);
}
.lp-btn--ghost:hover { border-color: var(--text-2); }

.lp-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 60px;
  background: oklch(0.147 0.004 49.25 / 0.90);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  transition: background 0.2s;
}
.lp--light .lp-nav {
  background: oklch(0.985 0.001 90 / 0.92);
}
.lp-nav__inner {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
}
.lp-nav__logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  flex-shrink: 0;
}
.lp-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: var(--bg-mute);
  border-radius: 22%;
  color: var(--text);
  flex-shrink: 0;
}
.lp-mark svg { width: 17px; height: 17px; }
.lp-mark--sm { width: 26px; height: 26px; }
.lp-mark--sm svg { width: 15px; height: 15px; }
.lp-wordmark {
  font-family: 'Geist', var(--font);
  font-weight: 700;
  font-size: 1.0625rem;
  letter-spacing: -0.025em;
  color: var(--text);
  line-height: 1;
}
.lp-nav__links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
}
.lp-nav__links a {
  font-size: 0.9375rem;
  color: var(--text-2);
  text-decoration: none;
  transition: color 0.15s;
}
.lp-nav__links a:hover { color: var(--text); }
.lp-nav__cta { flex-shrink: 0; }
.lp-nav__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  margin-left: auto;
}
.lp-nav__burger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
}

.lp-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  background: none;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  cursor: pointer;
  color: var(--text-2);
  flex-shrink: 0;
  transition: color 0.15s, border-color 0.15s;
  padding: 0;
}
.lp-toggle svg { width: 16px; height: 16px; }
.lp-toggle:hover { color: var(--text); border-color: var(--text-3); }

.lp--light .lp-btn--brand {
  background: oklch(0.147 0.004 49.25);
  color: oklch(0.985 0.001 90);
  border-color: oklch(0.147 0.004 49.25);
}
.lp--light .lp-btn--brand:hover {
  background: oklch(0.268 0.007 34.298);
  border-color: oklch(0.268 0.007 34.298);
  color: oklch(0.985 0.001 90);
}

.lp-footer {
  position: relative;
  overflow: hidden;
  border-top: 1px solid var(--border);
  padding: 4rem 0 2.5rem;
  margin-top: auto;
}
.lp-footer__watermark {
  position: absolute;
  right: -4%;
  bottom: -20%;
  width: 340px;
  height: 340px;
  opacity: 0.04;
  pointer-events: none;
  user-select: none;
}
.lp-footer__watermark svg { width: 100%; height: 100%; }
.lp-footer__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3rem;
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  border-bottom: 1px solid var(--border);
}
.lp-footer__brand {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-shrink: 0;
}
.lp-footer__tagline {
  font-size: 0.875rem;
  color: var(--text-3);
  margin: 0;
}
.lp-footer__newsletter {
  max-width: 380px;
  width: 100%;
}
.lp-footer__nl-heading {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text);
  margin: 0 0 0.25rem;
}
.lp-footer__nl-sub {
  font-size: 0.875rem;
  color: var(--text-3);
  margin: 0 0 0.875rem;
}
.lp-footer__nl-form {
  display: flex;
  gap: 0.5rem;
}
.lp-footer__nl-input {
  flex: 1;
  min-width: 0;
  padding: 0.5rem 0.875rem;
  background: var(--bg-mute);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  font-family: var(--font);
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.15s;
}
.lp-footer__nl-input::placeholder { color: var(--text-3); }
.lp-footer__nl-input:focus { border-color: var(--text-3); }
.lp-footer__nl-btn {
  padding: 0.5rem 1.125rem;
  background: var(--bg-mute);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text-2);
  font-family: var(--font);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.lp-footer__nl-btn:hover {
  background: var(--bg-soft);
  border-color: var(--text-3);
  color: var(--text);
}
.lp-footer__cols {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}
.lp-footer__col {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.lp-footer__col-heading {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-3);
  margin: 0 0 0.25rem;
}
.lp-footer__col a {
  font-size: 0.9375rem;
  color: var(--text-2);
  text-decoration: none;
  width: fit-content;
  transition: color 0.15s;
}
.lp-footer__col a:hover { color: var(--text); }
.lp-footer__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.75rem;
  border-top: 1px solid var(--border);
}
.lp-footer__legal { display: flex; gap: 1.25rem; }
.lp-footer__legal a {
  font-size: 0.8125rem;
  color: var(--text-3);
  text-decoration: none;
  transition: color 0.15s;
}
.lp-footer__legal a:hover { color: var(--text-2); }
.lp-footer__copy { font-size: 0.8125rem; color: var(--text-3); margin: 0; }


@media (max-width: 768px) {
  .lp-nav__links  { display: none; }
  .lp-nav__cta    { display: none; }
  .lp-nav__burger { display: flex; }
  .lp-footer__top { flex-direction: column; gap: 2rem; }
  .lp-footer__newsletter { max-width: 100%; }
  .lp-footer__cols { grid-template-columns: 1fr 1fr; }
  .lp-footer__bottom { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
}

.lp-nav__mobile {
  display: none;
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  z-index: 99;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  padding: 1.25rem 1.5rem 1.5rem;
  flex-direction: column;
  gap: 0;
}
.lp-nav__mobile a:not(.lp-btn) {
  display: block;
  padding: 0.875rem 0;
  border-bottom: 1px solid var(--border);
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-2);
  text-decoration: none;
}
.lp-nav__mobile a:not(.lp-btn):hover { color: var(--text); }
@media (max-width: 768px) {
  .lp-nav__mobile { display: flex; }
}

.lp-nav__burger[aria-label="Close menu"] span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.lp-nav__burger[aria-label="Close menu"] span:nth-child(2) { opacity: 0; }
.lp-nav__burger[aria-label="Close menu"] span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
.lp-nav__burger span { transition: transform 0.2s, opacity 0.2s; }
</style>
