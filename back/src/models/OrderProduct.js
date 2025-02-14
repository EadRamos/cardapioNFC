const { Model, DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
      // metodos
  }

  OrderProduct.init({
      id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        order_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Order',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        product_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'producties',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        amount: {
          type: Sequelize.SMALLINT,
          defaultValue: 1,
        }
  }, {
      sequelize,
      modelName: 'OrderProduct',
      tableName: 'orderProducties',
      timestamps: false,
  });
  return OrderProduct;
}