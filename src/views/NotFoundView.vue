<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1 class="animated-404">404</h1>
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, la página que buscas no existe.</p>

      <router-link to="/" class="home-btn">Volver al inicio</router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1f2127;
  color: #e3e4e8;
  text-align: center;
  padding: 20px;
}

.not-found-content {
  max-width: 400px;
}

.animated-404 {
  font-size: 120px;
  font-weight: 800;
  margin: 0;
  color: #8ab4ff;
  animation: pulse 1.8s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    opacity: 0.5;
    transform: scale(0.95);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0.5;
    transform: scale(0.95);
  }
}

h2 {
  margin-top: 10px;
  font-size: 24px;
}

p {
  margin: 10px 0 25px;
  color: #bbbcc2;
}

.home-btn {
  display: inline-block;
  padding: 10px 20px;
  background: #4a90e2;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  transition: 0.2s;
}

.home-btn:hover {
  background: #6aa8ff;
}
</style>
