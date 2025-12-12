import { defineStore } from 'pinia'
import type { NotificationItem, MessageItem } from '@/types/topbar'

export const useTopbarStore = defineStore('topbar', {
  state: () => ({
    notifications: [] as NotificationItem[],
    messages: [] as MessageItem[],
  }),

  getters: {
    unreadNotifications: (s) => s.notifications.filter((n) => !n.read).length,
    unreadMessages: (s) => s.messages.filter((m) => !m.read).length,
  },

  actions: {
    loadMockData() {
      this.notifications = [
        {
          id: 1,
          title: 'Servidor reiniciado',
          time: 'Hace 2 min',
          icon: 'bi-exclamation-circle',
          read: false,
        },
        { id: 2, title: 'Nuevo usuario', time: 'Hace 5 min', icon: 'bi-person-plus', read: false },
      ]

      this.messages = [
        { id: 1, from: 'Admin', text: 'Revisa el dashboard', time: 'Hace 3 min', read: false },
        {
          id: 2,
          from: 'Soporte',
          text: 'Actualización completada',
          time: 'Hace 10 min',
          read: false,
        },
      ]
    },

    markNotificationRead(id: number) {
      const n = this.notifications.find((x) => x.id === id)
      if (n) n.read = true
    },

    markMessageRead(id: number) {
      const m = this.messages.find((x) => x.id === id)
      if (m) m.read = true
    },

    clearNotifications() {
      this.notifications = []
    },

    clearMessages() {
      this.messages = []
    },
  },
})
