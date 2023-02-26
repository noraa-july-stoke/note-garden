const { ImageNotebook, User } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll();
    const notebooks = [];
    for (const user of users) {
      for (let i = 0; i < 3; i++) {
        notebooks.push({
          authorId: user.id,
          name: `Image Notebook ${i + 1}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
    return queryInterface.bulkInsert('ImageNotebooks', notebooks, {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('ImageNotebooks', {
      name: { [Op.in]: ['Image Notebook 1', 'Image Notebook 2', 'Image Notebook 3'] },
    }, {});
  },
};
