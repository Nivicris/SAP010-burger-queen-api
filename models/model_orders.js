const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Product = require('./model_products');
const User = require('./model_users');

const Order = sequelize.define('Order', {
  orderId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  nameClient: {
    type: DataTypes.STRING(255),
  },
  orderTotal: {
    type: DataTypes.DECIMAL(10, 2),
  },
  status: {
    type: DataTypes.STRING(20),
  },
  // dateEntry: {
  //   type: DataTypes.TIMESTAMP,
  // },
  // dateProcessed: {
  //   type: DataTypes.TIMESTAMP,
  // },
});

Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Order;
