const Product = require('../models/model_products');

// Criar um novo produto
const createProduct = async (req, res) => {
  try {
    const {
      productName,
      image, price,
      stockQuantity,
      type,
      qte,
      dateEntry,
    } = req.body;

    const newProduct = await Product.create({
      productName,
      image,
      price,
      stockQuantity,
      type,
      qte,
      dateEntry,
    });

    res.status(201).json({ product: newProduct });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Obter todos os produtos
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    res.status(200).json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Obter um produto por ID
const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findOne({ where: { productId } });

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Atualizar um produto por ID
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      productName,
      image,
      price,
      stockQuantity,
      type,
      qte,
      dateEntry,
    } = req.body;

    const product = await Product.findOne({ where: { productId } });

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    product.productName = productName;
    product.image = image;
    product.price = price;
    product.stockQuantity = stockQuantity;
    product.type = type;
    product.qte = qte;
    product.dateEntry = dateEntry;

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Excluir um produto por ID
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findOne({ where: { productId } });

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    await product.destroy();

    res.status(204).end();
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
