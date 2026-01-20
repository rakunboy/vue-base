<template>
  <div class="p-4 w-100">
    <h2 class="mb-4">Roles</h2>

    <RolesGrid :loadOnMounted="true" />
  </div>

</template>

<script setup lang="ts">
import RolesGrid from './Components/RolesGrid.vue'

</script>
