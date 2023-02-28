'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static async findAllByAuthors(idObj) {
      const authorIds = Object.values(idObj);
      const objectPosts = {};
      const posts = await this.findAll({
        where: {
          authorId: authorIds,
        },
      });
      for (let post of posts) {
        post = post.toJSON()
        objectPosts[post.id] = post
      }
      return posts;
    }
    static async deletePostById(id) {
      const rowsDeleted = await this.destroy({
        where: {
          id: id
        }
      });
      return rowsDeleted;
    }

    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: 'authorId'
      });

      if (this.textNote) {
        Post.belongsTo(models.TextNote, {
          foreignKey: 'noteId',
          otherKey: 'id'
        });
      } else {
        Post.belongsTo(models.ImageNote, {
          foreignKey: 'noteId',
          otherKey: 'id'
        });
      }
    }
  }
  Post.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    noteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Notes',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    textNote: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
