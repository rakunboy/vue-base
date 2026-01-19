<template>
  <div class="p-4 w-100">

    <!-- HEADER -->
    <div
      ref="headerRef"
      class="d-flex justify-content-between align-items-center mb-4"
    >
      <div>
        <h2 class="fw-bold mb-1">Dashboard</h2>
        <p class="text-secondary mb-0">Panel administrativo general</p>
      </div>
      <button class="btn btn-outline-primary btn-sm">
        <i class="bi bi-arrow-clockwise me-1"></i>
        Actualizar
      </button>
    </div>

    <!-- FILTER BAR -->
    <CardCustom ref="filterRef" class="bg-dark text-light mb-4">
      <div class="row g-3 align-items-end">
        <div class="col-md-4">
          <label class="form-label">Rango de fechas</label>
          <input type="date" class="form-control form-control-sm" />
        </div>
        <div class="col-md-3">
          <label class="form-label">Entorno</label>
          <select class="form-select form-select-sm">
            <option>Producción</option>
            <option>QA</option>
            <option>Desarrollo</option>
          </select>
        </div>
        <div class="col-md-3">
          <label class="form-label">Estado</label>
          <select class="form-select form-select-sm">
            <option>Todos</option>
            <option>Activo</option>
            <option>Error</option>
          </select>
        </div>
        <div class="col-md-2">
          <button class="btn btn-primary btn-sm w-100">Aplicar</button>
        </div>
      </div>
    </CardCustom>

    <!-- KPIs -->
    <div class="row g-4 mb-4">
      <div
        class="col-md-4"
        v-for="kpi in kpis"
        :key="kpi.label"
        ref="kpiRefs"
      >
        <CardCustom class="kpi-card bg-dark text-light">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <small class="text-secondary">{{ kpi.label }}</small>
              <h3 class="fw-bold mb-1">{{ kpi.value }}</h3>
              <span :class="`badge ${kpi.badge}`">{{ kpi.trend }}</span>
            </div>
            <div class="kpi-icon" :class="kpi.iconBg">
              <i :class="`${kpi.icon} fs-3`"></i>
            </div>
          </div>
        </CardCustom>
      </div>
    </div>

    <!-- TODO + CHART -->
    <div class="row g-4 mb-4 gsap-section">
      <div class="col-lg-4">
        <CardCustom class="bg-dark text-light">
          <h5 class="fw-semibold mb-3">
            <i class="bi bi-exclamation-triangle text-danger me-2"></i>
            TODOs urgentes
          </h5>
          <ul class="todo-list">
            <li
              v-for="t in todos"
              :key="t.text"
              :class="`todo-item ${t.level}`"
            >
              <span>{{ t.text }}</span>
              <span class="badge" :class="t.badge">{{ t.priority }}</span>
            </li>
          </ul>
        </CardCustom>
      </div>

      <div class="col-lg-8">
        <CardCustom class="bg-dark text-light">
          <h5 class="fw-semibold mb-3">Ventas semanales</h5>
          <Line :data="chartData" :options="chartOptions" />
        </CardCustom>
      </div>
    </div>

    <!-- TABLE + DOUGHNUT -->
    <div class="row g-4 mb-4 gsap-section">
      <div class="col-lg-8">
        <CardCustom class="bg-dark text-light">
          <h5 class="fw-semibold mb-3">Últimos movimientos</h5>
          <table class="table table-dark table-hover table-sm mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Tipo</th>
                <th>Usuario</th>
                <th>Fecha</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(log, i) in logs" :key="i">
                <td>{{ i + 1 }}</td>
                <td>{{ log.type }}</td>
                <td>{{ log.user }}</td>
                <td>{{ log.time }}</td>
                <td>
                  <span class="badge" :class="log.badge">{{ log.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </CardCustom>
      </div>

      <div class="col-lg-4">
        <CardCustom class="bg-dark text-light">
          <h5 class="fw-semibold mb-3">Estado del sistema</h5>
          <Doughnut :data="statusData" />
        </CardCustom>
      </div>
    </div>

    <!-- ACTIVITY + ADMIN -->
    <div class="row g-4 mb-4 gsap-section">
      <div class="col-lg-6">
        <CardCustom class="bg-dark text-light">
          <h5 class="fw-semibold mb-3">Actividad reciente</h5>
          <ul class="activity-list">
            <li v-for="a in activity" :key="a.text">
              <span>
                <i :class="`${a.icon} me-2`"></i>{{ a.text }}
              </span>
              <small>{{ a.time }}</small>
            </li>
          </ul>
        </CardCustom>
      </div>

      <div class="col-lg-6">
        <CardCustom class="bg-dark text-light">
          <h5 class="fw-semibold mb-3">
            <i class="bi bi-gear me-2"></i> Administración
          </h5>
          <div
            v-for="a in admin"
            :key="a.label"
            class="admin-item"
          >
            <span>{{ a.label }}</span>
            <strong :class="a.class">{{ a.value }}</strong>
          </div>
        </CardCustom>
      </div>
    </div>

    <!-- QUICK ACTIONS -->
    <CardCustom class="bg-dark text-light mb-4 gsap-section">
      <h5 class="fw-semibold mb-3">Acciones rápidas</h5>
      <div class="d-flex gap-2 flex-wrap">
        <button class="btn btn-outline-primary btn-sm">
          <i class="bi bi-person-plus me-1"></i> Usuario
        </button>
        <button class="btn btn-outline-success btn-sm">
          <i class="bi bi-file-earmark-plus me-1"></i> Registro
        </button>
        <button class="btn btn-outline-warning btn-sm">
          <i class="bi bi-shield-lock me-1"></i> Permisos
        </button>
      </div>
    </CardCustom>

  </div>

  <!-- FAB -->
  <FloatingActionButton
    ref="fabRef"
    :actions="[
      {
        label: 'Nuevo',
        icon: 'bi bi-plus',
        onClick: () => toast.showToast({
          message: 'Acción ejecutada',
          variant: 'success',
          duration: 3000
        })
      }
    ]"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import CardCustom from '@/components/common/CardCustom.vue'
import FloatingActionButton from '@/components/common/FloatingActionButton.vue'
import { Line, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { useToast } from '@/plugins/toast-plugin'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
)

const toast = useToast()

/* GSAP refs */
const headerRef = ref<HTMLElement | null>(null)
const filterRef = ref<HTMLElement | null>(null)
const kpiRefs = ref<HTMLElement[]>([])
const fabRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const tl = gsap.timeline({
    defaults: { duration: 0.6, ease: 'power2.out' }
  })

  tl.from(headerRef.value, { y: -20, opacity: 0 })
    .from(filterRef.value, { y: 20, opacity: 0 }, '-=0.3')
    .from(kpiRefs.value, { y: 30, opacity: 0, stagger: 0.15 }, '-=0.2')
    .from('.gsap-section', { y: 40, opacity: 0, stagger: 0.2 }, '-=0.1')
    .from(
      fabRef.value,
      { scale: 0, opacity: 0, ease: 'back.out(1.7)' },
      '-=0.2'
    )
})

