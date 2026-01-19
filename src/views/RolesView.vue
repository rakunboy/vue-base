<template>
  <div class="p-4 w-100">
    <h2 class="mb-4">Roles</h2>

    <DataGrid :data="rolesTable" title="Administración de roles" :loading="store.loadingData">
      <template #submenu>
        <CustomButton
          class="me-2"
          icon="arrow-clockwise"
          @click="loadData()"
          :disabled="store.loadingData"
        />
        <CustomButton
          class="me-2"
          icon="plus-circle"
          @click="openForm()"
          :disabled="store.loading"
        />
        <!-- <button class="btn btn-primary btn-sm me-2" @click="loadData()" :disabled="store.loadingData">
          <BootstrapIcon icon="arrow-clockwise" size="20" />
        </button> -->
        <!-- <button class="btn btn-primary btn-sm me-2" @click="openForm()">
          <BootstrapIcon icon="plus-circle" size="20" />
        </button> -->
      </template>
      <template #actions="{ row }">
        <CustomButton
          class="me-2"
          icon="gear-fill"
          @click="openConfig(row as RoleRow)"
          :disabled="store.loading"
        />
        <CustomButton
          class="me-2"
          icon="pencil-square"
          @click="openForm(row as RoleRow)"
          :disabled="store.loading"
        />
        <CustomButton
          class="me-2"
          icon="trash3"
          variant="danger"
          @click="openConfirm(row as RoleRow)"
          :disabled="store.loading"
        />
        <!-- <button class="btn btn-primary btn-sm me-2" @click="openConfig(row as RoleRow)">
          <BootstrapIcon icon="gear-fill" size="20" />
        </button> -->
        <!-- <button class="btn btn-primary btn-sm me-2" @click="openForm(row as RoleRow)">
          <BootstrapIcon icon="pencil-square" size="20" />
        </button> -->
        <!-- <button class="btn btn-danger btn-sm" @click="openConfirm(row as RoleRow)">
          <BootstrapIcon icon="trash3" size="20" />
        </button> -->
      </template>
    </DataGrid>

    <DataCards v-if="false" :data="rolesTable">
      <template #submenu>
        <button class="btn btn-primary btn-sm me-2" @click="loadData()">
          <BootstrapIcon icon="arrow-clockwise" size="20" />
        </button>
        <button class="btn btn-primary btn-sm me-2" @click="openForm()">
          <BootstrapIcon icon="plus-circle" size="20" />
        </button>
      </template>
      <template #actions="{ row }">
        <button class="btn btn-primary btn-sm me-2" @click="openForm(row as RoleRow)">
          <BootstrapIcon icon="pencil-square" size="20" />
        </button>
        <button class="btn btn-danger btn-sm" @click="openConfirm(row as RoleRow)">
          <BootstrapIcon icon="trash3" size="20" />
        </button>
      </template>
    </DataCards>
  </div>
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

    <ModalBase ref="permissionsModal" size="xl">
      <template #title>Configuración: {{ configSelected?.name }}</template>
      <PermisosGrid ref="permisosGridRef" :roleID="configSelected?.id?.toString()" />
    </ModalBase>
</template>

<script setup lang="ts">
import DataGrid from '@/components/common/DataGrid.vue'
import type { Table, TableData } from '@/types/DataGrid'
import BootstrapIcon from '@/components/common/BootstrapIcon.vue'
import DataCards from '@/components/common/DataCards.vue'
import { computed, onMounted, ref } from 'vue'
import ModalBase from '@/components/common/ModalBase.vue'
import { useToast } from '@/plugins/toast-plugin'
import { useRoleStore, type RoleRow } from '@/stores/rolesStore'
import PermisosGrid from './Components/PermisosGrid.vue'
import CustomButton from '@/components/common/CustomButton.vue'


const store = useRoleStore()
const toast = useToast();

onMounted(() => {
  loadData()
})

const rolesTable = computed<Table>(() => ({
  fields: [
    // { name: 'id', label: 'ID' },
    { name: 'name', label: 'Nombre' },
    { name: 'key', label: 'Llave' },
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
const formData = ref<RoleRow>({
  id: null,
  name: '',
  key: '',
})

function openForm(row?: RoleRow) {
  clearRoleForm()
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
  clearRoleForm()
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
const deleteSelected = ref<RoleRow | null>(null)

function openConfirm(row: RoleRow) {
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

const onCloseForm = () => clearRoleForm()

const clearRoleForm = () => {
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

const permissionsModal = ref<InstanceType<typeof ModalBase> | null>(null)
const configSelected = ref<RoleRow | null>(null)
const permisosGridRef = ref<InstanceType<typeof PermisosGrid> | null>(null)

function openConfig(row: RoleRow) {
  configSelected.value = row
  if(row){
    // const id = row.id;
  }
  permisosGridRef.value?.loadData(row.id?.toString())

  permissionsModal.value?.open()
}
</script>
