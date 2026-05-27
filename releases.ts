export interface Release {
  date: string
  tag: 'new' | 'improved' | 'fixed'
  title: string
  body: string
  highlights?: string[]
  image?: string
  imageCaption?: string
}

export const releases: Release[] = [
  {
    date: '2026-05-26',
    tag: 'new',
    title: 'Health checks and notifications',
    body: "Configure a health check per service: path, interval, and failure threshold. Once a service crosses the threshold, dployr marks it unhealthy and can notify you. Pair it with notification settings so you hear about it before your users do.",
    // image: '/screenshots/health-checks.png',
    // imageCaption: 'Health check configuration',
  },
  {
    date: '2026-05-26',
    tag: 'new',
    title: 'Monthly and annual billing',
    body: "Billing now supports monthly and annual plans. Annual is cheaper. The billing portal is also accessible directly from settings.",
  },
  {
    date: '2026-05-26',
    tag: 'improved',
    title: 'Hobby plan now includes 2 custom domains',
    body: "The Hobby plan previously allowed one custom domain per service. That limit is now two.",
  },
  {
    date: '2026-05-22',
    tag: 'improved',
    title: 'Custom domain setup now verifies automatically',
    body: "Previously, setting up a custom domain meant adding a DNS record and then manually checking whether it had propagated. dployr now polls for verification and provisions SSL once the record clears.",
    // image: '/screenshots/domain-verify.png',
    // imageCaption: 'Domain verified and SSL provisioned',
  },
  {
    date: '2026-05-22',
    tag: 'improved',
    title: 'Sleeping services show a loading page on cold start',
    body: "On the Hobby plan, services sleep after inactivity. Requests during a cold start previously returned an error. Services now serve a loading page while waking up.",
  },
  {
    date: '2026-05-16',
    tag: 'new',
    title: 'Environment variable editor in the dashboard',
    body: "Manage environment variables and secrets through a key-value editor in the dashboard. The CLI works too if you prefer it.",
  },
  {
    date: '2026-05-14',
    tag: 'new',
    title: 'Watchdog',
    body: "Watchdog monitors running services and marks them unhealthy when they stop responding, even if the process is still up. A hanging or deadlocked service would previously appear healthy from the outside.",
    // image: '/screenshots/watchdog.png',
    // imageCaption: 'Watchdog flagging an unresponsive service',
  },
  {
    date: '2026-05-14',
    tag: 'new',
    title: 'Next.js auto-detection',
    body: "Next.js projects no longer need a Dockerfile or any manual config. dployr detects the framework and handles the build.",
  },
  {
    date: '2026-05-14',
    tag: 'new',
    title: 'Private repository support',
    body: "Deploy from private GitHub repositories by connecting a personal access token. Works the same as a public repo.",
  },
  {
    date: '2026-04-28',
    tag: 'new',
    title: 'Docker runtime',
    body: "Docker is now a supported runtime alongside Node, Python, Go, and the rest. Bring your image and deploy it through the same flow.",
    // image: '/screenshots/docker-deploy.png',
    // imageCaption: 'Deploying a Docker container',
  },
  {
    date: '2026-02-10',
    tag: 'new',
    title: 'dployr is live',
    body: "Deploy from the CLI, GitHub Actions, or the dashboard. Every deployment gets HTTPS and a subdomain automatically. Node.js, Python, Go, PHP, Ruby, .NET, and Java are supported.",
    // image: '/screenshots/dashboard.png',
    // imageCaption: 'The dployr dashboard',
  },
]
