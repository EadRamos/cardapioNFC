<template>
    <div id="menuPG" class="full">
        <template v-if="true && !loading">
            <div style=" width: 100%;">
                <input-pesquisa
                label="Pesquisa"
                :labelVisible="false"
                icon="fa-solid fa-magnifying-glass"
                style="margin: 0.5rem; width: calc(100% - 1rem);"
                :returnInput="(value) => pesquisa = value"/>

                <div class="menuPGFilter">
                    <button-select class="filterMenuPG" label="Menor Preço" @click="filterMenorValor()" :value="menorPreco" />
                    <button-select class="filterMenuPG" label="Maior Preço" @click="filterMaiorValor()" :value="maiorPreco"/>
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
                <div v-if="!msgError" class="categoryListItensMenuPGMobile" v-for="(item, key) in filtro" v-show="item.products.length">
                    <div class="titleCategoryList">
                        <h1>{{item.title}}</h1>
                        <i class="fa-solid fa-angles-right clicked" @click="$router.push(`/cardapio/${item.title}`)"/>
                    </div>
                    <div class="scrollItensMenuMobile">
                        <card-item-menu class="clicked" v-for="(product, keyS) in item.products" :product="product" @click="openProduct(product)"/>
                    </div>
                </div>
                <div v-else style="display: flex; justify-content: center; align-items: center; height: 100%">{{ msgError }}</div>
            </div>
           <!-- <menu-mobile/>-->
            <prop-item-mobile v-if="propVisible" :product="productSelect" :visible="propVisible" :setVisible="(value) => propVisible = value"/>
        </template>
        <template v-else>
            <div style=" width: 100%;">
                <div style="margin: 0.5rem; width: calc(100% - 1rem); height: 3rem;" class="animationLoadPage round"></div>
                <div class="menuPGFilter">
                    <div style="width: 9rem; height: 2rem" class="animationLoadPage round"></div>
                    <div style="width: 9rem; height: 2rem" class="animationLoadPage round"></div>
                    <div style="width: 9rem; height: 2rem" class="animationLoadPage round"></div>
                </div>
            </div>
            <div class="listItensMenuPGMobile">
                <div class="categoryListItensMenuPGMobile">
                    <div class="titleCategoryList" style="opacity: 20%">
                        <h1>Carregando</h1>
                    </div>
                    <div class="scrollItensMenuMobile">
                        <div class="animationLoadPage round" style="width: 10rem; height: 12rem"></div>
                        <div class="animationLoadPage round" style="width: 10rem; height: 12rem"></div>
                        <div class="animationLoadPage round" style="width: 10rem; height: 12rem"></div>
                    </div>
                </div>
                <div class="categoryListItensMenuPGMobile">
                    <div class="titleCategoryList" style="opacity: 20%">
                        <h1>Carregando</h1>
                    </div>
                    <div class="scrollItensMenuMobile">
                        <div class="animationLoadPage round" style="width: 10rem; height: 12rem"></div>
                        <div class="animationLoadPage round" style="width: 10rem; height: 12rem"></div>
                        <div class="animationLoadPage round" style="width: 10rem; height: 12rem"></div>
                    </div>
                </div>
                <div class="categoryListItensMenuPGMobile">
                    <div class="titleCategoryList" style="opacity: 20%">
                        <h1>Carregando</h1>
                    </div>
                    <div class="scrollItensMenuMobile">
                        <div class="animationLoadPage round" style="width: 10rem; height: 12rem"></div>
                        <div class="animationLoadPage round" style="width: 10rem; height: 12rem"></div>
                        <div class="animationLoadPage round" style="width: 10rem; height: 12rem"></div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import Input from '@/components/inputs/Input.vue';
import ButtonSelect from '@/components/inputs/ButtonSelect.vue';
import Select from '@/components/inputs/Select.vue';
import CardItem from '@/components/itens/CardItem.vue';
import MenuMobile from '@/components/manus/MenuMobile.vue';
import PropItemMobile from '@/components/itens/PropItemMobile.vue';


export default {
    name: 'MenuPG',
    components: {
        'input-pesquisa': Input,
        'button-select': ButtonSelect,
        'select-cardapio': Select,
        'card-item-menu': CardItem,
        'menu-mobile': MenuMobile,
        'prop-item-mobile': PropItemMobile,

    },
    data() {
        return {
            itens: [
            ],
            categoria: '',
            menorPreco: false,
            maiorPreco: false,
            categorias: [],
            pesquisa: '',
            itensFilter: [],
            propVisible: false,
            productSelect: null,
            msgError: null,
            loading: true,
        }
    },
    computed: {
        filtro() {
            let filter = [];

            if (this.categoria) {
                filter = this.itens.filter((categoria) => categoria.title.includes(this.categoria));

                if (this.pesquisa !== '') {
                    filter = filter.map((categoria) => ({
                        ...categoria,
                        products: categoria.products.filter((item) =>
                            item.title.toLowerCase().includes(this.pesquisa.toLowerCase())
                        )
                    }));
                }
            } else if (this.pesquisa !== '') {
                filter = this.itens.map((categoria) => ({
                    ...categoria,
                    products: categoria.products.filter((item) =>
                        item.title.toLowerCase().includes(this.pesquisa.toLowerCase())
                    )
                }));
            }

            if (filter.length > 0) {
                if (this.menorPreco) {
                    filter = filter.map((categoria) => ({
                        ...categoria,
                        products: [...categoria.products].sort((a, b) => a.price - b.price)
                    }));
                }
                if (this.maiorPreco) {
                    filter = filter.map((categoria) => ({
                        ...categoria,
                        products: [...categoria.products].sort((a, b) => b.price - a.price)
                    }));
                }
                return filter;
            } else {
                if (this.menorPreco) {
                    filter = this.itens.map((categoria) => ({
                        ...categoria,
                        products: [...categoria.products].sort((a, b) => a.price - b.price)
                    }));
                }
                if (this.maiorPreco) {
                    filter = this.itens.map((categoria) => ({
                        ...categoria,
                        products: [...categoria.products].sort((a, b) => b.price - a.price)
                    }));
                }
                return this.pesquisa || this.categoria || this.menorPreco || this.maiorPreco ? filter : this.itens;
            }
        }
    },
    methods: {
        filterMenorValor() {
            this.maiorPreco = false;
            this.menorPreco = this.menorPreco ? false : true;
        
        },
        filterMaiorValor() {
            this.menorPreco = false;
            this.maiorPreco = this.maiorPreco ? false : true;

        },
        async index(){
            try {
                const response = await this.axios.get('/cardapio');
                this.loading = false;
                const { itens } = response.data;
                if(itens?.length > 0){
                    this.itens = itens;
                    this.categorias = this.itens.map((item) => item.title);
                } else {
                    this.msgError = 'Houve um problema ao buscar os produtos.';
                }
            }
            catch( error ) {
                this.msgError = 'Houve um problema ao buscar os produtos.';
                this.loading = false;
                console.log(error.response);
            };
        },
        openProduct(product) {
            console.log('aqui no abrir produto')
            console.log(product);
            this.productSelect = product;
            this.propVisible = true;
        }
    },
    mounted() {
        
        this.index();
        
        
    }
}
</script>
<style>
.sumir {
    display: none;
    
}
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
    height: 100%;
    display: flex;
    flex-direction: column;
 
    margin-bottom: 5rem;

    color: var(--color-primary-inverse);
}
.scrollItensMenuMobile {
    width: 100%;
    height: 15rem;
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