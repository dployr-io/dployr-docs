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
    <div class="card-shimmer"></div>
    <div class="post-content">
      <div class="post-header">
        <h2 class="post-title">
          <a :href="post.url">{{ post.title }}</a>
        </h2>
        <div class="post-meta">
          <span class="post-date">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {{ formatDate(post.date) }}
          </span>
          <span class="post-author">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            {{ post.author }}
          </span>
        </div>
      </div>
      <p class="post-excerpt">{{ post.excerpt }}</p>
      <div v-if="post.tags && post.tags.length > 0" class="post-tags">
        <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
      <a :href="post.url" class="read-more">
        <span>Read article</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </a>
    </div>
  </article>
</div>

<div v-else class="no-posts">
  <div class="no-posts-icon">📝</div>
  <p class="no-posts-title">No blog posts yet</p>
  <p class="no-posts-subtitle">Create your first post with <code>npm run new:blog</code></p>
</div>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap');

:root {
  --color-white: #FFFFFF;
  --color-black: #0A0A0A;
  --color-gold: #D4AF37;
  --color-navy: #1B2B4A;
  --color-gray-light: #F5F5F5;
  --color-gray-medium: #E0E0E0;
  --color-gray-dark: #6B7280;
  --color-gold-light: #F4E4C1;
  --color-navy-light: #2C3E5D;
}

.posts-grid {
  display: grid;
  gap: 2.5rem;
  margin-top: 3rem;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.post-card {
  position: relative;
  background: var(--color-white);
  border: 1px solid var(--color-gray-medium);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideIn 0.6s ease-out backwards;
}

.post-card:nth-child(1) { animation-delay: 0.1s; }
.post-card:nth-child(2) { animation-delay: 0.2s; }
.post-card:nth-child(3) { animation-delay: 0.3s; }
.post-card:nth-child(4) { animation-delay: 0.4s; }

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.post-card:hover {
  border-color: var(--color-gold);
  box-shadow: 
    0 20px 40px rgba(212, 175, 55, 0.15),
    0 0 0 1px var(--color-gold);
  transform: translateY(-4px);
}

.post-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--color-gold) 0%, var(--color-navy) 100%);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.post-card:hover::before {
  transform: scaleX(1);
}

.card-shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(212, 175, 55, 0.1),
    transparent
  );
  transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.post-card:hover .card-shimmer {
  left: 100%;
}

.post-content {
  padding: 2.5rem;
  position: relative;
  z-index: 1;
}

.post-header {
  margin-bottom: 1.5rem;
}

.post-title {
  margin: 0 0 1rem 0;
  font-family: 'Playfair Display', serif;
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

.post-title a {
  color: var(--color-black);
  text-decoration: none;
  background: linear-gradient(to right, var(--color-gold) 0%, var(--color-navy) 100%);
  background-size: 0% 2px;
  background-position: left bottom;
  background-repeat: no-repeat;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding-bottom: 2px;
}

.post-card:hover .post-title a {
  background-size: 100% 2px;
  color: var(--color-navy);
}

.post-meta {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  font-family: 'Inter', sans-serif;
}

.post-date,
.post-author {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-gray-dark);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  transition: color 0.3s ease;
}

.post-date svg,
.post-author svg {
  opacity: 0.7;
  transition: all 0.3s ease;
}

.post-card:hover .post-date,
.post-card:hover .post-author {
  color: var(--color-navy);
}

.post-card:hover .post-date svg,
.post-card:hover .post-author svg {
  opacity: 1;
  stroke: var(--color-gold);
}

.post-excerpt {
  margin: 1.5rem 0;
  color: var(--color-gray-dark);
  line-height: 1.7;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  margin: 1.5rem 0;
}

.tag {
  padding: 0.375rem 1rem;
  background: linear-gradient(135deg, var(--color-gold-light) 0%, var(--color-gray-light) 100%);
  border: 1px solid var(--color-gray-medium);
  border-radius: 20px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-navy);
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.02em;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.tag::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  transition: left 0.5s ease;
}

.tag:hover::before {
  left: 100%;
}

.tag:hover {
  background: var(--color-gold);
  border-color: var(--color-gold);
  color: var(--color-white);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(212, 175, 55, 0.3);
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-navy);
  text-decoration: none;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  letter-spacing: 0.02em;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--color-gold-light) 0%, var(--color-gray-light) 100%);
  border: 1px solid var(--color-gold);
  border-radius: 8px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  margin-top: 0.5rem;
}

.read-more::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-navy) 100%);
  transform: translateX(-100%);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}

.read-more:hover::before {
  transform: translateX(0);
}

.read-more:hover {
  color: var(--color-white);
  border-color: var(--color-navy);
  box-shadow: 0 8px 20px rgba(27, 43, 74, 0.3);
  transform: translateX(4px);
}

.read-more svg {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.read-more:hover svg {
  transform: translateX(4px);
}

.no-posts {
  padding: 4rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, var(--color-gray-light) 0%, var(--color-white) 100%);
  border: 2px dashed var(--color-gray-medium);
  border-radius: 16px;
  margin-top: 3rem;
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.no-posts-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.no-posts-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-black);
  margin: 0 0 0.5rem 0;
}

.no-posts-subtitle {
  color: var(--color-gray-dark);
  font-family: 'Inter', sans-serif;
  margin: 0;
}

.no-posts code {
  padding: 0.375rem 0.75rem;
  background: var(--color-white);
  border: 1px solid var(--color-gold);
  border-radius: 6px;
  font-family: 'Monaco', 'Courier New', monospace;
  color: var(--color-navy);
  font-weight: 500;
  font-size: 0.875rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .post-content {
    padding: 2rem;
  }
  
  .post-title {
    font-size: 1.5rem;
  }
  
  .post-meta {
    gap: 1rem;
  }
  
  .posts-grid {
    gap: 2rem;
  }
}
</style>