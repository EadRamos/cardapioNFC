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
        type: 'admin',
        name: 'Administrador'
      },
      {
        login: 'chef',
        password: password,
        type: 'chef',
        name: 'Cozinheiro'
      },
      {
        login: 'waiter1',
        password: password,
        type: 'waiter',
        name: 'Garçom1'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('users', null, {});
     
  }
};
