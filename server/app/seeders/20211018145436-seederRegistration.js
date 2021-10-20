"use strict";
const fs = require("fs");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = JSON.parse(
      fs.readFileSync("./seeders/registrations.json", "utf-8")
    );
    data.forEach((l) => {
      l.createdAt = new Date();
      l.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Registrations", data, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Registrations", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
