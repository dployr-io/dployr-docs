#!/usr/bin/env node

/**
 * Blog Post Generator
 * Creates a new blog post with proper frontmatter and SEO metadata
 */

import { writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import readline from 'readline'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(query) {
  return new Promise(resolve => rl.question(query, resolve))
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

async function main() {
  console.log('📝 Create a New Blog Post\n')
  
  const title = await question('Title: ')
  if (!title) {
    console.error('❌ Title is required')
    process.exit(1)
  }
  
  const author = await question('Author (default: The Dployr Team): ') || 'The Dployr Team'
  const excerpt = await question('Excerpt/Summary: ')
  const tags = await question('Tags (comma-separated): ')
  
  const date = new Date().toISOString().split('T')[0]
  const slug = slugify(title)
  const filename = `${date}-${slug}.md`
  const filepath = join(__dirname, '..', 'blog', filename)
  
  if (existsSync(filepath)) {
    console.error(`❌ File already exists: ${filename}`)
    process.exit(1)
  }
  
  const tagArray = tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : []
  
  const content = `---
title: "${title}"
date: ${date}
author: ${author}
excerpt: "${excerpt || ''}"
tags: [${tagArray.map(t => `"${t}"`).join(', ')}]
image: ""
---

# ${title}

${excerpt ? `> ${excerpt}\n` : ''}
## Introduction

Write your introduction here...

## Main Content

Add your main content here...

## Conclusion

Wrap up your post here...

---

**About the Author:** ${author}

**Tags:** ${tagArray.join(', ') || 'None'}
`
  
  writeFileSync(filepath, content, 'utf-8')
  
  console.log(`\n✅ Blog post created successfully!`)
  console.log(`📄 File: blog/${filename}`)
  console.log(`\n📝 Next steps:`)
  console.log(`1. Edit the file: blog/${filename}`)
  console.log(`2. Add your content`)
  console.log(`3. Optionally add an image URL to the frontmatter`)
  console.log(`4. Run: pnpm run docs:dev to preview`)
  console.log(`5. Commit and push when ready\n`)
  
  rl.close()
}

main().catch(error => {
  console.error('❌ Error:', error.message)
  process.exit(1)
})
