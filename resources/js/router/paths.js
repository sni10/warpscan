import Vue from 'vue';

export default [
    {
        path: '*',
        meta: {
            public: true,
        },
        redirect: {
            path: '/404'
        }
    },
    {
        path: '/404',
        meta: {
            public: true,
        },
        name: 'NotFound',
        component: () => import(
            `../views/system/NotFound.vue`
            )
    },
    {
        path: '/403',
        meta: {
            public: true,
        },
        name: 'AccessDenied',
        component: () => import(
            `../views/system/Deny.vue`
            )
    },
    {
        path: '/500',
        meta: {
            public: true,
        },
        name: 'ServerError',
        component: () => import(
            `../views/system/Error.vue`
            )
    },
    {
        path: '/login',
        meta: {
            public: true,
        },
        name: 'Login',
        component: () => import(
            `../views/Login.vue`
            )
    },
    {
        path: '/',
        redirect: {
            path: '/home'
        },
        component: () => import(
            `../views/layout/Layout.vue`
            ),
        children: [
            {
                path: '/dashboard',
                meta: {
                    breadcrumb: true,
                    public: true
                },
                name: 'Dashboard',
                component: () => import(
                    `../views/Home.vue`
                    )
            },
        ]
    },
];
