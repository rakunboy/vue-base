<template>
  <div>
    <!-- Si tiene children, clic para desplegar -->
    <div
      v-if="hasChildren"
      class="nav-link d-flex align-items-center gap-2 has-children"
      :class="{ open: isOpen }"
      @click="toggleChildren"
      :title="props.isCollapsed && !props.isMobile ? props.item.titulo : ''"
    >
      <BootstrapIcon :icon="props.item.icon" size="20" />
      <span v-if="!props.isCollapsed || props.isMobile">{{ props.item.titulo }}</span>
      <i class="bi ms-auto" :class="isOpen ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
    </div>

    <!-- Si no tiene children, usar router-link -->
    <router-link
      v-else
      :to="props.item.route"
      class="nav-link d-flex align-items-center gap-2"
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BootstrapIcon from '../common/BootstrapIcon.vue'

const props = defineProps<{
  item: any
  isCollapsed: boolean
  isMobile: boolean
}>()

const isOpen = ref(false)
const hasChildren = computed(() => !!props.item.children?.length)

const router = useRouter()

function toggleChildren() {
  if (hasChildren.value) isOpen.value = !isOpen.value
}

function onItemClick() {
  if (props.isMobile) {
    // Opcional: cerrar sidebar en móvil
  }
}
</script>

<style scoped>
.nav-link.has-children { cursor: pointer; }
.submenu { display: flex; flex-direction: column; }

/* Animación */
.submenu-enter-active,
.submenu-leave-active { transition: all 0.2s ease; }
.submenu-enter-from,
.submenu-leave-to { opacity: 0; transform: translateY(-5px); }
.submenu-enter-to,
.submenu-leave-from { opacity: 1; transform: translateY(0); }

.nav-link {
  color: #aeb2b8;
  padding: 10px 12px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}
.nav-link:hover { background-color: #3a3c45; color: var(--main-color); }
</style>
