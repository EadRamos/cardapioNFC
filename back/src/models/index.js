const Category = require('./Category');
const Product = require('./Product');
const Order = require('./Order.js');
const OrderProduct = require('./OrderProduct.js');
const Table = require('./Table.js');

const models = { Category, Product, Order, OrderProduct, Table };

// Garantindo que as associações sejam definidas
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = models;