<template>
    <div class="areaCardItemOrders">
        <div class="imageCardItemOrders round" :style="`background-image: url(${product.image})`"></div>
        <div class="informationCardItemOrders">
            <div class="titleCardItemOrders">{{ product.title }}</div>
            <div class="descriptionItemOrders">{{product.description}}</div>
        </div>
        <div class="actionCardItemOrders">
            <input-level :value="product.amount" :returnValue="(value) => attAmount(value)" :del="true" :returnDel="(value) => {if(value) exclude(product.id)}"
            style="width: 100%"/>
            <div style="font-weight: bold;">
                R$ {{ (product.amount * product.price).toFixed(2) }}
            </div>
        </div>
    </div>
</template>
<script>
import LevelInput from '@/components/inputs/LevelInput.vue';
import Button from '@/components/buttons/Button.vue';
export default {
    name: 'CardItemOrders',
    components: {
        'input-level': LevelInput,
        'btn': Button
    },
    data() {
        return {

        }
    },
    props: {
        product: {
            type: Object,
            default: null
        },
        upAmount: {
            type: Function,
            default: () => {}
        },
        exclude: {
            type: Function,
            default: () => {}
        }
    },
    methods: {
        attAmount(value) {
            this.product.amount = value;
            this.upAmount(value, this.product.id);
        }
    },
    mounted(){

    }
}
</script>
<style scoped>
.areaCardItemOrders {
    width: 100%;
    height: 6rem;
    display: flex;
    padding: 0 0.5rem;
}
.imageCardItemOrders {
    height: 100%;
    aspect-ratio: 1/1.2;

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
.informationCardItemOrders {
    width: 100%;
    padding: 0 0.5rem;

    display: flex;
    flex-direction: column;
}
.titleCardItemOrders {
    height: 50%;
    font-weight: bold;
    font-size: 1.2rem;

    display: -webkit-box; /* Habilita o modelo de caixa flexível */
    -webkit-line-clamp: 2; /* Limita o texto a 2 linhas */
    -webkit-box-orient: vertical; /* Orientação vertical */
    overflow: hidden; /* Esconde o conteúdo que ultrapassar */
    text-overflow: ellipsis; /* Adiciona "..." ao final do texto */
    white-space: normal;
}
.descriptionItemOrders {
    font-size: 0.8rem;
    display: -webkit-box; /* Habilita o modelo de caixa flexível */
    -webkit-line-clamp: 3; /* Limita o texto a 2 linhas */
    -webkit-box-orient: vertical; /* Orientação vertical */
    overflow: hidden; /* Esconde o conteúdo que ultrapassar */
    text-overflow: ellipsis; /* Adiciona "..." ao final do texto */
    white-space: normal;
}
.actionCardItemOrders {
    width: fit-content;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}
</style>