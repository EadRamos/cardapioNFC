<template>
    <div id="homePG">
        <!--<div class="logoHomePG"></div>-->
        <slider class="tagSlider"/>
        <div class="btnDinamic">
            <btn
            class="btnItenDinamic"
            type="full"
            text="CARDÁPIO"
            icon="fa-solid fa-book"
            color="gradientPrimary"
            :rounder="true"
            @click="$router.push({path: '/cardapio'})"
            style="font-weight: bold; height: 4rem;"/>

            <btn
            class="btnItenDinamic"
            type="full"
            text="PEDIDOS"
            icon="fa-solid fa-receipt"
            color="gradientSecundary"
            :rounder="true"
            @click="$router.push({path: '/pedidos'})"
            style="font-weight: bold; height: 4rem;"/>

            <btn
            class="btnItenDinamic"
            type="full"
            text="LOGIN"
            icon="fa-solid fa-user"
            color="gradientPrimary"
            :rounder="true"
            @click="$router.push({path: '/login'})"
            style="font-weight: bold; height: 4rem;"/>
        </div>
        <div class="areaPromocoes">
            <div class="titleAreaPromocoes"> <h1> PROMOÇÕES</h1></div>
            <div class="itensAreaPromoces" >
                <card-item class="cardItemPromotion clicked" v-for="(product, key) in itens" :product="product" @click="openProduct(product)"/>
            </div>
        </div>
        <div>
            <input type="file" name="image" @change="onFileChange">
            <p @click="upload">enviar</p>
        </div>
        <prop-item-mobile v-if="propVisible" :product="productSelect" :visible="propVisible" :setVisible="(value) => propVisible = value"/>
    </div>
</template>
<script>
import Slider from '@/components/slider/Slider.vue';
import CardItem from '@/components/itens/CardItem.vue';
import Button from '@/components/buttons/Button.vue'; 
import PropItemMobile from '@/components/itens/PropItemMobile.vue';

export default {
    name: 'Home',
    components: {
        'slider': Slider,
        'card-item': CardItem,
        'btn': Button,
        'prop-item-mobile': PropItemMobile,
    },
    data() {
        return {   
            loading: false,
            itens: [],
            msgErro: null,
            propVisible: false,
            productSelect: null,
            imageFile: null
        }
    },
    methods: {
        onFileChange(event) {
            this.imageFile = event.target.files[0];
        },
        async upload() {
            if(!this.imageFile) {
                console.log('imagem vaiza');
                return;
            }
            const formData = new FormData();
            formData.append('image', this.imageFile);

            try {
                const response = await this.axios.post('/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(response.data);
            } catch (error) {
                console.error('error: ', error);
            }
        },  
        async index(){
            try {
                const response = await this.axios.get('/');
                this.loading = false;
                const { itens } = response.data;
                if(itens?.length > 0){
                    this.itens = itens;
                } else {
                    this.msgError = 'Houve um problema ao buscar os produtos.';
                }
            }
            catch( error ) {
                this.msgError = 'Houve um problema ao buscar os produtos.';
                this.loading = false;
                console.log(error);
            };
        },
        openProduct(product) {
            console.log('aqui no abrir produto')
            console.log(product);
            this.productSelect = product;
            this.propVisible = true;
        }
    },
    mounted(){
        this.index();
    }
}
</script>
<style scoped>
#homePG {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    background-color: var(--color-secundary);
    color: var(--color-primary-inverse);
    padding: 0.5rem;
    padding-bottom: 5rem;
}
.tagSlider {
    width: 100%;
    aspect-ratio: 3/1;
}
.logoHomePG {
    width: calc(100% + 1rem);
    height: 6rem;
    margin: -0.5rem;
    background-image: url('https://www.emcartaz.net/wp-content/uploads/2021/04/0A9DC881-2825-47D4-9215-DB5733BEE7A6.jpeg');
    background-size: cover;
    background-position: center;
}
.btnItenDinamic {
    flex: 1 1 6rem;
}
.btnDinamic {
    width: 100%;
    max-width: 100%;
    height: fit-content;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap: 1rem;
}
.areaPromocoes {
    width: 100%;
    height: fit-content;
}
.titleAreaPromocoes {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
}
.itensAreaPromoces {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
}
.cardItemPromotion {
    width: 100%;
}

@media screen and (orientation: landscape ) {
    .itensAreaPromoces {
        grid-template-columns: repeat(4, 1fr);
    }
}
@media screen and (orientation: landscape ) and (min-width: 680px){
    .itensAreaPromoces {
        grid-template-columns: repeat(6, 1fr);
    }
}
</style>