
const { User, Pal } = require('../models');


let options = {};
options.schema = process.env.SCHEMA; // define your schema in options object
options.tableName = 'Pals';

//I optimized this to use a set to avoid duplicate pals.
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll();
    const pals = new Set();
    //Implementation of set to keep track of unique pairs. ##l33tcode ftw.
    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        const palPair = [users[i], users[j]].sort((a, b) => a.id - b.id);
        pals.add(palPair);
      }
    }

    const palData = [...pals].map(([palOne, palTwo]) => ({
      palOne: palOne.id,
      palTwo: palTwo.id
    }));

    return queryInterface.bulkInsert(options, palData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(options, null, {});
  }
};
