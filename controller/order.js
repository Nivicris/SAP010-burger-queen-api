const Order = require('../models/model_orders');

// Crie um novo pedido
const createOrder = async (req, res) => {
  try {
    const {
      nameClient,
      orderTotal,
      status,
      dateEntry,
      dateProcessed,
      userId,
      productId,
    } = req.body;

    const newOrder = await Order.create({
      nameClient,
      orderTotal,
      status,
      dateEntry,
      dateProcessed,
      userId,
      productId,
    });

    res.status(201).json({ order: newOrder });
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Obtenha todos os pedidos
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();

    res.status(200).json(orders);
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Obtenha um pedido por ID
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ where: { orderId } });

    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Atualize um pedido por ID
const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const {
      nameClient,
      orderTotal,
      status,
      dateEntry,
      dateProcessed,
      userId,
      productId,
    } = req.body;

    const order = await Order.findOne({ where: { orderId } });

    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    order.nameClient = nameClient;
    order.orderTotal = orderTotal;
    order.status = status;
    order.dateEntry = dateEntry;
    order.dateProcessed = dateProcessed;
    order.userId = userId;
    order.productId = productId;

    await order.save();

    res.status(200).json(order);
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Exclua um pedido por ID
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ where: { order_id: orderId } });

    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    await order.destroy();

    res.status(204).end();
  } catch (error) {
    console.error('Erro ao excluir pedido:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
