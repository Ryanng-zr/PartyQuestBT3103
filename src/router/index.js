import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import { getAuth } from 'firebase/auth';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/Register.vue'),
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () =>
            import(
                /* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'
            ),
        meta: {
            authRequired: true,
        },
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    const auth = getAuth();
    if (to.matched.some(record => record.meta.authRequired)) {
        if (auth.currentUser) {
            next();
        } else {
            alert('You must be logged in to see this page');
            next({
                path: '/',
            });
        }
    } else {
        next();
    }
});

export default router;
