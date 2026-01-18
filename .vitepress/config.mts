import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "dployr",
  description: "Self-hosted platform with globally distributed control plane and lightweight agents for your infrastructure. Deploy and manage applications with ease.",
  lang: 'en-US',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'dployr Blog RSS', href: '/blog/rss.xml' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'theme-color', content: '#000000' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
    
    // Open Graph / Facebook
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://dployr.io' }],
    ['meta', { property: 'og:title', content: 'dployr - Self-Hosted Deployment Platform' }],
    ['meta', { property: 'og:description', content: 'Self-hosted platform with globally distributed control plane and lightweight agents for your infrastructure. Deploy and manage applications with ease.' }],
    ['meta', { property: 'og:image', content: 'https://dployr.io/logo.svg' }],
    ['meta', { property: 'og:site_name', content: 'dployr Documentation' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    
    // Twitter
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:url', content: 'https://dployr.io' }],
    ['meta', { name: 'twitter:title', content: 'dployr - Self-Hosted Deployment Platform' }],
    ['meta', { name: 'twitter:description', content: 'Self-hosted platform with globally distributed control plane and lightweight agents for your infrastructure.' }],
    ['meta', { name: 'twitter:image', content: 'https://dployr.io/logo.svg' }],
    ['meta', { name: 'twitter:creator', content: '@dployr' }],
    ['meta', { name: 'twitter:site', content: '@dployr' }],
    
    // Additional SEO
    ['meta', { name: 'keywords', content: 'deployment, self-hosted, control plane, infrastructure, DevOps, platform, open source' }],
    ['meta', { name: 'author', content: 'Dployr' }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }],
    ['meta', { name: 'googlebot', content: 'index, follow' }],
    ['meta', { name: 'bingbot', content: 'index, follow' }],
    
    // Structured Data (JSON-LD)
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'dployr',
      'description': 'Self-hosted platform with globally distributed control plane and lightweight agents for your infrastructure',
      'url': 'https://docs.dployr.io',
      'logo': 'https://dployr.io/logo.svg',
      'sameAs': [
        'https://github.com/dployr-io/dployr',
        'https://x.com/@dployr',
        'https://discord.gg/tY8ZbjvrSZ'
      ],
      'potentialAction': {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': 'https://docs.dployr.io/search?q={search_term_string}'
        }
      }
    })],
    
    // Organization Schema
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Dployr',
      'url': 'https://dployr.io',
      'logo': 'https://dployr.io/logo.svg',
      'description': 'Self-hosted deployment platform',
      'sameAs': [
        'https://github.com/dployr-io/dployr',
        'https://x.com/@dployr',
        'https://discord.gg/tY8ZbjvrSZ'
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
      light: '/logo.svg',
      dark: '/logo-alternate.svg'
    },
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs/quickstart' },
      { text: 'Blog', link: '/blog/' },
      { text: 'Changelog', link: '/changelog' },
      { text: 'Status', link: 'https://dployr.instatus.com/' },
      { text: 'GitHub', link: 'https://github.com/dployr-io/dployr' },
      { text: 'Discord', link: 'https://discord.gg/tY8ZbjvrSZ' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Quickstart', link: '/docs/quickstart' },
          { text: 'Installation', link: '/docs/installation' },
          { text: 'Concepts', link: '/docs/concepts' }
        ]
      },
      {
        text: 'Usage',
        items: [
          { text: 'CLI Commands', link: '/docs/cli' },
          { text: 'Deployment', link: '/docs/deployment' },
          { text: 'Runtimes', link: '/docs/runtimes' }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'API', link: '/docs/api' },
          { text: 'Configuration', link: '/docs/configuration' },
          { text: 'Troubleshooting', link: '/docs/troubleshooting' }
        ]
      },
      {
        text: 'Resources',
        items: [
          { text: 'Blog', link: '/blog/' },
          { text: 'Changelog', link: '/changelog' }
        ]
      },
      {
        text: 'Legal',
        items: [
          { text: 'Privacy Policy', link: '/legal/privacy-policy' },
          { text: 'Terms of Service', link: '/legal/terms-of-service' },
          { text: 'Data Processing Addendum', link: '/legal/data-processing-addendum' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/dployr-io/dployr' },
      { icon: 'discord', link: 'https://discord.gg/tY8ZbjvrSZ' },
      { icon: 'x', link: 'https://x.com/@dployr' }
    ],

    footer: {
      message: 'Open source under Apache 2.0 License',
      copyright: 'Copyright © 2025 Dployr | <a href="/legal/privacy-policy">Privacy</a> • <a href="/legal/terms-of-service">Terms</a> • <a href="/legal/data-processing-addendum">DPA</a> • <a href="https://dployr.instatus.com/">Status</a>'
    },

    search: {
      provider: 'local'
    }
  }
})
