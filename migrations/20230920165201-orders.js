module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      client: {
        type: Sequelize.STRING,
      },
      products: {
        type: Sequelize.JSONB,
      },
      status: {
        type: Sequelize.STRING,
      },
      dateEntry: {
        type: Sequelize.DATE,
      },
      dateProcessed: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Orders');
  },
};
