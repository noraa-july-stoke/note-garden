//================================================
//  ██████╗  ██████╗ ███████╗████████╗
//  ██╔══██╗██╔═══██╗██╔════╝╚══██╔══╝
//  ██████╔╝██║   ██║███████╗   ██║
//  ██╔═══╝ ██║   ██║╚════██║   ██║
//  ██║     ╚██████╔╝███████║   ██║
//  ███╗   ███╗═██████╗═██████╗ ███████╗██╗
//  ████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║
//  ██╔████╔██║██║   ██║██║  ██║█████╗  ██║
//  ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██║
//  ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗███████╗
//  ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝
//================================================



"use strict";
const { Model } = require("sequelize");
const { postFixup } = require("../db-helpers/post-helpers");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    //=======================================================
    //Organizes a chronolologcal post feed by friend's posts;
    //=======================================================
    static async findAllByAuthors(idObj) {
      // Extracts authorIds from idObj
      const authorIds = Object.values(idObj);
      // Object to store posts
      const objectPosts = {};
      // Eager loading made this way faster.
      // Finds all posts made by authorIds in descending order of creation time
      const posts = await this.findAll({
        where: {
          authorId: authorIds,
        },
        include: [
          {
            model: sequelize.models.User
          },
          {
            model: sequelize.models.TextNote,
            attributes: ["note"],
            required: false,
          },
          {
            model: sequelize.models.Photo,
            attributes: ["url"],
            required: false,
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      // Loops through each post and adds it to objectPosts
      for (let post of posts) {
        // Extracts content and author information from post
        // Adds content and author information to post object
        post = postFixup(post.toJSON());
        objectPosts[post.id] = post;
      }

      // Returns objectPosts dictionary
      return objectPosts;
    }

    //=======================================================
    //Deletes a post by it's id.
    //=======================================================

    static async deletePostById(id) {
      const rowsDeleted = await this.destroy({
        where: {
          id: id,
        },
      });
      return rowsDeleted;
    }

    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: "authorId",
      });

      Post.belongsTo(models.TextNote, {
        foreignKey: "contentId",
        otherKey: "id",
      });
      Post.belongsTo(models.Photo, {
        foreignKey: "contentId",
        otherKey: "id",
      });
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
          // | !@#$DB | -needs update to reference "post content"
          model: ["TextNotes", "Photos"],
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
          isIn: [["LINK", "IMAGE", "COLLECTION", "TEXT", "AUDIO", "VIDEO"]],
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
