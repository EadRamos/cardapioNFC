'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('producties', [
      {
        title: 'Pizza grade com borda recheada',
        description: 'Queijo, calabresa, cebola, queijo catupiry, borda recheada catupiry',
        price: 45.00,
        image: 'https://alegrafoods.com.br/wp-content/uploads/2020/07/9-img-blog.png',
        promotion: false,
        category_id: 1
      },
      {
        title: 'Pizza média com borda recheada',
        description: 'Queijo, calabresa, cebola, queijo catupiry, borda recheada catupiry',
        price: 40.00,
        image: 'https://www.minhareceita.com.br/app/uploads/2022/12/pizza-de-pepperoni-caseira-portal-minha-receita.jpg',
        promotion: false,
        category_id: 1
      },
      {
        title: 'Pizza pequena com borda recheada',
        description: 'Queijo, calabresa, cebola, queijo catupiry, borda recheada catupiry',
        price: 35.50,
        image: 'https://www.minhareceita.com.br/app/uploads/2022/12/pizza-de-pepperoni-caseira-portal-minha-receita.jpg',
        promotion: false,
        category_id: 1
      },
      {
        title: 'Pizza grade de queijo',
        description: 'Queijo, cebola, queijo catupiry, borda recheada catupiry',
        price: 35.00,
        image: 'https://alegrafoods.com.br/wp-content/uploads/2020/07/9-img-blog.png',
        promotion: false,
        category_id: 1
      },
      {
        title: 'Pizza grade de carne',
        description: 'Queijo, calabresa, peito de frango, cebola, queijo catupiry, borda recheada catupiry',
        price: 45.00,
        image: 'https://alegrafoods.com.br/wp-content/uploads/2020/07/9-img-blog.png',
        promotion: false,
        category_id: 1
      },
      {
        title: 'Hamburguer duplo de calabresa',
        description: 'Calabresa, baicon, salada, 2 carnes, queijo',
        price: 22.00,
        image: 'https://www.estadao.com.br/resizer/v2/77XTHHCCLBEXLC2Y5RK4PN37CE.jpg?quality=80&auth=a86d285f74ec7c08de7ba6ec10d557a463d905ffec2e56009d737687ac6054a1&width=720&height=503&focal=553,494',
        promotion: true,
        category_id: 2
      },
      {
        title: 'Hamburguer com cheddar duplo',
        description: 'Cheddar, catupiry, salada, 1 carne de picanha',
        price: 26.00,
        image: 'https://www.estadao.com.br/resizer/v2/77XTHHCCLBEXLC2Y5RK4PN37CE.jpg?quality=80&auth=a86d285f74ec7c08de7ba6ec10d557a463d905ffec2e56009d737687ac6054a1&width=720&height=503&focal=553,494',
        promotion: true,
        category_id: 2
      },
      {
        title: 'Hamburguer original',
        description: 'Calabresa, 2 carnes, salada',
        price: 10.00,
        image: 'https://www.estadao.com.br/resizer/v2/77XTHHCCLBEXLC2Y5RK4PN37CE.jpg?quality=80&auth=a86d285f74ec7c08de7ba6ec10d557a463d905ffec2e56009d737687ac6054a1&width=720&height=503&focal=553,494',
        promotion: false,
        category_id: 2
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('producties', null, {});
  }
};
