import { defineConfig } from "vitepress";

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
      quickstart: 'Quickstart',
      installation: 'Installation',
      concepts: 'Concepts',
      blueprints: 'Blueprints',
      cli: 'CLI Commands',
      'dployr-web': 'Dployr Web',
      api: 'API',
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

    const scripts: [string, Record<string, string>, string][] = []
    if (breadcrumbItems.length > 1) {
      scripts.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: breadcrumbItems }),
      ])
    }

    return [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ...scripts,
    ]
  },
  title: "dployr",
  description: "Self-hosted platform with globally distributed control plane and lightweight agents for your infrastructure. Deploy and manage applications with ease.",
  lang: "en-US",
  head: [
    // Geist — wordmark font
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
    ["link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Geist:wght@700&display=swap" }],
    // Google Analytics
    ["script", { async: "", src: "https://www.googletagmanager.com/gtag/js?id=G-STQJCSLE5K" }],
    ["script", {}, `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-STQJCSLE5K');`],
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["link", { rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
    ["link", { rel: "alternate", type: "application/rss+xml", title: "dployr Blog RSS", href: "/blog/rss.xml" }],
    ["meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }],
    ["meta", { name: "theme-color", content: "#000000" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" }],

    // Open Graph / Facebook
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:url", content: "https://dployr.io" }],
    ["meta", { property: "og:title", content: "dployr - Self-Hosted Deployment Platform" }],
    [
      "meta",
      { property: "og:description", content: "Self-hosted platform with globally distributed control plane and lightweight agents for your infrastructure. Deploy and manage applications with ease." },
    ],
    ["meta", { property: "og:image", content: "https://dployr.io/og-dark.png" }],
    ["meta", { property: "og:image:width", content: "1200" }],
    ["meta", { property: "og:image:height", content: "630" }],
    ["meta", { property: "og:image:alt", content: "dployr — Ship apps, not infrastructure." }],
    ["meta", { property: "og:site_name", content: "dployr Documentation" }],
    ["meta", { property: "og:locale", content: "en_US" }],

    // Twitter
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:url", content: "https://dployr.io" }],
    ["meta", { name: "twitter:title", content: "dployr - Self-Hosted Deployment Platform" }],
    ["meta", { name: "twitter:description", content: "Self-hosted platform with globally distributed control plane and lightweight agents for your infrastructure." }],
    ["meta", { name: "twitter:image", content: "https://dployr.io/og-dark.png" }],
    ["meta", { name: "twitter:creator", content: "@dployr" }],
    ["meta", { name: "twitter:site", content: "@dployr" }],

    // Additional SEO
    ["meta", { name: "keywords", content: "deployment, self-hosted, control plane, infrastructure, DevOps, platform, open source" }],
    ["meta", { name: "author", content: "Dployr" }],
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
        description: "Self-hosted platform with globally distributed control plane and lightweight agents for your infrastructure",
        url: "https://docs.dployr.io",
        logo: "https://dployr.io/logo.svg",
        sameAs: ["https://github.com/dployr-io/dployr", "https://x.com/@dployr", "https://discord.gg/tY8ZbjvrSZ"],
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://docs.dployr.io/search?q={search_term_string}",
          },
        },
      }),
    ],

    // Organization Schema
    [
      "script",
      { type: "application/ld+json" },
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Dployr",
        url: "https://dployr.io",
        logo: "https://dployr.io/logo.svg",
        description: "Self-hosted deployment platform",
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
        operatingSystem: "Linux, macOS, Windows",
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
      { text: "Docs", link: "/docs/quickstart" },
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
          { text: "Quickstart", link: "/docs/quickstart" },
          { text: "Installation", link: "/docs/installation" },
          { text: "Concepts", link: "/docs/concepts" },
          { text: "Blueprints", link: "/docs/blueprints" },
        ],
      },
      {
        text: "Usage",
        items: [
          { text: "CLI Commands", link: "/docs/cli" },
          { text: "Dployr Web", link: "/docs/dployr-web" },
        ],
      },
      {
        text: "Reference",
        items: [
          { text: "API", link: "/docs/api" },
          { text: "Troubleshooting", link: "/docs/troubleshooting" },
        ],
      },
      {
        text: "Resources",
        items: [
          { text: "Blog", link: "/blog/" },
          { text: "Changelog", link: "/changelog" },
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

    search: {
      provider: "local",
    },
  },
});
