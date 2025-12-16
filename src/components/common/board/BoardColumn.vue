<template>
  <div class="column p-3 rounded-3">
    <h6 class="fw-bold mb-3">{{ column.title }}</h6>

    <div
      class="cards-wrapper"
      ref="wrapper"
      @dragenter="onDragEnter"
      @dragleave="onDragLeave"
      @dragover.prevent="onDragOver"
      @drop="onDrop"
    >
      <template v-for="(card, index) in column.cards" :key="card.id">
        <!-- Placeholder antes -->
        <div v-if="isOver && placeholderIndex === index" class="drop-placeholder" />

        <BoardCard :card="card" :column-id="column.id" :index="index" />
      </template>

      <!-- Placeholder final -->
      <div v-if="isOver && placeholderIndex === column.cards.length" class="drop-placeholder" />
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

/* ============================
   Props / Emits
============================ */
const props = defineProps<{
  column: {
    id: number
    title: string
    cards: any[]
  }
}>()

const emit = defineEmits<{
  (
    e: 'move-card',
    payload: {
      fromCol: number
      toCol: number
      fromIndex: number
      toIndex: number
    },
  ): void
  (e: 'add-card', columnId: number, text: string): void
}>()

/* ============================
   State
============================ */
const newText = ref('')
const wrapper = ref<HTMLElement | null>(null)

const placeholderIndex = ref<number | null>(null)

/* 🔑 control REAL de hover */
const isOver = ref(false)
const dragDepth = ref(0)

/* ============================
   Add card
============================ */
function add() {
  if (!newText.value.trim()) return
  emit('add-card', props.column.id, newText.value)
  newText.value = ''
}

/* ============================
   Drag enter / leave (CLAVE)
============================ */
function onDragEnter() {
  dragDepth.value++
  isOver.value = true
}

function onDragLeave() {
  dragDepth.value--

  if (dragDepth.value <= 0) {
    isOver.value = false
    placeholderIndex.value = null
    dragDepth.value = 0
  }
}

/* ============================
   Drag over
============================ */
function onDragOver(e: DragEvent) {
  if (!wrapper.value || !isOver.value) return

  const cards = Array.from(wrapper.value.querySelectorAll('.card-item')) as HTMLElement[]

  /* columna vacía */
  if (cards.length === 0) {
    placeholderIndex.value = 0
    return
  }

  const mouseY = e.clientY

  let index = cards.findIndex((el) => {
    const rect = el.getBoundingClientRect()
    return mouseY < rect.top + rect.height / 2
  })

  if (index === -1) index = cards.length

  placeholderIndex.value = index
}

/* ============================
   Drop
============================ */
function onDrop(e: DragEvent) {
  if (!e.dataTransfer || placeholderIndex.value === null) return

  emit('move-card', {
    fromCol: Number(e.dataTransfer.getData('fromColumnId')),
    toCol: props.column.id,
    fromIndex: Number(e.dataTransfer.getData('fromIndex')),
    toIndex: placeholderIndex.value,
  })

  /* reset total */
  placeholderIndex.value = null
  isOver.value = false
  dragDepth.value = 0
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

.drop-placeholder {
  height: 48px;
  border-radius: 8px;
  background: rgba(13, 110, 253, 0.25);
  border: 2px dashed #0d6efd;
}
</style>
