<template>
  <header class="topbar d-flex align-items-center justify-content-between px-4">
    <h5 class="fw-semibold mb-0">Panel</h5>

    <div class="d-flex align-items-center">
      <span class="me-3 text-secondary">Admin</span>

      <!-- Dropdown -->
      <div class="dropdown">
        <img
          src="https://i.pravatar.cc/35"
          class="rounded-circle border border-primary dropdown-toggle"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style="cursor: pointer"
        />

        <ul class="dropdown-menu dropdown-menu-end shadow-lg rounded-3 custom-menu">
          <li>
            <router-link class="dropdown-item py-2" to="/perfil">
              <i class="bi bi-person me-2"></i> Perfil
            </router-link>
          </li>

          <li>
            <hr class="dropdown-divider" />
          </li>

          <li>
            <button class="dropdown-item text-danger py-2" @click="logout">
              <i class="bi bi-box-arrow-right me-2"></i> Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.topbar {
  height: 60px;
  background-color: #2a2c34;
  border-bottom: 1px solid #3a3c45;
  color: #e3e4e8;
}

.custom-menu {
  background-color: #2f3038;
  border: 1px solid #3a3c45;
}

.custom-menu .dropdown-item {
  color: #e3e4e8;
}

.custom-menu .dropdown-item:hover {
  background-color: #3a3c45;
}

.dropdown-divider {
  border-top-color: #45464f;
}
</style>
