import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Display from "@/components/leftNav/inStorage/Display";
import Verify from "@/components/leftNav/inStorage/Verify";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        children: [
            {
                path: '/display',
                name: '资产展示',
                component: Display,
                // hidden: true,
                // meta: {
                //   requireAuth: false
                // }
            },
            {
                path: '/verify',
                name: '资产核实',
                component: Verify,
            }
        ]
    },

]

const router = new VueRouter({
    routes
})

export default router
