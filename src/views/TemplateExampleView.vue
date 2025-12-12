<template>
  <div class="p-4 w-100">
    <h2 class="mb-4">Plantilla de ejemplo</h2>

    <div class="row g-4 mb-4">
      <div class="col-md-4">
        <div class="card custom-card p-4">
          <h5>Título de card</h5>
          <p class="text-secondary">Información o resumen aquí.</p>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card custom-card p-4">
          <h5>Otro card</h5>
          <p class="text-secondary">Contenido breve...</p>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card custom-card p-4">
          <h5>Card 3</h5>
          <p class="text-secondary">Más información.</p>
        </div>
      </div>
    </div>

    <!-- Tabla de ejemplo -->
    <div class="card custom-card p-4">
      <h5 class="mb-3">Tabla de ejemplo</h5>

      <table class="table table-dark table-hover align-middle">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th class="text-end">Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in demo" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td class="text-end">
              <button class="btn btn-primary btn-sm me-2">Editar</button>
              <button class="btn btn-danger btn-sm">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <BSAlert type="success" :closable="true"> asdasdas </BSAlert>
</template>

<script setup lang="ts">
import BSAlert from '@/components/common/BSAlert.vue'

const demo = [
  { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
  { id: 2, name: 'Ana López', email: 'ana@example.com' },
  { id: 3, name: 'Luis Soto', email: 'luis@example.com' },
]
</script>

<style scoped>
.custom-card {
  background-color: #2a2c34;
  color: #e3e4e8;
  border: 1px solid #3a3c45;
  border-radius: 12px;
}
</style>
