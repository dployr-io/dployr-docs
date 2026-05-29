# dployr-docs

Documentation site for [dployr.io](https://dployr.io). Built with VitePress.

## Dev

```bash
pnpm install
pnpm docs:dev
```

## Build

```bash
pnpm build
```

Runs `vitepress build` then `pagefind` to generate the search index. Output goes to `.vitepress/dist`.

## Structure

```
docs/        markdown source for all doc pages
legal/       privacy policy, terms, DPA
blog/        blog posts
public/      static assets
.vitepress/  config and custom theme
```

## Search

Powered by [Pagefind](https://pagefind.app). 