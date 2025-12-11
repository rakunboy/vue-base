<template>
  <div class="p-4 w-100">
    <h2 class="mb-4">Plantilla de Tablas</h2>

    <DataGrid :data="demo" title="Tabla de ejemplo">
      <template #submenu>
        <button class="btn btn-primary btn-sm me-2" @click="add()">Agregar</button>
      </template>
      <template #actions="{ row }">
        <button class="btn btn-primary btn-sm me-2" @click="edit(row)">Editar</button>
        <button class="btn btn-danger btn-sm" @click="deleteRow(row)">Eliminar</button>
      </template>
    </DataGrid>
    <DataGrid :data="demo2" />
  </div>
</template>

<script setup lang="ts">
import DataGrid from '@/components/common/DataGrid.vue'
import type { Table, TableData } from '@/types/DataGrid'

const demo: Table = {
  fields: [
    { name: 'id', label: 'ID' },
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
  ],
  data: [
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
    { id: 2, name: 'Ana López', email: 'ana@example.com' },
    { id: 3, name: 'Luis Soto', email: 'luis@example.com' },
  ],
}

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

const add = () => {
  console.log('add')
}
const edit = (row: TableData) => {
  console.log(row)
}
const deleteRow = (row: TableData) => {
  console.log(row)
}
</script>
