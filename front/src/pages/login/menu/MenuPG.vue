<template>
    <div id="menuPG" class="full" style="position: relative; background-color: var(--color-secundary);">
        <template v-if="true">
            <div style="position: absolute; width: 100%; height: 6.5rem; top: 0; left: 0;">
                <input-pesquisa
                label="Pesquisa"
                :labelVisible="false"
                icon="fa-solid fa-magnifying-glass"
                style="margin: 0.5rem; width: calc(100% - 1rem);"/>

                <div class="menuPGFilter">
                    <button-select class="filterMenuPG" label="Menor Preço" />
                    <button-select class="filterMenuPG" label="Maior Preço" />
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
                <div style="width: 100%; height: fit-content; margin-bottom: 0.5rem;" v-for="(item, key) in itensFilter">
                    <div style="display: flex; justify-content: space-between; padding: 0.5rem 1rem;">
                        <h1 style="font-size: 1.5rem;">{{item.title}}</h1>
                        <i class="fa-solid fa-up-right-and-down-left-from-center" style="font-size: 1.5rem;"/>
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
                    values: ['2,50','3,40']
                },
                {
                    title: 'Hamburguer',
                    values: ['1,25','2,50','1,25','3,40']
                },
                {
                    title: 'Pizza',
                    values: ['2,50','3,40']
                },
            ],
            categoria: '',
            categorias: [],
            itensFilter: []
        }
    },
    watch: {
        categoria(val){
            this.categoria = val;
            let filter = [];
            if(this.categoria){
                this.filter = this.itens.filter((item) => item.title.includes(this.categoria))
            }
            if(filter.length > 0) {
                this.itensFilter = this.filter;
            } else {
                this.itensFilter = this.itens
            }
            
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
    overflow-x: hidden;
}
.filterMenuPG {
    min-width: 8rem;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.menuPGFilter {
    width: 100%;
    height: 50vh;
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
    margin-top: 6.5rem;
    overflow-y: auto;
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
</style>