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
import Verify from "@/components/leftNav/inStorage/Verify";
import ReturnTable from "@/components/leftNav/outStorage/ReturnTable";
import Borrow from "@/components/leftNav/outStorage/Borrow";
import Return from "@/components/leftNav/outStorage/Return";
import Check from "@/components/leftNav/check/Check";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login,
    },
    {
        path: '/home',
        name: 'home',
        component: HomeView,
        redirect: '/display',
        children: [
            {
                path: '/display',
                name: '资产入库',
                component: Display,
            },
            {
                path: '/verify',
                name: '修改记录表',
                component: Verify,
            },
            {
                path: '/maintain',
                name: '产品维修',
                component: Maintain,
            }, {
                path: '/accept',
                name: '受理中心',
                component: Accept,
            },
            {
                path: '/borrow',
                name: '借用申请',
                component: Borrow,
            },
            {
                path: '/examine',
                name: '借用审批',
                component: Examine,
            },
            {
                path: '/return',
                name: '资产归还',
                component: Return,
            },
            {
                path: '/returnTable',
                name: '归还记录',
                component: ReturnTable,
            },
            {
                path: '/scrap',
                name: '报废中心',
                component: Scrap,
            }, {
                path: '/audit',
                name: '审核中心',
                component: Audit,
            }, {
                path: '/check',
                name: '资产盘点',
                component: Check,
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
