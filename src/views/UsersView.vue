<template>
  <div class="p-4 w-100">
    <h2 class="mb-4">Usuarios</h2>

    <DataGrid :data="usersTable" title="Administración de usuarios" :loading="store.loading">
      <template #submenu>
        <CustomButton
          class="me-2"
          icon="arrow-clockwise"
          @click="loadData()"
          :disabled="store.loading"
        />
        <CustomButton
          class="me-2"
          icon="plus-circle"
          @click="openForm()"
        />
      </template>
      <template #actions="{ row }">
        <CustomButton
          class="me-2"
          icon="gear-fill"
          @click="openConfig(row as UserRow)"
          :disabled="store.loading"
        />
        <CustomButton
          class="me-2"
          icon="pencil-square"
          @click="openForm(row as UserRow)"
          :disabled="store.loading"
        />
        <CustomButton
          class="me-2"
          icon="trash3"
          variant="danger"
          @click="openConfirm(row as UserRow)"
          :disabled="store.loading"
        />
      </template>
    </DataGrid>

    <DataCards v-if="false" :data="usersTable">
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
  <ModalBase ref="formModal" size="lg" @closed="onCloseForm">
      <template #title>{{formData.id ? 'Modificar' : 'Nuevo'}} usuario</template>

      <form class="row g-3">
        <div class="col-md-12">
          <label class="form-label">Nombre</label>
          <input type="text" class="form-control" v-model="formData.name" />
        </div>
        <div class="col-md-12">
          <label class="form-label">Correo</label>
          <input type="text" class="form-control" v-model="formData.email" />
        </div>
        <div class="col-md-12">
          <label class="form-label">Contraseña</label>
          <input type="password" class="form-control" v-model="formData.password" />
        </div>
        <div class="col-md-12">
          <label class="form-label">Contraseña</label>
          <input type="password" class="form-control" v-model="formData.password_confirmation" />
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
        ¿Estás seguro de eliminar al usuario
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

    <ModalBase ref="roleModal" size="xl">
      <!-- <template #title>Configuración: </template> -->
      <template #title>Configuración: {{ configSelected?.name }}</template>
      <!-- <PermisosGrid ref="permisosGridRef" :roleID="configSelected?.id?.toString()" /> -->
      <RolesGrid ref="rolesGridRef" :userID="configSelected?.id?.toString()" :loadOnMounted="false" />
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
import { useUserStore, type UserRow } from '@/stores/usersStore'
import CustomButton from '@/components/common/CustomButton.vue'
import RolesGrid from './Components/RolesGrid.vue'

const store = useUserStore()
const toast = useToast();

onMounted(() => {
  loadData()
})

const usersTable = computed<Table>(() => ({
  fields: [
    // { name: 'id', label: 'ID' },
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
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
const formData = ref<UserRow>({
  id: null,
  name: 'nuevo',
  email: '',
  password: '',
  password_confirmation: '',
})

function openForm(row?: UserRow) {
  clearUserForm()
  if(row){
    // formData.value.id = row.id
    // formData.value.name = row.name
    // formData.value.email = row.email
    formData.value = {
      ...formData.value,
      id: row.id,
      name: row.name,
      email: row.email,
    }
  }
  formModal.value?.open()
}

function closeForm() {
  clearUserForm()
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
const deleteSelected = ref<UserRow | null>(null)

function openConfirm(row: UserRow) {
  deleteSelected.value = row
  confirmModal.value?.open()
}

function closeConfirm() {
  confirmModal.value?.close()
}

function confirmAction() {
  if(deleteSelected.value)
    deleteRow(deleteSelected.value)
  console.log('Acción confirmada')
  closeConfirm()
}

const onCloseForm = () => clearUserForm()

const clearUserForm = () => {
  formData.value = {
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }
}

const roleModal = ref<InstanceType<typeof ModalBase> | null>(null)
const configSelected = ref<UserRow | null>(null)
const rolesGridRef = ref<InstanceType<typeof RolesGrid> | null>(null)

function openConfig(row: UserRow) {
  configSelected.value = row
  if(row){
  //   // const id = row.id;
  }
  rolesGridRef.value?.loadData(row.id?.toString())

  roleModal.value?.open()
}
</script>
