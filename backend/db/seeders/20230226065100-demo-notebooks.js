'use strict';
const { Notebook, User } = require('../models');

let options = {};
options.schema = process.env.SCHEMA; // define your schema in options object
options.tableName = 'Notebooks';


//This seeder file generates five notebooks for each user.
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll();
    const notebooks = [];

    users.forEach((user) => {
      for (let i = 1; i <= 3; i++) {
        notebooks.push({
          authorId: user.id,
          name: `Notebook${i} of ${user.username}`
        });
      }
    });

    return queryInterface.bulkInsert(options, notebooks, {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Notebooks';
    const Op = Sequelize.Op;
    const users = await User.findAll();
    const notebookNames = users.flatMap((user) =>
      Array.from({ length: 3 }, (_, i) => `Notebook${i + 1} of ${user.username}`)
    );

    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: notebookNames }
    }, {});
  }
};
