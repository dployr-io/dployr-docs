import { h, defineComponent } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { useData, useRoute } from 'vitepress'
import './style.css'
import mediumZoom from 'medium-zoom'
import { onMounted, watch, nextTick } from 'vue'
import Landing from './Landing.vue'
import LegalLayout from './LegalLayout.vue'
import Changelog from './Changelog.vue'
import Blog from './Blog.vue'
import BlogPost from './BlogPost.vue'

const RootLayout = defineComponent({
  name: 'RootLayout',
  setup() {
    const { frontmatter } = useData()
    return () => {
      const layout = frontmatter.value?.layout
      if (layout === 'landing')   return h(Landing)
      if (layout === 'legal')     return h(LegalLayout)
      if (layout === 'changelog') return h(Changelog)
      if (layout === 'blog')      return h(Blog)
      if (layout === 'blog-post') return h(BlogPost)
      return h(DefaultTheme.Layout)
    }
  },
})

export default {
  extends: DefaultTheme,
  Layout: RootLayout,
  setup() {
    const route = useRoute()
    const initZoom = () => {
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' })
    }
    onMounted(() => initZoom())
    watch(() => route.path, () => nextTick(() => initZoom()))
  },
  enhanceApp({ app, router, siteData }) {},
} satisfies Theme
