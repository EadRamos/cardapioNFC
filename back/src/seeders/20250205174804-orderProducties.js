'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    
    await queryInterface.bulkInsert('orderProducties', [
      {
        order_id: 1,
        product_id: 1,
        amount: 1,
        status: 'wait',
        accepted: false,
      },
      {
        order_id: 1,
        product_id: 6,
        amount: 2,
        status: 'wait',
        accepted: false,
      },
      {
        order_id: 2,
        product_id: 3,
        amount: 1,
        status: 'wait',
        accepted: false,
      },
      {
        order_id: 4,
        product_id: 7,
        amount: 3,
        status: 'wait',
        accepted: false,
      },
      {
        order_id:3,
        product_id: 1,
        amount: 1,
        status: 'wait',
        accepted: false,
      },
      {
        order_id: 5,
        product_id: 2,
        amount: 1,
        status: 'wait',
        accepted: false,
      },
      {
        order_id: 5,
        product_id: 1,
        amount: 1,
        status: 'wait',
        accepted: false,
      }
    ]);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orderProducties', null, {});
  }
};
