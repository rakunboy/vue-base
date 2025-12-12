<template>
  <div class="chat-input d-flex p-3 gap-2">
    <input
      v-model="msg"
      @keyup.enter="emitMessage"
      class="form-control bg-dark text-light border-secondary"
      placeholder="Escribe un mensaje..."
    />
    <button class="btn btn-primary px-4" @click="emitMessage">Enviar</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('')
const emit = defineEmits(['send'])

function emitMessage() {
  if (!msg.value.trim()) return
  emit('send', msg.value)
  msg.value = ''
}
</script>

<style scoped>
.chat-input {
  background: #2f3036;
  border-top: 1px solid #3a3c45;
}
</style>
