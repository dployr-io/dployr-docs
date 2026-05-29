<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import PageShell from './PageShell.vue'
import { useColorMode } from './useColorMode'

const { mode } = useColorMode()

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

const deployTab = ref<'cli' | 'actions' | 'dashboard'>('dashboard')

const ghToken = '${{ secrets.DPLOYR_TOKEN }}'

const billingCycle = ref<'annual' | 'monthly'>('annual')

const price = {
  hobby: { annual: 0,  monthly: 0  },
  indie: { annual: 12, monthly: 15 },
  pro:   { annual: 20, monthly: 25 },
}

const hobbyFeatures = [
  '512MB RAM · 1 vCPU · 10GB disk',
  '1 workload (sleeps when idle)',
  'All runtimes',
  'CLI + dashboard',
  'Blueprints',
  'GitHub Actions',
  'Log streaming',
  'RBAC + audit log',
  '30-day log retention',
]

const indieFeatures = [
  '1GB RAM · 1 vCPU · 25GB disk',
  'Shared always-on instance',
  'Up to 5 workloads',
  '5 seats',
  'Slack / Discord / webhooks',
  'Migration support',
  '12-month log retention',
]

const proFeatures = [
  '2GB RAM · 1 vCPU · 50GB disk',
  'Dedicated instance',
  'Up to 25 workloads',
  '36-month log retention',
  '25 seats',
  'Priority support',
  'Console access',
  'File explorer',
  'Watchdog',
]

const showCompare = ref(false)
const comparePlans = ref<string[]>(['hobby', 'pro'])

function toggleComparePlan(plan: string) {
  const idx = comparePlans.value.indexOf(plan)
  if (idx > -1) {
    if (comparePlans.value.length > 1) comparePlans.value.splice(idx, 1)
  } else {
    if (comparePlans.value.length < 2) {
      comparePlans.value.push(plan)
      comparePlans.value.sort((a, b) => ['hobby','indie','pro'].indexOf(a) - ['hobby','indie','pro'].indexOf(b))
    } else {
      comparePlans.value.splice(1, 1, plan)
      comparePlans.value.sort((a, b) => ['hobby','indie','pro'].indexOf(a) - ['hobby','indie','pro'].indexOf(b))
    }
  }
}

interface FeatureRow { label: string; values: Record<string, string | boolean> }

const featureRows: FeatureRow[] = [
  { label: 'Specifications',          values: { hobby: '512MB / 1 vCPU / 10GB', indie: '1GB / 1 vCPU / 25GB', pro: '2GB / 1 vCPU / 50GB' } },
  { label: 'Workloads',               values: { hobby: '1', indie: '5', pro: '25' } },
  { label: 'Seats',                   values: { hobby: '1', indie: '5', pro: '25' } },
  { label: 'Instance',                values: { hobby: 'Sleeps when idle', indie: 'Shared always-on', pro: 'Dedicated' } },
  { label: 'Log retention',           values: { hobby: '30 days', indie: '12 months', pro: '36 months' } },
  { label: 'All runtimes',            values: { hobby: true, indie: true, pro: true } },
  { label: 'CLI + dashboard',         values: { hobby: true, indie: true, pro: true } },
  { label: 'Blueprints',              values: { hobby: true, indie: true, pro: true } },
  { label: 'GitHub Actions',          values: { hobby: true, indie: true, pro: true } },
  { label: 'Log streaming',           values: { hobby: true, indie: true, pro: true } },
  { label: 'RBAC + audit log',        values: { hobby: true, indie: true, pro: true } },
  { label: 'Slack / Discord / webhooks', values: { hobby: false, indie: true, pro: true } },
  { label: 'Migration support',       values: { hobby: false, indie: true, pro: true } },
  { label: 'Console access',          values: { hobby: false, indie: false, pro: true } },
  { label: 'File explorer',           values: { hobby: false, indie: false, pro: true } },
  { label: 'Watchdog',                values: { hobby: false, indie: false, pro: true } },
  { label: 'Priority support',        values: { hobby: false, indie: false, pro: true } },
]

const planLabels: Record<string, string> = { hobby: 'Hobby', indie: 'Indie', pro: 'Pro' }
const planPriceLabel = (plan: string) =>
  price[plan as keyof typeof price][billingCycle.value] === 0
    ? 'Free'
    : `$${price[plan as keyof typeof price][billingCycle.value]}/mo`

const openFaq = ref<number | null>(null)
function toggleFaq(i: number) {
  openFaq.value = openFaq.value === i ? null : i
}

