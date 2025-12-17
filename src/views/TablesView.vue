<template>
  <div class="p-4 w-100">
    <h2 class="mb-4">Plantilla de Tablas</h2>

    <DataGrid :data="demo" title="Tabla de ejemplo">
      <template #submenu>
        <button class="btn btn-primary btn-sm me-2" @click="add()">
          <BootstrapIcon icon="plus-circle" size="20" />
        </button>
      </template>
      <template #actions="{ row }">
        <button class="btn btn-primary btn-sm me-2" @click="edit(row)">
          <BootstrapIcon icon="pencil-square" size="20" />
        </button>
        <button class="btn btn-danger btn-sm" @click="deleteRow(row)">
          <BootstrapIcon icon="trash3" size="20" />
        </button>
      </template>
    </DataGrid>
    <DataGrid :data="demo2" />

    <DataCards :data="demo">
      <template #actions="{ row }">
        <button class="btn btn-primary btn-sm me-2" @click="edit(row)">
            <BootstrapIcon icon="pencil-square" size="20" />
          </button>
          <button class="btn btn-danger btn-sm" @click="deleteRow(row)">
            <BootstrapIcon icon="trash3" size="20" />
          </button>
      </template>
    </DataCards>

    <DataCards :data="demo2">
      <template #actions="{ row }">
        <button class="btn btn-primary btn-sm me-2" @click="edit(row)">
            <BootstrapIcon icon="pencil-square" size="20" />
          </button>
          <button class="btn btn-danger btn-sm" @click="deleteRow(row)">
            <BootstrapIcon icon="trash3" size="20" />
          </button>
      </template>
    </DataCards>
  </div>
</template>

<script setup lang="ts">
import DataGrid from '@/components/common/DataGrid.vue'
import type { Table, TableData } from '@/types/DataGrid'
import BootstrapIcon from '@/components/common/BootstrapIcon.vue'
import DataCards from '@/components/common/DataCards.vue'
import { computed, onMounted } from 'vue'
import { useDemoStore } from '@/stores/demo.store'

const store = useDemoStore()

onMounted(() => {
  store.fetch()
})

const demo = computed<Table>(() => ({
  fields: [
    { name: 'id', label: 'ID' },
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
  ],
  data: store.items,
}))

// const demo: Table = {
//   fields: [
//     { name: 'id', label: 'ID' },
//     { name: 'name', label: 'Name' },
//     { name: 'email', label: 'Email' },
//   ],
//   data: [
//     { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
//     { id: 2, name: 'Ana López', email: 'ana@example.com' },
//     { id: 3, name: 'Luis Soto', email: 'luis@example.com' },
//   ],
// }

const demo2: Table = {
  fields: [
    { name: 'name', label: 'name' },
    { name: 'email', label: 'email' },
  ],
  data: [
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
    { id: 2, name: 'Ana López', email: 'ana@example.com' },
    { id: 2, name: 'Ana López', email: 'ana@example.com' },
    { id: 3, name: 'Luis Soto', email: 'luis@example.com' },
    { id: 3, name: 'Luis Soto', email: 'luis@example.com' },
  ],
}

const add = () => store.add({
  id: 0,
  name: 'asdasd',
  email: 'asdasd',
})
const edit = (row: TableData) => {
  console.log('editar', row)
}
const deleteRow = (row: TableData) => {
  store.remove(row.id)
}
</script>
