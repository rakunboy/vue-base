<template>
  <aside class="chat-sidebar p-3">
    <h5 class="text-light mb-3">Chats</h5>

    <div
      v-for="c in conversations"
      :key="c.id"
      class="chat-item d-flex align-items-center gap-2 p-2 rounded-3 mb-2"
      :class="{ active: modelValue === c.id }"
      @click="$emit('update:modelValue', c.id)"
    >
      <img :src="c.avatar" class="rounded-circle" width="40" height="40" />
      <div class="flex-grow-1">
        <div class="fw-semibold">{{ c.name }}</div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  conversations: any[]
  modelValue: number
}>()

defineEmits(['update:modelValue'])
</script>

<style scoped>
.chat-sidebar {
  width: 260px;
  background: #2a2b31;
  border-right: 1px solid #333;
  overflow-y: auto;
}

.chat-item {
  cursor: pointer;
  transition: 0.15s;
  background: #2f3036;
  border: 1px solid #3a3c45;
}

.chat-item:hover {
  background: #3a3b42;
}

.chat-item.active {
  background: #4d4f57;
  border-color: #6b6d77;
}
</style>
