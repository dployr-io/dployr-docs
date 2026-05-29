<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const open = ref(false)
const query = ref('')
const results = ref<any[]>([])

let pagefind: any = null

async function loadPagefind() {
  if (pagefind) return
  try {
    pagefind = await new Function("return import('/pagefind/pagefind.js')")()
    await pagefind.init()
  } catch (e) {
    console.error('[search] failed to load pagefind:', e)
  }
}

async function search() {
  if (!query.value.trim()) { results.value = []; return }
  await loadPagefind()
  if (!pagefind) return
  const r = await pagefind.search(query.value)
  results.value = await Promise.all(r.results.slice(0, 8).map((r: any) => r.data()))
}

function open_() {
  open.value = true
  loadPagefind()
}

function onKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    open_()
  }
  if (e.key === 'Escape') {
    open.value = false
    query.value = ''
    results.value = []
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <button class="pf-trigger" @click="open_" aria-label="Search">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
    <span class="pf-trigger-text">Search</span>
    <kbd>⌘K</kbd>
  </button>

  <Teleport to="body">
    <div v-if="open" class="pf-overlay" @click.self="open = false; query = ''; results = []">
      <div class="pf-modal" role="dialog" aria-modal="true">
        <div class="pf-input-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            v-model="query"
            @input="search"
            placeholder="Search docs..."
            autofocus
            spellcheck="false"
          />
          <kbd @click="open = false; query = ''; results = []">Esc</kbd>
        </div>
        <div class="pf-results">
          <a
            v-for="r in results"
            :key="r.url"
            :href="r.url"
            class="pf-result"
            @click="open = false; query = ''; results = []"
          >
            <div class="pf-result-title" v-html="r.meta?.title ?? r.url" />
            <div class="pf-result-excerpt" v-html="r.excerpt" />
          </a>
          <div v-if="query && !results.length" class="pf-empty">No results for "{{ query }}"</div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.pf-trigger {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 13px;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
  white-space: nowrap;
}
.pf-trigger:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}
.pf-trigger kbd {
  font-family: inherit;
  font-size: 11px;
  padding: 1px 4px;
  border-radius: 4px;
  background: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-divider);
}
@media (max-width: 768px) {
  .pf-trigger-text, .pf-trigger kbd { display: none; }
  .pf-trigger { padding: 4px 6px; }
}

.pf-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 80px;
}
.pf-modal {
  width: 100%;
  max-width: 560px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
  margin: 0 16px;
}
.pf-input-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}
.pf-input-wrap input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-size: 15px;
  color: var(--vp-c-text-1);
}
.pf-input-wrap input::placeholder { color: var(--vp-c-text-3); }
.pf-input-wrap kbd {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  color: var(--vp-c-text-2);
}
.pf-results {
  max-height: 400px;
  overflow-y: auto;
  padding: 8px;
}
.pf-result {
  display: block;
  padding: 10px 12px;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.15s;
}
.pf-result:hover { background: var(--vp-c-bg-soft); }
.pf-result-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 3px;
}
.pf-result-excerpt {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
:deep(mark) {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 2px;
  padding: 0 2px;
}
.pf-empty {
  padding: 20px 12px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  text-align: center;
}
</style>
