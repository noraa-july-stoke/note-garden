'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TextNote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static async getNotesByNotebookId(id) {
      const notes = await this.findAll({
        where: { notebookId: id },
        order: [['updatedAt', 'ASC']]
      });
      const notesObject = {};
      notes.forEach((note) => {
        const noteJson = note.toJSON();
        notesObject[noteJson.id] = noteJson;
      });
      console.log(notesObject)
      return notesObject;
    }

    static async deleteById(id) {
      const rowsDeleted = await this.destroy({
        where: {
          id: id
        }
      });
      return rowsDeleted;
    }

    static associate(models) {

      TextNote.hasMany(models.Post, {
        foreignKey: "noteId",
        onDelete: "CASCADE"
      });

      TextNote.belongsTo(models.User, {
        foreignKey: "authorId"
      });

      TextNote.belongsTo(models.Notebook, {
        foreignKey: "notebookId"
      });
    }
  };

  TextNote.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    notebookId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      foreignKey: true
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  },
    {
      sequelize,
      modelName: 'TextNote',
    });
  return TextNote;
};
