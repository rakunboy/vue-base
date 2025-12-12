<template>
  <div class="card-item p-3 rounded-3" draggable="true" @dragstart="dragStart">
    {{ card.text }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  card: any
  columnId: number
}>()

function dragStart(e: DragEvent) {
  if (!e.dataTransfer) return

  e.dataTransfer.setData('cardId', String(props.card.id))
  e.dataTransfer.setData('columnId', String(props.columnId))

  e.dataTransfer.effectAllowed = 'move'
}
</script>

<style scoped>
.card-item {
  background: #34353b;
  border: 1px solid #474850;
  cursor: grab;
  color: #eee;
  transition: 0.2s;
}

.card-item:active {
  cursor: grabbing;
}

.card-item:hover {
  background: #3d3e45;
}
</style>
