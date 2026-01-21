<template>
  <div>
    <!-- Sidebar -->
    <aside ref="sidebarRef" :class="sidebarClasses">
      <!-- Header -->
      <div class="sidebar-header d-flex align-items-center justify-content-between px-3 py-3">
        <h3 class="text-primary fw-bold mb-0" v-show="!isCollapsed || isMobile">
          MiApp
        </h3>

        <!-- Desktop collapse -->
        <button
          v-if="!isMobile"
          class="btn btn-sm btn-outline-secondary"
          @click="toggleCollapse"
          aria-label="Colapsar menú"
        >
          <i class="bi" :class="isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'"></i>
        </button>
      </div>

      <!-- Scrollable content -->
      <div class="sidebar-content">
        <nav class="nav flex-column gap-1 px-2" role="navigation">
          <SidebarItem
            v-for="item in menuStore.sidebarMenu"
            :key="item.titulo"
            :item="item"
            :is-collapsed="isCollapsed"
            :is-mobile="isMobile"
            @navigate="closeMobile"
          />
        </nav>
      </div>
    </aside>

    <!-- Mobile hamburger -->
    <button
      v-if="isMobile && !isOpen"
      class="mobile-hamburger btn btn-primary"
      @click="toggleMobile"
      aria-label="Abrir menú"
    >
      <i class="bi bi-list"></i>
    </button>

    <!-- Overlay -->
    <div
      v-if="isMobile && isOpen"
      class="sidebar-overlay"
      @click="closeMobile"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { gsap } from 'gsap'
import { useMenuStore } from '@/stores/menuStore'
import SidebarItem from './SidebarItem.vue'

const menuStore = useMenuStore()

const sidebarRef = ref<HTMLElement | null>(null)

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
const toggleCollapse = async () => {
  isCollapsed.value = !isCollapsed.value
  localStorage.setItem(STORAGE_KEY, String(isCollapsed.value))
  await nextTick()
  animateCollapse()
}

/* ---------- Mobile ---------- */
const toggleMobile = async () => {
  isOpen.value = !isOpen.value
  await nextTick()
  animateMobile()
}

const closeMobile = async () => {
  isOpen.value = false
  await nextTick()
  animateMobile()
}

/* ---------- Animations ---------- */
const animateCollapse = () => {
  if (!sidebarRef.value || isMobile.value) return

  gsap.to(sidebarRef.value, {
    width: isCollapsed.value ? 70 : 240,
    duration: 0.25,
    ease: 'power3.inOut',
  })
}

const animateMobile = () => {
  if (!sidebarRef.value || !isMobile.value) return

  gsap.to(sidebarRef.value, {
    x: isOpen.value ? 0 : '-100%',
    duration: 0.3,
    ease: 'power3.out',
  })
}

/* ---------- Classes ---------- */
const sidebarClasses = computed(() => ({
  sidebar: true,
  'sidebar-mobile': isMobile.value,
}))

/* ---------- Lifecycle ---------- */
onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)

  if (sidebarRef.value) {
    gsap.set(sidebarRef.value, {
      width: isMobile.value ? 240 : isCollapsed.value ? 70 : 240,
      x: isMobile.value ? '-100%' : 0,
    })
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

/* ---------- Sync on breakpoint ---------- */
watch(isMobile, () => {
  if (!sidebarRef.value) return

  gsap.set(sidebarRef.value, {
    width: isMobile.value ? 240 : isCollapsed.value ? 70 : 240,
    x: isMobile.value ? '-100%' : 0,
  })
})
</script>

<style scoped>
.sidebar {
  background-color: #2a2c34;
  border-right: 1px solid #3a3c45;
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: 240px; /* default */
}

/* Mobile */
.sidebar-mobile {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
}

/* Header */
.sidebar-header {
  border-bottom: 1px solid #3a3c45;
  flex-shrink: 0;
}

/* Scrollable content */
.sidebar-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 1rem;
}

/* Scrollbar */
.sidebar-content::-webkit-scrollbar {
  width: 6px;
}
.sidebar-content::-webkit-scrollbar-thumb {
  background-color: #3a3c45;
  border-radius: 4px;
}

/* Overlay */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 1030;
}

/* Mobile hamburger */
.mobile-hamburger {
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 1050;
  border-radius: 8px;
}
</style>
