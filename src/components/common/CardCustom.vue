<template>
  <div class="card custom-card p-4 m-2">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.custom-card {
  background-color: #2a2c34;
  color: var(--main-color);
  border: 1px solid #3a3c45;
  border-radius: 12px;
  min-height: 100%
}
</style>
