import { defineStore } from 'pinia'
import type { TableData } from '@/types/DataGrid'
import api from '@/services/api'
import type { ActionResult } from '@/types/ActionResult'
import { handleAxiosException } from '@/utils/handleExceptions'

export interface UserRow extends TableData {
  name: string
  email: string
}

export type UserCreateDto = Omit<UserRow, 'id'>
export type UserUpdateDto = Partial<UserCreateDto>

const BASE_URL = 'user'

export const useUserStore = defineStore('users', {
  state: () => ({
    items: [] as UserRow[],
    loading: false,
  }),

  actions: {
    async fetch(): Promise<ActionResult<UserRow>> {
      this.loading = true
      // await new Promise((r) => setTimeout(r, 2000))
      try {
        const res = await api.get(BASE_URL)
        this.items = res.data.data
        return {
          success: true,
          // data: this.items,
          message: 'Datos cargados correctamente',
        }
      } catch (error: unknown) {
        this.items = []
        return handleAxiosException(error)
      } finally {
        this.loading = false
      }
    },

    async add(payload: UserCreateDto): Promise<ActionResult<UserRow>> {
      try {
        const res = await api.post(BASE_URL, {
          ...payload,
        })
        this.items.push({
          ...res.data.data,
        })
        return {
          success: true,
          message: 'Datos guardados correctamente',
        }
      } catch (error: unknown) {
        return handleAxiosException(error)
      }
    },

    async update(id: string, payload: UserUpdateDto): Promise<ActionResult<UserRow>> {
      try {
        const res = await api.put(`${BASE_URL}/${id}`, {
          ...payload,
        })
        const index = this.items.findIndex((i) => i.id === id)
        if (index === -1) {
          return {
            success: false,
            message: 'No se encontro el registro solicitado',
          }
        }

        this.items[index] = {
          ...this.items[index],
          ...res.data.data,
        }

        return {
          success: true,
          message: 'Datos actualizados correctamente',
        }
      } catch (error: unknown) {
        return handleAxiosException(error)
      }
    },

    async remove(id: string): Promise<ActionResult<UserRow>> {
      try {
        await api.delete(`${BASE_URL}/${id}`)

        this.items = this.items.filter((i) => i.id !== id)

        return {
          success: true,
          message: 'Datos eliminados correctamente',
        }
      } catch (error: unknown) {
        return handleAxiosException(error)
      }
    },
  },
})
