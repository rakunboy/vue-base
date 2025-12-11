<template>
  <div class="sidebar d-flex flex-column p-3">
    <h3 class="text-primary fw-bold mb-4">MiApp</h3>

    <nav class="nav flex-column">
      <div v-for="item in menuStore.sidebarMenu" :key="item.titulo">
        <router-link class="nav-link" :to="item.route">{{ item.titulo }}</router-link>
      </div>
      <!-- <router-link class="nav-link" to="/">Dashboard</router-link>
      <router-link class="nav-link" to="/demo">Demo</router-link>
      <router-link class="nav-link" to="/pokemon">Api</router-link>
      <router-link class="nav-link" to="/table">Table</router-link> -->
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore'

const menuStore = useMenuStore()
</script>

<style scoped>
.sidebar {
  width: 240px;
  background-color: #2a2c34;
  border-right: 1px solid #3a3c45;
}

.nav-link {
  color: #aeb2b8;
  padding: 8px 12px;
  border-radius: 8px;
}

.nav-link:hover,
.router-link-active {
  background: #3a3c45;
  color: #e3e4e8;
}
</style>
