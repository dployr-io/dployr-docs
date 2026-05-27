import { ref } from 'vue'

type Mode = 'dark' | 'light'

const mode = ref<Mode>('dark')

export function useColorMode() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('lp-color-mode') as Mode | null
    if (stored && mode.value !== stored) mode.value = stored
  }

  function toggle() {
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
    if (typeof window !== 'undefined') {
      localStorage.setItem('lp-color-mode', mode.value)
    }
  }

  return { mode, toggle }
}
