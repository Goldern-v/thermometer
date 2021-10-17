import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('src/projects/liaoCheng/views/thermometer.vue')
  },
  {
    path: '/print',
    name: 'Print',
    component: () => import('src/projects/liaoCheng/views/print.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
