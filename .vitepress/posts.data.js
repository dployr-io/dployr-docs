import { createContentLoader } from 'vitepress'

export default createContentLoader('blog/*.md', {
  includeSrc: false,
  render: false,
  excerpt: true,
  transform(rawData) {
    return rawData
      .filter(page => page.url !== '/blog/')
      .map(({ url, frontmatter, excerpt }) => ({
        url,
        title: frontmatter.title || 'Untitled',
        date: frontmatter.date || 'No date',
        author: frontmatter.author || 'The Dployr Team',
        excerpt: frontmatter.excerpt || excerpt || 'No excerpt available',
        tags: frontmatter.tags || [],
        image: frontmatter.image || ''
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }
})
