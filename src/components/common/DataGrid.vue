<template>
  <CardCustom>
    <!-- Header opcional vía slot -->
    <slot name="header">
      <h5 class="mb-3">{{ title }}</h5>
    </slot>

    <div class="ta-right mb-3">
      <slot name="submenu"></slot>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary"></div>
      <p class="mt-3">Cargando...</p>
    </div>
    <table v-else class="table table-dark table-hover align-middle">
      <thead>
        <tr>
          <th
            v-for="field in props.data.fields"
            :key="field.name"
            :class="field.class"
            :style="{ width: field.width }"
          >
            {{ field.label ?? field.name }}
          </th>

          <!-- Acciones (si el padre define un slot) -->
          <th v-if="$slots.actions" class="text-end"></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, index) in props.data.data" :key="row.id ?? index">
          <td v-for="field in props.data.fields" :key="field.name">
            <!-- 1) Si hay formatter lo usamos -->
            <span v-if="field.formatter">
              {{ field.formatter(row[field.name], row) }}
            </span>

            <!-- 2) Slot personalizado -->
            <slot :name="`cell-${field.name}`" :value="row[field.name]" :row="row">
              {{ row[field.name] }}
            </slot>
          </td>

          <!-- Slot para acciones -->
          <td v-if="$slots.actions" class="text-end">
            <slot name="actions" :row="row"></slot>
          </td>
        </tr>
      </tbody>
    </table>
  </CardCustom>
</template>

<script setup lang="ts">
import type { Table } from '@/types/DataGrid'
import CardCustom from './CardCustom.vue'

const props = defineProps<{
  data: Table
  title?: string,
  loading: boolean
}>()
</script>

<style scoped>
.ta-right {
  text-align: right;
}
</style>
