import api, { deleteToken, setToken } from '@/services/api'
import { handleAxiosException } from '@/utils/handleExceptions'
import { defineStore } from 'pinia'

export interface LoginResponse {
  token: string
  user: User
}

export interface User {
  id: string
  name: string
  email: string
  roles: string[]
  permissions: string[]
  image: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    hasRole: (state) => (role: string) => state.user?.roles.includes(role) ?? false,
    hasPermission: (state) => (permission: string) =>
      state.user?.permissions.includes(permission) ?? false,
    userInitials: (state) => {
      if (!state.user?.name) return ''

      return state.user.name
        .split(' ')
        .map((word) => word.charAt(0))
        .slice(0, 2)
        .join('')
        .toUpperCase()
    },
  },

  actions: {
    async login(email: string, password: string) {
      this.loading = true
      try {
        const res = await api.post<LoginResponse>('login', {
          email,
          password,
        })

        this.token = res.data.token
        this.user = res.data.user
        this.user.image = 'https://i.pravatar.cc/40'
        setToken(res.data.token)

        return {
          success: true,
          message: 'Inicio de sesión exitoso.',
        }
      } catch (error: unknown) {
        return handleAxiosException(error)
      } finally {
        this.loading = false
      }
    },

    async me() {
      this.loading = true
      try {
        const res = await api.get<User>('me')

        this.user = res.data
        this.user.image = 'https://i.pravatar.cc/40'

        return {
          success: true,
        }
      } catch (error: unknown) {
        deleteToken()
        this.user = null
        this.token = null
        return handleAxiosException(error)
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.loading = true
      try {
        const res = await api.post<{ ok: boolean }>('logout')

        deleteToken()
        this.user = null
        this.token = null

        return {
          success: res.data.ok,
          message: 'Sesión cerrada con éxito.',
        }
      } catch (error: unknown) {
        return handleAxiosException(error)
      } finally {
        this.loading = false
      }
    },
  },
})
