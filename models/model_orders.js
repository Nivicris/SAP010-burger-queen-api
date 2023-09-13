const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Product = require('./model_products');
const User = require('./model_users');

const Order = sequelize.define('Order', {
  order_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  name_client: {
    type: DataTypes.STRING(255),
  },
  order_total: {
    type: DataTypes.DECIMAL(10, 2),
  },
  status: {
    type: DataTypes.STRING(20),
  },
  date_entry: {
    type: DataTypes.TIMESTAMP,
  },
  date_processed: {
    type: DataTypes.TIMESTAMP,
  },
});

Order.belongsTo(User, { foreignKey: 'user_id' });
Order.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = Order;
