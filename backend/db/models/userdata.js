"use strict";
const { Model, Op, Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserData extends Model {
    async getNotes() {
      const Photo = sequelize.models.Photo;
      const TextNote = sequelize.models.TextNote;
      let objectTextNotes = {};
      let objectPhotos = {};

      const photos = await Photo.findAll({
        where: { authorId: this.id },
        order: [["createdAt"]],
      });

      const textNotes = await TextNote.findAll({
        where: { authorId: this.id },
        order: [["createdAt"]],
      });

      for (let photo of photos) {
        photo = photo.toJSON();
        objectPhotos[photo.id] = photo;
      }

      for (let textNote of textNotes) {
        textNote = textNote.toJSON();
        objectTextNotes[textNote.id] = textNote;
      }

      return { photos: objectPhotos, textNotes: objectTextNotes };
    }
    // query notebook model for any notebooks and any image notebooks that belong to the user and return them as arrays inside
    // a composite object

    // getpals gets any of the pal relationships of the user. the user could be found as palOne or palTwo
    async getPals() {
      const Pal = sequelize.models.Pal;
      const objectPals = {};
      const pals = await Pal.findAll({
        where: {
          [Op.or]: [{ palOne: this.id }, { palTwo: this.id }],
        },
        include: { model: sequelize.models.UserData },
      });

      for (let pal of pals) {
        pal = pal.toJSON();
        pal.palOne === this.id
          ? (objectPals[pal.palTwo] = pal.palTwo)
          : (objectPals[pal.palOne] = pal.palOne);
      }
      return objectPals;
    }

    // extract the pals from the object returned by getPals;
    async getPalsByIds(idObj) {
      const User = sequelize.models.User;
      const ids = Object.values(idObj);
      const palsObject = {};
      const users = await User.findAll({
        where: {
          id: ids,
        },
      });
      for (let user of users) {
        user = user.toJSON();
        palsObject[user.id] = user;
      }
      return { pals: palsObject };
    }

    // query for and return any collaborations that the user exists in under the key collaboratorId
    async getCollaborations() {
      const Collaboration = sequelize.models.Collaboration;
      const objectCollaborations = {};
      const collaborations = await Collaboration.findAll({
        where: { collaboratorId: this.id },
        order: [["createdAt"]],
      });
      for (let collaboration of collaborations) {
        collaboration = collaboration.toJSON();
        objectCollaborations[collaboration.id] = collaboration;
      }

      return objectCollaborations;
    }

    // query for and return any posts that the user exists in under the key authorIdId
    async getPosts() {
      const Post = sequelize.models.Post;
      const objectPosts = {};

      const posts = await Post.findAll({
        where: { authorId: this.id },
        order: [["createdAt"]],
      });

      for (let post of posts) {
        post = post.toJSON();
        objectPosts[post.id] = post;
      }
      return posts;
    }
    // query for and return any comments the user has left on a post the user exists in under the key userId
    async getComments() {
      const Comment = sequelize.models.Comment;
      const objectComments = {};

      const comments = await Comment.findAll({
        where: { userId: this.id },
        order: [["createdAt"]],
      });

      for (let comment of comments) {
        comment = comment.toJSON();
        objectComments[comment.id] = comment;
      }
      return objectComments;
    }

    // query for and return any reactions the user has left on a post the user exists in under the key userId
    async getReactions() {
      const Reaction = sequelize.models.Reaction;
      const reactions = await Reaction.findAll({
        where: { userId: this.id },
        order: [["createdAt"]],
      });
      return reactions;
    }

    async createDefaultCollection() {
      const Collection = sequelize.models.Collection;
      const collection = await Collection.create({
        name: "Misc",
        authorId: this.id,
      });
      await this.update({ defaultCollection: collection.id });
    }

    async createDefaultAlbum() {
      const PhotoAlbum = sequelize.models.PhotoAlbum;
      const album = await PhotoAlbum.create({
        name: "Default Photo Album",
        authorId: this.id,
      });
      await this.update({ defaultAlbumId: album.id });
    }

    static associate(models) {
      UserData.belongsTo(models.UserData, { foreignKey: "id" });

      UserData.hasMany(models.Collection, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        hooks: true,
      });

      UserData.hasMany(models.Notebook, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        hooks: true,
      });

      UserData.hasMany(models.PhotoAlbum, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        hooks: true,
      });

      UserData.hasMany(models.TextNote, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        hooks: true,
      });

      UserData.hasMany(models.Photo, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        hooks: true,
      });

      UserData.hasMany(models.Reaction, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true,
      });

      UserData.hasMany(models.Reaction, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        hooks: true,
      });

      UserData.hasMany(models.Comment, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true,
      });

      UserData.hasMany(models.Comment, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        hooks: true,
      });

      UserData.hasMany(models.Collaboration, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        hooks: true,
      });

      UserData.hasMany(models.Collaboration, {
        foreignKey: "collaboratorId",
        onDelete: "CASCADE",
        hooks: true,
      });

      UserData.hasMany(models.Post, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        hooks: true,
      });

      UserData.hasMany(models.Audio, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        hooks: true,
      });

      UserData.hasMany(models.Link, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        hooks: true,
      });

      UserData.hasMany(models.AudioAlbum, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        hooks: true,
      });

      UserData.hasMany(models.PostContent, {
        foreignKey: "authorId",
        onDelete: "CASCADE",
        hooks: true,
      });

      UserData.hasMany(models.Pal, {
        foreignKey: "palOne",
        onDelete: "CASCADE",
        hooks: true,
      });

      UserData.hasMany(models.Pal, {
        foreignKey: "palTwo",
        onDelete: "CASCADE",
        hooks: true,
      });

      UserData.belongsToMany(models.UserData, {
        as: "palOne",
        foreignKey: "palOne",
        through: models.Pal,
        otherKey: "palTwo",
      });

      UserData.belongsToMany(models.UserData, {
        as: "palTwo",
        foreignKey: "palTwo",
        through: models.Pal,
        otherKey: "palOne",
      });
    }
  }
  UserData.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "User",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 256],
          isEmail: true,
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      defaultCollection: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      defaultAlbum: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      avatarUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      bgImgUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      bgColor: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      palsOnly: {
        type: DataTypes.TEXT,
        allowNull: true,
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
      modelName: "UserData",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );
  return UserData;
};
