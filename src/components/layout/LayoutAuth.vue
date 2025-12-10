<template>
  <div class="auth-layout d-flex align-items-center justify-content-center">
    <div class="auth-box p-5 rounded-4">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  height: 100vh;
  background-color: #1e1f25;
}

.auth-box {
  width: 380px;
  background: #2a2c34;
  border: 1px solid #3a3c45;
  color: #e3e4e8;
}
</style>
