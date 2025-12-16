<template>
  <div class="p-4">
    <h2 class="fw-bold mb-4">Modales</h2>

    <div class="d-flex gap-2 mb-4">
      <button class="btn btn-primary" @click="openInfo">
        Modal info
      </button>

      <button class="btn btn-warning" @click="openConfirm">
        Modal confirmación
      </button>

      <button class="btn btn-danger" @click="openForm">
        Modal formulario
      </button>
    </div>

    <!-- Modal Info -->
    <ModalBase ref="infoModal">
      <template #title>Información</template>

      <p>
        Este es un modal informativo reutilizable en todo el sistema.
      </p>
    </ModalBase>

    <!-- Modal Confirm -->
    <ModalBase ref="confirmModal">
      <template #title>Confirmar acción</template>

      <p>¿Estás seguro de continuar?</p>

      <template #footer>
        <button class="btn btn-secondary" @click="closeConfirm">
          Cancelar
        </button>
        <button class="btn btn-danger" @click="confirmAction">
          Confirmar
        </button>
      </template>
    </ModalBase>

    <!-- Modal Form -->
    <ModalBase ref="formModal" size="lg">
      <template #title>Nuevo usuario</template>

      <form class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Nombre</label>
          <input type="text" class="form-control" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" />
        </div>
      </form>

      <template #footer>
        <button class="btn btn-secondary" @click="closeForm">
          Cancelar
        </button>
        <button class="btn btn-success">
          Guardar
        </button>
      </template>
    </ModalBase>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ModalBase from '@/components/common/ModalBase.vue'

const infoModal = ref<InstanceType<typeof ModalBase> | null>(null)
const confirmModal = ref<InstanceType<typeof ModalBase> | null>(null)
const formModal = ref<InstanceType<typeof ModalBase> | null>(null)

function openInfo() {
  infoModal.value?.open()
}

function openConfirm() {
  confirmModal.value?.open()
}

function closeConfirm() {
  confirmModal.value?.close()
}

function confirmAction() {
  console.log('Acción confirmada')
  closeConfirm()
}

function openForm() {
  formModal.value?.open()
}

function closeForm() {
  formModal.value?.close()
}
</script>
