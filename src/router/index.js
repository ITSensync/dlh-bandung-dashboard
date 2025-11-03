import { createRouter } from 'vue-router'
// import Style from '@/views/StyleView.vue'
import Home from '@/views/HomeView.vue'
import { createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'

const routes = [
  // {
  //   meta: {
  //     title: 'Select style',
  //   },
  //   path: '/',
  //   name: 'style',
  //   component: Style,
  // },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard',
    },
    path: '/',
    name: 'dashboard',
    component: DashboardView,
  },
  {
    meta: {
      title: 'Summary',
    },
    path: '/summary',
    name: 'summary',
    component: Home,
  },
  {
    meta: {
      title: 'ISPU',
    },
    path: '/ispu',
    name: 'ISPU',
    component: () => import('@/views/IspuView.vue'),
  },
  {
    meta: {
      title: 'Konsentrasi',
    },
    path: '/konsentrasi',
    name: 'konsentrasi',
    component: () => import('@/views/KonsentrasiView.vue'),
  },
  {
    meta: {
      title: 'Laporan',
    },
    path: '/laporan',
    name: 'laporan',
    component: () => import('@/views/LaporanView.vue'),
  },
  {
    meta: {
      title: 'Laporan Maintenance',
    },
    path: '/mt-laporan',
    name: 'maintenance report',
    component: () => import('@/views/MtReportView.vue'),
  },
  /* {
    meta: {
      title: 'Tables',
    },
    path: '/tables',
    name: 'tables',
    component: () => import('@/views/TablesView.vue'),
  },
  {
    meta: {
      title: 'Presence By Date',
    },
    path: '/presence-date',
    name: 'presence by date',
    component: () => import('@/views/PresenceByDate.vue'),
  },
  {
    meta: {
      title: 'Presence By Month',
    },
    path: '/presence-monthly',
    name: 'presence by month',
    component: () => import('@/views/PresenceByMonth.vue'),
  },
  {
    meta: {
      title: 'Presence By Person',
    },
    path: '/presence-person',
    name: 'presence by person',
    component: () => import('@/views/PresenceByPerson.vue'),
  },
  {
    meta: {
      title: 'Forms',
    },
    path: '/forms',
    name: 'forms',
    component: () => import('@/views/FormsView.vue'),
  },
  {
    meta: {
      title: 'Profile',
    },
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
  },
  {
    meta: {
      title: 'Ui',
    },
    path: '/ui',
    name: 'ui',
    component: () => import('@/views/UiView.vue'),
  },
  {
    meta: {
      title: 'Responsive layout',
    },
    path: '/responsive',
    name: 'responsive',
    component: () => import('@/views/ResponsiveView.vue'),
  }, */
  {
    meta: {
      title: 'Login',
    },
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    meta: {
      title: 'Error',
    },
    path: '/error',
    name: 'error',
    component: () => import('@/views/ErrorView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  },
})

export default router
