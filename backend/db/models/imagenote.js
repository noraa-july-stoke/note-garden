'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImageNote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ImageNote.belongsTo(models.User, {
        foreignKey: "authorId"
      });

      ImageNote.belongsTo(models.Notebook, {
        foreignKey: "notebookId"
      });
  }}

  ImageNote.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    notebookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false
  }},
  {
    sequelize,
    modelName: 'ImageNote',
  });
  return ImageNote;
};
