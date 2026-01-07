<template>
  <div class="p-4 w-100">
    <h2 class="mb-4">Plantilla de Tablas</h2>

    <DataGrid :data="demo" title="Tabla de ejemplo">
      <template #submenu>
        <button class="btn btn-primary btn-sm me-2" @click="loadData()">
          <BootstrapIcon icon="arrow-clockwise" size="20" />
        </button>
        <button class="btn btn-primary btn-sm me-2" @click="openForm()">
          <BootstrapIcon icon="plus-circle" size="20" />
        </button>
      </template>
      <template #actions="{ row }">
        <button class="btn btn-primary btn-sm me-2" @click="openForm(row)">
          <BootstrapIcon icon="pencil-square" size="20" />
        </button>
        <button class="btn btn-danger btn-sm" @click="deleteRow(row)">
          <BootstrapIcon icon="trash3" size="20" />
        </button>
      </template>
    </DataGrid>
    <!-- Loading -->
    <div v-if="store.loading" class="text-center py-5">
      <div class="spinner-border text-primary"></div>
      <p class="mt-3">Cargando...</p>
    </div>

    <!-- Error -->
    <div
      v-if="store.error"
      class="alert alert-danger bg-danger text-light border border-danger mt-3"
    >
      {{ store.error }}
    </div>

    <DataCards :data="demo">
      <template #submenu>
        <button class="btn btn-primary btn-sm me-2" @click="loadData()">
          <BootstrapIcon icon="arrow-clockwise" size="20" />
        </button>
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
    </DataCards>
  </div>
  <ModalBase ref="formModal" size="lg">
      <template #title>Nuevo usuario</template>

      <form class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Nombre</label>
          <input type="text" class="form-control" v-model="formData.name" />
        </div>
      </form>

      <template #footer>
        <button class="btn btn-secondary" @click="closeForm">
          Cancelar
        </button>
        <button class="btn btn-success" @click="saveData">
          Guardar
        </button>
      </template>
    </ModalBase>
</template>

<script setup lang="ts">
import DataGrid from '@/components/common/DataGrid.vue'
import type { Table, TableData } from '@/types/DataGrid'
import BootstrapIcon from '@/components/common/BootstrapIcon.vue'
import DataCards from '@/components/common/DataCards.vue'
import { computed, onMounted, ref } from 'vue'
import { useDemoDataStore, type DemoRow } from '@/stores/demoData.store'
import ModalBase from '@/components/common/ModalBase.vue'
import { useToast } from '@/plugins/toast-plugin'

const store = useDemoDataStore()
const toast = useToast();

onMounted(() => {
  loadData()
})

const demo = computed<Table>(() => ({
  fields: [
    // { name: 'id', label: 'ID' },
    { name: 'name', label: 'Name' },
    // { name: 'email', label: 'Email' },
  ],
  data: store.items,
}))

const loadData = async () => {
  const res = await store.fetch()
  toast.showToast({
    message: res.message,
    variant: res.success ? 'success' : 'warning',
    icon: 'check2',
    duration: 5000
  })
}
const add = () => store.add({
  id: 0,
  name: 'asdasd',
  email: 'asdasd',
})
const edit = (row: TableData) => {
  console.log('editar', row)
}
const deleteRow = async (row: TableData) => {
  if(row.id){
    const res = await store.remove(row.id?.toString())
    toast.showToast({
      message: res.message,
      variant: res.success ? 'success' : 'warning',
      duration: 5000
    })
  }
}

const formModal = ref<InstanceType<typeof ModalBase> | null>(null)
const formData = ref<DemoRow>({
  id: null,
  name: 'nuevo',
  email: ''
})

function openForm(row?: DemoRow) {
  if(row){
    formData.value.id = row.id
    formData.value.name = row.name
  }
  formModal.value?.open()
}

function closeForm() {
  formData.value.id = ''
  formData.value.name = ''
  formModal.value?.close()
}

async function saveData(){
  const res = formData.value.id ?
    await store.update(formData.value.id.toString(), formData.value) :
    await store.add(formData.value)

  toast.showToast({
    message: res.message,
    variant: res.success ? 'success' : 'warning',
    icon: 'success',
    duration: 5000
  })
  closeForm()
}
</script>
