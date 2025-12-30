import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "dployr",
  description: "Your app, your server, your rules!",
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }]
  ],
  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs/quickstart' },
      { text: 'GitHub', link: 'https://github.com/dployr-io/dployr' },
      { text: 'Discord', link: 'https://discord.gg/VZVMYuXH' }
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
      { icon: 'discord', link: 'https://discord.gg/VZVMYuXH' },
      { icon: 'x', link: 'https://x.com/@dployr' }
    ],

    footer: {
      message: 'Open source under Apache 2.0 License',
      copyright: 'Copyright © 2025 Dployr | <a href="/legal/privacy-policy">Privacy</a> • <a href="/legal/terms-of-service">Terms</a> • <a href="/legal/data-processing-addendum">DPA</a>'
    },

    search: {
      provider: 'local'
    }
  }
})
