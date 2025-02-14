const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/sequelize');
const Product = require('./Product');

class Category extends Model {
  static associate(models) {
    Category.hasMany(models.Product, {
      foreignKey: 'category_id',
      as: 'products'
    });
  }
}

Category.init({
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING(20),
      allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: false,
});

module.exports = Category;