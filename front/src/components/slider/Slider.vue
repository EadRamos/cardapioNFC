<template>
    <div class="areaSlider round">
        <div class="slider" :style="`transform: translateX(calc(-100% * ${index}))`">
            <div v-for="(item, key) in values" class="imageSlider" :style="`background-image: url(${item.url})`" :href="item.link">
            </div>
        </div>
        <div class="areaBtnSlider">
            <div v-for="(item, key) in values" class="btnSlider clicked" @click="index = key" :style="[index == key ? 'width: 3rem': '']"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Slider',
    props: {
        values: {
            type: Array,
            default: [],
        }
    },
    data() {
        return {
            values: [
                {
                    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlE6nodRmFTB0GV7UaHRGnzk1N8jtguQ_k3jyaiKQJ2tCMGK0tj4epZXIA0HjEk8zlAHQ&usqp=CAU',
                    link: 'google.com'
                },
                {
                    url: 'https://api.baraberto.com.br/wp-content/uploads/2024/03/teor-alcoolico-das-bebidas.png',
                    link: 'google.com'
                },
                {
                    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6tIjzqsqGiOqOWnaVBG3kzff3-pIbFJKjxXef9eMTqFslIdO3nmoC6nKEHKIvYHWCNfU&usqp=CAU',
                    link: 'google.com'
                },
                {
                    url: 'https://conteudo.imguol.com.br/c/entretenimento/74/2022/09/13/drinques-bebida-alcoolica-tequila-cerveja-chopp-gim-martini-alcool-copos-tacas-1663094165597_v2_900x506.jpg',
                    link: 'google.com'
                }
            ],
            index: 0,
            keyInterval: null
        }
    },
    methods: {
        runSlider() {
            if(this.values?.length > 0){
                this.keyInterval = setInterval(() => {
                    if(this.index < (this.values.length - 1)){
                        this.index++;
                    }
                    else {
                        this.index = 0;
                    }
                }, 8000);
            }
        }
    },
    mounted() {
        this.runSlider();
    }
}
</script>
<style scoped>
.areaSlider {
    width: 100%;
    aspect-ratio: 3/1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: end;
    gap: 1rem;

    overflow-x: hidden;

    background-color: var(--color-main);
}
.slider {
    min-width: 100%;
    height: 100%;
    display: flex;
    transition: transform 0.5s ease;
}
.imageSlider {
    width: 100%;
    aspect-ratio: 3/1;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
}
.areaBtnSlider {
    width: 100%;
    height: fit-content;
    position: absolute;
    bottom: 1rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
}
.btnSlider {
    width: 1.5rem;
    height: 0.5rem;
    background-color: white;
    border-radius: 0.25rem;
    transition: width 0.5s ease-in-out;
}
</style>