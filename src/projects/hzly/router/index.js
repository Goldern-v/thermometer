import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/thermometer.vue')
  },
  {
    path: '/detailed',
    name: 'Detailed',
    component: () => import('../views/detailed.vue')
  },
  {
    path: '/printAll',
    name: 'Print',
    component: () => import('../views/print.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
