"use strict";
const fs = require("fs");
const { hashPassword } = require("../helpers/bcryptjs");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = JSON.parse(fs.readFileSync("./seeders/clinics.json", "utf-8"));
    data.forEach((l) => {
      l.password = hashPassword(l.password);
      l.createdAt = new Date();
      l.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Clinics", data, {});
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
    await queryInterface.bulkDelete("Clinics", null, {truncate:true, restartIdentity:true});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
