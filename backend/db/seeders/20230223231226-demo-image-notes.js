
let options = {};
options.schema = process.env.SCHEMA;  // define your schema in options object
options.tableName = 'ImageNotes';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(options, [
      {
        name: 'Note One',
        authorId: 1,
        notebookId: 1,
        url: "https://www.etsy.com/img/35559346/r/il/89bc21/3901020588/il_1588xN.3901020588_53lr.jpg"
      },
      {
        name: 'Note Two',
        authorId: 1,
        notebookId: 1,
        url: "https://www.etsy.com/img/35559346/r/il/89bc21/3901020588/il_1588xN.3901020588_53lr.jpg"
      },
      {
        name: 'Note Three',
        authorId: 1,
        notebookId: 2,
        url: "https://www.etsy.com/img/35559346/r/il/89bc21/3901020588/il_1588xN.3901020588_53lr.jpg"
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
