<template>
  <PageShell>
    <main class="cl-main" id="main-content">
      <div class="lp-container cl-container">

        <header class="cl-header">
          <h1>Changelog</h1>
        </header>

        <section class="cl-feed" aria-label="Release history">
          <article
            v-for="group in grouped"
            :key="group.date"
            class="cl-group"
          >
            <div class="cl-group__aside">
              <time class="cl-group__date" :datetime="group.date">{{ formatDate(group.date) }}</time>
            </div>

            <div class="cl-group__entries">
              <div
                v-for="(release, i) in group.items"
                :key="release.title"
                :id="slug(release)"
                class="cl-entry"
                :class="{ 'cl-entry--sep': i > 0 }"
                itemscope
                itemtype="https://schema.org/SoftwareApplication"
              >
                <meta itemprop="name" content="dployr" />
                <meta itemprop="datePublished" :content="group.date" />

                <span v-if="release.tag" :class="`cl-tag cl-tag--${release.tag}`">{{ release.tag }}</span>

                <h2 class="cl-entry__title">
                  <a :href="`#${slug(release)}`">{{ release.title }}</a>
                </h2>

                <div class="cl-entry__body">
                  <p v-for="para in paragraphs(release.body)" :key="para">{{ para }}</p>
                </div>

                <ul v-if="release.highlights?.length" class="cl-entry__highlights">
                  <li v-for="item in release.highlights" :key="item">{{ item }}</li>
                </ul>

                <figure v-if="release.image" class="cl-entry__figure">
                  <img :src="release.image" :alt="release.imageCaption || release.title" loading="lazy" />
                  <figcaption v-if="release.imageCaption">{{ release.imageCaption }}</figcaption>
                </figure>
              </div>
            </div>
          </article>
        </section>

      </div>
    </main>
  </PageShell>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PageShell from './PageShell.vue'
import { releases } from '../../releases'

const grouped = computed(() => {
  const map = new Map<string, typeof releases>()
  for (const r of releases) {
    const existing = map.get(r.date) ?? []
    existing.push(r)
    map.set(r.date, existing)
  }
  return [...map.entries()].map(([date, items]) => ({ date, items }))
})

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function paragraphs(body: string): string[] {
  return body.split('\n\n').filter(Boolean)
}

function slug(release: { date: string; title: string }): string {
  return release.date + '-' + release.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}
</script>

<style scoped>
.cl-main {
  flex: 1;
  padding: 4rem 0 8rem;
}
.cl-container {
  max-width: 860px;
}

.cl-header {
  margin-bottom: 4rem;
}
.cl-header h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0;
}

.cl-feed {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.cl-group {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 0 3rem;
  padding-bottom: 3.5rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 3.5rem;
}
.cl-group:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.cl-group__aside {
  padding-top: 0.25rem;
}
.cl-group__date {
  font-size: 0.8125rem;
  color: var(--text-3);
  white-space: nowrap;
}

.cl-group__entries {
  display: flex;
  flex-direction: column;
}

.cl-entry {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.cl-entry--sep {
  margin-top: 2.5rem;
  padding-top: 2.5rem;
  border-top: 1px solid var(--border);
}

.cl-tag {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  padding: 0.2em 0.6em;
  border-radius: 0.25rem;
  margin-bottom: 0.625rem;
}
.cl-tag--new      { background: oklch(0.72 0.19 145 / 0.15); color: var(--brand); }
.cl-tag--improved { background: oklch(0.75 0.14 220 / 0.15); color: oklch(0.75 0.14 220); }
.cl-tag--fixed    { background: oklch(0.70 0.18 25  / 0.15); color: oklch(0.70 0.18 25); }

.cl-entry__title {
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.02em;
  margin: 0 0 1rem;
  color: var(--text);
}
.cl-entry__title a {
  color: inherit;
  text-decoration: none;
}
.cl-entry__title a:hover { color: var(--brand); }

.cl-entry__body p {
  font-size: 1rem;
  color: var(--text-2);
  line-height: 1.75;
  margin: 0 0 0.875rem;
}
.cl-entry__body p:last-child { margin-bottom: 0; }

.cl-entry__highlights {
  margin: 1rem 0 0;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.cl-entry__highlights li {
  font-size: 0.9375rem;
  color: var(--text-2);
  line-height: 1.6;
}

.cl-entry__figure {
  margin: 1.5rem 0 0;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border);
  width: 100%;
}
.cl-entry__figure img {
  width: 100%;
  display: block;
}
.cl-entry__figure figcaption {
  padding: 0.5rem 0.875rem;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-3);
  background: var(--bg-soft);
}

@media (max-width: 640px) {
  .cl-group {
    grid-template-columns: 1fr;
    gap: 0.5rem 0;
  }
}
</style>
