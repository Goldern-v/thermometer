import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('src/projects/wuJing/views/thermometer.vue')
  },
  {
    path: '/printAll',
    name: 'Print',
    component: () => import('src/projects/wuJing/views/print.vue')
  },
  {
    path: '/withoutPain',
    name: 'WithoutPain',
    component: () => import('src/projects/wuJing/views/withoutPain.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
