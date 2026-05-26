import { defineConfig } from "vitepress";

// [vitepress.dev](https://vitepress.dev/reference/site-config)
export default defineConfig({
  title: "dployr",
  description: "Self-hosted platform with globally distributed control plane and lightweight agents for your infrastructure. Deploy and manage applications with ease.",
  lang: 'en-US',

  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: ['.ngrok-free.dev']
    }
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'dployr Blog RSS', href: '/blog/rss.xml' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'theme-color', content: '#000000' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
    
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: '[dployr.io](https://dployr.io)' }],
    ['meta', { property: 'og:title', content: 'dployr - Self-Hosted Deployment Platform' }],
    ['meta', { property: 'og:description', content: 'Self-hosted platform with globally distributed control plane and lightweight agents for your infrastructure. Deploy and manage applications with ease.' }],
    ['meta', { property: 'og:image', content: '[dployr.io](https://dployr.io/logo.svg)' }],
    ['meta', { property: 'og:site_name', content: 'dployr Documentation' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:url', content: '[dployr.io](https://dployr.io)' }],
    ['meta', { name: 'twitter:title', content: 'dployr - Self-Hosted Deployment Platform' }],
    ['meta', { name: 'twitter:description', content: 'Self-hosted platform with globally distributed control plane and lightweight agents for your infrastructure.' }],
    ['meta', { name: 'twitter:image', content: '[dployr.io](https://dployr.io/logo.svg)' }],
    ['meta', { name: 'twitter:creator', content: '@dployr' }],
    ['meta', { name: 'twitter:site', content: '@dployr' }],
    
    ['meta', { name: 'keywords', content: 'deployment, self-hosted, control plane, infrastructure, DevOps, platform, open source' }],
    ['meta', { name: 'author', content: 'Dployr' }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }],
    ['meta', { name: 'googlebot', content: 'index, follow' }],
    ['meta', { name: 'bingbot', content: 'index, follow' }],
    
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': '[schema.org](https://schema.org)',
      '@type': 'WebSite',
      'name': 'dployr',
      'description': 'Self-hosted platform with globally distributed control plane and lightweight agents for your infrastructure',
      'url': '[docs.dployr.io](https://docs.dployr.io)',
      'logo': '[dployr.io](https://dployr.io/logo.svg)',
      'sameAs': [
        '[github.com](https://github.com/dployr-io/dployr)',
        '[x.com](https://x.com/@dployr)',
        '[discord.gg](https://discord.gg/tY8ZbjvrSZ)'
      ],
      'potentialAction': {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': '[docs.dployr.io](https://docs.dployr.io/search?q={search_term_string})'
        }
      }
    })],
    
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': '[schema.org](https://schema.org)',
      '@type': 'Organization',
      'name': 'Dployr',
      'url': '[dployr.io](https://dployr.io)',
      'logo': '[dployr.io](https://dployr.io/logo.svg)',
      'description': 'Self-hosted deployment platform',
      'sameAs': [
        '[github.com](https://github.com/dployr-io/dployr)',
        '[x.com](https://x.com/@dployr)',
        '[discord.gg](https://discord.gg/tY8ZbjvrSZ)'
      ],
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'Customer Support',
        'email': 'support@dployr.io'
      }
    })]
  ],

  themeConfig: {
    logo: {
      light: "/logo.svg",
      dark: "/logo-alternate.svg",
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs/quickstart' },
      { text: 'Blog', link: '/blog/' },
      { text: 'Changelog', link: '/changelog' },
      { text: 'Status', link: '[dployr.instatus.com](https://dployr.instatus.com/)' },
      { text: 'GitHub', link: '[github.com](https://github.com/dployr-io/dployr)' },
      { text: 'Discord', link: '[discord.gg](https://discord.gg/tY8ZbjvrSZ)' }
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
      {
        text: "Legal",
        items: [
          { text: "Privacy Policy", link: "/legal/privacy-policy" },
          { text: "Terms of Service", link: "/legal/terms-of-service" },
          { text: "Data Processing Addendum", link: "/legal/data-processing-addendum" },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: '[github.com](https://github.com/dployr-io/dployr)' },
      { icon: 'discord', link: '[discord.gg](https://discord.gg/tY8ZbjvrSZ)' },
      { icon: 'x', link: '[x.com](https://x.com/@dployr)' }
    ],

    footer: {
      message: 'Open source under Apache 2.0 License',
      copyright: 'Copyright © 2025 Dployr | <a href="/legal/privacy-policy">Privacy</a> • <a href="/legal/terms-of-service">Terms</a> • <a href="/legal/data-processing-addendum">DPA</a> • <a href="[dployr.instatus.com](https://dployr.instatus.com/)">Status</a>'
    },

    search: {
      provider: "local",
    },
  },
});
