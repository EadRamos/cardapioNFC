'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        title: 'Pizza'
      },
      {
        title: 'Hamburguer'
      },
      {
        title: 'Salada'
      },
      {
        title: 'Bolo'
      },
      {
        title: 'Bebida Gelada'
      },
      {
        title: 'Bebida Alcoolica'
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
