# Vue 3 + Bootstrap 5 --- Advanced Toast System (Plugin + Global API)

Este sistema de **toasts avanzados** soporta:

- Uso como **componente montado** o como **plugin global**
- API completa (`show`, `update`, `remove`, `promise`)
- Variantes (success, danger, info...)
- Acciones con callbacks
- Íconos HTML seguros
- Posiciones configurables
- Cola, prioridad y agrupación
- Temporizador, hover‑pause, persistencia
- Transiciones animadas

---

# 🚀 Instalación con Plugin Global

### 1️⃣ Crear archivo del plugin

`src/plugins/toast.ts`

```ts
import { createApp } from 'vue'
import type { App } from 'vue'
import type { ToastApi } from '@/types/toast'
import ToastMessage from '@/components/common/ToastMessage.vue'

export default {
  install(app: App) {
    // Crear contenedor
    const div = document.createElement('div')
    document.body.appendChild(div)

    // Instancia independiente del Toast
    const toastApp = createApp(ToastMessage)

    // API expuesta desde defineExpose en ToastMessage.vue
    const toast = toastApp.mount(div) as unknown as ToastApi

    // Hacer accesible globalmente
    app.provide('toast', toast)
    app.config.globalProperties.$toast = toast
  },
}
```

---

### 2️⃣ Registrar en `main.ts`

```ts
import { createApp } from 'vue'
import App from './App.vue'
import ToastPlugin from '@/plugins/toast'

const app = createApp(App)

app.use(ToastPlugin)

app.mount('#app')
```

Ahora puedes usar:

```ts
this.$toast.showToast(...)
```

o mediante `inject('toast')`.

---

# 📌 Uso del API Global

Los métodos expuestos desde el componente:

### **`showToast(options): number`**

```ts
$toast.showToast({
  message: 'Guardado correctamente',
  variant: 'success',
  duration: 3000,
})
```

### **`removeToast(id)`**

```ts
$toast.removeToast(id)
```

### **`updateToast(id, changes)`**

```ts
$toast.updateToast(id, { message: 'Actualizado', variant: 'info' })
```

### **`toastPromise(promise, messages)`**

```ts
$toast.toastPromise(guardar(), {
  loading: 'Guardando...',
  success: 'Guardado!',
  error: 'Falló al guardar',
})
```

---

# ⚙️ Opciones del Toast

```ts
interface ToastOptions {
  title?: string
  message: string
  html?: boolean
  duration?: number
  variant?: ToastVariant
  position?: string
  actions?: ToastAction[]
  icon?: string
  groupingKey?: string
  priority?: number
  pauseOnHover?: boolean
  showClose?: boolean
}
```

---

# 📍 Posiciones Soportadas

    top-right
    top-left
    bottom-right
    bottom-left
    top-center
    bottom-center

Config global:

```ts
$toast.config.position = 'bottom-left'
```

---

# 📦 Configuración Global

```ts
$toast.config.maxVisible = 5
$toast.config.zIndex = 2000
$toast.config.grouping = true
$toast.config.newestOnTop = true
```

---

# 🧠 Agrupación

```ts
$toast.showToast({
  message: 'Cargando...',
  groupingKey: 'load',
})
```

---

# 📚 Ejemplo Completo

```ts
async function guardar() {
  return $toast.toastPromise(saveData(), {
    loading: 'Guardando...',
    success: 'Guardado!',
    error: 'Error al guardar',
  })
}
```

---

# 🛡️ Seguridad

- Evitar HTML no sanitizado cuando `html: true`.
- Usar solo variantes confiables.
