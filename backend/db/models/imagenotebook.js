'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImageNotebook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static async deleteImageNotebookById(id) {
      const rowsDeleted = await this.destroy({
        where: {
          id: id
        }
      });
      return rowsDeleted;
    }
    static associate(models) {

      ImageNotebook.hasMany(models.ImageNote, {
        foreignKey: "notebookId",
        hooks: true
      });

      ImageNotebook.belongsTo(models.User, {
        foreignKey: "authorId"
      });
    }
  };

  ImageNotebook.init({
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
  }, {
    sequelize,
    modelName: 'ImageNotebook',
  });
  return ImageNotebook;
};
