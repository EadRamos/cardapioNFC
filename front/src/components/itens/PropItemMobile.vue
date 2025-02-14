<template>
    <div id="propItemMobile" v-if="visible">
        <div class="imgPropItem" :style="`background-image: url(${product.image})`">
            <pop-btn
                :icon="'fa-solid fa-angle-left'"
                @click="setVisible(false)"/>
        </div>

        <div class="informationPropItem">
            <h1 class="titlePropItem">{{ product.title }}</h1>
            <p class="descriptionPropItem">{{ product.description }}</p>
            <h2 class="pricePropItem">R$ {{ product.price }}</h2>
        </div>

        <div class="actionPropItem">

            <input-level :value="amount" :returnValue="(value) => amount = value"/>

            <btn
            class="clicked"
            type="full"
            :text="`Adicionar - R$ ${(amount * product.price).toFixed(2)}`"
            color="gradientPrimary"
            :rounder="true"
            style="margin-left: 1rem; font-weight: bold;"
            @click="addProduct()"/>
        </div>
        <simple-message v-if="messageAviso.length > 0" :message="messageAviso" :returnMessage="(value) => messageAviso = value" time="4000"/>
    </div>
</template>

<script>
import Button from '@/components/buttons/Button.vue';
import PopButton from '@/components/buttons/PopButton.vue';
import LevelInput from '@/components/inputs/LevelInput.vue';
import SimpleSucessMessageMobile from '@/components/messages/SimpleSucessMessageMobile.vue';

import cartStore from '@/store/cart.js';

export default {
    name: 'PropItemMobile',
    components: {
        'pop-btn': PopButton,
        'btn': Button,
        'input-level': LevelInput,
        'simple-message': SimpleSucessMessageMobile,

    },
    data() {
        return {
            amount: 1,
            cart: null,
            popStateListener: null,
            messageAviso: '',
        }
    },
    props: {
        product: {
            type: Object,
            default: null
        },
        visible: {
            type: Boolean,
            default: false,
        },
        setVisible: {
            type: Function,
            default: () => {}
        }
    },
    methods: {
        addProduct(){

            this.cart.addProductAmount(this.product, this.amount);
            this.messageAviso = `O item ( ${this.product.title} ) foi adicionado ao carrinho.`;
        }
    },
    computed: {
        price() {
            return this.product.price + this.amount;
        }
    },
    mounted() {
        window.history.pushState(null, null, window.location.href);

        // Define o evento de 'popstate'
        this.popStateListener = () => {
            // Lógica de prevenção de navegação
            this.setVisible(false);
            
            // Opcional: Atualiza o estado no histórico para bloquear o back
            window.history.pushState(null, null, window.location.href);
            
            // Remover o event listener após disparar uma vez
            window.removeEventListener('popstate', this.popStateListener);
        };

        window.addEventListener('popstate', this.popStateListener);

        this.cart = cartStore();
    },
    beforeDestroy() {
        if (this.popStateListener) {
        window.removeEventListener('popstate', this.popStateListener);
        }
    }
}
</script>
<style>
#propItemMobile {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100% - 4.5rem);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 950;
    background-color: var(--color-primary);
}
.imgPropItem {
    width: 100%;
    aspect-ratio: 1/1;
    max-height: 40%;
    padding: 1rem;
    background-color: var(--color-primary-inverse);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
.informationPropItem {
    width: 100%;
    height: 100%;

    margin-top: -2rem;

    padding: 2rem;
    border-radius: 1.5rem 1.5rem 0 0;
    overflow-y: auto;
    background-color: var(--color-secundary);
    color: var(--color-primary-inverse);
}
.titlePropItem, .descriptionPropItem {
    width: 100%;
    height: fit-content;
    margin-top: 1rem;
}
.pricePropItem {
    margin-top: 2rem;
    color: rgb(68, 207, 68);
}
.actionPropItem {
    display: flex;
    align-items: center;
    width: 100%;
    height: fit-content;
    padding: 1rem;

    border-top: 1px solid rgba(122, 122, 122, 0.1);
}
</style>