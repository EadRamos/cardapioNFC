const Category = require('./Category');
const Product = require('./Product');

const models = { Category, Product };

// Garantindo que as associações sejam definidas
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = models;