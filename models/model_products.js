const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define('Product', {
  product_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  product_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  image: {
    type: DataTypes.BLOB('long'),
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING(255),
  },
  qte: {
    type: DataTypes.INTEGER,
  },
  date_Entry: {
    type: DataTypes.TIMESTAMP,
  },
});

module.exports = Product;
