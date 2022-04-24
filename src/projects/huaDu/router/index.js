import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('src/projects/huaDu/views/thermometer.vue')
  },
  {
    path: '/printAll',
    name: 'Print',
    component: () => import('src/projects/huaDu/views/print.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
