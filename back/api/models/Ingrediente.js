const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database.js');

const Ingrediente = sequelize.define('Ingrediente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
},{
  timestamps: false,
  tableName: 'ingredientes'
})

module.exports = Ingrediente;
