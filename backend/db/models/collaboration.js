'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Collaboration extends Model {
    static associate(models) {
      Collaboration.belongsTo(models.User, {
        foreignKey: "authorId"
      });

      Collaboration.belongsTo(models.User, {
        foreignKey: "collaboratorId"
      });

      Collaboration.belongsTo(models.TextNote, {
        foreignKey: "noteId"
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
