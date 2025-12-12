<template>
  <div class="board-container d-flex gap-4 p-4">
    <BoardColumn
      v-for="col in columns"
      :key="col.id"
      :column="col"
      @move-card="moveCard"
      @add-card="addCard"
    />

    <div class="new-column p-4 rounded-3" @click="addColumn">+ Nueva lista</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BoardColumn from '@/components/common/board/BoardColumn.vue'

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

function moveCard(cardId: number, fromCol: number, toCol: number) {
  const source = columns.value.find((c) => c.id === fromCol)
  const target = columns.value.find((c) => c.id === toCol)
  if (!source || !target) return

  const index = source.cards.findIndex((c) => c.id === cardId)
  const card = source.cards.splice(index, 1)[0]

  target.cards.push(card)
}

function addCard(columnId: number, text: string) {
  const col = columns.value.find((c) => c.id === columnId)
  if (!col || !text.trim()) return

  col.cards.push({ id: Date.now(), text })
}

function addColumn() {
  columns.value.push({
    id: Date.now(),
    title: 'Nueva lista',
    cards: [],
  })
}
</script>

<style scoped>
.board-container {
  background: #1e1f24;
  height: calc(100vh - 120px);
  overflow-x: auto;
  white-space: nowrap;
}

.new-column {
  background: #2a2c34;
  cursor: pointer;
  min-width: 260px;
  text-align: center;
  border: 2px dashed #3a3c45;
  color: #aaa;
}

.new-column:hover {
  background: #32333b;
  color: white;
}
</style>
