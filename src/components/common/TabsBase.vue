<template>
  <div>
    <!-- Tabs header -->
    <ul class="nav nav-tabs custom-tabs">
      <li
        v-for="tab in tabs"
        :key="tab.id"
        class="nav-item"
      >
        <button
          class="nav-link d-flex align-items-center gap-2"
          :class="{ active: tab.id === activeTab }"
          @click="setActive(tab.id)"
        >
          {{ tab.title }}

          <i
            v-if="tab.closable"
            class="bi bi-x-lg tab-close"
            @click.stop="closeTab(tab.id)"
          ></i>
        </button>
      </li>
    </ul>

    <!-- Content -->
    <div class="tab-content p-3 bg-dark text-light rounded-bottom">
      <component
        :is="currentTab?.component"
        v-bind="currentTab?.props"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

export interface TabItem {
  id: string
  title: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<string, any>
  closable?: boolean
}

const props = defineProps<{
  initialTabs: TabItem[]
}>()

const tabs = ref<TabItem[]>([...props.initialTabs])
const activeTab = ref(tabs.value[0]?.id)

const currentTab = computed(() =>
  tabs.value.find(t => t.id === activeTab.value)
)

function setActive(id: string) {
  activeTab.value = id
}

function addTab(tab: TabItem) {
  if (!tabs.value.find(t => t.id === tab.id)) {
    tabs.value.push(tab)
    activeTab.value = tab.id
  }
}

function closeTab(id: string) {
  const index = tabs.value.findIndex(t => t.id === id)
  if (index === -1) return

  tabs.value.splice(index, 1)

  if (activeTab.value === id) {
    activeTab.value = tabs.value[index - 1]?.id || tabs.value[0]?.id
  }
}

defineExpose({
  addTab,
  closeTab
})
</script>

<style scoped>
.custom-tabs .nav-link {
  color: #adb5bd;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
}

.custom-tabs .nav-link:hover {
  color: #dee2e6;
}

.custom-tabs .nav-link.active {
  color: #fff;
  border-bottom-color: #0d6efd;
  background: transparent;
}

.tab-close {
  font-size: 0.7rem;
  opacity: 0.7;
  cursor: pointer;
}

.tab-close:hover {
  opacity: 1;
}
</style>
