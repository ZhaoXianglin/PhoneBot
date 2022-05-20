import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Chatbot from '../views/Chatbot.vue'
import Pretest from '../views/Pretest.vue'
import Que1 from "@/views/Que1";
import Que2 from "@/views/Que2";
import Success from "@/views/Success";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Index
  },
  {
    path: '/index',
    name: 'Index',
    component: Index
  },
  {
    path: '/chatbot',
    name: 'Chatbot',
    component: Chatbot
  },
  {
    path: '/prestudy',
    name: 'PreStudy',
    component: Pretest
  },
  {
    path: '/que1',
    name: 'PostStudy1',
    component: Que1
  },
  {
    path: '/que2',
    name: 'PostStudy2',
    component: Que2
  },
  {
    path: '/success',
    name: 'Thanks',
    component: Success
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
