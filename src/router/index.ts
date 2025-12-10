import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import LayoutDefault from '@/components/layout/LayoutDefault.vue'
import ProfileView from '@/views/ProfileView.vue'
import TemplateExampleView from '@/views/TemplateExampleView.vue'
import LayoutAuth from '@/components/layout/LayoutAuth.vue'
import PokemonView from '@/views/PokemonView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/auth',
      component: LayoutAuth,
      meta: { public: true },
      children: [{ path: '/login', name: 'login', component: LoginView }],
    },
    {
      path: '/',
      component: LayoutDefault,
      meta: { requiresAuth: true },
      children: [
        { path: '/', name: 'dashboard', component: DashboardView },
        { path: '/perfil', name: 'perfil', component: ProfileView },
        { path: '/demo', name: 'demo', component: TemplateExampleView },
        { path: '/pokemon', name: 'api', component: PokemonView },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: NotFoundView,
      meta: { requiresAuth: false },
    },
  ],
})

// 🔥 Navigation Guard global
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    // Usuario NO autenticado → redirigir al login
    next('/login')
    return
  }

  if (to.path === '/login' && token) {
    // Usuario ya autenticado → no dejar entrar al login
    next('/')
    return
  }

  next()
})

export default router
