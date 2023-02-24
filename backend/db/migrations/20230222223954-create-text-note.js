let options = {};
options.schema = process.env.SCHEMA;
options.tableName = "TextNotes"

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(options, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true
      },
      authorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      notebookId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      note: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(options, options);
  }
};
