// module.exports = {
//   getUsers: (req, resp, next) => {
//   },
// };
const sequelize = require('../db'); // Importe a configuração do Sequelize

async function testarConexao() {
  try {
    await sequelize.authenticate(); // Tenta se conectar ao banco de dados
    console.log('Conexão bem-sucedida!');
  } catch (erro) {
    console.error('Erro ao conectar ao banco de dados:', erro);
  }
}

testarConexao();
