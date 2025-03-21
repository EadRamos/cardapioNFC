'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('orders', [
      {
        finished: false,
        date: new Date().toISOString().split('T')[0],
        table_number: '1',

      },
      {
        finished: false,
        date: new Date().toISOString().split('T')[0],
        table_number: '1',

      },
      {
        finished: false,
        date: new Date().toISOString().split('T')[0],
        table_number: '2',

      },
      {
        finished: false,
        date: new Date().toISOString().split('T')[0],
        table_number: '1',
        
      },
      {
        finished: false,
        date: new Date().toISOString().split('T')[0],
        table_number: '3',
      
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orders', null, {});
  }
};
