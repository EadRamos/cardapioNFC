<template>
    <template v-if="true">
        <div id="areaCartPGMobile">
            <div class="cartPGMobile">
                <div class="containerCartPGMobile">
                    <div class="titleCategoryCartMobile round">
                        <h2>Carrinho</h2>
                    </div>
                    <div v-if="cart.orders.length" class="listItensCartMobile round">
                        <div style="border-radius: 1rem; width: 1.8rem; aspect-ratio: 1/1; background-color: var(--color-secundary); position: absolute; top: -0.9rem; left: -0.9rem"></div>
                        <div style="border-radius: 1rem; width: 1.8rem; aspect-ratio: 1/1; background-color: var(--color-secundary); position: absolute; top: -0.9rem; right: -0.9rem"></div>

                        <card-item v-for="product in orders" :product="product" :exclude="(id) => cart.removeProduct(id)" :upAmount="(amount, id) => cart.attAmount(id, amount)"/>

                            <div style="border-radius: 1rem; width: 1.8rem; aspect-ratio: 1/1; background-color: var(--color-secundary); position: absolute; bottom: -0.9rem; left: -0.9rem"></div>
                            <div style="border-radius: 1rem; width: 1.8rem; aspect-ratio: 1/1; background-color: var(--color-secundary); position: absolute; bottom: -0.9rem; right: -0.9rem"></div>
                    </div>
                    <div v-else class="listItensCartMobile round">Carrinho vázio</div>
    
                    <div class="totalItensCartMobile round">Total: R$ {{ cart.totalPrice.toFixed(2) }}</div>
                </div>
                <div class="actionCartPGMobile">
                    <btn
                    type="minimal"
                    text="Cancelar"
                    color="gradientSecundary"
                    :rounder="true"
                    style="font-weight: bold;"
                    @click="cart.clearOrders()"/>

                    <btn
                    type="full"
                    text="Fazer Pedido"
                    color="gradientPrimary"
                    :rounder="true"
                    style="font-weight: bold;"/>
                </div>
            </div>

            <div class="ordersCartPGMobile">

            </div>
            <!--<menu-mobile/>-->
        </div>
    </template>

</template>
<script>
import MenuMobile from '@/components/manus/MenuMobile.vue';
import Button from '@/components/buttons/Button.vue';
import CardItemOrders from '@/components/itens/CardItemOrders.vue';

import authStore from '@/store/auth.js';

import cartStore from '@/store/cart.js';
import { storeToRefs } from "pinia";

export default {
    name: 'CartPG',
    data() {
        const cart = cartStore();
        const auth = authStore();
        return {
            cart,
            feito: false,
            ...storeToRefs(cart)
        }
    },
    components: {
        'menu-mobile': MenuMobile,
        'btn': Button,
        'card-item': CardItemOrders
    },
    methods: {

    },
    mounted() {

    }
}
</script>
<style>
#areaCartPGMobile {
    width: 100%;
    height: calc(100% - 4.2rem);
    min-height: calc(100vh - 4.2rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    color: var(--color-primary-inverse);
    background-color: var(--color-secundary);
}
.containerCartPGMobile {
    width: 95%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    border-radius: 2rem;
    /*background-image: var(--gradient-primary);*/
}
.cartPGMobile {
    width: 100%;
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    color: black;

}
.titleCategoryCartMobile {
    width: 100%;
    height: 4rem;
    padding: 1rem 1rem;

    text-align: center;

    background-image: var(--gradient-primary);

    font-size: 1rem;
}
.listItensCartMobile {
    width: 100%;
    height: fit-content;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    padding: 0.5rem 0;
    border: 1px dashed rgba(0, 0, 0, 0.2);
    background-image: var(--gradient-primary);
}
.totalItensCartMobile {
    width: 100%;
    padding: 1rem;
    text-align: right;
    font-size: 1.2rem;
    font-weight: bold;
    background-image: var(--gradient-primary);
}
.actionCartPGMobile {
    width: 70%;
    height: fit-content;
    padding: 1rem 0rem;
    display: flex;
    gap: 1rem;
}
</style>