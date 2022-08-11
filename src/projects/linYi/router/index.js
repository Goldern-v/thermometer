import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('src/projects/linYi/views/thermometer.vue')
  },
  {
    path: '/detailed',
    name: 'Detailed',
    component: () => import('src/projects/linYi/views/detailed.vue')
  },
  {
    path: '/printAll',
    name: 'Print',
    component: () => import('src/projects/linYi/views/print.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base:"/temperature",
  routes
})

export default router
