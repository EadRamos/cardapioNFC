<template>
    <div id="homePG">
      <!-- Componente de Slider com classe mestra e classe dinâmica para mobile -->
      <slider :class="{'tagSlider': true, 'mobile': mobile}" />
  
      <!-- Área de botões com classe mestra atualizada para mobile/desktop -->
      <div :class="{'btnDinamico': true, 'mobile': mobile}">
        <btn
          class="btnItemDinamico"
          type="full"
          text="CARDÁPIO"
          icon="fa-solid fa-book"
          color="gradientPrimary"
          :rounder="true"
          @click="$router.push({ path: '/cardapio' })"
          :style="styleBtn"
        />
  
        <btn
          class="btnItemDinamico"
          type="full"
          text="PEDIDOS"
          icon="fa-solid fa-receipt"
          color="gradientSecundary"
          :rounder="true"
          @click="$router.push({ path: '/pedidos' })"
          :style="styleBtn"
        />
  
        <btn
          class="btnItemDinamico"
          type="full"
          text="LOGIN"
          icon="fa-solid fa-user"
          color="gradientPrimary"
          :rounder="true"
          @click="$router.push({ path: '/login' })"
          :style="styleBtn"
        />
      </div>
  
      <!-- Área de Promoções -->
      <div :class="{'areaPromocoes': true, 'mobile': mobile}">
        <div class="titleAreaPromocoes">
          <h1>PROMOÇÕES</h1>
        </div>
        <div :class="{'itensAreaPromocoes': true, 'mobile': mobile}">
          <!-- Utiliza método para definir o delay da animação, evitando lógica inline -->
          <card-item 
            class="cardItemPromotion clicked" 
            v-for="(product, key) in itens" 
            :key="key"
            :product="product" 
            :add="(prod) => addProduct(prod)" 
            @click="openProduct(product)"
            :style="styleCardAnimation(key)"
          />
        </div>
      </div>
  
      <!-- Upload de imagem -->
      <div>
        <input type="file" name="image" @change="onFileChange" />
        <p @click="upload">enviar</p>
      </div>
  
      <!-- Renderização condicional de componentes para mobile e desktop -->
      <!-- Utiliza v-if/v-else para separar a renderização conforme a versão -->
      <prop-item-mobile 
        v-if="propVisible && mobile" 
        :product="productSelect" 
        :visible="propVisible" 
        :setVisible="(value) => propVisible = value" 
      />
      <prop-item 
        v-else-if="propVisible && !mobile" 
        :product="productSelect" 
        :visible="propVisible" 
        :setVisible="(value) => propVisible = value" 
      />
  
      <!-- Exibe mensagem simples com feedback ao usuário -->
      <simple-message 
        v-if="messageAviso.length > 0" 
        :message="messageAviso" 
        :returnMessage="(value) => messageAviso = value" 
        time="4000"
      />
    </div>
  </template>
  
  <script>
  import Slider from '@/components/slider/Slider.vue';
  import CardItem from '@/components/itens/CardItem.vue';
  import Button from '@/components/buttons/Button.vue';
  import PropItemMobile from '@/components/itens/PropItemMobile.vue';
  import PropItem from '@/components/itens/PropItem.vue';
  import SimpleSuccessMessageMobile from '@/components/messages/SimpleSucessMessageMobile.vue';
  
  import cartStore from '@/store/cart.js';
  
  export default {
    name: 'Home',
    components: {
      slider: Slider,
      'card-item': CardItem,
      btn: Button,
      'prop-item-mobile': PropItemMobile,
      'prop-item': PropItem,
      'simple-message': SimpleSuccessMessageMobile,
    },
    data() {
      const cart = cartStore();
      return {
        cart,
        loading: false,
        itens: [],
        msgErro: null,
        propVisible: false,
        productSelect: null,
        imageFile: null,
        messageAviso: '',
      }
    },
    methods: {
      // Retorna objeto de estilos para os botões
      styleBtn() {
        return {
          fontWeight: 'bold',
          height: '4rem'
        }
      },
      // Retorna objeto de estilo com delay dinâmico para cada card (baseado no índice)
      styleCardAnimation(index) {
        return {
          'animation-delay': `${(index + 1) * 0.1}s`
        }
      },
      onFileChange(event) {
        this.imageFile = event.target.files[0];
      },
      async upload() {
        if (!this.imageFile) {
          console.log('imagem vazia');
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
      async index() {
        try {
          const response = await this.axios.get('/');
          this.loading = false;
          const { itens } = response.data;
          if (itens?.length > 0) {
            this.itens = itens;
          } else {
            this.msgErro = 'Houve um problema ao buscar os produtos.';
          }
        } catch (error) {
          this.msgErro = 'Houve um problema ao buscar os produtos.';
          this.loading = false;
          console.log(error);
        }
      },
      openProduct(product) {
        console.log('abrir produto', product);
        this.productSelect = product;
        this.propVisible = true;
      },
      addProduct(product) {
        this.cart.addProduct(product);
        this.messageAviso = `O item ( ${product.title} ) foi adicionado ao carrinho.`;
      }
    },
    mounted() {
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
  
  .tagSlider.mobile {
    width: 100%;
    aspect-ratio: 3/1;
  }
  .tagSlider:not(.mobile) {
    min-width: 500px;
    max-width: 1000px;
    width: 100%;
    aspect-ratio: 3/1;
  }
  
  /* .logoHomePG comentada permanece para referência */
  /*.logoHomePG {
    width: calc(100% + 1rem);
    height: 6rem;
    margin: -0.5rem;
    background-image: url('https://www.emcartaz.net/wp-content/uploads/2021/04/0A9DC881-2825-47D4-9215-DB5733BEE7A6.jpeg');
    background-size: cover;
    background-position: center;
  }*/
  
  /* Estilização para botões na área dinâmica */
  .btnDinamico:not(.mobile) {
    min-width: 500px;
    max-width: 1000px;
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: space-evenly;
    gap: 1rem;
  }
  .btnDinamico.mobile {
    width: 100%;
    max-width: 100%;
    height: fit-content;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .btnDinamico.mobile > .btnItemDinamico {
    flex: 1 1 6rem;
  }
  
  /* Área de promoções */
  .areaPromocoes:not(.mobile) {
    min-width: 500px;
    max-width: 1000px;
    width: 100%;
    height: fit-content;
  }
  .areaPromocoes.mobile {
    width: 100%;
    height: fit-content;
  }
  .titleAreaPromocoes:not(.mobile) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  .itensAreaPromocoes:not(.mobile) {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    gap: 0.5rem;
  }
  .itensAreaPromocoes.mobile {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
  .cardItemPromotion {
    width: 100%;
    transform: translateY(-4rem);
    opacity: 0%;
    animation: cardAparecer 1s ease;
    animation-fill-mode: forwards;
  }
  
  @media screen and (orientation: landscape) {
    .itensAreaPromocoes.mobile {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  @media screen and (orientation: landscape) and (min-width: 680px) {
    .itensAreaPromocoes.mobile {
      grid-template-columns: repeat(6, 1fr);
    }
  }
  </style>
  