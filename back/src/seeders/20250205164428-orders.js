'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('orders', [
      {
        finished: false,
        date: new Date().toISOString().split('T')[0],
        table_number: '1',
        status: 'Espera'
      },
      {
        finished: false,
        date: new Date().toISOString().split('T')[0],
        table_number: '1',
        status: 'Espera'
      },
      {
        finished: false,
        date: new Date().toISOString().split('T')[0],
        table_number: '2',
        status: 'Espera'
      },
      {
        finished: false,
        date: new Date().toISOString().split('T')[0],
        table_number: '1',
        status: 'Preparando'
      },
      {
        finished: false,
        date: new Date().toISOString().split('T')[0],
        table_number: '3',
        status: 'Concluído'
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orders', null, {});
  }
};
