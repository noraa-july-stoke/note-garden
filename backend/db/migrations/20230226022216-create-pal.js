let options = {};
options.schema = process.env.SCHEMA;
options.tableName = "Pals";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(options, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      palOne: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      palTwo: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
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

    // Add a unique constraint on the combination of palOne and palTwo
    await queryInterface.addConstraint(options, {
      type: 'unique',
      name: 'pals_unique_constraint',
      fields: ['palOne', 'palTwo']
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(options, 'pals_unique_constraint');
    await queryInterface.dropTable(options, options);
  }
};
