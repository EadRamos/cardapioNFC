<template>
    <div id="menuMobile" style="background-color: var(--color-primary);">
        <ul style="display: flex; justify-content: space-around; align-items: center;">
            <li v-for="item in itensMenu" style="width: 100%; margin: 0.2rem;">
                <router-link :to="item.url" class="bottaoMenuMobile round" :style="[$route.path == item.url ? 'background-image: var(--gradient-primary)' : '']">
                 
                    <i :class="item.icon" style="font-size: 2rem;"/>
                    {{ item.title }}
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'MenuMobile',
    data() {
        return {
            itensMenu: [
                {
                    icon: 'fa-solid fa-house',
                    title: 'HOME',
                    url: '/'
                },
                {
                    icon: 'fa-solid fa-book',
                    title: 'CARDÁPIO',
                    url: '/cardapio'
                },
                {
                    icon: 'fa-solid fa-receipt',
                    title: 'PEDIDOS',
                    url: '/pedidos'
                }
            ]
        }
    },
    methods: {

    }
}
</script>
<style>
#menuMobile {
    width: 100%;
    height: 5rem;
    
}
.bottaoMenuMobile {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 1rem;
    gap: 0.2rem;
}
</style>