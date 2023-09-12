const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Product = require('./model_products');
const Order = require('./model_orders');

const OrderProduct = sequelize.define('OrderProduct', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
});

OrderProduct.belongsTo(Order, { foreignKey: 'order_id' });
OrderProduct.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = OrderProduct;
