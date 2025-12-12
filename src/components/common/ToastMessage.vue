<template>
  <div :class="['toast-container', positionClass]" :style="{ zIndex: zIndex }">
    <transition-group name="toast-fade" tag="div">
      <div
        v-for="toast in visibleToasts"
        :key="toast.id"
        :class="[
          'toast-component',
          toast.variantClass,
          { 'toast-persistent': toast.duration === 0 },
        ]"
        @mouseenter="pauseTimer(toast.id)"
        @mouseleave="resumeTimer(toast.id)"
        role="alert"
        aria-live="polite"
      >
        <div class="toast-main d-flex align-items-start">
          <div v-if="toast.icon" class="toast-icon me-2" v-html="toast.icon"></div>

          <div class="toast-body flex-grow-1">
            <div v-if="toast.title" class="toast-title">{{ toast.title }}</div>

            <div v-if="toast.html" class="toast-html" v-html="toast.message"></div>
            <div v-else class="toast-text">{{ toast.message }}</div>

            <div v-if="toast.count && toast.count > 1" class="toast-count">
              (x{{ toast.count }})
            </div>

            <div v-if="toast.actions?.length" class="toast-actions mt-2">
              <template v-for="(a, idx) in visibleActions(toast)" :key="idx">
                <button
                  v-if="isActionVisible(a)"
                  class="btn btn-sm btn-light me-1"
                  @click="onActionClick(a, toast)"
                >
                  {{ a.label }}
                </button>
              </template>
            </div>
          </div>

          <div class="align-self-start ms-2">
            <button
              v-if="toast.showClose"
              class="btn-close"
              aria-label="Close"
              @click="removeToast(toast.id)"
            ></button>
          </div>
        </div>
      </div>
    </transition-group>

    <!-- Queue placeholder (not visible) -->
  </div>
</template>

<script setup lang="ts">
import { reactive, /*readonly,*/ computed, onBeforeUnmount } from 'vue'

// ----- Types -----
export type ToastVariant = 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'

interface ToastAction {
  label: string
  onClick?: (toast: InternalToast) => void
  visible?: boolean | (() => boolean)
}

interface ToastOptions {
  id?: number
  title?: string
  message: string
  html?: boolean
  duration?: number // ms, 0 = persistent
  variant?: ToastVariant
  position?: string
  actions?: ToastAction[]
  icon?: string | null // raw html for icon (use safe icons)
  groupingKey?: string | null
  priority?: number
  pauseOnHover?: boolean
  showClose?: boolean
}

interface InternalToast extends ToastOptions {
  id: number
  createdAt: number
  timer?: ReturnType<typeof setTimeout> | null
  remaining?: number | null
  count?: number
  variantClass?: string
}

// ----- Default config -----
const defaultConfig = {
  position: 'top-right',
  maxVisible: 5,
  zIndex: 1100,
  pauseOnHover: true,
  newestOnTop: true,
  grouping: true,
}

// Reactive state
const state = reactive({
  toasts: [] as InternalToast[],
  queue: [] as InternalToast[],
  counter: 1,
  config: { ...defaultConfig },
})

// Helpers
function genId() {
  return state.counter++
}

function variantToClass(v?: ToastVariant) {
  const map: Record<string, string> = {
    primary: 'text-bg-primary',
    success: 'text-bg-success',
    danger: 'text-bg-danger',
    warning: 'text-bg-warning',
    info: 'text-bg-info',
    light: 'bg-light border',
    dark: 'text-bg-dark',
  }
  return map[v || 'primary'] || map.primary
}

// Core API
function showToast(options: ToastOptions): number {
  const id = options.id ?? genId()
  const now = Date.now()

  const toast: InternalToast = {
    id,
    message: options.message,
    title: options.title,
    html: !!options.html,
    duration: options.duration ?? 3000,
    variant: options.variant ?? 'primary',
    position: options.position ?? state.config.position,
    actions: options.actions ?? [],
    icon: options.icon ?? null,
    groupingKey: options.groupingKey ?? null,
    createdAt: now,
    timer: null,
    remaining: options.duration ?? 3000,
    count: 1,
    priority: options.priority ?? 0,
    pauseOnHover: options.pauseOnHover ?? state.config.pauseOnHover,
    showClose: options.showClose ?? true,
    variantClass: variantToClass(options.variant),
  }

  // Grouping
  if (state.config.grouping && toast.groupingKey) {
    const existing = state.toasts.find((t) => t.groupingKey === toast.groupingKey)
    if (existing) {
      existing.count = (existing.count ?? 1) + 1
      // refresh timer
      resetTimer(existing)
      return existing.id
    }
  }

  // If we have room, show immediately, else queue
  if (state.toasts.length < state.config.maxVisible) {
    insertToast(toast)
  } else {
    state.queue.push(toast)
  }

  return id
}

function insertToast(toast: InternalToast) {
  if (state.config.newestOnTop) state.toasts.unshift(toast)
  else state.toasts.push(toast)
  startTimer(toast)
  emitEvent('show', toast)
}

function startTimer(toast: InternalToast) {
  if (toast.duration === 0) return
  clearTimer(toast)
  toast.remaining = toast.duration
  toast.timer = setTimeout(() => removeToast(toast.id), toast.remaining ?? 0)
}

function clearTimer(toast: InternalToast) {
  if (toast.timer) {
    clearTimeout(toast.timer)
    toast.timer = null
  }
}

