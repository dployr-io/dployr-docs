<template>
  <PageShell>
    <main class="bl-main" id="main-content">
      <div class="lp-container bl-container">

        <header class="bl-header">
          <h1>Blog</h1>
        </header>

        <section class="bl-feed" aria-label="Posts">
          <article
            v-for="post in posts"
            :key="post.url"
            class="bl-post"
            itemscope
            itemtype="https://schema.org/BlogPosting"
          >
            <meta itemprop="author" :content="post.author" />

            <div class="bl-post__aside">
              <time class="bl-post__date" :datetime="post.date" itemprop="datePublished">
                {{ formatDate(post.date) }}
              </time>
            </div>

            <div class="bl-post__content">
              <h2 class="bl-post__title" itemprop="headline">
                <a :href="post.url">{{ post.title }}</a>
              </h2>
              <p class="bl-post__excerpt" itemprop="description">{{ post.excerpt }}</p>
              <div v-if="post.tags?.length" class="bl-post__tags">
                <span v-for="tag in post.tags" :key="tag" class="bl-tag">{{ tag }}</span>
              </div>
            </div>
          </article>

          <p v-if="!posts?.length" class="bl-empty">Nothing published yet.</p>
        </section>

      </div>
    </main>
  </PageShell>
</template>

<script setup lang="ts">
import PageShell from './PageShell.vue'
import { data as posts } from '../posts.data.js'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<style scoped>
.bl-main {
  flex: 1;
  padding: 4rem 0 8rem;
}
.bl-container {
  max-width: 860px;
}

.bl-header {
  margin-bottom: 4rem;
}
.bl-header h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0;
}

.bl-feed {
  display: flex;
  flex-direction: column;
}

.bl-post {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 0 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 3rem;
}
.bl-post:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.bl-post__aside {
  padding-top: 0.25rem;
}
.bl-post__date {
  font-size: 0.8125rem;
  color: var(--text-3);
  white-space: nowrap;
}

.bl-post__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.bl-post__title {
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.02em;
  margin: 0 0 0.875rem;
  color: var(--text);
}
.bl-post__title a {
  color: inherit;
  text-decoration: none;
}
.bl-post__title a:hover { color: var(--brand); }

.bl-post__excerpt {
  font-size: 1rem;
  color: var(--text-2);
  line-height: 1.75;
  margin: 0 0 1rem;
}

.bl-post__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}
.bl-tag {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.2em 0.65em;
  border-radius: 0.25rem;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--text-3);
}

.bl-empty {
  font-size: 1rem;
  color: var(--text-3);
}

@media (max-width: 640px) {
  .bl-post {
    grid-template-columns: 1fr;
    gap: 0.5rem 0;
  }
}
</style>
