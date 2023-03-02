const bcrypt = require("bcryptjs");
const { User } = require('../models');

let options = {};
options.schema = process.env.SCHEMA;
options.tableName = 'Users';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      {
        email: 'user1@user.io',
        username: 'User One',
        password: 'password1',
        firstName: "GREEDO",
        lastName: "TETSU"
      },
      {
        email: 'user2@user.io',
        username: 'User Two',
        password: 'password2',
        firstName: "Han",
        lastName: "Solo"
      },
      {
        email: 'user3@user.io',
        username: 'User Three',
        password: 'password3',
        firstName: "R2",
        lastName: "D2"
      },
      {
        email: 'user4@user.io',
        username: 'User Four',
        password: 'password4',
        firstName: "Bossk'wassak",
        lastName: "Cradossk"
      },
      {
        email: 'user5@user.io',
        username: 'User Five',
        password: 'password5',
        firstName: "NEIN",
        lastName: "NUNB"
      }
    ];

    const createdUsers = await Promise.all(users.map(async user => {
      const hashedPassword = await bcrypt.hashSync(user.password, 10);
      return User.create({
        email: user.email,
        username: user.username,
        hashedPassword,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }));

    await Promise.all(createdUsers.map(user => {
      return user.createDefaultNotebook()
        .then(() => user.createDefaultImageNotebook())
        .catch(error => console.log(error));
    }));

    return;
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['User One', 'User Two', 'User Three', 'User Four', 'User Five'] }
    }, {});
  }
};
