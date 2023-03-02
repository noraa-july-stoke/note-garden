'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notebook extends Model {

    static async safeNotesDelete(notebookId, defaultId) {
      // Change notebookId property to defaultId for all notes in the notebook
      await sequelize.models.TextNote.update({ notebookId: defaultId }, {
        where: {notebookId: notebookId}
      });
      // Delete the notebook
      const rowsDeleted = await this.destroy({
        where: {
          id: notebookId
        }
      });
      return rowsDeleted;
    }
    static associate(models) {

      Notebook.hasMany(models.TextNote, {
        foreignKey: "notebookId",
        hooks: true
      })

      Notebook.belongsTo(models.User, {
        foreignKey: "authorId"
      });
    }
  }
  Notebook.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Notebook',
  });
  return Notebook;
};
