const bcrypt = require("bcryptjs");

let options = {};
options.schema = process.env.SCHEMA;
options.tableName = 'Users';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(options, [
      {
        email: 'user1@user.io',
        username: 'User One',
        hashedPassword: bcrypt.hashSync('password1'),
        firstName: "User",
        lastName: "One"
      },
      {
        email: 'user2@user.io',
        username: 'User Two',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: "User",
        lastName: "Two"
      },
      {
        email: 'user3@user.io',
        username: 'User Three',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: "User",
        lastName: "Three"
      },
      {
        email: 'user4@user.io',
        username: 'User Four',
        hashedPassword: bcrypt.hashSync('password4'),
        firstName: "User",
        lastName: "Four"
      },
      {
        email: 'user5@user.io',
        username: 'User Five',
        hashedPassword: bcrypt.hashSync('password5'),
        firstName: "User",
        lastName: "Five"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['User One', 'User Two', 'User Three', 'User Four', 'User Five'] }
    }, {});
  }
};
