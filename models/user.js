'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Province, { foreignKey: "provinceId" })
    }
  };
  User.init({
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: { msg: "Please fill the Phone Number's Column"},
        notNull: { msg: "Please fill the Phone Number's Column"}
      }
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: { msg: "Please fill the Full Name's Column"},
        notNull: { msg: "Please fill the Full Name's Column"}
      }
    },
    identityCardNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notEmpty: { msg: "Please fill the Identity Card Number's Column"},
        notNull: { msg: "Please fill the Identity Card Number's Column"}
      }
    },
    identityCardAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: { msg: "Please fill the Identity Card Address's Column"},
        notNull: { msg: "Please fill the Identity Card Address's Column"}
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: { msg: "Please fill the Gender's Column"},
        notNull: { msg: "Please fill the Gender's Column"}
      }
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate : {
        notEmpty: { msg: "Please fill the Date of Birth's Column"},
        notNull: { msg: "Please fill the Date of Birth's Column"}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: { msg: "Please fill the Email's Column"},
        notNull: { msg: "Please fill the Email's Column"}
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: { msg: "Please fill the Address's Column"},
        notNull: { msg: "Please fill the Address's Column"}
      }
    },
    provinceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notEmpty: { msg: "Please fill the Province's Column"},
        notNull: { msg: "Please fill the Province's Column"}
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: { msg: "Please fill the City's Column"},
        notNull: { msg: "Please fill the City's Column"}
      }
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: { msg: "Please fill the District's Column"},
        notNull: { msg: "Please fill the District's Column"}
      }
    },
    rw: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notEmpty: { msg: "Please fill the RW's Column"},
        notNull: { msg: "Please fill the RW's Column"}
      }
    },
    rt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notEmpty: { msg: "Please fill the RT's Column"},
        notNull: { msg: "Please fill the RT's Column"}
      }
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: { msg: "Please fill the Nationality's Column"},
        notNull: { msg: "Please fill the Nationality's Column"}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: { msg: "Please fill the Password's Column"},
        notNull: { msg: "Please fill the Password's Column"}
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};