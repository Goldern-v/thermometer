import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('src/projects/dgdl/views/thermometer.vue') //疼痛版本
  },
  {
    path: '/printAll',
    name: 'Print',
    component: () => import('src/projects/dgdl/views/print.vue') //疼痛版本打印
  },
]

const router = new VueRouter({
  routes
})

export default router
