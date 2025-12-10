<template>
  <div class="container py-4 text-light">
    <h2 class="mb-4 fw-bold">Pokémon Viewer</h2>

    <!-- Barra de búsqueda -->
    <div class="d-flex mb-4">
      <input
        v-model="search"
        @keyup.enter="fetchPokemon"
        class="form-control bg-dark text-light border-secondary me-2"
        placeholder="Ingresa ID o nombre (ej: 1, pikachu)"
      />
      <button class="btn btn-primary" @click="fetchPokemon">Buscar</button>
    </div>

    <!-- Loading -->
    <div v-if="pokeStore.loading" class="text-center py-5">
      <div class="spinner-border text-primary"></div>
      <p class="mt-3">Cargando...</p>
    </div>

    <!-- Error -->
    <div
      v-if="pokeStore.error"
      class="alert alert-danger bg-danger text-light border border-danger mt-3"
    >
      {{ pokeStore.error }}
    </div>

    <!-- Pokémon Card -->
    <div v-if="pokeStore.pokemon && !pokeStore.loading" class="poke-card p-4 mt-4 rounded-4">
      <h3 class="fw-bold text-capitalize">{{ pokeStore.pokemon.name }}</h3>

      <img :src="pokeStore.pokemon.sprites.front_default ?? ''" class="pokemon-img my-3" />

      <div class="row">
        <div class="col-md-4">
          <h6 class="text-secondary">ID</h6>
          <p>#{{ pokeStore.pokemon.id }}</p>
        </div>

        <div class="col-md-4">
          <h6 class="text-secondary">Altura</h6>
          <p>{{ pokeStore.pokemon.height }} m</p>
        </div>

        <div class="col-md-4">
          <h6 class="text-secondary">Peso</h6>
          <p>{{ pokeStore.pokemon.weight }} kg</p>
        </div>
      </div>

      <h6 class="text-secondary mt-3">Tipos:</h6>
      <div class="d-flex gap-2">
        <span v-for="t in pokeStore.pokemon.types" :key="t.slot" class="badge bg-primary px-3 py-2">
          {{ t.type.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePokeStore } from '@/stores/pokeStore'

const pokeStore = usePokeStore()
const search = ref('')

function fetchPokemon() {
  if (!search.value) return
  pokeStore.loadPokemon(Number(search.value.toLowerCase()))
}
</script>

<style scoped>
.poke-card {
  background-color: #2a2c34;
  border: 1px solid #3a3c45;
}

.pokemon-img {
  width: 150px;
  image-rendering: pixelated;
}
</style>
