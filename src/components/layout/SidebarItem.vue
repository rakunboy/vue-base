<template>
  <div>
    <!-- Item con children -->
    <div
      v-if="hasChildren"
      class="nav-link d-flex align-items-center gap-2 has-children"
      :class="{ open: isOpen }"
      @click="toggleChildren"
      :data-bs-toggle="props.isCollapsed && !props.isMobile ? 'tooltip' : null"
      data-bs-placement="right"
      :title="props.isCollapsed && !props.isMobile ? props.item.titulo : ''"
    >
      <BootstrapIcon :icon="props.item.icon" size="20" />
      <span v-if="!props.isCollapsed || props.isMobile">{{ props.item.titulo }}</span>
      <i class="bi ms-auto" :class="isOpen ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
    </div>

    <!-- Item sin children: navega -->
    <router-link
      v-else
      :to="props.item.route"
      class="nav-link d-flex align-items-center gap-2"
      :data-bs-toggle="props.isCollapsed && !props.isMobile ? 'tooltip' : null"
      data-bs-placement="right"
      :title="props.isCollapsed && !props.isMobile ? props.item.titulo : ''"
      @click="onItemClick"
    >
      <BootstrapIcon :icon="props.item.icon" size="20" />
      <span v-if="!props.isCollapsed || props.isMobile">{{ props.item.titulo }}</span>
    </router-link>

    <!-- Submenú -->
    <transition name="submenu">
      <div v-if="hasChildren && isOpen" class="submenu ps-3">
        <SidebarItem
          v-for="child in props.item.children"
          :key="child.titulo"
          :item="child"
          :is-collapsed="props.isCollapsed"
          :is-mobile="props.isMobile"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import BootstrapIcon from '../common/BootstrapIcon.vue'

const props = defineProps<{
  item: any
  isCollapsed: boolean
  isMobile: boolean
}>()

const isOpen = ref(false)
const hasChildren = computed(() => !!props.item.children?.length)

function toggleChildren() {
  if (hasChildren.value) isOpen.value = !isOpen.value
}

function onItemClick() {
  if (props.isMobile) {
    // opcional: cerrar sidebar móvil
  }
  nextTick(() => {
    // bootstrap tooltip update
    if (props.isCollapsed && !props.isMobile) {
      document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
        new (window as any).bootstrap.Tooltip(el)
      })
    }
  })
}
</script>

<style scoped>
.nav-link.has-children, .nav-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 10px 12px;
  border-radius: 8px;
  transition: background 0.2s ease, color 0.2s ease;
  background-color: transparent;
  color: #e5e5e5;
  text-decoration: none;
}

/* Hover */
.nav-link:hover {
  background-color: #3a3c45;
  color: #ffffff;
}

/* Reset focus / active */
.nav-link:focus,
.nav-link:active {
  color: #ffffff;
  background-color: #3a3c45;
  outline: none;
  box-shadow: none;
}

/* Íconos y textos dentro de nav-link */
.nav-link > span,
.nav-link > i {
  color: inherit;
  transition: color 0.2s ease;
}

/* Submenú */
.submenu {
  display: flex;
  flex-direction: column;
  padding-left: 8px;
}

/* Animación submenú */
.submenu-enter-active, .submenu-leave-active {
  transition: all 0.2s ease;
}
.submenu-enter-from, .submenu-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
.submenu-enter-to, .submenu-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>


