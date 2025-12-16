<template>
  <div class="board-container d-flex gap-4 p-4">
    <div
      v-for="(col, index) in data"
      :key="col.id"
      class="column-wrapper"
      @dragover.prevent
      @drop="dropColumn(index)"
    >
      <BoardColumn
        :column="col"
        @move-card="moveCard"
        @add-card="addCard"
        @drag-column-start="dragColumnStart(index)"
      />
    </div>

    <div class="new-column p-4 rounded-3" @click="addColumn">+ Nueva lista</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BoardColumn from '@/components/common/board/BoardColumn.vue'

const props = defineProps<{
  data: any
}>()

const columns = ref(props.data)
// const columns = ref([
//   {
//     id: 1,
//     title: 'Por hacer',
//     cards: [
//       { id: 1, text: 'Configurar API' },
//       { id: 2, text: 'Diseñar login' },
//     ],
//   },
//   {
//     id: 2,
//     title: 'En progreso',
//     cards: [{ id: 3, text: 'Crear Dashboard' }],
//   },
//   {
//     id: 3,
//     title: 'Hecho',
//     cards: [{ id: 4, text: 'Instalar librerías' }],
//   },
// ])

/* =========================
   Drag de TARJETAS
========================= */
function moveCard({
  fromCol,
  toCol,
  fromIndex,
  toIndex,
}: {
  fromCol: number
  toCol: number
  fromIndex: number
  toIndex: number
}) {
  const source = columns.value.find((c) => c.id === fromCol)
  const target = columns.value.find((c) => c.id === toCol)
  if (!source || !target) return

  const card = source.cards[fromIndex]
  if (!card) return

  source.cards.splice(fromIndex, 1)

  const adjustedIndex = source === target && fromIndex < toIndex ? toIndex - 1 : toIndex

  target.cards.splice(adjustedIndex, 0, card)
}

/* =========================
   Drag de COLUMNAS
========================= */
const draggedColumnIndex = ref<number | null>(null)

function dragColumnStart(index: number) {
  draggedColumnIndex.value = index
}

function dropColumn(toIndex: number) {
  if (draggedColumnIndex.value === null) return
  if (draggedColumnIndex.value === toIndex) return

  const [col] = columns.value.splice(draggedColumnIndex.value, 1)
  columns.value.splice(toIndex, 0, col)

  draggedColumnIndex.value = null
}

/* ========================= */
function addCard(columnId: number, text: string) {
  const col = columns.value.find((c) => c.id === columnId)
  if (!col) return
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

.column-wrapper {
  transition: transform 0.25s ease;
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