/* DATA */
const kpis = [
  { label: 'Usuarios', value: 123, trend: '+12%', badge: 'bg-success-subtle text-success', icon: 'bi bi-people', iconBg: 'bg-primary-subtle text-primary' },
  { label: 'Ventas', value: '$15,230', trend: '↑ 8%', badge: 'bg-success-subtle text-success', icon: 'bi bi-currency-dollar', iconBg: 'bg-success-subtle text-success' },
  { label: 'Mensajes', value: 42, trend: 'Pendientes', badge: 'bg-warning-subtle text-warning', icon: 'bi bi-chat-dots', iconBg: 'bg-warning-subtle text-warning' }
]

const todos = [
  { text: 'Responder tickets críticos', level: 'high', priority: 'Alta', badge: 'bg-danger' },
  { text: 'Revisar pagos fallidos', level: 'medium', priority: 'Media', badge: 'bg-warning text-dark' },
  { text: 'Respaldos semanales', level: 'low', priority: 'Baja', badge: 'bg-secondary' }
]

const logs = [
  { type: 'Login', user: 'admin', time: 'Hace 5 min', status: 'OK', badge: 'bg-success' },
  { type: 'Backup', user: 'system', time: 'Hace 20 min', status: 'Proceso', badge: 'bg-warning' }
]

const activity = [
  { text: 'Nuevo usuario', icon: 'bi bi-person-plus text-primary', time: '2 min' },
  { text: 'Venta completada', icon: 'bi bi-bag-check text-success', time: '10 min' }
]

const admin = [
  { label: 'Usuarios activos', value: '98', class: 'text-success' },
  { label: 'Incidentes', value: '1', class: 'text-danger' }
]

const chartData = {
  labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
  datasets: [
    {
      label: 'Ventas',
      data: [1200, 1900, 1500, 2200, 1800, 2500, 2100],
      borderColor: '#0d6efd',
      tension: 0.4
    }
  ]
}

const statusData = {
  labels: ['OK', 'Advertencias', 'Errores'],
  datasets: [
    {
      data: [12, 3, 1],
      backgroundColor: ['#198754', '#ffc107', '#dc3545']
    }
  ]
}

const chartOptions = { responsive: true }
</script>

<style scoped>
.kpi-card { transition: transform 0.2s ease; }
.kpi-card:hover { transform: translateY(-4px); }

.kpi-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.todo-list,
.activity-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-item,
.activity-list li,
.admin-item {
  display: flex;
  justify-content: space-between;
  padding: 0.6rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.todo-item.high { color: #f8d7da; }
.todo-item.medium { color: #fff3cd; }
.todo-item.low { color: #ced4da; }
</style>
