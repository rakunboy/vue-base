<template>
  <div class="app-layout d-flex">
    <AppSidebar />

    <div class="content flex-grow-1 d-flex flex-column">
      <AppTopbar />

      <main class="p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppSidebar from './AppSidebar.vue'
import AppTopbar from './AppTopbar.vue'
</script>

<style scoped>
.app-layout {
  height: 100vh;
  background-color: #1e1f25;
}

.app-layout {
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
}

.sidebar {
  width: 240px;
  flex-shrink: 0;
}

.content {
  flex-grow: 1;
  width: 100%;
  min-width: 0;
  overflow-y: auto;
}
</style>
