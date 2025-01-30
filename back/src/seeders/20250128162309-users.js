'use strict';

const bcrypt = require('bcryptjs');
const password = bcrypt.hashSync("1234", 10);

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        login: 'admin',
        password: password,
        type: 'admin'
      },
      {
        login: 'chef',
        password: password,
        type: 'chef'
      },
      {
        login: 'waiter1',
        password: password,
        type: 'waiter'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('People', null, {});
     
  }
};
