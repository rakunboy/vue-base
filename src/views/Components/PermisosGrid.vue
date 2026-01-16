<template>
  <DataGrid :data="permisosTable" title="Administración de permisos" :loading="store.loadingData">
    <template #submenu>
      <button class="btn btn-primary btn-sm me-2" @click="loadData()" :disabled="store.loading">
        <BootstrapIcon icon="arrow-clockwise" size="20" />
      </button>
      <button class="btn btn-primary btn-sm me-2" @click="openForm()">
        <BootstrapIcon icon="plus-circle" size="20" />
      </button>
    </template>
    <template #actions="{ row }">
      <button v-if="props.roleID" class="btn btn-primary btn-sm me-2" @click="openForm(row as PermisoRow)">
        <BootstrapIcon icon="plus" size="20" />
      </button>
      <button class="btn btn-primary btn-sm me-2" @click="openForm(row as PermisoRow)">
        <BootstrapIcon icon="pencil-square" size="20" />
      </button>
      <button class="btn btn-danger btn-sm" @click="openConfirm(row as PermisoRow)">
        <BootstrapIcon icon="trash3" size="20" />
      </button>
    </template>
  </DataGrid>

  <ModalBase ref="formModal" size="lg" @closed="onCloseForm">
      <template #title>{{formData.id ? 'Modificar' : 'Nuevo'}} rol</template>

      <form class="row g-3">
        <div class="col-md-12">
          <label class="form-label">Nombre</label>
          <input type="text" class="form-control" @blur="rolNameBlur" v-model="formData.name" />
        </div>
        <div class="col-md-12">
          <label class="form-label">Llave</label>
          <input type="text" class="form-control" v-model="formData.key" />
        </div>
      </form>

      <template #footer>
        <button class="btn btn-secondary" @click="closeForm">
          Cancelar
        </button>
        <button class="btn btn-success" @click="saveData" :disabled="store.loading">
          Guardar
        </button>
      </template>
    </ModalBase>

    <ModalBase ref="confirmModal">
      <template #title>Confirmar acción</template>

      <p>
        ¿Estás seguro de eliminar al rol
        <strong>{{ deleteSelected?.name }}</strong>?
      </p>

      <template #footer>
        <button class="btn btn-secondary" @click="closeConfirm">
          Cancelar
        </button>
        <button class="btn btn-danger" @click="confirmAction">
          Confirmar
        </button>
      </template>
    </ModalBase>
</template>

<script setup lang="ts">
import DataGrid from '@/components/common/DataGrid.vue'
import type { Table, TableData } from '@/types/DataGrid'
import BootstrapIcon from '@/components/common/BootstrapIcon.vue'
import { computed, onMounted, ref } from 'vue'
import ModalBase from '@/components/common/ModalBase.vue'
import { useToast } from '@/plugins/toast-plugin'
import { usePermisoStore, type PermisoRow } from '@/stores/permisosStore'

const props = defineProps<{
  roleID?: string
}>()

const store = usePermisoStore()
const toast = useToast();

onMounted(() => {
  loadData()
})

const permisosTable = computed<Table>(() => ({
  fields: [
    // { name: 'id', label: 'ID' },
    { name: 'name', label: 'Nombre' },
    { name: 'key', label: 'Llave' },
  ],
  data: store.items,
}))

const loadData = async () => {
  const res = await store.fetch({
    role_id: props.roleID,
    id: null
  })

  toast.showToast({
    message: res.message,
    variant: res.success ? 'success' : 'warning',
    icon: 'check2',
    duration: 5000
  })
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
const formData = ref<PermisoRow>({
  id: null,
  name: '',
  key: '',
  role_id: null
})

function openForm(row?: PermisoRow) {
  clearPermisoForm()
  if(row){
    formData.value = {
      ...formData.value,
      id: row.id,
      name: row.name,
      key: row.key,
    }
  }
  formModal.value?.open()
}

function closeForm() {
  clearPermisoForm()
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
  if(res.success)
    closeForm()
}

const confirmModal = ref<InstanceType<typeof ModalBase> | null>(null)
const deleteSelected = ref<PermisoRow | null>(null)

function openConfirm(row: PermisoRow) {
  deleteSelected.value = row
  confirmModal.value?.open()
}

function closeConfirm() {
  confirmModal.value?.close()
}

function confirmAction() {
  if(deleteSelected.value)
    deleteRow(deleteSelected.value)
  closeConfirm()
}

const onCloseForm = () => clearPermisoForm()

const clearPermisoForm = () => {
  formData.value = {
    id: null,
    name: '',
    key: ''
  }
}

const rolNameBlur = () => {
  if(!formData.value.id)
    formData.value.key = formData.value.name.toUpperCase().split(' ').join('_')
}

</script>
