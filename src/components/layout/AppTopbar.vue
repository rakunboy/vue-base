<template>
  <header class="topbar d-flex align-items-center justify-content-between px-4 shadow-sm">
    <h5 class="fw-semibold mb-0 d-flex align-items-center gap-2">
      <BootstrapIcon icon="window-sidebar" size="20" />
      Panel
    </h5>

    <div class="d-flex align-items-center gap-3">
      <span class="user-role text-secondary small">Admin</span>

      <!-- Configuración -->
      <DropDown icon="gear">
        <li class="dropdown-header fw-semibold text-light py-2">Configuración</li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <span class="dropdown-item py-2">
            <i class="bi bi-info-circle me-2"></i> No tienes configuraciones
          </span>
        </li>
      </DropDown>

      <!-- Notificaciones -->
      <DropDown icon="bell" :count="5">
        <li class="dropdown-header fw-semibold text-light py-2">Notificaciones</li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <span class="dropdown-item py-2">
            <i class="bi bi-info-circle me-2"></i> No tienes notificaciones
          </span>
        </li>
      </DropDown>

      <!-- Usuario -->
      <DropDown image="https://i.pravatar.cc/40">
        <li>
          <router-link class="dropdown-item py-2" to="/perfil">
            <i class="bi bi-person me-2"></i> Perfil
          </router-link>
        </li>

        <li><hr class="dropdown-divider" /></li>

        <li>
          <button class="dropdown-item text-danger py-2" @click="logout">
            <i class="bi bi-box-arrow-right me-2"></i> Cerrar sesión
          </button>
        </li>
      </DropDown>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import BootstrapIcon from '../common/BootstrapIcon.vue'
import DropDown from '../common/DropDown.vue'

const router = useRouter()

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.topbar {
  min-height: 60px;
  background-color: #1f2026;
  border-bottom: 1px solid #2e3038;
  color: #e3e4e8;
  position: sticky;
  top: 0;
  z-index: 20;
}

.user-role {
  opacity: 0.8;
}

.custom-menu .dropdown-item,
.custom-menu .dropdown-item > * {
  color: #e3e4e8 !important;
}

.custom-menu .dropdown-item:hover {
  background-color: #3a3c45 !important;
  color: #ffffff !important;
}
</style>
