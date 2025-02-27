<template>
    <div id="menu" :class="{'mobile': mobile}">
        <ul class="areaMenu">
            <li v-for="item in itensMenu" class="areaButtonMenu">
                <router-link :to="item.url" class="buttonMenu">
                 
                    <div class="buttonMenuIcon center" :style="buttonSelect(item.url)">
                        <i :class="item.icon" style="font-size: 2rem;"/>
                    </div>
                    <p>{{ item.title }}</p>
                </router-link>
            </li>
            <li>
                <div class="buttonMenu clicked" @click="darkMode()">
                    <div class="buttonMenuIcon center" >
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
#menu {
    display: flex;
    justify-content: center;
    position: fixed;
    top: auto;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 4.5rem;
    
    background-color: var(--color-primary);
}
.buttonMenuIcon {
    height: 100%;
    width: 5rem;
    aspect-ratio: 2/1;

    border-radius: 1rem;
    padding: 0.5rem;

    user-select: none;
}
.buttonMenu {
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
.areaMenu {
    display: flex;
    margin-top: 0.2rem;
    justify-content: space-around;
    align-items: center;
    flex: 1;
    user-select: none;
}
#menu:not(.mobile) .areaMenu {
    min-width: 500px;
    max-width: 1000px;
}
.areaButton {
    width: 100%;
    margin: 0.2rem;

    user-select: none;
}
</style>