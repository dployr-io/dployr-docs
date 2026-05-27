<template>
  <PageShell>
    <main class="bp-main" id="main-content">
      <div class="lp-container bp-container">

        <nav aria-label="Breadcrumb" class="bp-breadcrumb">
          <ol>
            <li><a href="/">Home</a></li>
            <li aria-hidden="true">/</li>
            <li><a href="/blog/">Blog</a></li>
            <li aria-hidden="true">/</li>
            <li>{{ frontmatter.title }}</li>
          </ol>
        </nav>

        <article
          class="bp-article"
          itemscope
          itemtype="https://schema.org/BlogPosting"
        >
          <meta itemprop="author" :content="frontmatter.author || 'dployr'" />

          <header class="bp-article__header">
            <h1 itemprop="headline">{{ frontmatter.title }}</h1>
            <div class="bp-article__meta">
              <time
                v-if="frontmatter.date"
                :datetime="String(frontmatter.date)"
                itemprop="datePublished"
              >{{ formatDate(String(frontmatter.date)) }}</time>
              <span v-if="frontmatter.author" class="bp-article__author" itemprop="author">{{ frontmatter.author }}</span>
            </div>
            <div v-if="frontmatter.tags?.length" class="bp-article__tags">
              <span v-for="tag in frontmatter.tags" :key="tag" class="bp-tag">{{ tag }}</span>
            </div>
          </header>

          <div class="bp-article__body" itemprop="articleBody">
            <Content />
          </div>
        </article>

      </div>
    </main>
  </PageShell>
</template>

<script setup lang="ts">
import { useData, Content } from 'vitepress'
import PageShell from './PageShell.vue'

const { frontmatter } = useData()

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<style scoped>
.bp-main {
  flex: 1;
  padding: 3rem 0 6rem;
}
.bp-container {
  max-width: 720px;
}

.bp-breadcrumb ol {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
  margin: 0 0 2.5rem;
  padding: 0;
  font-size: 0.875rem;
}
.bp-breadcrumb a { color: var(--text-3); text-decoration: none; }
.bp-breadcrumb a:hover { color: var(--text-2); }
.bp-breadcrumb li:last-child { color: var(--text-2); }

.bp-article__header {
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border);
}
.bp-article__header h1 {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin: 0 0 1rem;
}

.bp-article__meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--text-3);
  margin-bottom: 0.875rem;
}
.bp-article__meta time { color: var(--text-3); }
.bp-article__author::before { content: '·'; margin-right: 1rem; }

.bp-article__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}
.bp-tag {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.2em 0.65em;
  border-radius: 0.25rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--text-3);
}

.bp-article__body {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text-2);
}
.bp-article__body :deep(h1) { display: none; }
.bp-article__body :deep(h2) {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--text);
  margin: 2.5rem 0 0.75rem;
  letter-spacing: -0.015em;
}
.bp-article__body :deep(h3) {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text);
  margin: 2rem 0 0.5rem;
}
.bp-article__body :deep(p) { margin: 0 0 1.1rem; }
.bp-article__body :deep(p:last-child) { margin-bottom: 0; }
.bp-article__body :deep(ul),
.bp-article__body :deep(ol) { margin: 0.875rem 0 1.1rem; padding-left: 1.5rem; }
.bp-article__body :deep(li) { margin: 0.3rem 0; color: var(--text); }
.bp-article__body :deep(strong) { font-weight: 600; color: var(--text); }
.bp-article__body :deep(a) {
  color: var(--brand);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.bp-article__body :deep(code) {
  font-size: 0.875em;
  background: var(--bg-soft);
  padding: 0.15em 0.4em;
  border-radius: 0.25rem;
  color: var(--text);
}
.bp-article__body :deep(pre) {
  background: var(--bg-mute);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.25rem 1.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}
.bp-article__body :deep(pre code) {
  background: none;
  padding: 0;
  font-size: 0.875rem;
  line-height: 1.75;
}
.bp-article__body :deep(blockquote) {
  border-left: 3px solid var(--border);
  padding-left: 1.25rem;
  margin: 1.5rem 0;
  color: var(--text-3);
  font-style: italic;
}
.bp-article__body :deep(hr) {
  border: none;
  border-top: 1px solid var(--border);
  margin: 2rem 0;
}
.bp-article__body :deep(img) {
  max-width: 100%;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  display: block;
  margin: 1.5rem 0;
}
</style>
