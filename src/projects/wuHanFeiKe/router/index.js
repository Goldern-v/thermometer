import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('src/projects/wuHanFeiKe/views/thermometer.vue')
  },
  {
    path: '/pain',
    name: 'Home',
    component: () => import('src/projects/wuHanFeiKe/views/thermometerPain.vue')
  },
  {
    path: '/printAll',
    name: 'Print',
    component: () => import('src/projects/wuHanFeiKe/views/print.vue')
  },
  {
    path: '/painPrintAll',
    name: 'PrintPain',
    component: () => import('src/projects/wuHanFeiKe/views/printPain.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
