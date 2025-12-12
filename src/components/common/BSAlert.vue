<template>
  <div
    :class="['alert', `alert-${type}`, closable ? 'alert-dismissible fade show' : '']"
    role="alert"
  >
    <slot />
    <button
      v-if="closable"
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
  closable?: boolean
}>()
</script>

<style scoped>
.custom-card {
  background-color: #2a2c34;
  color: #e3e4e8;
  border: 1px solid #3a3c45;
  border-radius: 12px;
}
</style>
