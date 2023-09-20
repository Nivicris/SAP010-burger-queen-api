const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/model_users');
const { secret } = require('../config');

module.exports = {
  postAuth: async (req, resp) => {
    console.info('Received login request');
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return resp.status(400).json({ message: 'Requisição inválida' });
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return resp.status(404).json({ message: 'Usuário não encontrado' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return resp.status(401).json({ message: 'Senha incorreta' });
      }

      const token = jwt.sign({ email: user.email, role: user.role }, secret, {
        expiresIn: '1h',
      });

      resp.status(200).json({ token });
    } catch (error) {
      resp.status(500).json({ message: 'Erro interno do servidor' });
    }
  },
};
