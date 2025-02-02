import { createRouter, createWebHistory } from 'vue-router';

import HelloWorld from '@/components/HelloWorld.vue';
import LoginPG from '@/pages/login/LoginPG.vue';
import MenuPG from '@/pages/login/menu/MenuPG.vue';

const routes = [
    {
        path: '/',
        component: MenuPG,
        name: 'Home',
    },
    {
        path: '/cardapio',
        component: MenuPG,
        name: 'Cardapio',
    },
    {
        path: '/login',
        component: LoginPG,
        name: 'Login',
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