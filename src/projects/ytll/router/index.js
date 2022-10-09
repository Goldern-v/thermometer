import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('src/projects/ytll/views/thermometer.vue')
  },
  {
    path: '/detailed',
    name: 'Detailed',
    component: () => import('src/projects/ytll/views/detailed.vue')
  },
  {
    path: '/printAll',
    name: 'Print',
    component: () => import('src/projects/ytll/views/print.vue')
  },
  {
    path: '/toPdf',
    name: 'ToPdf',
    component: () => import('src/projects/ytll/views/toPdf.vue')
  }
]
const router = new VueRouter({
  mode: 'history',
  base:"/temperature",
  routes
})

export default router
