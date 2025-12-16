<template>
  <div class="card-item p-3 rounded-3" draggable="true" @dragstart="dragStart" @dragend="dragEnd">
    {{ card.text }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  card: any
  columnId: number
  index: number
}>()

function dragStart(e: DragEvent) {
  if (!e.dataTransfer) return

  e.dataTransfer.setData('fromColumnId', String(props.columnId))
  e.dataTransfer.setData('fromIndex', String(props.index))
  e.dataTransfer.effectAllowed = 'move'
}

function dragEnd() {
  // Limpieza global de placeholders
  window.dispatchEvent(new Event('dragend-global'))
}
</script>

<style scoped>
.card-item {
  background: #34353b;
  border: 1px solid #474850;
  cursor: grab;
  color: #eee;
  transition: background 0.15s ease;
}

.card-item:active {
  cursor: grabbing;
}

.card-item:hover {
  background: #3d3e45;
}
</style>