const features = [
  {
    title: 'Your server, ready instantly',
    body: 'Your server is ready the moment you subscribe. No cloud console, no SSH, nothing to set up.',
  },
  {
    title: 'We run the platform',
    body: 'We host and run dployr so you never have to think about it. Log in, deploy, that\'s it.',
  },
  {
    title: 'Any runtime',
    body: 'Node, Python, Go, PHP, Ruby, .NET, Java, Docker. Pick a runtime, deploy. Nothing to configure.',
  },
  {
    title: 'HTTPS everywhere',
    body: 'Every app gets HTTPS automatically on every deploy. No certificates to manage, no renewals to track.',
  },
  {
    title: 'Team access built in',
    body: 'Add teammates and set the right access level for each. No shared passwords, no SSH keys to hand out.',
  },
  {
    title: 'Bring your own server',
    body: 'Already running on Hetzner, DigitalOcean, Vultr, or AWS? Connect it and it shows up right alongside your managed server.',
  },
]

const runtimes = [
  { label: 'Node.js',  icon: '/icons/nodejs.svg'  },
  { label: 'Python',   icon: '/icons/python.svg'   },
  { label: 'Go',       icon: '/icons/go.svg'       },
  { label: 'PHP',      icon: '/icons/php.svg'      },
  { label: 'Ruby',     icon: '/icons/ruby.svg'     },
  { label: '.NET',     icon: '/icons/dotnet.svg'   },
  { label: 'Java',     icon: '/icons/java.svg'     },
  { label: 'Docker',   icon: '/icons/docker.svg'   },
  { label: 'Static',   icon: null                  },
]

const faqs = [
  {
    q: 'Is the free plan actually free?',
    a: "Yeah, free forever. No card, no expiry. Hobby just doesn't cost anything. The catch is your app sleeps when it's been quiet for a bit and takes a second to wake up when traffic comes in. If that's annoying, paid plans don't sleep.",
  },
  {
    q: 'Do I need to know Docker or how servers work?',
    a: "You don't need Docker at all. Pick your runtime, point it at your code, done. If you do use Docker, bring your image and it deploys the same way.",
  },
  {
    q: 'What counts as a workload?',
    a: 'Each running service is one workload. Your API is one, a background worker is another, a cron job is another. Hobby gives you one, Indie five, Pro twenty-five. They all run on the same server.',
  },
  {
    q: 'Will my bill go up if my app gets more traffic?',
    a: 'No. You pay for the server, not for what it handles. Traffic, requests, bandwidth, none of it changes your bill. Same number every month, no surprises.',
  },
  {
    q: 'How is this different from Render or Railway?',
    a: 'On Render you pay per service, so five apps is five separate bills. Railway charges for what your app actually consumes, so a traffic spike hits your wallet. Here you pay for the server and run what you need on it. More apps, more traffic, same price.',
  },
  {
    q: 'How is this different from Heroku?',
    a: 'Heroku runs each service on its own dyno and charges per dyno hour. The more services you run, the more it stacks up. dployr is one flat fee for the server. Run everything on it.',
  },
  {
    q: 'What happens if a deployment fails?',
    a: 'Nothing bad. Your current version stays live until the new one comes up healthy. If something still goes wrong after it deploys, roll back in one click.',
  },
  {
    q: 'Do you handle custom domains and HTTPS?',
    a: 'Yes. Point your domain and SSL gets set up and auto-renewed. Nothing to configure.',
  },
]

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
})

const howToSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Deploy an app with dployr',
  description: 'Install dployrd on your server and deploy your first app in minutes.',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Install the daemon', text: 'Run the one-line installer. dployrd connects to the control plane using a bootstrap token. No inbound ports needed.' },
    { '@type': 'HowToStep', position: 2, name: 'Deploy your app', text: 'Push from the CLI, trigger a GitHub Actions workflow, or deploy via the dashboard. No SSH required.' },
    { '@type': 'HowToStep', position: 3, name: 'Manage from anywhere', text: 'View logs, restart services, open a browser console, and roll back from app.dployr.io or the CLI.' },
  ],
})
</script>

