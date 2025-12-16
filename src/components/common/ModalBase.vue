<template>
  <div
    class="modal fade"
    tabindex="-1"
    ref="modalRef"
    aria-hidden="true"
  >
    <div class="modal-dialog" :class="sizeClass">
      <div class="modal-content bg-dark text-light">
        <!-- Header -->
        <div class="modal-header border-secondary">
          <h5 class="modal-title">
            <slot name="title" />
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            @click="close"
          ></button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <slot />
        </div>

        <!-- Footer -->
        <div class="modal-footer border-secondary">
          <slot name="footer">
            <button class="btn btn-secondary" @click="close">
              Cerrar
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { Modal } from 'bootstrap'

const props = defineProps<{
  size?: 'sm' | 'lg' | 'xl'
}>()

const modalRef = ref<HTMLElement | null>(null)
// let modalInstance: Modal | null = null
let modalInstance: InstanceType<typeof Modal> | null = null

const sizeClass = computed(() => {
  if (props.size === 'sm') return 'modal-sm'
  if (props.size === 'lg') return 'modal-lg'
  if (props.size === 'xl') return 'modal-xl'
  return ''
})

onMounted(() => {
  if (modalRef.value) {
    modalInstance = new Modal(modalRef.value)
  }
})

onBeforeUnmount(() => {
  modalInstance?.dispose()
})

function open() {
  modalInstance?.show()
}

function close() {
  modalInstance?.hide()
}

defineExpose({
  open,
  close
})
</script>
