import type { ToastApi } from './toast'

declare module 'vue' {
  interface ComponentCustomProperties {
    $toast: ToastApi
  }
}
