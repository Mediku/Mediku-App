"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Clinics", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phone_number: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      imageURL: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      operational_time_open: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      operational_time_close: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      operational_day_open: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      swab_pcr: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      swab_antigen: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      pcr_price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      antigen_price: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Clinics");
  },
};
