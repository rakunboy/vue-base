<template>
  <div class="message-wrapper" :class="{ me }">
    <div class="message p-2 rounded-3">
      <span>{{ text }}</span>
      <small class="time ms-2">{{ time }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  me: boolean
  text: string
  time: string
}>()
</script>

<style scoped>
.message-wrapper {
  display: flex;
  margin-bottom: 10px;
}

.message-wrapper.me {
  justify-content: flex-end;
}

.message {
  background: #34353b;
  border: 1px solid #444;
  max-width: 70%;
  white-space: pre-wrap;
}

.message-wrapper.me .message {
  background: #4466ee;
  border-color: #5577ff;
}

.time {
  opacity: 0.6;
  font-size: 0.7rem;
}
</style>
