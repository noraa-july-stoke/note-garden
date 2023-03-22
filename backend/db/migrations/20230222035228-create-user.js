let options = {};
options.schema = process.env.SCHEMA;
options.tableName = "Users";

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      options,
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        username: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true,
          validate: {
            len: [3, 30],
          },
        },
        firstName: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        defaultNotebookId: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        defaultImageNotebookId: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        avatarUrl: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        email: {
          type: Sequelize.STRING(256),
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
            len: [3, 256],
          },
        },
        hashedPassword: {
          type: Sequelize.STRING.BINARY,
          allowNull: false,
          validate: {
            len: [60, 60],
          },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable(options, options);
  }
};
