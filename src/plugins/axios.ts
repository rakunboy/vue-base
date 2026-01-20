import type { AxiosInstance } from 'axios'
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'

export function setupAxiosInterceptors(api: AxiosInstance) {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const authStore = useAuthStore()

      if (error.response?.status === 401) {
        if (!authStore.isAuthenticated) {
          return Promise.reject(error)
        }

        authStore.logout()

        if (router.currentRoute.value.name !== 'login') {
          router.replace({
            name: 'login',
            query: { redirect: router.currentRoute.value.fullPath },
          })
        }
      }

      return Promise.reject(error)
    },
  )
}
