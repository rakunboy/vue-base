<template>
  <div class="sidebar-item">
    <!-- Item con children -->
    <div
      v-if="hasChildren"
      class="nav-link d-flex align-items-center gap-2 has-children"
      :class="{ open: isOpen }"
      @click="toggleChildren"
      :data-bs-toggle="isCollapsed && !isMobile ? 'tooltip' : null"
      data-bs-placement="right"
      :title="isCollapsed && !isMobile ? item.titulo : ''"
    >
      <BootstrapIcon :icon="item.icon" size="20" />

      <!-- TEXTO (NO v-if) -->
      <span
        ref="textRef"
        class="item-text"
        v-show="!isMobile"
      >
        {{ item.titulo }}
      </span>

      <i
        ref="chevronRef"
        class="bi ms-auto"
        :class="isOpen ? 'bi-chevron-down' : 'bi-chevron-right'"
      />
    </div>

    <!-- Item sin children -->
    <router-link
      v-else
      :to="item.route"
      class="nav-link d-flex align-items-center gap-2"
      @click="emit('navigate')"
      :data-bs-toggle="isCollapsed && !isMobile ? 'tooltip' : null"
      data-bs-placement="right"
      :title="isCollapsed && !isMobile ? item.titulo : ''"
    >
      <BootstrapIcon :icon="item.icon" size="20" />

      <!-- TEXTO (NO v-if) -->
      <span
        ref="textRef"
        class="item-text"
        v-show="!isMobile"
      >
        {{ item.titulo }}
      </span>
    </router-link>

    <!-- Submenu -->
    <div ref="submenuRef" v-show="hasChildren && isOpen" class="submenu ps-3">
      <SidebarItem
        v-for="child in item.children"
        :key="child.titulo"
        :item="child"
        :is-collapsed="isCollapsed"
        :is-mobile="isMobile"
        @navigate="emit('navigate')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { gsap } from 'gsap'
import BootstrapIcon from '../common/BootstrapIcon.vue'

const props = defineProps<{
  item: any
  isCollapsed?: boolean
  isMobile?: boolean
}>()

const emit = defineEmits<{
  (e: 'navigate'): void
}>()

const isOpen = ref(false)

const textRef = ref<HTMLElement | null>(null)
const chevronRef = ref<HTMLElement | null>(null)
const submenuRef = ref<HTMLElement | null>(null)

const hasChildren = computed(() => !!props.item.children?.length)

//
// ─────────────────────────────────────────────
// 🔥 GSAP: ANIMACIÓN REAL DE COLAPSO
// ─────────────────────────────────────────────
//
watch(
  () => props.isCollapsed,
  async (collapsed) => {
    await nextTick()

    /* TEXTO */
    if (textRef.value) {
      gsap.to(textRef.value, {
        opacity: collapsed ? 0 : 1,
        width: collapsed ? 0 : 'auto',
        x: collapsed ? -8 : 0,
        duration: 0.25,
        ease: 'power2.out',
      })
    }

    /* CHEVRON */
    if (chevronRef.value) {
      gsap.to(chevronRef.value, {
        opacity: collapsed ? 0 : 1,
        duration: 0.15,
      })
    }

    /* SUBMENÚ → cerrar si se colapsa */
    if (collapsed && isOpen.value && submenuRef.value) {
      gsap.to(submenuRef.value, {
        height: 0,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => (isOpen.value = false),
      })
    }
  },
  { immediate: true }
)

//
// ─────────────────────────────────────────────
// Submenús
// ─────────────────────────────────────────────
//
const toggleChildren = async () => {
  if (!hasChildren.value || props.isCollapsed) return

  isOpen.value = !isOpen.value
  await nextTick()

  if (!submenuRef.value) return

  if (isOpen.value) {
    gsap.fromTo(
      submenuRef.value,
      { height: 0, opacity: 0 },
      { height: 'auto', opacity: 1, duration: 0.25, ease: 'power2.out' }
    )
  } else {
    gsap.to(submenuRef.value, {
      height: 0,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
    })
  }
}
</script>

<style scoped>
.sidebar-item {
  width: 100%;
}

.nav-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 8px;
  background-color: transparent;
  color: #e5e5e5;
  text-decoration: none;
  overflow: hidden;
}

.item-text {
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
}

.has-children.open {
  background-color: #343640;
}

/* Submenu */
.submenu {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-left: 8px;
}
</style>
