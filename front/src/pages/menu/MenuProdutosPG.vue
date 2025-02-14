<template>
    <div id="menuProductPG" class="full">
        <template v-if="true && see">
            <div class="menuPGFilter">
                <button-select class="filterMenuPG" label="Menor Preço" @click="toggleMenor()" :value="menorPreco"/>
                <button-select class="filterMenuPG" label="Maior Preço" @click="toggleMaior()" :value="maiorPreco"/>
                <button-select class="filterMenuPG" label="Promoções" @click="togglePromo()" :value="promotion"/>
            </div>
            <div class="listItensMenuPGMobile">
                <div style="padding-left: 0.5rem;">
                    <h1>{{ title }}</h1>
                </div>
                <div class="listItensMenuProductPGMobile">
                    <card-item-menu class="itenMenuProductPGMobile" v-for="(product, keyS) in filtro" :product="product" @click="openProduct(product)"/>
                </div>
            </div>
            <!--<menu-mobile/>-->
            <prop-item-mobile :product="productSelect" :visible="propVisible" :setVisible="(value) => propVisible = value"/>

        </template>
    </div>
</template>
<script>
import ButtonSelect from '@/components/inputs/ButtonSelect.vue';
import MenuMobile from '@/components/manus/MenuMobile.vue';
import CardItem from '@/components/itens/CardItem.vue';
import PropItemMobile from '@/components/itens/PropItemMobile.vue';

export default {
    name: 'MenuProdutosPG',
    components: {
        'button-select': ButtonSelect,
        'menu-mobile': MenuMobile,
        'card-item-menu': CardItem,
        'prop-item-mobile': PropItemMobile,
    },
    data() {
        return {
            
            title: null,
            products: [],
            menorPreco: false,
            maiorPreco: false,
            promotion: false,
            see: false,
            productSelect: null,
            propVisible: false
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
                        
                        this.title = response.data.iten.title;
                        this.products = response.data.iten.products;
                        this.see = true;
                    }
                })
                .catch(error => {
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
    background-color: var(--color-secundary);

    color: var(--color-primary-inverse);
}
.listItensMenuProductPGMobile {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    padding: 0.5rem;

    
}
.itenMenuProductPGMobile {
   width: 100%;
   aspect-ratio: 1/1.5;
}

@media screen and (orientation: landscape ) {
    .listItensMenuProductPGMobile {
        grid-template-columns: repeat(4, 1fr);
    }
}
@media screen and (orientation: landscape ) and (min-width: 680px){
    .listItensMenuProductPGMobile {
        grid-template-columns: repeat(6, 1fr);
    }
}
</style>