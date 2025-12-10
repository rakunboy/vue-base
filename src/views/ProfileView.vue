<template>
  <div class="profile-page p-4 w-100">
    <h2 class="mb-4">Perfil del usuario</h2>

    <div class="row g-4">
      <!-- Avatar -->
      <div class="col-md-4 d-flex justify-content-center">
        <div class="avatar-container text-center">
          <img class="avatar" src="https://i.pravatar.cc/120" alt="avatar" />
          <h5 class="mt-3">{{ form.name }}</h5>
          <small class="text-secondary">{{ form.email }}</small>
        </div>
      </div>

      <!-- Formulario -->
      <div class="col-md-8">
        <div class="card custom-card p-4">
          <h5 class="mb-3">Editar información</h5>

          <div class="mb-3">
            <label class="form-label">Nombre completo</label>
            <input v-model="form.name" type="text" class="form-control dark-input" />
          </div>

          <div class="mb-3">
            <label class="form-label">Correo electrónico</label>
            <input v-model="form.email" type="email" class="form-control dark-input" />
          </div>

          <div class="d-flex justify-content-end">
            <button class="btn btn-primary px-4" @click="saveProfile">Guardar cambios</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

// DEMO: información del usuario (luego vendrá desde API)
const form = reactive({
  name: 'Admin User',
  email: 'admin@example.com',
})

const saveProfile = () => {
  console.log('Guardando...', form)
  alert('Perfil actualizado correctamente')
}
</script>

<style scoped>
.avatar-container {
  background: #2a2c34;
  padding: 30px;
  border: 1px solid #3a3c45;
  border-radius: 12px;
  width: 100%;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 100%;
  border: 3px solid #3a86ff;
}

.custom-card {
  background-color: #2a2c34;
  color: #e3e4e8;
  border: 1px solid #3a3c45;
  border-radius: 12px;
}

.dark-input {
  background: #1f2127 !important;
  border: 1px solid #3a3c45 !important;
  color: #fff !important;
}
</style>
