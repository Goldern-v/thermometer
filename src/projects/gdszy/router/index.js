import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('src/projects/gdszy/views/thermometer.vue')
  },
  {
    path: '/detailed',
    name: 'Detailed',
    component: () => import('src/projects/gdszy/views/detailed.vue')
  },
  {
    path: '/printAll',
    name: 'Print',
    component: () => import('src/projects/gdszy/views/print.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
