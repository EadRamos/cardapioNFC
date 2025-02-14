const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('./db');

const ENVIRONMENT = process.env.ENVIRONMENT || 'development';

const sequelize = new Sequelize(dbConfig[ENVIRONMENT]);

module.exports = sequelize;