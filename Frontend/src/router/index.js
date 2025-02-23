import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/Add-customer',
      name: 'Add-customer',
    component: () => import('../views/Add-customer.vue'),
    },
    {
      path: '/Update-customer/:id',
      name: 'Update-customer',
    component: () => import('../views/Update-customer.vue'),
    }
  ],
})

export default router
