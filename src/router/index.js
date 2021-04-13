import Vue from 'vue';
import VueRouter from 'vue-router';
import Auth from '../views/layouts/Auth.vue';
import Main from '../views/layouts/Main.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  {
    path: '/login',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/album',
    name: 'Album',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Album.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
