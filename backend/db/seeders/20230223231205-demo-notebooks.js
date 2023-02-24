
let options = {};
options.schema = process.env.SCHEMA;  // define your schema in options object
options.tableName = 'Notebooks';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(options, [
      {
        name: 'Notebook One',
        authorId: 1
      },
      {
        name: 'Notebook Two',
        authorId: 1
      },
      {
        name: 'Notebook Three',
        authorId: 1
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      authorId: 1
    }, {});
  }
};
