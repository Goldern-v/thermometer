import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('src/projects/zhzxy/views/thermometer.vue')
  },
  {
    path: '/detailed',
    name: 'Detailed',
    component: () => import('src/projects/zhzxy/views/detailed.vue')
  },
  {
    path: '/printAll',
    name: 'Print',
    component: () => import('src/projects/zhzxy/views/print.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base:"/temperature",
  routes
})

export default router
