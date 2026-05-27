<template>
  <PageShell>
    <main class="legal-main" id="main-content">
      <div class="lp-container legal-container">

        <nav aria-label="Breadcrumb" class="legal-breadcrumb">
          <ol itemscope itemtype="https://schema.org/BreadcrumbList">
            <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
              <a itemprop="item" href="/"><span itemprop="name">Home</span></a>
              <meta itemprop="position" content="1" />
            </li>
            <li aria-hidden="true">/</li>
            <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
              <span itemprop="name">{{ frontmatter.title }}</span>
              <meta itemprop="position" content="2" />
            </li>
          </ol>
        </nav>

        <article class="legal-article" itemscope itemtype="https://schema.org/WebPage">
          <header class="legal-article__header">
            <h1 itemprop="name">{{ frontmatter.title }}</h1>
            <p class="legal-article__meta">
              Last updated:
              <time :datetime="frontmatter.lastUpdatedIso || '2025-12-30'" itemprop="dateModified">
                {{ frontmatter.lastUpdated || 'December 30, 2025' }}
              </time>
            </p>
          </header>

          <div class="legal-article__body" itemprop="mainContentOfPage">
            <Content />
          </div>
        </article>

      </div>
    </main>
  </PageShell>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { Content } from 'vitepress'
import PageShell from './PageShell.vue'

const { frontmatter } = useData()
</script>

<style scoped>
.legal-main {
  flex: 1;
  padding: 3rem 0 6rem;
}
.legal-container {
  max-width: 860px;
}

.legal-breadcrumb ol {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
  margin: 0 0 2rem;
  padding: 0;
  font-size: 0.875rem;
}
.legal-breadcrumb a { color: var(--text-3); text-decoration: none; }
.legal-breadcrumb a:hover { color: var(--text-2); }
.legal-breadcrumb li:last-child { color: var(--text-2); }

.legal-article__header {
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border);
}
.legal-article__header h1 {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin: 0 0 0.75rem;
}
.legal-article__meta {
  font-size: 0.875rem;
  color: var(--text-3);
  margin: 0;
}
.legal-article__meta time { color: var(--text-2); margin-left: 0.25rem; }

.legal-article__body {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text-2);
}
.legal-article__body :deep(h1:first-child) { display: none; }
.legal-article__body :deep(h2) {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text);
  margin: 2.5rem 0 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
}
.legal-article__body :deep(h3) {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text);
  margin: 2rem 0 0.5rem;
}
.legal-article__body :deep(p) { margin: 0.875rem 0; }
.legal-article__body :deep(ul),
.legal-article__body :deep(ol) { margin: 0.875rem 0; padding-left: 1.5rem; }
.legal-article__body :deep(li) { margin: 0.3rem 0; color: var(--text); }
.legal-article__body :deep(strong) { font-weight: 600; }
.legal-article__body :deep(a) {
  color: var(--brand);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.legal-article__body :deep(code) {
  font-size: 0.875em;
  background: var(--bg-soft);
  padding: 0.15em 0.4em;
  border-radius: 0.25rem;
  color: var(--text);
}
.legal-article__body :deep(hr) {
  border: none;
  border-top: 1px solid var(--border);
  margin: 2rem 0;
}

.legal-article__footer {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
  font-size: 0.9rem;
  color: var(--text-3);
}
.legal-article__footer a { color: var(--brand); }
</style>
