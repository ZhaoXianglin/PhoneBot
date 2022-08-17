import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Chatbot from '../views/Chatbot.vue'
import ChatbotwithExp from '@/views/ChatbotwithExp.vue'
import Pretest from '../views/Pretest.vue'
import Tutorial from '../views/Tutorial.vue'
import Que1 from "@/views/Que1";
import Que2 from "@/views/Que2";
import Que3 from "@/views/Que3";
import Que4 from "@/views/Que4";
import Success from "@/views/Success";
import Scenario from "@/views/Scenario";
import ChatHumanHigh from "@/views/ChatHumanHigh";
import Assistant from "@/views/Assistant";

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
        path: '/tutorial',
        name: 'Tutorial',
        component: Tutorial
    },
    {
        path: '/chatbl',
        name: 'Chatbot',
        component: Chatbot
    },
    {
        path: '/chatbh',
        name: 'chatbot with exp',
        component: ChatbotwithExp
    },
    {
        path: '/assistant',
        name: 'assistant',
        component: Assistant
    },
    {
        path: '/chathh',
        name: 'human high high message interactivity',
        component: ChatHumanHigh
    },
    {
        path: '/scenario',
        name: 'scenario',
        component: Scenario
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
        path: '/que3',
        name: 'PostStudy3',
        component: Que3
    },
    {
        path: '/que4',
        name: 'PostStudy4',
        component: Que4
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
    scrollBehavior(to, from, savedPosition) {
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