function resetTimer(toast: InternalToast) {
  clearTimer(toast)
  if (toast.duration !== 0) startTimer(toast)
}

function pauseTimer(id: number) {
  const t = state.toasts.find((x) => x.id === id)
  if (!t || !t.timer || !t.pauseOnHover) return
  // compute remaining
  // Note: cannot get remaining easily without tracking time; store createdAt + remaining
  clearTimer(t)
}

function resumeTimer(id: number) {
  const t = state.toasts.find((x) => x.id === id)
  if (!t || t.duration === 0 || !t.pauseOnHover) return
  // restart default duration as a simple approach
  startTimer(t)
}

function removeToast(id: number) {
  const idx = state.toasts.findIndex((t) => t.id === id)
  if (idx !== -1) {
    const t = state.toasts[idx]
    if (!t) return
    clearTimer(t)
    state.toasts.splice(idx, 1)
    emitEvent('close', t)

    // If there is queue, pop next by priority
    if (state.queue.length) {
      // pick highest priority
      state.queue.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
      const next = state.queue.shift()
      if (next) {
        insertToast(next)
      }
    }
  }
}

function updateToast(id: number, changes: Partial<ToastOptions>) {
  const t = state.toasts.find((x) => x.id === id)
  if (!t) return false
  Object.assign(t, changes)
  t.variantClass = variantToClass(t.variant as ToastVariant)
  resetTimer(t)
  emitEvent('update', t)
  return true
}

function visibleActions(toast: InternalToast) {
  return toast.actions ?? []
}

function isActionVisible(a: ToastAction) {
  if (typeof a.visible === 'boolean') return a.visible
  if (typeof a.visible === 'function') return a.visible()
  return true
}

function onActionClick(a: ToastAction, toast: InternalToast) {
  a.onClick?.(toast)
}

// Promise helper
function toastPromise<T>(
  promise: Promise<T>,
  msgs: { loading?: string; success?: string; error?: string },
) {
  const id = showToast({
    message: msgs.loading ?? 'Processing...',
    duration: 0,
    variant: 'info',
    showClose: false,
  })
  promise
    .then((res) => {
      updateToast(id, {
        message: msgs.success ?? 'Success',
        variant: 'success',
        duration: 3000,
        showClose: true,
      })
      return res
    })
    .catch((err) => {
      updateToast(id, {
        message: msgs.error ?? 'Error',
        variant: 'danger',
        duration: 4000,
        showClose: true,
      })
      throw err
    })
  return promise
}

// Events
const listeners: Record<string, ((toast: InternalToast) => void)[]> = {}
// function on(event: string, cb: (toast: InternalToast) => void) {
//   listeners[event] = listeners[event] || []
//   listeners[event].push(cb)
//   return () => {
//     listeners[event] = listeners[event].filter((x) => x !== cb)
//   }
// }
function on(event: string, cb: (toast: InternalToast) => void) {
  // Inicializa el arreglo si no existe, y obtén la referencia tipada
  const list = (listeners[event] ??= [])

  list.push(cb)

  return () => {
    const arr = listeners[event]
    if (!arr) return
    listeners[event] = arr.filter((x) => x !== cb)
  }
}

function emitEvent(event: string, toast: InternalToast) {
  ;(listeners[event] || []).forEach((cb) => cb(toast))
}

// Expose read-only api for component
const api = {
  showToast,
  removeToast,
  updateToast,
  toastPromise,
  on,
  config: state.config,
}

// Computed UI helpers
const visibleToasts = computed(() => state.toasts)
const positionClass = computed(() => {
  const pos = state.config.position
  switch (pos) {
    case 'top-left':
      return 'position-top-left'
    case 'top-right':
      return 'position-top-right'
    case 'bottom-left':
      return 'position-bottom-left'
    case 'bottom-right':
      return 'position-bottom-right'
    case 'top-center':
      return 'position-top-center'
    case 'bottom-center':
      return 'position-bottom-center'
    default:
      return 'position-top-right'
  }
})

const zIndex = state.config.zIndex

// Cleanup
onBeforeUnmount(() => {
  state.toasts.forEach(clearTimer)
})

// Make accessible to parent components via provide/inject pattern
// import { provide } from 'vue'
// provide('toast', api)

// Also expose for direct ref if used as component ref
defineExpose(api)
</script>

<style scoped>
.toast-container {
  position: fixed;
  padding: 1rem;
  pointer-events: none;
}
.position-top-right {
  top: 1rem;
  right: 1rem;
}
.position-top-left {
  top: 1rem;
  left: 1rem;
}
.position-bottom-right {
  bottom: 1rem;
  right: 1rem;
}
.position-bottom-left {
  bottom: 1rem;
  left: 1rem;
}
.position-top-center {
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
}
.position-bottom-center {
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
}

.toast-component {
  pointer-events: auto;
  min-width: 260px;
  max-width: 360px;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
}
.toast-main {
  padding: 0.75rem;
}
.toast-title {
  font-weight: 600;
  margin-bottom: 0.25rem;
}
.toast-actions .btn {
  font-size: 0.75rem;
}
.toast-count {
  font-size: 0.85rem;
  opacity: 0.8;
}

/* transitions */
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.25s ease;
}
.toast-fade-enter-from {
  opacity: 0;
  transform: translateY(-6px) scale(0.99);
}
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.99);
}
</style>
