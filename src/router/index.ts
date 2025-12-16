import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import LayoutDefault from '@/components/layout/LayoutDefault.vue'
import ProfileView from '@/views/ProfileView.vue'
import TemplateExampleView from '@/views/TemplateExampleView.vue'
import LayoutAuth from '@/components/layout/LayoutAuth.vue'
import PokemonView from '@/views/PokemonView.vue'
import TablesView from '@/views/TablesView.vue'
import FormView from '@/views/FormView.vue'
import ChatView from '@/views/ChatView.vue'
import BoardView from '@/views/BoardView.vue'
import CalendarView from '@/views/CalendarView.vue'
import ModalsView from '@/views/ModalsView.vue'
import TabsView from '@/views/TabsView.vue'
import WizardView from '@/views/WizardView.vue'
import FileSystemView from '@/views/FileSystemView.vue'

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
        { path: '/table', name: 'table', component: TablesView },
        { path: '/forms', name: 'forms', component: FormView },
        { path: '/chat', name: 'chat', component: ChatView },
        { path: '/board', name: 'board', component: BoardView },
        { path: '/calendar', name: 'calendar', component: CalendarView },
        { path: '/modal', name: 'modal', component: ModalsView },
        { path: '/tabs', name: 'tabs', component: TabsView },
        { path: '/wizard', name: 'wizard', component: WizardView },
        { path: '/filesystem', name: 'filesystem', component: FileSystemView },
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