<template>
  <PageShell>
    <component :is="'script'" type="application/ld+json" v-html="faqSchema" />
    <component :is="'script'" type="application/ld+json" v-html="howToSchema" />

    <section class="lp-hero" ref="heroRef">
      <div class="lp-container">
        <h1 class="lp-hero__h1">Your app has been on<br><span class="lp-underline">localhost<svg class="lp-underline__svg" viewBox="0 0 260 14" fill="none" preserveAspectRatio="none" aria-hidden="true"><path d="M2 10 C 40 4, 80 14, 130 8 S 210 2, 258 9" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/></svg></span> long enough.</h1>
        <p class="lp-hero__sub">
          Create an account and your server is ready. No SSH, no setup, nothing to
          configure. Push from the CLI, GitHub Actions, or the dashboard.
          Works with Hetzner, DigitalOcean, Vultr, or any VPS you already have.
        </p>
        <div class="lp-hero__actions">
          <a href="https://app.dployr.io" class="lp-btn lp-btn--brand lp-btn--lg" target="_blank" rel="noopener">Get Started, it's free →</a>
          <a href="https://github.com/dployr-io/dployr" class="lp-btn lp-btn--ghost lp-btn--lg" target="_blank" rel="noopener">View on GitHub</a>
        </div>
        <p class="lp-hero__fine">Hobby is free forever · No card needed · Paid plans from $12/mo</p>

        <div class="lp-hero__visual">
          <video :key="mode" autoplay loop muted playsinline class="lp-hero__img"
            :poster="mode === 'dark' ? '/01-dark.webp' : '/01.webp'">
            <source :src="mode === 'dark' ? '/hero-dark.webm' : '/hero.webm'" type="video/webm" />
          </video>
        </div>
      </div>
    </section>

    <section class="lp-problem">
      <div class="lp-container lp-container--narrow">
        <p>
          Render bills per service. Railway bills per usage. On dployr you pay for the server
          and run everything on it. More apps, more traffic, same price.
        </p>
      </div>
    </section>

    <section class="lp-how" id="how-it-works">
      <div class="lp-container">
        <h2 class="lp-section-title">Up and running in minutes</h2>

        <div class="lp-steps">

          <div class="lp-step">
            <div class="lp-step__num">01</div>
            <div class="lp-step__body">
              <h3>Your server is ready</h3>
              <p>Create an account and your server gets set up automatically. No cloud console, no SSH, nothing to touch.</p>
              <img :src="mode === 'dark' ? '/01-dark.webp' : '/01.webp'" alt="dployr instance dashboard showing server status, CPU, memory and uptime" class="lp-step__img" loading="lazy" />
            </div>
          </div>

          <div class="lp-step">
            <div class="lp-step__num">02</div>
            <div class="lp-step__body">
              <h3>Deploy your app</h3>
              <p>Push your code. dployr builds it and keeps it running. Use the dashboard, CLI, or GitHub Actions.</p>

              <div class="lp-tabs">
                <div class="lp-tabs__nav" role="tablist">
                  <button role="tab" :aria-selected="deployTab === 'dashboard'" :class="['lp-tabs__btn', { 'lp-tabs__btn--active': deployTab === 'dashboard' }]" @click="deployTab = 'dashboard'">Dashboard</button>
                  <button role="tab" :aria-selected="deployTab === 'cli'"       :class="['lp-tabs__btn', { 'lp-tabs__btn--active': deployTab === 'cli'       }]" @click="deployTab = 'cli'">CLI</button>
                  <button role="tab" :aria-selected="deployTab === 'actions'"   :class="['lp-tabs__btn', { 'lp-tabs__btn--active': deployTab === 'actions'   }]" @click="deployTab = 'actions'">GitHub Actions</button>
                </div>

                <div v-if="deployTab === 'cli'" class="lp-code">
                  <pre><code><span class="tok-muted">$</span> dployr deploy \
    <span class="tok-key">--name</span>    my-app \
    <span class="tok-key">--runtime</span> nodejs \
    <span class="tok-key">--port</span>    3000</code></pre>
                </div>

                <div v-else-if="deployTab === 'actions'" class="lp-code">
                  <pre><code><span class="tok-key">- name:</span> <span class="tok-str">Deploy to dployr</span>
  <span class="tok-key">uses:</span> <span class="tok-str">dployr-io/deploy-action@v1</span>
  <span class="tok-key">with:</span>
    <span class="tok-key">token:</span>   <span class="tok-muted">{{ ghToken }}</span>
    <span class="tok-key">name:</span>    <span class="tok-str">my-app</span>
    <span class="tok-key">runtime:</span> <span class="tok-str">nodejs</span></code></pre>
                </div>

                <div v-else class="lp-tab-shot">
                  <video :key="mode" autoplay loop muted playsinline class="lp-step__video lp-step__video--tab">
                    <source :src="mode === 'dark' ? '/02-dark.webm' : '/02.webm'" type="video/webm" />
                  </video>
                </div>
              </div>
            </div>
          </div>

          <div class="lp-step">
            <div class="lp-step__num">03</div>
            <div class="lp-step__body">
              <h3>You're live</h3>
              <p>Your app is live with HTTPS and a real domain. Logs, metrics, and rollbacks are all in one place.</p>
              <video :key="mode" autoplay loop muted playsinline class="lp-step__video">
                <source :src="mode === 'dark' ? '/03-dark.webm' : '/03.webm'" type="video/webm" />
              </video>
            </div>
          </div>

        </div>

        <div class="lp-how__cta">
          <a href="https://app.dployr.io" class="lp-btn lp-btn--brand lp-btn--lg" target="_blank" rel="noopener">Get Started Free →</a>
          <p class="lp-how__cta-note">Hobby is free forever. No card needed.</p>
        </div>
      </div>
    </section>

    <section class="lp-features" id="features">
      <div class="lp-container">
        <h2 class="lp-section-title">Included out of the box.</h2>
        <div class="lp-features__grid">
          <div v-for="f in features" :key="f.title" class="lp-feat-card">
            <h3>{{ f.title }}</h3>
            <p>{{ f.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="lp-runtimes">
      <div class="lp-container">
        <div class="lp-runtimes__strip">
          <span v-for="rt in runtimes" :key="rt.label" class="lp-runtime-pill" :data-rt="rt.label">
            <img v-if="rt.icon" :src="rt.icon" :alt="rt.label" class="lp-runtime-pill__icon" />
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
            {{ rt.label }}
          </span>
        </div>
      </div>
    </section>

    <section class="lp-pricing" id="pricing">
      <div class="lp-container">
        <div class="lp-pricing__hd">
          <h2 class="lp-section-title" style="margin-bottom:0">Simple pricing.<br>No surprises.</h2>
        </div>

        <div class="lp-pricing__controls">
          <div class="lp-billing-toggle" role="group" aria-label="Billing cycle">
            <button :class="['lp-billing-btn', { 'lp-billing-btn--on': billingCycle === 'monthly' }]" @click="billingCycle = 'monthly'">Monthly</button>
            <button :class="['lp-billing-btn', { 'lp-billing-btn--on': billingCycle === 'annual'  }]" @click="billingCycle = 'annual'">Annual <span class="lp-billing-save">-20%</span></button>
          </div>
          <button class="lp-compare-link" @click="showCompare = true">Compare plans</button>
        </div>

        <div class="lp-plans">

          <article class="lp-plan">
            <header class="lp-plan__header">
              <h3 class="lp-plan__name">Hobby</h3>
              <div class="lp-plan__price"><span class="lp-plan__amount">Free</span></div>
              <p class="lp-plan__tagline">For side projects and apps you're just getting off the ground.</p>
            </header>
            <ul class="lp-plan__features">
              <li v-for="item in hobbyFeatures" :key="item">
                <svg class="lp-plan__check" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                {{ item }}
              </li>
            </ul>
            <a href="https://app.dployr.io" class="lp-btn lp-btn--ghost lp-btn--full" target="_blank" rel="noopener">Get Started Free</a>
          </article>

          <article class="lp-plan">
            <header class="lp-plan__header">
              <h3 class="lp-plan__name">Indie</h3>
              <div class="lp-plan__price">
                <span class="lp-plan__amount">${{ price.indie[billingCycle] }}</span>
                <span class="lp-plan__period">/mo</span>
              </div>
              <p class="lp-plan__tagline">For developers shipping real apps that need to stay up.</p>
            </header>
            <p class="lp-plan__inherits">Everything in Hobby, plus:</p>
            <ul class="lp-plan__features">
              <li v-for="item in indieFeatures" :key="item">
                <svg class="lp-plan__check" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                {{ item }}
              </li>
            </ul>
            <a href="https://app.dployr.io" class="lp-btn lp-btn--ghost lp-btn--full" target="_blank" rel="noopener">Get Started</a>
          </article>

          <article class="lp-plan lp-plan--pro">
            <header class="lp-plan__header">
              <h3 class="lp-plan__name">Pro</h3>
              <div class="lp-plan__price">
                <span class="lp-plan__amount">${{ price.pro[billingCycle] }}</span>
                <span class="lp-plan__period">/mo</span>
              </div>
              <p class="lp-plan__tagline">For production apps and small teams that can't afford downtime.</p>
            </header>
            <p class="lp-plan__inherits">Everything in Indie, plus:</p>
            <ul class="lp-plan__features">
              <li v-for="item in proFeatures" :key="item">
                <svg class="lp-plan__check" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                {{ item }}
              </li>
            </ul>
            <a href="https://app.dployr.io" class="lp-btn lp-btn--brand lp-btn--full" target="_blank" rel="noopener">Get Started</a>
          </article>

        </div>

        <p class="lp-pricing__note">Hobby is free forever. Paid plans start at $12 a month.</p>
      </div>
    </section>

    <div v-if="showCompare" class="lp-dialog-backdrop" role="presentation" @click.self="showCompare = false">
      <div class="lp-dialog" role="dialog" aria-modal="true" aria-labelledby="compare-title">
        <div class="lp-dialog__head">
          <h2 id="compare-title" class="lp-dialog__title">Compare plans</h2>
          <button class="lp-dialog__close" @click="showCompare = false" aria-label="Close dialog">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="16" height="16"><path d="M3 3l10 10M13 3L3 13"/></svg>
          </button>
        </div>
        <div class="lp-dialog__filters">
          <span class="lp-dialog__comparing-label">Comparing:</span>
          <button v-for="p in ['hobby', 'indie', 'pro']" :key="p" :class="['lp-chip', { 'lp-chip--on': comparePlans.includes(p) }]" @click="toggleComparePlan(p)">{{ planLabels[p] }}</button>
        </div>
        <div class="lp-dialog__scroll">
          <table class="lp-ctable">
            <thead>
              <tr>
                <th scope="col" class="lp-ctable__label-col">Feature</th>
                <th v-for="p in comparePlans" :key="p" scope="col" class="lp-ctable__plan-col">
                  <div class="lp-ctable__plan-name">{{ planLabels[p] }}</div>
                  <div class="lp-ctable__plan-price">{{ planPriceLabel(p) }}</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in featureRows" :key="row.label">
                <th scope="row" class="lp-ctable__label-col lp-ctable__row-label">{{ row.label }}</th>
                <td v-for="p in comparePlans" :key="p" class="lp-ctable__plan-col lp-ctable__val">
                  <template v-if="typeof row.values[p] === 'boolean'">
                    <svg v-if="row.values[p]" class="lp-ctable__yes" viewBox="0 0 16 16" fill="none" aria-label="Included"><path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    <span v-else class="lp-ctable__no" aria-label="Not included">—</span>
                  </template>
                  <template v-else>{{ row.values[p] }}</template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <section class="lp-faq" id="faq">
      <div class="lp-container lp-container--narrow">
        <h2 class="lp-section-title">Common questions</h2>
        <div class="lp-faq__list">
          <div v-for="(faq, i) in faqs" :key="i" class="lp-faq__item">
            <button class="lp-faq__q" :aria-expanded="openFaq === i" @click="toggleFaq(i)">
              {{ faq.q }}
              <span class="lp-faq__icon" aria-hidden="true">{{ openFaq === i ? '−' : '+' }}</span>
            </button>
            <div v-show="openFaq === i" class="lp-faq__a">
              <p>{{ faq.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="lp-cta">
      <div class="lp-container lp-container--narrow">
        <div class="lp-cta__inner">
          <h2>Ship your next app today.</h2>
          <p>Hobby is free forever. Paid plans from $12 a month. You pay for the server, not your traffic.</p>
          <a href="https://app.dployr.io" class="lp-btn lp-btn--brand lp-btn--lg" target="_blank" rel="noopener">Get Started Free →</a>
          <p class="lp-cta__sub">
            Questions?
            <a href="https://discord.gg/tY8ZbjvrSZ" target="_blank" rel="noopener">Join our Discord</a>
            or <a href="mailto:hello@dployr.io">email us</a>.
          </p>
        </div>
      </div>
    </section>

  </PageShell>
</template>

<style scoped>
.lp-btn--lg   { padding: 0.8125rem 1.75rem; font-size: 1rem; }
.lp-btn--full { width: 100%; justify-content: center; }


.lp-placeholder {
  width: 100%;
  background: var(--bg-soft);
  border: 1px dashed oklch(1 0 0 / 0.18);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.lp-placeholder--16-9 { aspect-ratio: 16 / 9; }
.lp-placeholder--tab  { border-radius: 0 0 var(--radius) var(--radius); border-top: none; }
.lp-placeholder__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  padding: 1.5rem;
  text-align: center;
  pointer-events: none;
}
.lp-placeholder__label { font-size: 0.875rem; font-weight: 600; color: var(--text-2); }
.lp-placeholder__hint  { font-size: 0.75rem; color: var(--text-3); font-family: var(--font-mono, ui-monospace, monospace); }

.lp-code {
  background: var(--bg-mute);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.25rem 1.5rem;
  overflow-x: auto;
}
.lp-code pre  { margin: 0; }
.lp-code code { font-family: ui-monospace, 'Menlo', 'Monaco', 'Consolas', monospace; font-size: 0.875rem; line-height: 1.75; color: var(--text); }
.tok-muted { color: var(--text-3); }
.tok-key   { color: oklch(0.769 0.188 70.08); }
.tok-str   { color: oklch(0.828 0.189 84.429); }

.lp-hero,
.lp-problem,
.lp-how,
.lp-features,
.lp-runtimes,
.lp-pricing,
.lp-faq,
.lp-cta { padding: 6rem 0; }

.lp-section-title {
  font-size: clamp(1.75rem, 3.5vw, 2.75rem);
  font-weight: 700;
  text-align: center;
  line-height: 1.15;
  margin: 0 0 3rem;
  letter-spacing: -0.02em;
  text-wrap: balance;
}

.lp-hero {
  position: relative;
  padding-top: 7rem;
  padding-bottom: 5rem;
  text-align: center;
}
.lp-hero::before {
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
.lp-hero > .lp-container { position: relative; z-index: 1; }
.lp-underline {
  position: relative;
  display: inline-block;
}
.lp-underline__svg {
  position: absolute;
  left: 0;
  bottom: -0.18em;
  width: 100%;
  height: 0.3em;
  color: var(--brand);
  pointer-events: none;
}
.lp-hero__h1 {
  font-size: clamp(2.5rem, 6vw, 4.75rem);
  font-weight: 700;
  line-height: 1.07;
  letter-spacing: -0.025em;
  margin: 0 0 1.25rem;
  text-wrap: balance;
}
.lp-hero__sub {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--text-2);
  max-width: 560px;
  margin: 0 auto 2rem;
  line-height: 1.65;
  text-wrap: pretty;
}
.lp-hero__actions { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
.lp-hero__fine    { font-size: 0.8125rem; color: var(--text-3); margin: 1rem 0 3rem; text-wrap: balance; }
.lp-hero__visual  {
  max-width: 960px;
  margin: 0 auto;
  border-radius: calc(var(--radius) * 2);
  overflow: hidden;
  box-shadow: 0 0 0 1px oklch(0 0 0 / 0.07), 0 24px 60px oklch(0 0 0 / 0.12);
}
.lp-hero__img { display: block; width: 100%; height: auto; border-radius: calc(var(--radius) * 2); }
.lp-step__img  { display: block; width: 100%; height: auto; border-radius: var(--radius); border: 1px solid var(--border); }
.lp-step__video { display: block; width: 100%; height: auto; border-radius: var(--radius); border: 1px solid var(--border); }
.lp-step__video--tab { border-radius: 0 0 var(--radius) var(--radius); border-top: none; }

.lp-problem { padding: 0 0 4rem; }
.lp-problem p {
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  color: var(--text-2);
  text-align: center;
  line-height: 1.7;
  margin: 0;
  text-wrap: balance;
}

.lp-how { border-top: 1px solid var(--border); }
.lp-steps { display: flex; flex-direction: column; gap: 5rem; }
.lp-how__cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid var(--border);
}
.lp-how__cta-note { font-size: 0.875rem; color: var(--text-3); margin: 0; }
.lp-step { display: grid; grid-template-columns: 80px 1fr; gap: 2rem; align-items: start; }
.lp-step__num {
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--bg-mute);
  line-height: 1;
  padding-top: 0.2rem;
  font-variant-numeric: tabular-nums;
  user-select: none;
}
.lp-step__body h3 { font-size: 1.5rem; font-weight: 700; margin: 0 0 0.75rem; }
.lp-step__body > p { color: var(--text-2); margin: 0 0 1.5rem; max-width: 560px; }

.lp-tabs__nav {
  display: flex;
  border: 1px solid var(--border);
  border-bottom: none;
  border-radius: var(--radius) var(--radius) 0 0;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
}
.lp-tabs__nav::-webkit-scrollbar { display: none; }
.lp-tabs__btn {
  flex: 1;
  padding: 0.625rem 1rem;
  background: var(--bg-soft);
  border: none;
  border-right: 1px solid var(--border);
  color: var(--text-2);
  font-family: var(--font);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s, color 0.15s;
}
.lp-tabs__btn:last-child { border-right: none; }
.lp-tabs__btn--active { background: var(--bg-mute); color: var(--text); }
.lp-tabs .lp-code { border-radius: 0 0 var(--radius) var(--radius); border-top: none; }

.lp-features__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.lp-feat-card {
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.75rem;
  transition: border-color 0.15s;
}
.lp-feat-card:hover { border-color: var(--text-3); }
.lp-feat-card h3 { font-size: 1rem; font-weight: 700; margin: 0 0 0.5rem; }
.lp-feat-card p  { font-size: 0.9375rem; color: var(--text-2); margin: 0; line-height: 1.6; }

.lp-runtimes {
  padding: 2.5rem 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.lp-runtimes__strip { display: flex; flex-wrap: wrap; gap: 0.625rem; justify-content: center; }
.lp-runtime-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.875rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-2);
  transition: border-color 0.15s, color 0.15s;
}
.lp-runtime-pill:hover { border-color: var(--text-3); color: var(--text); }
.lp-runtime-pill__icon { width: 16px; height: 16px; object-fit: contain; flex-shrink: 0; display: block; }
.lp-runtime-pill[data-rt="Python"] .lp-runtime-pill__icon,
.lp-runtime-pill[data-rt="PHP"]    .lp-runtime-pill__icon,
.lp-runtime-pill[data-rt="Ruby"]   .lp-runtime-pill__icon,
.lp-runtime-pill[data-rt="Docker"] .lp-runtime-pill__icon { width: 18px; height: 18px; }
.lp-runtime-pill[data-rt="Go"]   .lp-runtime-pill__icon,
.lp-runtime-pill[data-rt=".NET"] .lp-runtime-pill__icon  { width: 20px; height: 20px; }

.lp-pricing { background: var(--bg-soft); }
.lp-pricing__hd { margin-bottom: 2.5rem; }
.lp-pricing__controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}
.lp-billing-toggle {
  display: inline-flex;
  padding: 3px;
  background: var(--bg-mute);
  border: 1px solid var(--border);
  border-radius: 999px;
}
.lp-billing-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 1.1rem;
  border-radius: 999px;
  border: none;
  background: transparent;
  color: var(--text-2);
  font-family: var(--font);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
}
.lp-billing-btn--on { background: var(--bg); color: var(--text); box-shadow: 0 1px 2px oklch(0 0 0 / 0.25); }
.lp-billing-save {
  font-size: 0.6875rem;
  font-weight: 700;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  background: oklch(0.769 0.188 70.08 / 0.15);
  color: oklch(0.769 0.188 70.08);
}
.lp-compare-link {
  background: none;
  border: none;
  font-family: var(--font);
  font-size: 0.875rem;
  color: var(--text-3);
  cursor: pointer;
  padding: 0;
  transition: color 0.15s;
  text-decoration: underline;
  text-decoration-color: transparent;
}
.lp-compare-link:hover { color: var(--text); text-decoration-color: currentColor; }

