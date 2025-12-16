<template>
  <div :class="containerClass">
    <transition-group
      name="fab"
      tag="div"
      class="fab-actions"
    >
      <button
        v-for="(action, index) in open ? actions : []"
        :key="action.label"
        class="btn btn-dark fab-action"
        :style="{ transitionDelay: `${index * 40}ms` }"
        @click="onAction(action)"
      >
        <i :class="action.icon"></i>
        <span v-if="showLabels" class="ms-2">{{ action.label }}</span>
      </button>
    </transition-group>

    <button
      class="btn btn-primary fab-main"
      @click.stop="toggle"
    >
      <i :class="open ? closeIcon : mainIcon"></i>
    </button>
  </div>
</template>


<script setup lang="ts">
import { computed, ref } from 'vue'

export interface FabAction {
  label: string
  icon: string
  onClick: () => void
}

const props = withDefaults(defineProps<{
  actions?: FabAction[]
  mainIcon?: string
  closeIcon?: string
  position?: 'bottom-right' | 'bottom-left'
  showLabels?: boolean
}>(), {
  actions: () => [],
  mainIcon: 'bi bi-plus-lg',
  closeIcon: 'bi bi-x-lg',
  position: 'bottom-right',
  showLabels: true
})

const open = ref(false)

const containerClass = computed(() => [
  'fab-container',
  props.position
])

function toggle() {
  if (props.actions.length <= 1) {
    props.actions[0]?.onClick()
    return
  }
  open.value = !open.value
}

function onAction(action: FabAction) {
  action.onClick()
  open.value = false
}
</script>

<style scoped>
/* Contenedor fijo */
.fab-container {
  position: fixed;
  bottom: 24px;
  z-index: 1050;
}

/* Posición */
.fab-container.bottom-right {
  right: 24px;
}

.fab-container.bottom-left {
  left: 24px;
}

/* Botón principal (NO SE MUEVE) */
.fab-main {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  font-size: 1.25rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
}

/* Acciones flotantes */
.fab-actions {
  position: absolute;
  bottom: 72px; /* separación desde el FAB */
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

/* Botón de acción */
.fab-action {
  margin-bottom: 0.5rem;
  border-radius: 999px;
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;
  white-space: nowrap;
}

:deep(.fab-enter-active),
:deep(.fab-leave-active) {
  transition: all 0.25s ease;
}

:deep(.fab-enter-from),
:deep(.fab-leave-to) {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}

:deep(.fab-enter-to),
:deep(.fab-leave-from) {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.fab-actions {
  pointer-events: none;
}

.fab-actions > * {
  pointer-events: auto;
}


</style>
