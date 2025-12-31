<template>
  <div class="blog-post-layout">
    <article class="blog-post">
      <header class="post-header">
        <h1 class="post-title">{{ frontmatter.title }}</h1>
        <div class="post-meta">
          <span class="meta-item">
            <span class="icon">📅</span>
            <time :datetime="frontmatter.date">{{ formatDate(frontmatter.date) }}</time>
          </span>
          <span class="meta-item">
            <span class="icon">✍️</span>
            <span>{{ frontmatter.author || 'The Dployr Team' }}</span>
          </span>
        </div>
        <div v-if="frontmatter.tags && frontmatter.tags.length > 0" class="post-tags">
          <span v-for="tag in frontmatter.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </header>
      
      <div class="post-content">
        <Content />
      </div>
      
      <footer class="post-footer">
        <div class="share-section">
          <p class="share-title">Share this post</p>
          <div class="share-buttons">
            <a :href="twitterShareUrl" target="_blank" rel="noopener" class="share-btn twitter">
              Twitter
            </a>
            <a :href="linkedinShareUrl" target="_blank" rel="noopener" class="share-btn linkedin">
              LinkedIn
            </a>
          </div>
        </div>
        <div class="back-to-blog">
          <a href="/blog/">← Back to Blog</a>
        </div>
      </footer>
    </article>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { frontmatter, page } = useData()

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const currentUrl = computed(() => {
  if (typeof window !== 'undefined') {
    return window.location.href
  }
  return `https://docs.dployr.io${page.value.relativePath.replace(/\.md$/, '.html')}`
})

const twitterShareUrl = computed(() => {
  const text = frontmatter.value.title || 'Check out this post'
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl.value)}`
})

const linkedinShareUrl = computed(() => {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl.value)}`
})
</script>

<style scoped>
.blog-post-layout {
  max-width: 48rem;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.blog-post {
  background: var(--vp-c-bg);
}

.post-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid var(--vp-c-divider);
}

.post-title {
  margin: 0 0 1.5rem 0;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--vp-c-text-1);
}

.post-meta {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  color: var(--vp-c-text-2);
  font-size: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon {
  font-size: 1.1rem;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tag {
  padding: 0.35rem 0.85rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.post-content {
  margin-bottom: 3rem;
  line-height: 1.7;
  font-size: 1.05rem;
}

.post-content :deep(h2) {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-size: 1.75rem;
  font-weight: 600;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.5rem;
}

.post-content :deep(h3) {
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  font-size: 1.35rem;
  font-weight: 600;
}

.post-content :deep(p) {
  margin: 1rem 0;
}

.post-content :deep(ul),
.post-content :deep(ol) {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.post-content :deep(li) {
  margin: 0.5rem 0;
}

.post-content :deep(code) {
  padding: 0.2rem 0.4rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.9em;
}

.post-content :deep(pre) {
  margin: 1.5rem 0;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: var(--vp-border-radius);
  overflow-x: auto;
}

.post-content :deep(blockquote) {
  margin: 1.5rem 0;
  padding-left: 1rem;
  border-left: 4px solid var(--vp-c-brand-1);
  color: var(--vp-c-text-2);
  font-style: italic;
}

.post-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid var(--vp-c-divider);
}

.share-section {
  margin-bottom: 2rem;
}

.share-title {
  margin: 0 0 1rem 0;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.share-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.share-btn {
  padding: 0.5rem 1.25rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--vp-border-radius);
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
}

.share-btn:hover {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: white;
}

.back-to-blog a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
  transition: gap 0.2s;
}

.back-to-blog a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .blog-post-layout {
    padding: 1rem;
  }
  
  .post-title {
    font-size: 2rem;
  }
  
  .post-meta {
    gap: 1rem;
  }
}
</style>
