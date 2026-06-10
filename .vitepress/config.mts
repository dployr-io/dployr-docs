import { defineConfig } from "vitepress";
import { resolve } from "path";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  transformHead({ pageData }) {
    const base = 'https://dployr.io'
    const canonicalUrl = `${base}/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '')
      .replace(/\/$/, '') || base + '/'

    const parts = pageData.relativePath.replace(/\.md$/, '').split('/')
    const segmentLabels: Record<string, string> = {
      docs: 'Docs',
      blog: 'Blog',
      legal: 'Legal',
      introduction: 'Introduction',
      quickstart: 'Quickstart',
      concepts: 'How it works',
      dashboard: 'Dashboard',
      cli: 'CLI',
      'github-actions': 'GitHub Actions',
      blueprints: 'Blueprints',
      services: 'Services',
      'env-vars': 'Environment Variables & Secrets',
      'custom-domains': 'Custom Domains',
      'health-checks': 'Health Checks & Watchdog',
      instances: 'Instances',
      byos: 'Bring Your Own Server',
      teams: 'Teams & RBAC',
      security: 'Security',
      billing: 'Billing',
      troubleshooting: 'Troubleshooting',
      'privacy-policy': 'Privacy Policy',
      'terms-of-service': 'Terms of Service',
      'data-processing-addendum': 'Data Processing Addendum',
      welcome: 'Shipping dployr',
    }

    const breadcrumbItems = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: base + '/' },
      ...parts
        .filter(p => p && p !== 'index')
        .map((p, i, arr) => ({
          '@type': 'ListItem',
          position: i + 2,
          name: segmentLabels[p] || p,
          item: `${base}/${arr.slice(0, i + 1).join('/')}`,
        })),
    ]

    const isBlogPost = parts[0] === 'blog' && parts.length > 1 && parts[1] !== 'index'
    const scripts: [string, Record<string, string>, string][] = []

    if (breadcrumbItems.length > 1) {
      scripts.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: breadcrumbItems }),
      ])
    }

    if (isBlogPost) {
      const title = pageData.frontmatter?.title as string | undefined
      const description = pageData.frontmatter?.description as string | undefined
      const date = pageData.frontmatter?.date as string | undefined
      scripts.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          description,
          datePublished: date,
          author: { '@type': 'Organization', name: 'dployr', url: 'https://dployr.io' },
          publisher: { '@type': 'Organization', name: 'dployr', logo: { '@type': 'ImageObject', url: 'https://dployr.io/logo.svg' } },
          url: canonicalUrl,
        }),
      ])
    }

    const pageTitle = pageData.frontmatter?.title as string | undefined
    const siteName = 'dployr'
    const fallbackTitle = 'dployr | Ship apps, not infrastructure'
    const fullTitle = pageTitle && pageTitle !== siteName
      ? `${pageTitle} | ${siteName}`
      : fallbackTitle

    const description = pageData.frontmatter?.description as string | undefined
    const siteDescription = 'Your server is ready the moment you sign up. Deploy Node.js, Python, Go, PHP, Ruby, .NET, Java, and Docker from the CLI, GitHub Actions, or dashboard.'
    const fullDescription = description || siteDescription

    const head: [string, Record<string, string>][] = [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:type', content: isBlogPost ? 'article' : 'website' }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:title', content: fullTitle }],
      ['meta', { property: 'og:description', content: fullDescription }],
      ['meta', { name: 'twitter:url', content: canonicalUrl }],
      ['meta', { name: 'twitter:title', content: fullTitle }],
      ['meta', { name: 'twitter:description', content: fullDescription }],
    ]

    if (description) {
      head.push(['meta', { name: 'description', content: description }])
    }

    return [...head, ...scripts]
  },
  cleanUrls: true,
  vite: {
    resolve: {
      alias: {
        "./VPNavBarSearch.vue": resolve(__dirname, "theme/Search.vue"),
      },
    },
  },
  sitemap: {
    hostname: 'https://dployr.io',
  },
  title: "dployr",
  description: "Your server is ready the moment you sign up. Deploy Node.js, Python, Go, PHP, Ruby, .NET, Java, and Docker from the CLI, GitHub Actions, or dashboard.",
  lang: "en-US",
  head: [
    // Geist — wordmark font
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
    ["link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Geist:wght@700&display=swap" }],
    // Google Analytics
    ["script", { async: "", src: "https://www.googletagmanager.com/gtag/js?id=G-STQJCSLE5K" }],
    ["script", {}, `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-STQJCSLE5K');`],
    // Microsoft Clarity
    ["script", {}, `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","wylfzdbf0d");`],
    // Tawk.to live chat
    ["script", {}, `var Tawk_API=Tawk_API||{},Tawk_LoadStart=new Date();(function(){var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];s1.async=true;s1.src='https://embed.tawk.to/6a240f49a48b111c34b6b03a/1jqedneda';s1.charset='UTF-8';s1.setAttribute('crossorigin','*');s0.parentNode.insertBefore(s1,s0);})();`],
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["link", { rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
    ["link", { rel: "alternate", type: "application/rss+xml", title: "dployr Blog RSS", href: "/blog/rss.xml" }],
    ["meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }],
    ["meta", { name: "theme-color", content: "#000000" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" }],

    // Open Graph — type, title, description, url are set per-page in transformHead
    ["meta", { property: "og:image", content: "https://dployr.io/og-dark.png" }],
    ["meta", { property: "og:image:width", content: "1200" }],
    ["meta", { property: "og:image:height", content: "630" }],
    ["meta", { property: "og:image:alt", content: "dployr | Ship apps, not infrastructure" }],
    ["meta", { property: "og:site_name", content: "dployr" }],
    ["meta", { property: "og:locale", content: "en_US" }],

    // Twitter — title, description, url are set per-page in transformHead
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:image", content: "https://dployr.io/og-dark.png" }],
    ["meta", { name: "twitter:creator", content: "@dployr" }],
    ["meta", { name: "twitter:site", content: "@dployr" }],

    // Additional SEO
    ["meta", { name: "author", content: "dployr" }],
    ["meta", { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" }],
    ["meta", { name: "googlebot", content: "index, follow" }],
    ["meta", { name: "bingbot", content: "index, follow" }],

    // Structured Data (JSON-LD)
    [
      "script",
      { type: "application/ld+json" },
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "dployr",
        description: "Your server is ready the moment you sign up. Deploy Node.js, Python, Go, PHP, Ruby, .NET, Java, and Docker from the CLI, GitHub Actions, or dashboard.",
        url: "https://dployr.io",
        logo: "https://dployr.io/logo.svg",
        sameAs: ["https://github.com/dployr-io/dployr", "https://x.com/@dployr", "https://discord.gg/tY8ZbjvrSZ"],
      }),
    ],

    // Organization Schema
    [
      "script",
      { type: "application/ld+json" },
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "dployr",
        url: "https://dployr.io",
        logo: "https://dployr.io/logo.svg",
        description: "Deployment platform for developers. Ship apps, not infrastructure.",
        sameAs: ["https://github.com/dployr-io/dployr", "https://x.com/@dployr", "https://discord.gg/tY8ZbjvrSZ"],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Support",
          email: "hello@dployr.io",
        },
      }),
    ],

    // SoftwareApplication Schema
    [
      "script",
      { type: "application/ld+json" },
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "dployr",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Linux, macOS",
        url: "https://dployr.io",
        description: "Your server is ready the moment you sign up. Deploy any app with the CLI, GitHub Actions, or the dashboard. No SSH, no setup, nothing to configure.",
        offers: [
          {
            "@type": "Offer",
            name: "Hobby",
            price: "0",
            priceCurrency: "USD",
            description: "Free forever. 512MB RAM, 1 vCPU, 10GB disk, 1 workload.",
          },
          {
            "@type": "Offer",
            name: "Indie",
            price: "12",
            priceCurrency: "USD",
            description: "1GB RAM, 1 vCPU, 25GB disk, up to 5 workloads. Billed annually.",
          },
          {
            "@type": "Offer",
            name: "Pro",
            price: "20",
            priceCurrency: "USD",
            description: "2GB RAM, 1 vCPU, 50GB disk, up to 25 workloads. Dedicated instance. Billed annually.",
          },
        ],
        license: "https://www.apache.org/licenses/LICENSE-2.0",
        isAccessibleForFree: true,
        sameAs: ["https://github.com/dployr-io/dployr"],
      }),
    ],
  ],
  themeConfig: {
    logo: {
      light: "/logo.svg",
      dark: "/logo-alternate.svg",
    },

    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "/docs/introduction" },
      { text: "Blog", link: "/blog/" },
      { text: "Changelog", link: "/changelog" },
      { text: "Status", link: "https://status.dployr.io/" },
      { text: "GitHub", link: "https://github.com/dployr-io/dployr" },
      { text: "Discord", link: "https://discord.gg/tY8ZbjvrSZ" },
    ],

    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: "Introduction", link: "/docs/introduction" },
          { text: "Quickstart", link: "/docs/quickstart" },
          { text: "How it works", link: "/docs/concepts" },
        ],
      },
      {
        text: "Deploying",
        items: [
          { text: "Dashboard", link: "/docs/dashboard" },
          { text: "CLI", link: "/docs/cli" },
          { text: "GitHub Actions", link: "/docs/github-actions" },
          { text: "Blueprints", link: "/docs/blueprints" },
        ],
      },
      {
        text: "Managing Services",
        items: [
          { text: "Services", link: "/docs/services" },
          { text: "Environment Variables & Secrets", link: "/docs/env-vars" },
          { text: "Custom Domains", link: "/docs/custom-domains" },
          { text: "Health Checks & Watchdog", link: "/docs/health-checks" },
        ],
      },
      {
        text: "Infrastructure",
        items: [
          { text: "Instances", link: "/docs/instances" },
          { text: "Bring Your Own Server", link: "/docs/byos" },
        ],
      },
      {
        text: "Team & Account",
        items: [
          { text: "Teams & RBAC", link: "/docs/teams" },
          { text: "Security", link: "/docs/security" },
          { text: "Billing", link: "/docs/billing" },
        ],
      },
      {
        text: "Reference",
        items: [
          { text: "Troubleshooting", link: "/docs/troubleshooting" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/dployr-io/dployr" },
      { icon: "discord", link: "https://discord.gg/tY8ZbjvrSZ" },
      { icon: "x", link: "https://x.com/@dployr" },
    ],

    footer: {
      message: "Open source under Apache 2.0 License",
      copyright:
        'Copyright © 2025 Dployr | <a href="/legal/privacy-policy">Privacy</a> • <a href="/legal/terms-of-service">Terms</a> • <a href="/legal/data-processing-addendum">DPA</a> • <a href="https://status.dployr.io/">Status</a>',
    },

    notFound: {
      quote: "Almost lost you there. Nothing lives here, but plenty does just around the corner.",
      linkText: "Back to docs",
    },
  },
});
