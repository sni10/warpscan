import Vue from 'vue';
import Router from 'vue-router';
import Home from "./components/Home";
import About from "./components/About";

const paths = [
    {
        path: '/',
        meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
        },
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        meta: {
            breadcrumb: true,
            public: false,
            onlyGuest: false
        },
        name: 'About',
        component: About
    },
];
Vue.use(Router);

const router =  new Router({
    base: '/',
    mode: 'history', // hash
    linkActiveClass: 'active',
    routes: paths
});

export default router;
