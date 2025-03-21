require('dotenv').config();

const PG_USER = process.env.PG_USER || 'root';
const PG_PASSWORD = process.env.PASSWORD || 'root';
const PG_DB = process.env.PG_DB || 'cardapiobd';
const PG_HOST = process.env.PG_HOST || 'localhost';
const DIALECT = process.env.DB || 'mysql';

module.exports = {
    development: {
      username: PG_USER,
      password: PG_PASSWORD,
      database: PG_DB,
      host: PG_HOST,
      dialect: DIALECT,
    },
    test: {
        username: PG_USER,
        password: PG_PASSWORD,
        databas: PG_DB,
        host: PG_HOST,
        dialect: DIALECT,
    },
    production: {
        username: PG_USER,
        password: PG_PASSWORD,
        databas: PG_DB,
        host: PG_HOST,
        dialect: DIALECT,
    },
  };