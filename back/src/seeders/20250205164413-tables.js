'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tables', [
      {
        number_table: '1'
      },
      {
        number_table: '2'
      },
      {
        number_table: '3'
      },
      {
        number_table: '4'
      },
      {
        number_table: '5'
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tables', null, {});
  }
};
