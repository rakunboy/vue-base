import { defineStore } from 'pinia'
import menuData from '@/data/menu.json'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menu: menuData,
  }),

  getters: {
    sidebarMenu: (state) => state.menu, //.filter(x => x.showInSidebar)
  },
})
