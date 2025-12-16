<template>
  <BoardComponent :data="columns" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BoardComponent from '@/components/common/board/BoardComponent.vue'

const columns = ref([
  {
    id: 1,
    title: 'Por hacer',
    cards: [
      { id: 1, text: 'Configurar API' },
      { id: 2, text: 'Diseñar login' },
    ],
  },
  {
    id: 2,
    title: 'En progreso',
    cards: [{ id: 3, text: 'Crear Dashboard' }],
  },
  {
    id: 3,
    title: 'Hecho',
    cards: [{ id: 4, text: 'Instalar librerías' }],
  },
])
</script>

<style scoped></style>
