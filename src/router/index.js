import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: () => import(/* webpackChunkName: "about" */ '../views/FavoriteView.vue')
  },
  {
    path: '/memory',
    name: 'memory',
    component: () => import(/* webpackChunkName: "about" */ '../views/MemoryView.vue')
  },
  {
    path: '/summer',
    name: 'summer',
    component: () => import(/* webpackChunkName: "about" */ '../views/SummerView.vue')
  },
  {
    path: '/autumn',
    name: 'autumn',
    component: () => import(/* webpackChunkName: "about" */ '../views/AutumnView.vue')
  },
  {
    path: '/winter',
    name: 'winter',
    component: () => import(/* webpackChunkName: "about" */ '../views/WinterView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
