import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: "/",
        name: "tag",
        component : () => import('../components/Tag.vue')
      }
    ]
  },
  // Login
  {
    path: '/account',
    name: "account",
    component : () => import('../layouts/Login.vue')
  },
  {
    path: '/register',
    name: "register",
    component : () => import('../views/account/Register.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
