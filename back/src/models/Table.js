const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/sequelize');

class Table extends Model {
    // metodos
}

Table.init({
    number_table: {
        type: DataTypes.STRING(5),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    }
}, {
    sequelize,
    modelName: 'Table',
    tableName: 'tables',
    timestamps: false,
});

module.exports = Table;