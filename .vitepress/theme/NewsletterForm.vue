<script setup lang="ts">
import { ref } from 'vue'

const LISTMONK_URL = 'https://lists.dployr.io'
const LIST_UUID    = '5189e305-b97a-43e0-bf11-94a19f0d5f85'

const email = ref('')
const state = ref<'idle' | 'loading' | 'done' | 'error'>('idle')

async function subscribe() {
  const val = email.value.trim()
  if (!val || state.value !== 'idle') return
  state.value = 'loading'
  try {
    const res = await fetch(`${LISTMONK_URL}/api/public/subscription`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: val, list_uuids: [LIST_UUID] }),
    })
    state.value = res.ok ? 'done' : 'error'
  } catch {
    state.value = 'error'
  }
}
</script>

<template>
  <p v-if="state === 'done'" class="nl-done">✓ You're in.</p>

  <template v-else>
    <form class="lp-footer__nl-form" @submit.prevent="subscribe" novalidate aria-label="Newsletter sign-up">
      <label for="footer-email" class="nl-sr-only">Email address</label>
      <input
        id="footer-email"
        v-model="email"
        type="email"
        name="email"
        class="lp-footer__nl-input"
        placeholder="you@example.com"
        autocomplete="email"
        :disabled="state === 'loading'"
      />
      <button
        type="submit"
        class="lp-footer__nl-btn"
        :disabled="state === 'loading'"
        @click.prevent="subscribe"
      >
        {{ state === 'loading' ? '…' : 'Subscribe' }}
      </button>
    </form>

    <p v-if="state === 'error'" class="nl-err">
      Something went wrong. <a href="mailto:hello@dployr.io">Email us</a>.
    </p>
  </template>
</template>

<style scoped>
.nl-sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}
.nl-done { font-size: 0.875rem; color: var(--text-2); margin: 0; }
.nl-err  { font-size: 0.8125rem; color: oklch(0.65 0.2 25); margin: 0.5rem 0 0; }
.nl-err a { color: inherit; text-decoration: underline; }
</style>
