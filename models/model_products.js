const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define('Product', {
  productId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  productName: {
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
  stockQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING(255),
  },
  qte: {
    type: DataTypes.INTEGER,
  },
  // dateEntry: {
  //   type: DataTypes.TIMESTAMP,
  // },
});

module.exports = Product;
