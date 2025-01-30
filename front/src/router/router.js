import { createRouter, createWebHistory } from 'vue-router';

import HelloWorld from '@/components/HelloWorld.vue';

const routes = [
    {
        path: '/',
        component: HelloWorld,
        name: 'Home',
    },
    {
        path: '/tag/:tag',
        component: HelloWorld,
        name: 'Tag',
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const auth = !!localStorage.getItem('token');

    if (to.meta.requiresAuth && !auth) return next({ name: 'Home'});

    next();
});

console.log('passou rota');

export default router;