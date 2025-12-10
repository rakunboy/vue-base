<template>
  <div class="login-page d-flex justify-content-center align-items-center">
    <div class="login-box p-4 rounded bg-dark border border-secondary" style="width: 360px">
      <h3 class="mb-4 text-center text-light">Iniciar sesión</h3>

      <form @submit.prevent="login">
        <div class="mb-3">
          <label class="form-label text-light">Usuario</label>
          <input v-model="user" class="form-control bg-secondary text-light border-0" required />
        </div>

        <div class="mb-3">
          <label class="form-label text-light">Contraseña</label>
          <input
            type="password"
            v-model="pass"
            class="form-control bg-secondary text-light border-0"
            required
          />
        </div>

        <button class="btn btn-primary w-100 py-2">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref('')
const pass = ref('')

function login() {
  if (user.value && pass.value) {
    localStorage.setItem('token', 'demo')
    router.push('/')
  }
}
</script>

<style scoped>
.login-page {
  /* height: 100vh; */
  background: #1f1f1f;
}

.login-box {
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
}
</style>
