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
      const textNoteIds = [];
      const imageNoteIds = [];
      const posts = await this.findAll({
        where: {
          authorId: authorIds,
        },
      });

      for (let post of posts) {
        if (post.noteType === "TEXT") {
          textNoteIds.push(post.contentId);
          let textNote = await sequelize.models.TextNote.findByPk(post.contentId);
          textNote = textNote.toJSON()
          post = { ...post.toJSON(), note: textNote.note };
        } else {
          imageNoteIds.push(post.contentId);
          let imageNote = await sequelize.models.ImageNote.findByPk(post.contentId);
          imageNote = imageNote.toJSON()
          post = { ...post.toJSON(), url: imageNote.url};
        }
        objectPosts[post.id] = post;
      }

      return objectPosts;
    }

    // static async findAllByAuthors(idObj) {
    //   const authorIds = Object.values(idObj);
    //   const objectPosts = {};
    //   const textNoteIds = []
    //   const imageNoteIds = []
    //   const posts = await this.findAll({
    //     where: {
    //       authorId: authorIds,
    //     },
    //   });
    //   for (let post of posts) {
    //     if (post.textNote) textNoteIds.push(post.noteid)
    //     else imageNoteIds.push(post.noteId)
    //     post = post.toJSON()
    //     objectPosts[post.id] = post
    //   }
    //   return posts;
    // }

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

      if (this.noteType === "TEXT") {
        Post.belongsTo(models.TextNote, {
          foreignKey: 'contentId',
          otherKey: 'id'
        });
      } else {
        Post.belongsTo(models.ImageNote, {
          foreignKey: 'contentId',
          otherKey: 'id'
        });
      }
    }
  }
  Post.init(
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
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      contentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Notes",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      noteType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          isIn: [
            [
              "LINK",
              "IMAGE",
              "COLLECTION",
              "TEXT",
              "AUDIO",
              "VIDEO",
            ],
          ],
        },
      },

      caption: {
        type: DataTypes.STRING,
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
      modelName: "Post",
    }
  );
  return Post;
};
