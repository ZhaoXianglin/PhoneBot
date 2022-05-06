import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Chatbot from '../views/Chatbot.vue'
import Pretest from '../views/Pretest.vue'
import Que1 from "@/views/Que1";
import Que2 from "@/views/Que2";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
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
    name: 'PostStudy',
    component: Que1
  },
  {
    path: '/que2',
    name: 'PostStudy',
    component: Que2
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
