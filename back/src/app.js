const express = require('express');
const router = require('./config/router');
const sequelize = require('./config/sequelize');
const cors = require('cors');



require('dotenv').config();

const PORT = process.env.PORT || 4000;
const ENVIRONMENT = process.env.ENVIRONMENT || 'development';

const app = express();

app.use(cors());

app.use(express.json());

app.use(router);



sequelize.authenticate()
.then(() => {
    console.log('Connect sucefull');
})
.catch((err) => {
    console.error('Connect error: ', err);
});

app.listen(PORT, () => console.log(`serve rodando na porta ${PORT} em modo ${ENVIRONMENT}`));