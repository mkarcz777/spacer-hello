// eslint-disable-next-line
import Vue from 'vue';
import VueRouter from 'vue-router';
import SearchView from '../views/SearchView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'search',
    component: SearchView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
