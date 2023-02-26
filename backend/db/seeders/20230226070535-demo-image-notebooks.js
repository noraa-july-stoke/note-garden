const { ImageNotebook, User } = require('../models');

let options = {};
options.schema = process.env.SCHEMA; // define your schema in options object
options.tableName = 'ImageNotebooks';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll();
    const notebooks = [];
    for (const user of users) {
      for (let i = 0; i < 3; i++) {
        notebooks.push({
          authorId: user.id,
          name: `Image Notebook ${i + 1}`
        });
      }
    }
    return queryInterface.bulkInsert(options, notebooks, {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Image Notebook 1', 'Image Notebook 2', 'Image Notebook 3'] },
    }, {});
  },
};
