# Blog

Welcome to the dployr blog. Here you'll find updates, tutorials, and insights about self-hosted deployments.

<script setup>
import { data as posts } from '../.vitepress/posts.data.js'

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}
</script>

## Latest Posts

<div v-if="posts && posts.length > 0" class="posts-grid">
  <article v-for="post in posts" :key="post.url" class="post-card">
    <div class="post-header">
      <h2 class="post-title">
        <a :href="post.url">{{ post.title }}</a>
      </h2>
      <div class="post-meta">
        <span class="post-date">📅 {{ formatDate(post.date) }}</span>
        <span class="post-author">✍️ {{ post.author }}</span>
      </div>
    </div>
    <p class="post-excerpt">{{ post.excerpt }}</p>
    <div v-if="post.tags && post.tags.length > 0" class="post-tags">
      <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
    <a :href="post.url" class="read-more">Read more →</a>
  </article>
</div>

<div v-else class="no-posts">
  <p>📝 No blog posts yet. Create your first post with <code>npm run new:blog</code></p>
</div>

<style scoped>
.posts-grid {
  display: grid;
  gap: 2rem;
  margin-top: 2rem;
}

.post-card {
  padding: 2rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--vp-border-radius);
  transition: all 0.3s ease;
}

.post-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.post-header {
  margin-bottom: 1rem;
}

.post-title {
  margin: 0 0 0.75rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
}

.post-title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.2s;
}

.post-title a:hover {
  color: var(--vp-c-brand-1);
}

.post-meta {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.post-date,
.post-author {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.post-excerpt {
  margin: 1rem 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
  transition: gap 0.2s;
}

.read-more:hover {
  gap: 0.5rem;
}

.no-posts {
  padding: 3rem 2rem;
  text-align: center;
  background: var(--vp-c-bg-soft);
  border-radius: var(--vp-border-radius);
}

.no-posts code {
  padding: 0.2rem 0.5rem;
  background: var(--vp-c-bg);
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
}
</style>
