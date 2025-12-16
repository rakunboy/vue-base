<template>
  <div class="p-4">
    <h2 class="fw-bold mb-4">Nuevo usuario (Wizard)</h2>

    <Wizard
      ref="wizardRef"
      :steps="steps"
      @finish="onFinish"
    >
      <template #default="{ step }">
        <div v-if="step === 0">
          <h5>Datos básicos</h5>
          <input v-model="form.name" class="form-control mb-2" placeholder="Nombre" />
          <input v-model="form.email" class="form-control" placeholder="Email" />
        </div>

        <div v-else-if="step === 1">
          <h5>Configuración</h5>
          <select v-model="form.role" class="form-select">
            <option value="">Selecciona rol</option>
            <option>Admin</option>
            <option>Usuario</option>
          </select>
        </div>

        <div v-else-if="step === 2">
          <h5>Confirmación</h5>
          <pre class="bg-black p-3 rounded text-success">
            {{ form }}
          </pre>
        </div>
      </template>
    </Wizard>

    <!-- Control externo -->
    <button
      class="btn btn-outline-info mt-3"
      @click="wizardRef?.next()"
    >
      Avanzar desde botón externo
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Wizard, { type WizardStep } from '@/components/common/WizardComponent.vue'

const wizardRef = ref<InstanceType<typeof Wizard> | null>(null)

const form = ref({
  name: '',
  email: '',
  role: ''
})

const steps: WizardStep[] = [
  {
    title: 'Datos',
    validate: () => form.value.name !== '' && form.value.email !== '',
    errorMessage: 'Nombre y correo son obligatorios'
  },
  {
    title: 'Rol',
    validate: () => form.value.role !== '',
    errorMessage: 'Debes seleccionar un rol'
  },
  {
    title: 'Confirmar'
  }
]

function onFinish() {
  alert('Formulario enviado')
}
</script>
