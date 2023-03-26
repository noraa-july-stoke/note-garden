//===================================================
//  ██╗   ██╗███████╗███████╗██████╗
//  ██║   ██║██╔════╝██╔════╝██╔══██╗
//  ██║   ██║███████╗█████╗  ██████╔╝
//  ██║   ██║╚════██║██╔══╝  ██╔══██╗
//  ╚██████╔╝███████║███████╗██║  ██║
//  ███╗═══███╗═██████╗═██████╗╝███████╗██╗
//  ████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║
//  ██╔████╔██║██║   ██║██║  ██║█████╗  ██║
//  ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██║
//  ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗███████╗
//  ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝
//====================================================

"use strict";
const { Model, Op, Validator } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    toSafeObject() {
      const { id, username, email } = this; // context will be the User instance
      return {
        id,
        username,
        email,
      };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static async deleteUserById(id) {
      const rowsDeleted = await this.destroy({
        where: {
          id: id,
        },
      });
      return rowsDeleted;
    }

    static async login({ credential, password }) {
      const user = await User.scope("loginUser").findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential,
          },
        },
      });

      if (user && user.validatePassword(password)) {
        return await sequelize.models.UserData.findByPk(user.id);
      }
    }


    static async signup({ username, email, password, firstName, lastName }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword,
      });
      let userInfo = await User.scope("currentUser").findByPk(user.id);
      if (userInfo) {
        const safeUser = await sequelize.models.UserData.create({
          id: user.id,
          username,
          email,
          firstName,
          lastName
        });
        return safeUser;
      }
    }
    static associate(models) {
      User.hasOne(models.UserData, { foreignKey: "id" });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
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
      hooks: {
        afterUpdate: async (user, options) => {
          // Find the corresponding UserData instance
          const userData = await sequelize.models.UserData.findByPk(user.id);
          // Update the email value in the UserData instance
          userData.email = user.email;
          userData.username = user.username;
          userData.createdAt = user.createdAt;
          userData.createdAt = user.createdAt;
          // Save the updated UserData instance
          await userData.save();
        },
      },
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  return User;
};
