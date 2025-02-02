<template>
    <div id="menuMobile">
        <ul class="areaMenuMobile">
            <li v-for="item in itensMenu" class="areaButtonMenuMobile">
                <router-link :to="item.url" class="buttonMenuMobile" >
                 
                    <div class="buttonMenuMobileIcon center" :style="buttonSelect(item.url)">
                        <i :class="item.icon" style="font-size: 2rem;"/>
                    </div>
                    <p>{{ item.title }}</p>
                </router-link>
            </li>
            <li>
                <div class="buttonMenuMobile clicked" @click="darkMode()">
                    <div class="buttonMenuMobileIcon center" >
                        <i class="fa-solid fa-lightbulb" style="font-size: 2rem;"/>
                    </div>
                    <p>TEMA</p> 
                </div>
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
            ],
            modo: true,
        }
    },
    methods: {
        darkMode() {
            if(this.modo) {
                document.getElementById('app').classList.add('dark');
                localStorage.setItem('modo', true);
            }
            else {
                document.getElementById('app').classList.remove('dark');
                localStorage.removeItem('modo');
            }
            this.modo = !this.modo;
        },
        buttonSelect(url) {
            return this.$route.path == url ? 'background-image: var(--gradient-primary)' : '';
        }
    }
}
</script>
<style>
#menuMobile {
    width: 100%;
    height: 5rem;
    
    background-color: var(--color-primary);
}
.buttonMenuMobileIcon {
    height: 100%;
    width: 5rem;
    aspect-ratio: 2/1;

    border-radius: 1rem;
    padding: 0.5rem;

    user-select: none;
}
.buttonMenuMobile {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
    gap: 0.2rem;

    -webkit-touch-callout: none;
   -webkit-user-select: none;
   -khtml-user-select: none;
   -moz-user-select: none;
   -ms-user-select: none;
    user-select: none;
}
.areaMenuMobile {
    display: flex;
    justify-content: space-around;
    align-items: center;

    user-select: none;
}
.areaButtonMobile {
    width: 100%;
    margin: 0.2rem;

    user-select: none;
}
</style>