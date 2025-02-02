<template>
    <div class="cardItemMenu round">
        <div class="imageCardItemMenu round" :style="[`background-image: url(${image})`]">
            <i class="fa-solid fa-circle-plus iconCardItemMenu"/>
        </div>
        <div class="descriptionCardItemMenu">
            <p class="priceCardItemMenu">R$ {{ price }}</p>
            <p class="titleCardItemMenu">{{ title }}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CardItem',
    props: {
        price: {
            type: String,
            default: '00,00'
        },
        title: {
            type: String,
            default: ''
        },
        image: {
            type: String,
            default: 'https://www.cnnbrasil.com.br/viagemegastronomia/wp-content/uploads/sites/5/2022/05/mafe-estudio-LV2p9Utbkbw-unsplash.jpg'
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
    width: 10rem;
    height: fit-content;
    flex: 10rem 0 0;
    aspect-ratio: 1/1.6;
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
    font-size: 1.2rem;

    display: -webkit-box; /* Habilita o modelo de caixa flexível */
    -webkit-line-clamp: 2; /* Limita o texto a 2 linhas */
    -webkit-box-orient: vertical; /* Orientação vertical */
    overflow: hidden; /* Esconde o conteúdo que ultrapassar */
    text-overflow: ellipsis; /* Adiciona "..." ao final do texto */
    white-space: normal;
}
.iconCardItemMenu {
    position: absolute;
    top: 0.5rem; 
    right: 0.5rem;  

    font-size: 1.5rem;
    
    color:var(--color-main); 
}
.descriptionCardItemMenu {
    width: 100%;
    padding: 0 0.5rem;

    color: var(--color-primary-inverse);
}
.priceCardItemMenu {
    font-size: 1.5rem;
    font-weight: bold;
}
</style>