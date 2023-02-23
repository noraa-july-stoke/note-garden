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
    static associate(models) {
      TextNote.belongsTo(models.User, {
        foreignKey: "authorId"
      });

      TextNote.belongsTo(models.Notebook, {
        foreignKey: "authorId"
      });
  }};

  TextNote.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    authorId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    notebookId : {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
      note: {
        type: DataTypes.STRING(2000),
        allowNull: false
  }},
  {
    sequelize,
    modelName: 'TextNote',
  });
  return TextNote;
};
