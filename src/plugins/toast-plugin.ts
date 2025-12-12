import { createApp } from 'vue'
import type { App } from 'vue'
import ToastMessage from '@/components/common/ToastMessage.vue'
import type { ToastApi } from '@/types/toast'

// ----------------------------------------
//  🔥 API Global
// ----------------------------------------

let toastApi: ToastApi | null = null

export function setToastApi(api: ToastApi) {
  toastApi = api
}

export function useToast(): ToastApi {
  if (!toastApi) {
    throw new Error(
      '[Toast] El sistema de toasts no está inicializado. Asegúrate de que ToastMessage esté montado.',
    )
  }
  return toastApi
}

// ----------------------------------------
//  🔧 Plugin de Vue
// ----------------------------------------

export default {
  install(app: App) {
    // Crear contenedor
    const div = document.createElement('div')
    document.body.appendChild(div)

    // Crear instancia independiente del Toast
    const toastApp = createApp(ToastMessage)

    // Montar y obtener API expuesto por defineExpose
    const toast = toastApp.mount(div) as unknown as ToastApi

    // Guardar API como GLOBAL
    setToastApi(toast)

    // Extra: permitir this.$toast en componentes que NO usan <script setup>
    app.config.globalProperties.$toast = toast
  },
}
