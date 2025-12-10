import { defineStore } from 'pinia'
import api from '@/services/api'
import type { PokemonFull } from '@/types/pokemon'

export const usePokeStore = defineStore('poke', {
  state: () => ({
    pokemon: null as PokemonFull | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async loadPokemon(id: number) {
      this.loading = true
      this.error = null

      try {
        const res = await api.get<PokemonFull>(`/pokemon/${id}`)
        this.pokemon = res.data
      } catch (err: unknown) {
        console.log(err)
        this.error = 'No se pudo cargar el Pokémon'
      } finally {
        this.loading = false
      }
    },
  },
})
