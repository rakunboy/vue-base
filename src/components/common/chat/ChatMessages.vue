<template>
  <div ref="box" class="messages-box p-3">
    <ChatMessage v-for="m in messages" :key="m.id" :me="m.me" :text="m.text" :time="m.time" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import ChatMessage from './ChatMessage.vue'

const props = defineProps<{ messages: any[] }>()

const box = ref<HTMLElement>()

watch(
  () => props.messages.length,
  () => nextTick(() => box.value?.scrollTo(0, box.value.scrollHeight)),
)
</script>

<style scoped>
.messages-box {
  overflow-y: auto;
}
</style>
