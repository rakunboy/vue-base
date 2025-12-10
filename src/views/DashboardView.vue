<template>
  <div class="p-4 w-100">
    <h2 class="mb-4">Dashboard</h2>

    <div class="row g-4">
      <div class="col-md-4">
        <div class="card custom-card p-4 w-100">
          <h5>Usuarios</h5>
          <p class="text-secondary">123 registrados</p>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card custom-card p-4 w-100">
          <h5>Ventas</h5>
          <p class="text-secondary">$15,230</p>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card custom-card p-4 w-100">
          <h5>Mensajes</h5>
          <p class="text-secondary">42 pendientes</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-card {
  background-color: #2a2c34;
  color: #e3e4e8;
  border: 1px solid #3a3c45;
  border-radius: 12px;
}
</style>
