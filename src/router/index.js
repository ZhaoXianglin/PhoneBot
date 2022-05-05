import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Chatbot from '../views/Chatbot.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/chatbot',
    name: 'Chatbot',
    component: Chatbot
  },
]

const router = new VueRouter({
  routes,
  mode: 'hash',
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    if (savedPosition) {
      return savedPosition
    }
    return {
      x: 0,
      y: 0
    }
  }
})

export default router
