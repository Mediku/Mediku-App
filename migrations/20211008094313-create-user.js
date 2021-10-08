'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      phoneNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fullName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      identityCardNumber: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      identityCardAddress: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dateOfBirth: {
        allowNull: false,
        type: Sequelize.DATE
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      provinceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Provinces",
          key: "id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      district: {
        allowNull: false,
        type: Sequelize.STRING
      },
      rw: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      rt: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      nationality: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};