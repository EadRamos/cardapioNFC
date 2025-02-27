<template>
    <div class="cardItemMenu round" v-if="product">
        <div class="imageCardItemMenu round" :style="[`background-image: url(${product.image})`]">
            <i class="fa-solid fa-cart-shopping iconCardItemMenu" @click.stop="add(product)"/>
        </div>
        <div class="descriptionCardItemMenu">
            <p class="priceCardItemMenu">R$ {{ product.price }}</p>
            <p class="titleCardItemMenu">{{ product.title }}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CardItem',
    props: {
        product: {
            type: Object,
            default: null,
        },
        add: {
            type: Function,
            default: () => {}
        }
    }
}
</script>
<style>
.cardItemMenu {
    width: 8rem;
    height: fit-content;
    flex: 8rem 0 0;
    aspect-ratio: 1/1.7;
    overflow: hidden;

    box-shadow: 0.2rem 0.3rem 0.5rem 0 rgba(0, 0, 0, 0.05);
    background-color: var(--color-primary);
}

.imageCardItemMenu {
    width: 100%;
    aspect-ratio: 1/1;
    position: relative;
    margin-bottom: 0.2rem;

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: var(--color-primary);
}
.titleCardItemMenu {
    width: 100%;
    padding: 0.2rem 0;
    font-size: 1rem;

    display: -webkit-box; /* Habilita o modelo de caixa flexível */
    -webkit-line-clamp: 2; /* Limita o texto a 2 linhas */
    -webkit-box-orient: vertical; /* Orientação vertical */
    overflow: hidden; /* Esconde o conteúdo que ultrapassar */
    text-overflow: ellipsis; /* Adiciona "..." ao final do texto */
    white-space: normal;
}
.iconCardItemMenu {
    aspect-ratio: 1/1;
    height: fit-content;
    position: absolute;
    top: 0.5rem; 
    right: 0.5rem;  
    padding: 0.2rem;
    font-size: 1.2rem;
    border-radius: 50%;
    color: white; 
    transition: transform 0.2s ease;
}
.iconCardItemMenu:hover {
    transform: scale(120%);
}
.descriptionCardItemMenu {
    width: 100%;
    padding: 0 0.5rem;

    color: var(--color-primary-inverse);
}
.priceCardItemMenu {
    font-size: 1.3rem;
    font-weight: bold;
    color: rgb(4, 187, 4);
}
</style>