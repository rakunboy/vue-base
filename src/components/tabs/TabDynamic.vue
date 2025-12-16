<template>
  <div>
    <h5>{{ title }}</h5>
    <p>Tab generado dinámicamente.</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>
