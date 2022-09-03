import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  
  // Account
  {
    path: '/account',
    name: "account",
    component : () => import('../layouts/Login.vue')
  },
  {
    path:'/profile',
    name:'profile',
    component : () => import('../views/Profile')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.name != 'account' && store.state.auth.isLogin == false) {
//     next({ name: 'account' })
//   } else if (to.name == 'account' && store.state.auth.isLogin == true) {
//     next({ name: 'home' })
//   } else {
//     next()
//   }
// })

export default router
