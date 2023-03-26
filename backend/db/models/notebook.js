//=============================================================================
//  ███╗   ██╗ ██████╗ ████████╗███████╗██████╗  ██████╗  ██████╗ ██╗  ██╗
//  ████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝██╔══██╗██╔═══██╗██╔═══██╗██║ ██╔╝
//  ██╔██╗ ██║██║   ██║   ██║   █████╗  ██████╔╝██║   ██║██║   ██║█████╔╝
//  ██║╚██╗██║██║   ██║   ██║   ██╔══╝  ██╔══██╗██║   ██║██║   ██║██╔═██╗
//  ██║ ╚████║╚██████╔╝   ██║   ███████╗██████╔╝╚██████╔╝╚██████╔╝██║  ██╗
//  ╚═╝  ╚══███╗═══███╗ ██████╗ ██████╗╝███████╗██╗════╝  ╚═════╝ ╚═╝  ╚═╝
//          ████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║
//          ██╔████╔██║██║   ██║██║  ██║█████╗  ██║
//          ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██║
//          ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗███████╗
//          ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝
//=============================================================================

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notebook extends Model {
    static async safeNotesDelete(notebookId, defaultId) {
      // Change notebookId property to defaultId for all notes in the notebook
      await sequelize.models.TextNote.update(
        { notebookId: defaultId },
        {
          where: { notebookId: notebookId },
        }
      );
      // Delete the notebook
      const rowsDeleted = await this.destroy({
        where: {
          id: notebookId,
        },
        //returns entire deleted entry instead of number of rows deleted.
      });
      return rowsDeleted;
    }
    static associate(models) {
      Notebook.hasMany(models.TextNote, {
        foreignKey: "notebookId",
        hooks: true,
      });

      Notebook.belongsTo(models.UserData, {
        foreignKey: "authorId",
      });

      Notebook.belongsTo(models.Collection, {
        foreignKey: "collectionId",
      });
    }
  }
  Notebook.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "UserData",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      collectionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        foreignKey: true,
        references: {
          model: "Collection",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
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
      modelName: "Notebook",
    }
  );
  return Notebook;
};
