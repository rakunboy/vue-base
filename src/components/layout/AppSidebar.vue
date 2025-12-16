<template>
  <aside :class="sidebarClasses">
    <!-- Header -->
    <div class="sidebar-header d-flex align-items-center justify-content-between px-3 py-3">
      <h3 v-if="!isCollapsed && !isMobile" class="text-primary fw-bold mb-0">MiApp</h3>

      <!-- Toggle desktop -->
      <button
        v-if="!isMobile"
        class="btn btn-sm btn-outline-secondary ms-auto"
        @click="toggleCollapse"
      >
        <i class="bi bi-layout-sidebar"></i>
      </button>

      <!-- Toggle mobile -->
      <button
        v-if="isMobile"
        class="btn btn-sm btn-outline-secondary ms-auto"
        @click="toggleMobile"
      >
        <i class="bi bi-list"></i>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="nav flex-column gap-1 px-2" role="navigation">
      <SidebarItem
        v-for="item in menuStore.sidebarMenu"
        :key="item.titulo"
        :item="item"
        :is-collapsed="isCollapsed"
        :is-mobile="isMobile"
      />
    </nav>
  </aside>

  <!-- Overlay SOLO en móvil cuando está abierto -->
  <div
    v-if="isMobile && isOpen"
    class="sidebar-overlay"
    @click="closeMobile"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMenuStore } from '@/stores/menuStore'
import SidebarItem from './SidebarItem.vue'

const menuStore = useMenuStore()

const isMobile = ref(false)
const isOpen = ref(false)
const isCollapsed = ref(false)

const STORAGE_KEY = 'sidebar-collapsed'

/* ---------- Responsive ---------- */
const handleResize = () => {
  isMobile.value = window.innerWidth < 768
  if (!isMobile.value) {
    isOpen.value = false
    isCollapsed.value = localStorage.getItem(STORAGE_KEY) === 'true'
  }
}

/* ---------- Desktop ---------- */
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
  localStorage.setItem(STORAGE_KEY, String(isCollapsed.value))
}

/* ---------- Mobile ---------- */
const toggleMobile = () => {
  isOpen.value = !isOpen.value
}
const closeMobile = () => { isOpen.value = false }

/* ---------- Classes ---------- */
const sidebarClasses = computed(() => ({
  sidebar: true,
  'sidebar-expanded': !isCollapsed.value && !isMobile.value,
  'sidebar-collapsed': isCollapsed.value && !isMobile.value,
  'sidebar-mobile': isMobile.value,
  'sidebar-mobile-open': isMobile.value && isOpen.value,
}))

/* ---------- Lifecycle ---------- */
onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})
</script>

<style scoped>
.sidebar {
  background-color: #2a2c34;
  border-right: 1px solid #3a3c45;
  min-height: 100vh;
  transition: width 0.25s ease, transform 0.25s ease;
}

.sidebar-expanded { width: 240px; }
.sidebar-collapsed { width: 70px; }
.sidebar-mobile {
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  transform: translateX(-100%);
  z-index: 1040;
}
.sidebar-mobile-open { transform: translateX(0); }

/* Overlay */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 1030;
}

/* Header */
.sidebar-header { border-bottom: 1px solid #3a3c45; }

/* Links */
.nav-link {
  color: #aeb2b8;
  padding: 10px 12px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}
.nav-link:hover { background-color: #3a3c45; color: var(--main-color); }

/* Activo */
:deep(.router-link-exact-active) {
  background-color: #3a3c45;
  color: #ffffff;
}
</style>
