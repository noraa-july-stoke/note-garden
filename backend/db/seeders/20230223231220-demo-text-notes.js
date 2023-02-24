
let options = {};
options.schema = process.env.SCHEMA;  // define your schema in options object
options.tableName = 'TextNotes';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(options, [
      {
        name: 'Note One',
        authorId: 1,
        notebookId: 1,
        note: "this is demo text-note one"
      },
      {
        name: 'Note Two',
        authorId: 1,
        notebookId: 1,
        note: "this is demo text-note one"
      },
      {
        name: 'Note Three',
        authorId: 1,
        notebookId: 2,
        note: "this is demo text-note one"
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      authorId:1
    }, {});
  }
};
