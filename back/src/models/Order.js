const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/sequelize');

class Order extends Model {
    static associate(models) {
        Order.belongsToMany(models.Product, {
            through: models.OrderProduct,
            foreignKey: 'order_id',
            otherKey: 'product_id',
            as: 'product'
        });
        Order.belongsTo(models.Table, {
            foreignKey: 'table_number',
            as: 'table',
        });
        Order.hasMany(models.OrderProduct, {
            foreignKey: 'order_id',
            as: 'order_products',
        });
    }
}

Order.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    finished: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    table_number: {
        type: Sequelize.STRING(5),
        allowNull: false,
        references: {
          model: 'tables',
          key: 'number_table',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    status: {
        type: Sequelize.ENUM,
        values: ['Espera', 'Preparando', 'Concluído']
    }
}, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: false,
});

module.exports = Order;