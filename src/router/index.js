import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Pretest from '../views/Pretest.vue'
import Success from "@/views/Success";
import Scenario from "@/views/Scenario";
import Assistant from "@/views/Assistant";
import List from "@/views/List";
import Assistant_single from "@/views/Assistant_single.vue";


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
        path: '/massistant',
        name: 'assistant',
        component: Assistant
    },
    {
        path: '/sassistant',
        name: 'singel_assistant',
        component: Assistant_single
    },
    {
        path: '/list',
        name: 'list',
        component: List
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
        path: '/success',
        name: 'Thanks',
        component: Success
    },
    {
        path: '/beforetable',
        name: 'BeforeTable',
        component: () => import('../views/BeforeTable.vue')
    },
    {
        path: '/game',
        name: 'Game',
        component: () => import('../views/Game.vue')
    },
    {
        path: '/step1',
        name: 'Step1',
        component: () => import('../views/step1.vue')
    },
    {
        path: '/step2',
        name: 'Step2',
        component: () => import('../views/step2.vue')
    },
    {
        path: '/step3',
        name: 'Step3',
        component: () => import('../views/step3.vue')
    },
    {
        path: '/step4',
        name: 'Step4',
        component: () => import('../views/step4.vue')
    },
    {
        path: '/exp1',
        name: 'Exp1',
        component: () => import('../views/step_end11.vue')
    },
    {
        path: '/part2',
        name: 'Part2',
        component: () => import('../views/step_start22.vue')
    }
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
