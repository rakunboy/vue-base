<template>
  <div class="chat-container d-flex">
    <!-- Sidebar -->
    <ChatSidebar :conversations="conversations" v-model="activeConversationId" />

    <!-- Ventana de chat -->
    <div class="chat-window d-flex flex-column flex-grow-1">
      <ChatHeader :conversation="currentConversation" />

      <ChatMessages :messages="currentConversation?.messages ?? []" class="flex-grow-1" />

      <ChatInput @send="sendMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ChatSidebar from '@/components/common/chat/ChatSidebar.vue'
import ChatHeader from '@/components/common/chat/ChatHeader.vue'
import ChatMessages from '@/components/common/chat/ChatMessages.vue'
import ChatInput from '@/components/common/chat/ChatInput.vue'

const conversations = ref([
  {
    id: 1,
    name: 'Soporte Técnico',
    avatar: 'https://i.pravatar.cc/40?img=12',
    messages: [
      { id: 1, me: false, text: 'Hola, ¿en qué puedo ayudarte?', time: '12:41' },
      { id: 2, me: true, text: 'Tengo un problema con mi cuenta.', time: '12:42' },
    ],
  },
  {
    id: 2,
    name: 'Juan Pérez',
    avatar: 'https://i.pravatar.cc/40?img=31',
    messages: [{ id: 1, me: false, text: '¿Listo para la reunión?', time: '10:10' }],
  },
])

const activeConversationId = ref(1)

const currentConversation = computed(() =>
  conversations.value.find((c) => c.id === activeConversationId.value),
)

function sendMessage(text: string) {
  if (!text.trim()) return
  currentConversation.value?.messages.push({
    id: Date.now(),
    me: true,
    text,
    time: new Date().toLocaleTimeString().slice(0, 5),
  })
}
</script>

<style scoped>
.chat-container {
  height: calc(100vh - 110px);
  background: #1f2026;
  color: #eee;
  overflow: hidden;
}

.chat-window {
  background: #25262c;
}
</style>
