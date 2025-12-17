import data from '@/data/users.json'
import type { DemoRow } from '@/stores/demo.store'

export const DemoService = {
  async getAll(): Promise<DemoRow[]> {
    // simulación async
    await new Promise((r) => setTimeout(r, 300))
    return data
  },
}
