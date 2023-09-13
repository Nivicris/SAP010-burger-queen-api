const bcrypt = require('bcrypt');
const User = require('../models/model_users');

// inicializaçao do usuário admin
const initAdminUser = (app, next) => {
  const { adminEmail, adminPassword } = app.get('config');
  if (!adminEmail || !adminPassword) {
    return next();
  }

  const adminUser = {
    email: adminEmail,
    password: bcrypt.hashSync(adminPassword, 10),
    roles: { admin: true },
  };
  User.findOrCreate({
    where: { email: adminUser.email },
    defaults: adminUser,
  });

  next();
};

// criar um novo usuário
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já registrado' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

//  busca usuário
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({ where: { user_id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// atualizar os dados
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, password } = req.body;

    const user = await User.findOne({ where: { user_id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    user.username = username;
    user.email = email;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

//  excluir um usuário por ID
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Exclua o usuário
    await user.destroy();

    res.status(204).end(); // Resposta sem conteúdo (usuário excluído com sucesso)
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

module.exports = {
  initAdminUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
