<template>
    <div id="menuProductPG" class="full" :class="{'mobile': mobile}">
        <template v-if="see">
            <div class="menuPGFilter" :class="{'mobile': mobile}">
                <button-select class="filterMenuPG" label="Menor Preço" @click="toggleMenor()" :value="menorPreco"/>
                <button-select class="filterMenuPG" label="Maior Preço" @click="toggleMaior()" :value="maiorPreco"/>
                <button-select class="filterMenuPG" label="Promoções" @click="togglePromo()" :value="promotion"/>
            </div>
            <div class="listItensMenuPG" :class="{'mobile': mobile}">
                <div style="padding-left: 0.5rem;">
                    <h1>{{ title }}</h1>
                </div>
                <div class="listItensMenuProductPG" :class="{'mobile': mobile}">
                    <card-item-menu class="itenMenuProductPG"  v-for="(product, keyS) in filtro" :product="product" :add="(prod) => addProduct(prod)" @click="openProduct(product)"/>
                </div>
            </div>
            <!--<menu-mobile/>-->
            <prop-item-mobile v-if="propVisible && mobile" :product="productSelect" :visible="propVisible" :setVisible="(value) => propVisible = value"/>

            <prop-item v-if="propVisible && !mobile" :product="productSelect" :visible="propVisible" :setVisible="(value) => propVisible = value"/>

            <simple-message v-if="messageAviso.length > 0" :message="messageAviso" :returnMessage="(value) => messageAviso = value" time="4000"/>

        </template>
        <template v-else-if="loading">
            <div style=" width: 100%;">
                <div style="margin: 0.5rem; width: calc(100% - 1rem); height: 3rem;" class="animationLoadPage round"></div>
                <div class="menuPGFilter" :class="{'mobile': mobile}">
                    <div style="width: 9rem; height: 2rem" class="animationLoadPage round"></div>
                    <div style="width: 9rem; height: 2rem" class="animationLoadPage round"></div>
                    <div style="width: 9rem; height: 2rem" class="animationLoadPage round"></div>
                </div>
            </div>
            <div class="listItensMenuPG" :class="{'mobile': mobile}">
                <div class="categoryListItensMenuPGMobile">
                    <div style="padding-left: 0.5rem; opacity: 20%">
                        <h1>Carregando</h1>
                    </div>
                    <div class="listItensMenuProductPG" :class="{'mobile': mobile}">
                        <div class="itenMenuProductPG animationLoadPage round" ></div>
                        <div class="itenMenuProductPG animationLoadPage round" ></div>
                        <div class="itenMenuProductPG animationLoadPage round" ></div>
                    </div>
                </div>
                
            </div>
        </template>
    </div>
</template>
<script>
import ButtonSelect from '@/components/inputs/ButtonSelect.vue';
import MenuMobile from '@/components/manus/MenuMobile.vue';
import CardItem from '@/components/itens/CardItem.vue';
import PropItemMobile from '@/components/itens/PropItemMobile.vue';
import PropItem from '@/components/itens/PropItem.vue';
import SimpleSucessMessageMobile from '@/components/messages/SimpleSucessMessageMobile.vue';

import cartStore from '@/store/cart.js';
export default {
    name: 'MenuProdutosPG',
    components: {
        'button-select': ButtonSelect,
        'menu-mobile': MenuMobile,
        'card-item-menu': CardItem,
        'prop-item-mobile': PropItemMobile,
        'prop-item': PropItem,
        'simple-message': SimpleSucessMessageMobile,
    },
    data() {
        const cart = cartStore();
        return {
            cart: cart,
            title: null,
            products: [],
            menorPreco: false,
            maiorPreco: false,
            promotion: false,
            see: false,
            productSelect: null,
            propVisible: false,
            msgError: null,
            loading: true,
            messageAviso: '',
            menuEspandido: []
        }
    },
    props: [
        'categoriaProdutos'
    ],
    methods: {
        async index(){
            if(this.categoriaProdutos){
                
                await this.axios.get(`/cardapio/${this.categoriaProdutos}`)
                .then( response => {
                    if(response.data){
                        this.loading = false;
                        this.title = response.data.iten.title;
                        this.products = response.data.iten.products;
                        this.see = true;
                    }
                })
                .catch(error => {
                    this.loading = false;
                    console.log(error);
                });
            }
        },
        filMenor(products){
            return [...products].sort((a, b) => a.price - b.price);
        },
        filMaior(products){
            return [...products].sort((a, b) => b.price - a.price);
        },
        filPromo(products){
            return products.filter( product => product.promotion);
        },
        toggleMenor() {
            this.maiorPreco = false;
            this.menorPreco = this.menorPreco ? false : true;
        },
        toggleMaior() {
            this.menorPreco = false;
            this.maiorPreco = this.maiorPreco ? false : true;
        },
        togglePromo() {
            this.promotion = !this.promotion;
        },
        openProduct(product) {
            this.productSelect = product;
            this.propVisible = true;
        },
        addProduct(product){

            this.cart.addProduct(product);
            this.messageAviso = `O item ( ${product.title} ) foi adicionado ao carrinho.`;
        }
    },
    computed: {
        filtro(){
            let filter = this.products;

            if(this.menorPreco){
                filter = this.filMenor(filter);
            }
            if(this.maiorPreco){
                filter = this.filMaior(filter);
            }
            if(this.promotion){
                filter = this.filPromo(filter);
            }

            return filter;
        }
    },
    mounted(){
        this.title = this.categoriaProdutos || null;
        console.log(this.title);
        this.index();
    }
}
</script>
<style>
#menuProductPG {
    min-height: 100vh;
}
#menuProductPG:not(.mobile) {
    min-width: 500px;
    max-width: 1000px;
    padding: 1rem;
}
#menuProductPG .mobile {
    width: 100%;
}
.listItensMenuProductPG {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    gap: 0.5rem;
    padding: 0.5rem;
}
.listItensMenuProductPG .mobile  {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    padding: 0.5rem;

    
}
.itenMenuProductPG {
   width: 100%;
   aspect-ratio: 1/1.5;
}

@media screen and (orientation: landscape ) {
    .listItensMenuProductPG .mobile  {
        grid-template-columns: repeat(4, 1fr);
    }
}
@media screen and (orientation: landscape ) and (min-width: 680px){
    .listItensMenuProductPG .mobile  {
        grid-template-columns: repeat(6, 1fr);
    }
}
</style>