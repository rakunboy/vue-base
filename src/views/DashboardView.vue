<template>
  <div class="p-4 w-100">
    <!-- HEADER -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="fw-bold mb-1">Dashboard</h2>
        <p class="text-secondary mb-0">Panel administrativo general</p>
      </div>
      <button class="btn btn-outline-primary btn-sm">
        <i class="bi bi-arrow-clockwise me-1"></i>
        Actualizar
      </button>
    </div>

    <!-- KPIs -->
    <div class="row g-4 mb-4">
      <div class="col-md-4">
        <CardCustom class="kpi-card bg-dark text-light">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <small class="text-secondary">Usuarios</small>
              <h3 class="fw-bold mb-1">123</h3>
              <span class="badge bg-success-subtle text-success">+12%</span>
            </div>
            <div class="kpi-icon bg-primary-subtle text-primary">
              <i class="bi bi-people fs-3"></i>
            </div>
          </div>
        </CardCustom>
      </div>

      <div class="col-md-4">
        <CardCustom class="kpi-card bg-dark text-light">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <small class="text-secondary">Ventas</small>
              <h3 class="fw-bold mb-1">$15,230</h3>
              <span class="badge bg-success-subtle text-success">↑ 8%</span>
            </div>
            <div class="kpi-icon bg-success-subtle text-success">
              <i class="bi bi-currency-dollar fs-3"></i>
            </div>
          </div>
        </CardCustom>
      </div>

      <div class="col-md-4">
        <CardCustom class="kpi-card bg-dark text-light">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <small class="text-secondary">Mensajes</small>
              <h3 class="fw-bold mb-1">42</h3>
              <span class="badge bg-warning-subtle text-warning">Pendientes</span>
            </div>
            <div class="kpi-icon bg-warning-subtle text-warning">
              <i class="bi bi-chat-dots fs-3"></i>
            </div>
          </div>
        </CardCustom>
      </div>
    </div>

    <!-- TODOs + GRÁFICA -->
    <div class="row g-4 mb-4">
      <div class="col-lg-4">
        <CardCustom class="bg-dark text-light">
          <h5 class="fw-semibold mb-3">
            <i class="bi bi-exclamation-triangle text-danger me-2"></i>
            TODOs urgentes
          </h5>

          <ul class="todo-list">
            <li class="todo-item high">
              <span>Responder tickets críticos</span>
              <span class="badge bg-danger">Alta</span>
            </li>
            <li class="todo-item medium">
              <span>Revisar pagos fallidos</span>
              <span class="badge bg-warning text-dark">Media</span>
            </li>
            <li class="todo-item high">
              <span>Actualizar permisos</span>
              <span class="badge bg-danger">Alta</span>
            </li>
            <li class="todo-item low">
              <span>Respaldos semanales</span>
              <span class="badge bg-secondary">Baja</span>
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

    <!-- ACTIVIDAD + ADMIN -->
    <div class="row g-4">
      <div class="col-lg-6">
        <CardCustom class="bg-dark text-light">
          <h5 class="fw-semibold mb-3">Actividad reciente</h5>
          <ul class="activity-list">
            <li>
              <span><i class="bi bi-person-plus text-primary me-2"></i>Nuevo usuario</span>
              <small>Hace 2 min</small>
            </li>
            <li>
              <span><i class="bi bi-bag-check text-success me-2"></i>Venta completada</span>
              <small>Hace 10 min</small>
            </li>
            <li>
              <span><i class="bi bi-chat-dots text-warning me-2"></i>Mensaje recibido</span>
              <small>Hace 1 hora</small>
            </li>
          </ul>
        </CardCustom>
      </div>

      <div class="col-lg-6">
        <CardCustom class="bg-dark text-light">
          <h5 class="fw-semibold mb-3">
            <i class="bi bi-gear me-2"></i>
            Administración
          </h5>

          <div class="admin-item">
            <span>Usuarios activos</span>
            <strong class="text-success">98</strong>
          </div>
          <div class="admin-item">
            <span>Roles pendientes</span>
            <strong class="text-warning">3</strong>
          </div>
          <div class="admin-item">
            <span>Backups</span>
            <strong class="text-success">OK</strong>
          </div>
          <div class="admin-item">
            <span>Incidentes</span>
            <strong class="text-danger">1</strong>
          </div>
        </CardCustom>
      </div>
    </div>
  </div>
  <FloatingActionButton
    :actions="[
      {
        label: 'Nuevo',
        icon: 'bi bi-plus',
        onClick: () => {
          toast.showToast({
            message: 'Guardado exitosamente',
            variant: 'success',
            duration: 3000,
            // actions: [{ label: 'Deshacer', onClick: (t) => console.log(t.id) }],
          })
        }
      }
    ]"
  />
</template>

<script setup lang="ts">
import CardCustom from '@/components/common/CardCustom.vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js'
import FloatingActionButton from '@/components/common/FloatingActionButton.vue'
import { useToast } from '@/plugins/toast-plugin'

const toast = useToast()

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
)

const chartData = {
  labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
  datasets: [
    {
      label: 'Ventas',
      data: [1200, 1900, 1500, 2200, 1800, 2500, 2100],
      borderColor: '#0d6efd',
      backgroundColor: 'rgba(13,110,253,0.2)',
      tension: 0.4
    }
  ]
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { labels: { color: '#f8f9fa' } }
  },
  scales: {
    x: {
      ticks: { color: '#adb5bd' },
      grid: { color: 'rgba(255,255,255,0.05)' }
    },
    y: {
      ticks: { color: '#adb5bd' },
      grid: { color: 'rgba(255,255,255,0.05)' }
    }
  }
}
</script>

<style scoped>
.kpi-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.kpi-card:hover {
  transform: translateY(-4px);
}

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
  align-items: center;
  padding: 0.6rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.todo-item:last-child,
.activity-list li:last-child,
.admin-item:last-child {
  border-bottom: none;
}

.todo-item.high {
  color: #f8d7da;
}
.todo-item.medium {
  color: #fff3cd;
}
.todo-item.low {
  color: #ced4da;
}

.activity-list small {
  color: #adb5bd;
}
</style>
