const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/sequelize');
const Decimal = require('decimal.js');

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    });
    /*this.belongsToMany(models.Order, {
      through: models.OrderProduct,
      foreignKey: 'product_id',
      otherKey: 'order_id',
      as: 'orders',
    });*/
  }
}

Product.init({
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(6,2),
    allowNull: false,
    defaultValue: 0.0,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true
  },
  promotion: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  category_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  kitchen: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
}, {
    sequelize,
    modelName: 'Product',
    tableName: 'producties',
    timestamps: false,
});

module.exports = Product;