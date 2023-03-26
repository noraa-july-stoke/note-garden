const bcrypt = require("bcryptjs");
const { User, UserData } = require("../models");

let options = {};
options.schema = process.env.SCHEMA;
options.tableName = "Users";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      {
        email: "greedo@jabbas-palace.com",
        username: "han-solo-suxxx",
        hashedPassword: bcrypt.hashSync("password", 10),
      },
      {
        email: "han@rebel-alliance.com",
        username: "Nerf_Herder",
        hashedPassword: bcrypt.hashSync("password", 10),
      },
      {
        email: "R2@rebel-alliance.com",
        username: "TheRealR2",
        hashedPassword: bcrypt.hashSync("password", 10),
      },
      {
        email: "bossk@jabbas-palace.com",
        username: "dioxis_breath",
        hashedPassword: bcrypt.hashSync("password", 10),
      },
      {
        email: "nien@rebel-alliance.com",
        username: "nien-09",
        hashedPassword: bcrypt.hashSync("password", 10),
      },
      {
        email: "luke@rebel-alliance.com",
        username: "daddy_issues22",
        hashedPassword: bcrypt.hashSync("password", 10),
      },
      {
        email: "vader@galactic-empire.gov",
        username: "shyguy07",
        hashedPassword: bcrypt.hashSync("password", 10),
      },
    ];

    const usersToCreate = users.map((user, index) => {
      return {
        email: user.email,
        username: user.username,
        hashedPassword: user.hashedPassword,
      };
    });

    await User.bulkCreate(usersToCreate);

    return;
  },

  down: async (queryInterface, Sequelize) => {
    const usersToDelete = await User.findAll();
    const userIds = usersToDelete.map((user) => user.id);
    await User.destroy({ where: { id: userIds } });
    // await queryInterface.dropTable(options, options);
    return;
  },
};
