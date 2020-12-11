import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import('src/views/thermometer.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;
