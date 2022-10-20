import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Display from "@/components/leftNav/inStorage/Display";
import Maintain from "@/components/leftNav/maintain/Maintain";
import Examine from "@/components/leftNav/outStorage/Examine";
import Scrap from "@/components/leftNav/scrap/Scrap";
import Login from "@/views/Login";
import Audit from "@/components/leftNav/scrap/Audit";
import NoAllow from "@/components/leftNav/NoAllow";
import Accept from "@/components/leftNav/maintain/Accept";

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/',
        name: 'home',
        component: HomeView,
        children: [
            {
                path: '/display',
                name: '资产入库',
                component: Display,
                // hidden: true,
                // meta: {
                //   requireAuth: false
                // }
            }, {
                path: '/maintain',
                name: '产品维修',
                component: Maintain,
            }, {
                path: '/accept',
                name: '受理中心',
                component: Accept,
            }, {
                path: '/examine',
                name: '借用审批',
                component: Examine,
            }, {
                path: '/scrap',
                name: '报废中心',
                component: Scrap,
            }, {
                path: '/audit',
                name: '审核中心',
                component: Audit,
            },
            {
                path: '/noAllow',
                name: 'noAllow',
                component: NoAllow,
            },
        ]
    },

]

const router = new VueRouter({
    routes
})

export default router