.lp-plans { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; align-items: start; }
.lp-plan {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
}
.lp-plan--pro { border-color: var(--brand); }
.lp-plan__header { margin-bottom: 1.25rem; }
.lp-plan__name { font-size: 1.0625rem; font-weight: 700; margin: 0 0 1rem; color: var(--text); }
.lp-plan__price { display: flex; align-items: baseline; gap: 0.2rem; margin-bottom: 0.75rem; }
.lp-plan__amount { font-size: 2.75rem; font-weight: 700; letter-spacing: -0.03em; line-height: 1; color: var(--text); }
.lp-plan__period { font-size: 0.9375rem; color: var(--text-3); }
.lp-plan__tagline { font-size: 0.9375rem; color: var(--text-2); line-height: 1.55; margin: 0; }
.lp-plan__inherits { font-size: 0.875rem; color: var(--text-3); margin: 0 0 0.875rem; }
.lp-plan__features { list-style: none; padding: 0; margin: 0 0 1.5rem; display: flex; flex-direction: column; gap: 0.625rem; flex: 1; }
.lp-plan__features li { display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.9375rem; color: var(--text-2); line-height: 1.5; }
.lp-plan__check { width: 16px; height: 16px; flex-shrink: 0; margin-top: 0.15em; color: var(--brand); }
.lp-pricing__note { text-align: center; font-size: 0.875rem; color: var(--text-3); margin: 2rem 0 0; }

