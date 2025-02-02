<template>
    <div id="menuPG" class="full">
        <template v-if="true">
            <div style=" width: 100%;">
                <input-pesquisa
                label="Pesquisa"
                :labelVisible="false"
                icon="fa-solid fa-magnifying-glass"
                style="margin: 0.5rem; width: calc(100% - 1rem);"/>

                <div class="menuPGFilter">
                    <button-select class="filterMenuPG" label="Menor Preço" @click="filterMenorValor()" />
                    <button-select class="filterMenuPG" label="Maior Preço" @click="filterMaiorValor()"/>
                    <select-cardapio
                    class="filterMenuPG"
                    label="Categoria"
                    :values="categorias"
                    :labelVisible="false"
                    :valueSelect="(value) => categoria = value"
                    :minimal="false"/>
                </div>
            </div>
            <div class="listItensMenuPGMobile">
                <div class="categoryListItensMenuPGMobile" v-for="(item, key) in filtro">
                    <div class="titleCategoryList">
                        <h1>{{item.title}}</h1>
                        <i class="fa-solid fa-angles-right" />
                    </div>
                    <div class="scrollItensMenuMobile">
                        <card-item-menu v-for="(card, keyS) in item.values" :price="card" title="Eadmwo awd a wad awdawd awd aw da wda dw d awd awd  adwdawda awd awda wda wdadda"/>
                    </div>
                </div>
            </div>
            <menu-mobile/>
        </template>
    </div>
</template>
<script>
import Input from '@/components/inputs/Input.vue';
import ButtonSelect from '@/components/inputs/ButtonSelect.vue';
import Select from '@/components/inputs/Select.vue';
import CardItem from '@/components/itens/CardItem.vue';
import MenuMobile from '@/components/manus/MenuMobile.vue';

export default {
    name: 'MenuPG',
    components: {
        'input-pesquisa': Input,
        'button-select': ButtonSelect,
        'select-cardapio': Select,
        'card-item-menu': CardItem,
        'menu-mobile': MenuMobile

    },
    data() {
        return {
            itens: [
                {
                    title: 'Pizza',
                    values: ['2,50','3,40','1,25','2,50','1,25']
                },
                {
                    title: 'Hamburguer',
                    values: ['1,25','2,50','1,25','3,40']
                },
                {
                    title: 'Pizza',
                    values: ['2,50','3,40','1,25','2,50','1,25']
                },
            ],
            categoria: '',
            menorPreco: true,
            maiorPreco: false,
            categorias: [],
            itensFilter: []
        }
    },
    computed: {
        filtro(){
            let filter = [];
            if(this.categoria){ 
                filter = this.itens.filter((item) => item.title.includes(this.categoria))
            }
            if(filter.length > 0) {
                if(this.menorPreco){
                    filter = filter.map((item) => {
                        const vall = item.values.sort((a,b) => {
                            if(a>b) return 1;

                            return a<b ? -1 : 0;
                            
                        })
                        return {
                            title: item.title,
                            values: vall
                        }
                    })
                }
                if(this.maiorPreco){
                    filter = filter.map((item) => {
                        const vall = item.values.sort(
                            (a,b) => {
                                if(a<b) return 1;

                                return a>b ? -1 : 0;
                                
                            })
                        return {
                            title: item.title,
                            values: vall
                        }
                    })
                }
                return filter;
            } else {
                if(this.menorPreco){
                    filter = this.itens.map((item) => {
                        const vall = item.values.sort((a,b) => {
                            if(a>b) return 1;

                            return a<b ? -1 : 0;
                            
                        })
                        return {
                            title: item.title,
                            values: vall
                        }
                    })
                }
                if(this.maiorPreco){
                    filter = this.itens.map((item) => {
                        const vall = item.values.sort((a,b) => {
                            if(a<b) return 1;

                            return a>b ? -1 : 0;
                            
                        })
                        return {
                            title: item.title,
                            values: vall
                        }
                    })
                }
                return filter.length > 0 ? filter : this.itens;
            }
            
        }
    },
    methods: {
        filterMenorValor() {
            this.menorPreco = !this.menorPreco;
            this.maiorPreco = false;
        },
        filterMaiorValor() {
            this.maiorPreco = !this.maiorPreco;
            this.menorPreco = false;
        }
    },
    mounted() {
        this.itensFilter = this.itens;
        this.categorias = this.itens.map((item) => item.title);
    }
}
</script>
<style>
#menuMobile {
    position: fixed;
    bottom: 0;
}
#menuPG {
    display: flex;
    flex-direction: column;
    height:100%;
    min-height: 100vh;

    background-color: var(--color-secundary);
}
.filterMenuPG {
    min-width: 8rem;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.menuPGFilter {
    width: 100%;
    height: fit-content;
    padding: 0.3rem 0.5rem;
    display: flex;
    gap: 1rem;
    align-items: start;
    justify-content: space-around;

    overflow-x: auto;
    scrollbar-width: none;

    border: 0px solid rgba(0, 0, 0, 0.1);
    border-top-width: 1px;
}
.menuPGFilter::-webkit-scrollbar {
    display: none;
}
.listItensMenuPGMobile {
    width: 100%;
    display: flex;
    flex-direction: column;
 
    margin-bottom: 5rem;

    color: var(--color-primary-inverse);
}
.scrollItensMenuMobile {
    width: 100%;
    height: 17rem;
    display: flex;
    overflow-x: scroll;
    scrollbar-width: none;
    padding: 0 0.5rem;
 
    gap: 0.2rem;
}
.scrollItensMenuMobile::-webkit-scrollbar {
    display: none;
}

.categoryListItensMenuPGMobile {
    width: 100%;
    height: fit-content;
    margin-bottom: 0.5rem;
}
.categoryListItensMenuPGMobile .titleCategoryList {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;

    font-size: 1rem;
}
</style>