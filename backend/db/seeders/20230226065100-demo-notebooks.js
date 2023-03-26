"use strict";
const { UserData } = require("../models");

let options = {};
options.schema = process.env.SCHEMA; // define your schema in options object
options.tableName = "Notebooks";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userData = await UserData.findAll();
    const notebooks = [];

    userData.forEach((data) => {
      for (let i = 1; i <= 2; i++) {
        notebooks.push({
          authorId: data.id,
          name: `${data.username}'s notebook`,
          isPublic: true,
        });
      }
    });

    return queryInterface.bulkInsert(options, notebooks, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(options, null, {});
    return;
  },
};