.lp-dialog-backdrop {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: oklch(0 0 0 / 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}
.lp-dialog {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 16px;
  width: 100%;
  max-width: 700px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 24px 64px oklch(0 0 0 / 0.4);
}
.lp-dialog__head { display: flex; align-items: center; justify-content: space-between; padding: 1.5rem 1.5rem 1rem; flex-shrink: 0; }
.lp-dialog__title { font-size: 1.125rem; font-weight: 700; margin: 0; color: var(--text); }
.lp-dialog__close {
  display: flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; border-radius: 50%;
  border: none; background: var(--bg-soft); color: var(--text-2); cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.lp-dialog__close:hover { background: var(--bg-mute); color: var(--text); }
.lp-dialog__filters {
  display: flex; align-items: center; gap: 0.5rem;
  padding: 0 1.5rem 1rem; flex-shrink: 0;
  border-bottom: 1px solid var(--border);
}
.lp-dialog__comparing-label { font-size: 0.8125rem; color: var(--text-3); margin-right: 0.25rem; flex-shrink: 0; }
.lp-chip {
  padding: 0.3rem 0.875rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: transparent;
  font-family: var(--font);
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-2);
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.lp-chip--on { background: var(--text); color: var(--bg); border-color: var(--text); }
.lp-dialog__scroll { overflow-y: auto; flex: 1; scrollbar-width: thin; scrollbar-color: var(--border) transparent; }
.lp-ctable { width: 100%; border-collapse: collapse; table-layout: fixed; }
.lp-ctable thead tr { border-bottom: 1px solid var(--border); }
.lp-ctable th, .lp-ctable td { padding: 0.75rem 1.25rem; text-align: left; font-size: 0.9375rem; white-space: nowrap; }
.lp-ctable__label-col { width: 46%; }
.lp-ctable__plan-col  { text-align: center; width: 27%; }
.lp-ctable__plan-name { font-size: 0.9375rem; font-weight: 700; color: var(--text); }
.lp-ctable__plan-price { font-size: 0.8125rem; color: var(--text-3); margin-top: 0.125rem; }
.lp-ctable__row-label { color: var(--text-2); font-weight: 400; }
.lp-ctable__val { text-align: center; }
.lp-ctable tbody tr:nth-child(even) { background: var(--bg-soft); }
.lp-ctable__yes { display: inline-block; width: 16px; height: 16px; color: var(--brand); vertical-align: middle; }
.lp-ctable__no  { color: var(--text-3); font-size: 1rem; }

.lp-faq { border-top: 1px solid var(--border); }
.lp-faq__list { border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
.lp-faq__item { border-bottom: 1px solid var(--border); }
.lp-faq__item:last-child { border-bottom: none; }
.lp-faq__q {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.125rem 1.5rem;
  background: var(--bg-soft);
  border: none;
  color: var(--text);
  font-family: var(--font);
  font-size: 0.9375rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s;
}
.lp-faq__q:hover { background: var(--bg-mute); }
.lp-faq__icon { font-size: 1.25rem; font-weight: 300; color: var(--text-3); flex-shrink: 0; line-height: 1; }
.lp-faq__a { padding: 0.25rem 1.5rem 1.25rem; background: var(--bg-soft); }
.lp-faq__a p { font-size: 0.9375rem; color: var(--text-2); line-height: 1.7; margin: 0; }

.lp-cta { background: var(--bg-soft); border-top: 1px solid var(--border); text-align: center; }
.lp-cta__inner { display: flex; flex-direction: column; align-items: center; gap: 0.875rem; }
.lp-cta h2 { font-size: clamp(1.75rem, 4vw, 2.75rem); font-weight: 700; letter-spacing: -0.02em; margin: 0; }
.lp-cta__inner > p { color: var(--text-2); margin: 0; }
.lp-cta__sub { font-size: 0.875rem !important; color: var(--text-3) !important; margin-top: 0.25rem; }
.lp-cta__sub a { color: var(--text-2); text-decoration: underline; text-underline-offset: 3px; transition: color 0.15s; }
.lp-cta__sub a:hover { color: var(--text); }


@media (max-width: 960px) {
  .lp-plans { grid-template-columns: 1fr 1fr; }
  .lp-plan:first-child { grid-column: 1 / -1; }
}
@media (max-width: 900px) {
  .lp-features__grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 768px) {
  .lp-hero, .lp-how, .lp-features, .lp-pricing, .lp-faq, .lp-cta { padding: 4rem 0; }
  .lp-step { display: block; }
  .lp-step__num { font-size: 1rem; font-weight: 700; color: var(--text-3); letter-spacing: 0.05em; margin-bottom: 0.5rem; }
  .lp-plans { grid-template-columns: 1fr; }
  .lp-pricing__controls { flex-wrap: wrap; gap: 0.875rem; }
  .lp-ctable th, .lp-ctable td { white-space: normal; font-size: 0.8125rem; padding: 0.625rem 0.75rem; }
  .lp-dialog { max-height: 90vh; }
}
@media (max-width: 520px) {
  .lp-features__grid { grid-template-columns: 1fr; }
}
</style>
