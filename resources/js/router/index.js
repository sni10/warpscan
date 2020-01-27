import Vue from 'vue';
import Router from 'vue-router';
// import routes from './routes';
import paths from './paths';
import store from "../store";

Vue.use(Router);

const router =  new Router({
  base: '/',
  mode: 'history', // hash
  linkActiveClass: 'active',
  routes: paths
});

router.beforeEach((to, from, next) => {

    const isPublic = to.matched.some(record => record.meta.public);

    const isUser = store.getters['auth/isUser'];

    const isGuest = store.getters['auth/isGuest'];

    if ( to.fullPath === '/login' && isUser ) {
        return next({ path:'/' });
    }

    if ( !isPublic && isGuest ) {

        if ( to.fullPath === '/logout' && isGuest ){
            return next({ path:'/login' });
        }

        return next({
            path:'/login',
            query: { redirect: to.fullPath }  // Store the full path to redirect the user to after login
        });

    }

    next();

});

router.afterEach((to, from) => {

});

export default router;

