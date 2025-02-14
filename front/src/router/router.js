import { createRouter, createWebHistory } from 'vue-router';

import LoginPG from '@/pages/login/LoginPG.vue';
import MenuPG from '@/pages/menu/MenuPG.vue';
import MenuProdutosPG from '@/pages/menu/MenuProdutosPG.vue';
import CartPG from '@/pages/cart/CartPG.vue';
import Home from '@/pages/home/Home.vue';

import authStore from '@/store/auth.js';
import { storeToRefs } from "pinia";

const routes = [
    {
        path: '/',
        component: Home,
        name: 'Home',
    },
    {
        path: '/cardapio',
        component: MenuPG,
        name: 'Cardapio',
    },
    {
        path: '/cardapio/:categoriaProdutos',
        component: MenuProdutosPG,
        name: 'CardapioProdutos',
        props: true
    },
    {
        path: '/pedidos',
        component: CartPG,
        name: 'Cart',
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

export default router;