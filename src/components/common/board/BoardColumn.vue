<template>
  <div class="column p-3 rounded-3">
    <h6 class="fw-bold mb-3">{{ column.title }}</h6>

    <div class="cards-wrapper" @dragover.prevent="dragOver" @drop="drop">
      <BoardCard v-for="card in column.cards" :key="card.id" :card="card" :column-id="column.id" />
    </div>

    <input
      v-model="newText"
      class="form-control form-control-sm bg-dark text-light border-secondary mt-3"
      placeholder="Nueva tarjeta..."
      @keyup.enter="add"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BoardCard from './BoardCard.vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const props = defineProps<{ column: any }>()
const emit = defineEmits(['move-card', 'add-card'])

const newText = ref('')

function add() {
  if (!newText.value.trim()) return
  emit('add-card', props.column.id, newText.value)
  newText.value = ''
}

function dragOver(e: DragEvent) {
  e.preventDefault()
  if (e.dataTransfer) e.dataTransfer.dropEffect = 'move'
}

function drop(e: DragEvent) {
  if (!e.dataTransfer) return

  const cardId = Number(e.dataTransfer.getData('cardId'))
  const fromCol = Number(e.dataTransfer.getData('columnId'))
  const toCol = props.column.id

  if (!cardId || !fromCol) return

  emit('move-card', cardId, fromCol, toCol)
}
</script>

<style scoped>
.column {
  background: #2a2c34;
  width: 260px;
  min-width: 260px;
  border: 1px solid #3a3c45;
}

.cards-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 40px;
  padding-bottom: 10px;
}
</style>
