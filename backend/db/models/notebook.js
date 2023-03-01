'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notebook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static async deleteNotebookById(id) {
      const rowsDeleted = await this.destroy({
        where: {
          id: id
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
