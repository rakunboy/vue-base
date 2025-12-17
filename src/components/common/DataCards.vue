<template>
  <CardCustom>
    <slot name="header">
      <h5 class="mb-3">{{ title }}</h5>
    </slot>

    <div class="ta-right mb-3">
      <slot name="submenu"></slot>
    </div>

    <div class="row g-3">
      <div
        v-for="row in data.data"
        :key="row.id"
        class="col-12 col-md-6 col-lg-4"
      >
        <div class="card h-100 shadow-sm data-card">
          <div class="card-body">
            <div
              v-for="field in data.fields"
              :key="field.name"
              class="mb-2 d-flex justify-content-between"
              :class="field.class"
            >
              <span class="field-label">
                {{ field.label ?? field.name }}
              </span>

              <span class="field-value">
                {{ formatValue(field, row) }}
              </span>
            </div>
          </div>

          <!-- acciones -->
          <div v-if="$slots.actions" class="card-footer bg-transparent border-0 text-end">
            <slot name="actions" :row="row" />
          </div>
        </div>
      </div>
    </div>
  </CardCustom>
</template>



<script setup lang="ts">
import type { Table, Field, TableData } from '@/types/DataGrid'
import CardCustom from './CardCustom.vue';

defineProps<{
  data: Table,
  title?: string
}>()

function formatValue(field: Field, row: TableData) {
  const value = row[field.name]

  if (field.formatter) {
    return field.formatter(value, row)
  }

  return value ?? '—'
}
</script>

<style scoped>
.data-card {
  background-color: #1f2937; /* oscuro */
  color: #e5e7eb;
  border-radius: 0.75rem;
}

.field-label {
  font-size: 0.85rem;
  opacity: 0.7;
}

.field-value {
  font-weight: 500;
}

</style>
