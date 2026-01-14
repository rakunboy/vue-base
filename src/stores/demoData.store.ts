import { defineStore } from 'pinia'
import type { TableData } from '@/types/DataGrid'
import api from '@/services/api'
import type { ActionResult } from '@/types/ActionResult'
import type { AxiosError } from 'axios'

export interface DemoRow extends TableData {
  name: string
  email: string
}

export type DemoCreateDto = Omit<DemoRow, 'id'>
export type DemoUpdateDto = Partial<DemoCreateDto>

export const useDemoDataStore = defineStore('demo', {
  state: () => ({
    items: [] as DemoRow[],
    loading: false,
  }),

  actions: {
    async fetch(): Promise<ActionResult<DemoRow>> {
      this.loading = true
      // await new Promise((r) => setTimeout(r, 2000))
      try {
        const res = await api.get('demouuid')
        this.items = res.data.data
        return {
          success: true,
          // data: this.items,
          message: 'Datos cargados correctamente',
        }
      } catch (error: unknown) {
        this.items = []
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const err = error as AxiosError<any>

        return {
          success: false,
          message: err?.response?.data?.message ?? 'Error al cargar los datos',
        }
      } finally {
        this.loading = false
      }
    },

    async add(payload: DemoCreateDto): Promise<ActionResult<DemoRow>> {
      try {
        const res = await api.post('demouuid', {
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const err = error as AxiosError<any>

        return {
          success: false,
          message: err?.response?.data?.message ?? 'Error al realizar la petición',
        }
      }
    },

    async update(id: string, payload: DemoUpdateDto): Promise<ActionResult<DemoRow>> {
      try {
        const res = await api.put(`demouuid/${id}`, {
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const err = error as AxiosError<any>

        return {
          success: false,
          message: err?.response?.data?.message ?? 'Error al realizar la petición',
        }
      }
    },

    async remove(id: string): Promise<ActionResult<DemoRow>> {
      try {
        await api.delete(`demouuid/${id}`)

        this.items = this.items.filter((i) => i.id !== id)

        return {
          success: true,
          message: 'Datos eliminados correctamente',
        }
      } catch (error: unknown) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const err = error as AxiosError<any>

        return {
          success: false,
          message: err?.response?.data?.message ?? 'Error al realizar la petición',
        }
      }
    },
  },
})
