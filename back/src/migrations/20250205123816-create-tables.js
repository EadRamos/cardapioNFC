'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tables', {
      number_table: {
        type: Sequelize.STRING(5),
        allowNull: false,
        primaryKey: true,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tables');
  }
};
