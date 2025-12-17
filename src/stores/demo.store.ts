import { defineStore } from 'pinia'
import { DemoService } from '@/services/demo.service'
import type { TableData } from '@/types/DataGrid'

export interface DemoRow extends TableData {
  name: string
  email: string
}

export const useDemoStore = defineStore('users', {
  state: () => ({
    items: [] as DemoRow[],
    loading: false,
  }),

  actions: {
    async fetch() {
      this.loading = true
      this.items = await DemoService.getAll()
      this.loading = false
    },

    add(payload: DemoRow) {
      this.items.push({
        ...payload,
        id: Date.now(),
      })
    },

    update(id: number, payload: DemoRow) {
      const index = this.items.findIndex((i) => i.id === id)
      if (index !== -1) {
        this.items[index] = { ...this.items[index], ...payload }
      }
    },

    remove(id: number | string) {
      this.items = this.items.filter((i) => i.id !== id)
    },
  },
})
