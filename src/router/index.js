import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '主题'
    },
    component: Home,
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title||''
  next()
})

export default router
