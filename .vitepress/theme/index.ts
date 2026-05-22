/// <reference path="./env.d.ts" />
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import mediumZoom from 'medium-zoom'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute, useData } from 'vitepress'
import LandingPage from './LandingPage.vue'

const CustomLayout = {
  setup() {
    const { frontmatter } = useData()
    const route = useRoute()

    const initZoom = () => {
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' })
    }

    onMounted(() => { initZoom() })
    watch(() => route.path, () => nextTick(() => { initZoom() }))

    return () => {
      if (frontmatter.value.layout === 'home') {
        return h(LandingPage)
      }
      return h(DefaultTheme.Layout)
    }
  }
}

export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
  enhanceApp({ app, router, siteData }) {}
} satisfies Theme
