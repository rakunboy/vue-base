<template>
  <div class="dropdown">
    <!-- Imagen -->
    <img
      v-if="image"
      :src="image"
      :style="{ width: 40 + 'px', height: 40 + 'px' }"
      class="rounded-circle border border-primary dropdown-toggle dropdown-trigger"
      role="button"
      data-bs-toggle="dropdown"
    />

    <!-- Icono -->
    <div
      v-else-if="icon"
      class="dropdown-toggle dropdown-trigger d-flex align-items-center justify-content-center"
      role="button"
      data-bs-toggle="dropdown"
    >
      <BootstrapIcon :icon="icon" size="18" />
      <span
        v-if="(count || 0) > 0"
        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
      >
        {{ count }}
      </span>
    </div>

    <!-- Texto -->
    <div v-else class="dropdown-toggle dropdown-trigger" data-bs-toggle="dropdown">
      {{ texto ?? 'Menú' }}
    </div>

    <!-- Contenido -->
    <ul class="dropdown-menu dropdown-menu-end shadow-lg rounded-3 custom-menu">
      <slot />
    </ul>
  </div>
</template>

<script setup lang="ts">
import BootstrapIcon from '@/components/common/BootstrapIcon.vue'

defineProps<{
  image?: string
  icon?: string
  texto?: string
  size?: number
  count?: number
}>()
</script>

<style scoped>
.dropdown-trigger {
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  transition: background 0.15s ease;
}

.dropdown-trigger:hover {
  background-color: rgba(255, 255, 255, 0.08);
}

.custom-menu {
  background-color: #2f3038;
  border: 1px solid #3a3c45;
  min-width: 200px;
}

.custom-menu .dropdown-item {
  color: var(--main-color);
}

.custom-menu .dropdown-item:hover {
  background-color: #3a3c45;
}

.dropdown-divider {
  border-top-color: #45464f;
}
</style>
