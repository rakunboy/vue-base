<template>
  <header class="chat-header d-flex align-items-center gap-3 px-3">
    <img
      v-if="conversation"
      :src="conversation.avatar"
      class="rounded-circle"
      width="40"
      height="40"
    />
    <h6 class="mb-0">{{ conversation?.name ?? 'Selecciona un chat' }}</h6>
  </header>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-explicit-any
defineProps<{ conversation: any | null }>()
</script>

<style scoped>
.chat-header {
  height: 60px;
  background: #2f3036;
  border-bottom: 1px solid #3a3c45;
  color: #e3e3e8;
}
</style>
