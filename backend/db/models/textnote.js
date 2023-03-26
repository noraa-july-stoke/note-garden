//=============================================================================
//  ████████╗███████╗██╗  ██╗████████╗███╗   ██╗ ██████╗ ████████╗███████╗
//  ╚══██╔══╝██╔════╝╚██╗██╔╝╚══██╔══╝████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝
//     ██║   █████╗   ╚███╔╝    ██║   ██╔██╗ ██║██║   ██║   ██║   █████╗
//     ██║   ██╔══╝   ██╔██╗    ██║   ██║╚██╗██║██║   ██║   ██║   ██╔══╝
//     ██║   ███████╗██╔╝ ██╗   ██║   ██║ ╚████║╚██████╔╝   ██║   ███████╗
//     ╚═╝   ╚══███╗╝╚═███╗═██████╗ ██████╗╚███████╗██╗╝    ╚═╝   ╚══════╝
//              ████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║
//              ██╔████╔██║██║   ██║██║  ██║█████╗  ██║
//              ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██║
//              ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗███████╗
//              ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝
//=============================================================================
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TextNote extends Model {

    static async getNotesByNotebookId(id) {
      const notes = await this.findAll({
        where: { notebookId: id },
        order: [["updatedAt", "ASC"]],
      });
      const notesObject = {};
      notes.forEach((note) => {
        const noteJson = note.toJSON();
        notesObject[noteJson.id] = noteJson;
      });
      return notesObject;
    }

    static async deleteById(id) {
      const rowsDeleted = await this.destroy({
        where: {
          id: id,
        },
      });
      return rowsDeleted;
    }

    static associate(models) {
      TextNote.belongsTo(models.UserData, {
        foreignKey: "authorId",
      });

      TextNote.belongsTo(models.Notebook, {
        foreignKey: "notebookId",
      });
    }
  }

  TextNote.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: "UserData",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      notebookId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        foreignKey: true,
        references: {
          model: "Notebooks",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "TextNote",
    }
  );
  return TextNote;
};
