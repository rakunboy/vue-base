<template>
  <div class="p-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Pestañas</h2>

      <button class="btn btn-primary btn-sm" @click="openNewTab">
        <i class="bi bi-plus-lg me-1"></i>
        Nuevo tab
      </button>
    </div>

    <TabsBase
      ref="tabsRef"
      :initial-tabs="initialTabs"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TabsBase, { type TabItem } from '@/components/common/TabsBase.vue'
import DashboardTab from '@/components/tabs/DashboardTab.vue'
import UsersTab from '@/components/tabs/UsersTab.vue'
import TabDynamic from '@/components/tabs/TabDynamic.vue'

const tabsRef = ref<InstanceType<typeof TabsBase> | null>(null)

const counter = ref(1)

const initialTabs: TabItem[] = [
  {
    id: 'home',
    title: 'Inicio',
    component: DashboardTab
  },
  {
    id: 'users',
    title: 'Usuarios',
    component: UsersTab
  }
]

function openNewTab() {
  const id = `dynamic-${counter.value++}`

  tabsRef.value?.addTab({
    id,
    title: `Extra ${counter.value}`,
    component: TabDynamic,
    props: {
      title: `Tab ${counter.value}`
    },
    closable: true
  })
}
</script>
