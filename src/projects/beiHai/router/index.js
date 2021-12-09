import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('src/projects/beiHai/views/thermometer.vue')
  },
  {
    path: '/printAll',
    name: 'Print',
    component: () => import('src/projects/beiHai/views/print.vue')
  },
  {
    path: '/newBorn',
    name: 'NewBorn',
    component: () => import('src/projects/beiHai/views/thermometerNewBorn.vue')
  },
  {
    path: '/newBornPrintAll',
    name: 'NewBornPrintAll',
    component: () => import('src/projects/beiHai/views/newBornPrintAll.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
