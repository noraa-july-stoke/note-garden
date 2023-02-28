'use strict';
const { User } = require('../models');

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
    //The flatMap method returns a new array formed by applying a given callback function to each element of the array,
    //and then flattening the result by one level.It is identical to a map() followed by a flat() of depth 1(arr.map(...args).flat()),
    //but slightly more efficient than calling those two methods separately
    options.tableName = 'Notebooks';
    const Op = Sequelize.Op;
    const users = await User.findAll();
    const notebookNames = users.flatMap((user) =>

      // Basically list comprehension in JS. it avoids having to push stuff into an array.
      // I used this because i didnt have an object to call map on to avoiid making a clunky for-loop.
      Array.from({ length: 3 }, (_, i) => `Notebook${i + 1} of ${user.username}`)
    );
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: notebookNames }
    }, {});
  }
};
