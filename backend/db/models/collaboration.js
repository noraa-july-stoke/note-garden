'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Collaboration extends Model {

    static async deleteCollaborationById(id) {
      const rowsDeleted = await this.destroy({
        where: {
          id: id
        }
      });
      return rowsDeleted;
    }
    static associate(models) {
      Collaboration.belongsTo(models.User, {
        foreignKey: "authorId"
      });

      Collaboration.belongsTo(models.User, {
        foreignKey: "collaboratorId"
      });

      // the scope here determine which association to choose based on whether the collaboration is via a textnote or not
      Collaboration.belongsTo(models.TextNote, {
        foreignKey: 'noteId',
        constraints: false,
        scope: {
          textNote: true
        }
      });

      // the scope here determine which association to choose
      Collaboration.belongsTo(models.ImageNote, {
        foreignKey: 'noteId',
        constraints: false,
        scope: {
          textNote: false
        }
      });
    }
  }

  Collaboration.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    collaboratorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    noteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    textNote: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Collaboration',
  });
  return Collaboration;
};
