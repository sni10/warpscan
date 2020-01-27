import Login from "../views/Login";
import Logout from "../views/Logout";
import About from "../views/About";
import Layout from "../views/layout/Layout";
import Home from "../views/Home";
import Test from "../views/Test";
import Organization from "../views/organization/Organization";

import Error404 from "../views/error/Error404";

export default [
    // { path: '*', component: NotFoundComponent },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            public: true,  // Allow access to even if not logged in
            onlyGuest: true
        }
    },
    {
        path: "/logout",
        name: "logout",
        component: Logout,
        meta: {
            public: false,
            onlyGuest: false
        }
    },
    {
        path: "/",
        component: Layout,
        children: [
            {
                path: "/",
                redirect: "/home",
                name: "main",
                meta: {
                    public: false,  // Allow access to even if not logged in
                    onlyGuest: false
                }
            },
            {
                path: "/home",
                name: "home",
                component: Home,
                meta: {
                    public: false,  // Allow access to even if not logged in
                    onlyGuest: false
                }
            },
            {
                path: "/test",
                name: "test",
                component: Test,
                meta: {
                    public: true,  // Allow access to even if not logged in
                    onlyGuest: false
                }
            },
            {
                path: '/about',
                name: 'about',
                component: About,
                meta: {
                    public: true,  // Allow access to even if not logged in
                    onlyGuest: false
                }
            },
            {
                path: '/organization',
                name: 'organization',
                component: Organization,
                meta: {
                    public: false,  // Allow access to even if not logged in
                    onlyGuest: false
                }
            }
        ]
    }
];
