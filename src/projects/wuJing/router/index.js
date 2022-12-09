import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('src/projects/wuJing/views/thermometer.vue') //疼痛版本
  },
  {
    path: '/printAll',
    name: 'Print',
    component: () => import('src/projects/wuJing/views/print.vue') //疼痛版本打印
  },
  {
    path: '/withoutPain',
    name: 'WithoutPain',
    component: () => import('src/projects/wuJing/views/withoutPain.vue') //默认版本无疼痛
  },
  {
    path: '/withoutPainAll',
    name: 'WithoutPainAll',
    component: () => import('src/projects/wuJing/views/printnoPain.vue') //默认版本无疼痛
  },
]

const router = new VueRouter({
  routes
})

export default router
