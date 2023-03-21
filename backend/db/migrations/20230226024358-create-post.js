let options = {};
options.schema = process.env.SCHEMA;
options.tableName = "Posts";
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable(options, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      authorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      contentId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      noteType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      caption: {
        type: Sequelize.STRING,
        allowNull: false
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
  down: async (queryInterface, Sequelize) => {


    await queryInterface.dropTable(options, options);
  }
};
