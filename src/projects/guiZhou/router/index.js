import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('src/projects/guiZhou/views/thermometer.vue')
  },
  {
    path: '/printAll',
    name: 'Print',
    component: () => import('src/projects/guiZhou/views/print.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
