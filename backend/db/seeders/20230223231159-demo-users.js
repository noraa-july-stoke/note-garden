const bcrypt = require("bcryptjs");

let options = {};
options.schema = process.env.SCHEMA;  // define your schema in options object
options.tableName = 'Users';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(options, [
      {
        email: 'user1@user.io',
        username: 'UserOne',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        email: 'user2@user.io',
        username: 'UserTwo',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user3@user.io',
        username: 'UserThree',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['UserOne', 'UserTwo', 'UserThree'] }
    }, {});
  }
};
