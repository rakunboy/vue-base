import { defineStore } from 'pinia'
import type { TableData } from '@/types/DataGrid'
import api from '@/services/api'
import type { ActionResult } from '@/types/ActionResult'
import { handleAxiosException } from '@/utils/handleExceptions'

export interface GetPermisoRow extends TableData {
  name?: string
  key?: string
  role_id?: string | null
}

export interface PermisoRow extends TableData {
  name: string
  key: string
  role_id?: string | null
  has_permission_role: boolean
}

export type PermisoCreateDto = Omit<PermisoRow, 'id'>
export type PermisoUpdateDto = Partial<PermisoCreateDto>

const BASE_URL = 'permisos'

export const usePermisoStore = defineStore('permisos', {
  state: () => ({
    items: [] as PermisoRow[],
    loadingData: false,
    loading: false,
    loadingPermission: false,
  }),

  actions: {
    async fetch(data?: GetPermisoRow): Promise<ActionResult<PermisoRow>> {
      this.loadingData = true
      // await new Promise((r) => setTimeout(r, 2000))
      try {
        const res = await api.get(BASE_URL, {
          params: {
            role_id: data?.role_id,
          },
        })
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
        this.loadingData = false
      }
    },

    async add(payload: PermisoCreateDto): Promise<ActionResult<PermisoRow>> {
      this.loading = true
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
      } finally {
        this.loading = false
      }
    },

    async update(id: string, payload: PermisoUpdateDto): Promise<ActionResult<PermisoRow>> {
      this.loading = true
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
      } finally {
        this.loading = false
      }
    },

    async remove(id: string): Promise<ActionResult<PermisoRow>> {
      this.loading = true
      try {
        await api.delete(`${BASE_URL}/${id}`)

        this.items = this.items.filter((i) => i.id !== id)

        return {
          success: true,
          message: 'Datos eliminados correctamente',
        }
      } catch (error: unknown) {
        return handleAxiosException(error)
      } finally {
        this.loading = false
      }
    },
    async addPermission(role_id: string, permission_id: string): Promise<ActionResult> {
      this.loadingPermission = true
      try {
        await new Promise((r) => setTimeout(r, 2000))
        await api.post('roles/permission/assign', {
          role_id,
          permission_id,
        })

        const index = this.items.findIndex((i) => i.id === permission_id)
        if (index === -1 || !this.items[index]) {
          return {
            success: false,
            message: 'No se encontro el registro solicitado',
          }
        }

        // this.items[index] = {
        //   ...this.items[index],
        //   ...res.data.data,
        // }
        this.items[index].has_permission_role = true

        return {
          success: true,
          message: 'Permiso añadido correctamente',
        }
      } catch (error: unknown) {
        return handleAxiosException(error)
      } finally {
        this.loadingPermission = false
      }
    },
    async removePermission(role_id: string, permission_id: string): Promise<ActionResult> {
      this.loadingPermission = true
      try {
        await api.delete('roles/permission/remove', {
          data: {
            role_id,
            permission_id,
          },
        })

        const index = this.items.findIndex((i) => i.id === permission_id)
        if (index === -1 || !this.items[index]) {
          return {
            success: false,
            message: 'No se encontro el registro solicitado',
          }
        }

        this.items[index].has_permission_role = false

        return {
          success: true,
          message: 'Permiso añadido correctamente',
        }
      } catch (error: unknown) {
        return handleAxiosException(error)
      } finally {
        this.loadingPermission = false
      }
    },
  },
})
