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
      User.hasMany(models.Registration, {foreignKey: 'UserId'})
    }
  };
  User.init({
    phone_number: {
      type: DataTypes.STRING,
      // allowNull: false,
      // validate : {
      //   notEmpty: { msg: "Please fill the Phone Number's Column"},
      //   notNull: { msg: "Please fill the Phone Number's Column"}
      // }
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: { msg: "Please fill the Full Name's Column"},
        notNull: { msg: "Please fill the Full Name's Column"}
      }
    },
    identity_card_number: {
      type: DataTypes.STRING,
      // allowNull: false,
      // validate : {
      //   notEmpty: { msg: "Please fill the Identity Card Number's Column"},
      //   notNull: { msg: "Please fill the Identity Card Number's Column"}
      // }
    },
    identity_card_address: {
      type: DataTypes.TEXT,
      // allowNull: false,
      // validate : {
      //   notEmpty: { msg: "Please fill the Identity Card Address's Column"},
      //   notNull: { msg: "Please fill the Identity Card Address's Column"}
      // }
    },
    gender: {
      type: DataTypes.STRING,
      // allowNull: false,
      // validate : {
      //   notEmpty: { msg: "Please fill the Gender's Column"},
      //   notNull: { msg: "Please fill the Gender's Column"}
      // }
    },
    date_of_birth: {
      type: DataTypes.DATE,
      // allowNull: false,
      // validate : {
      //   notEmpty: { msg: "Please fill the Date of Birth's Column"},
      //   notNull: { msg: "Please fill the Date of Birth's Column"}
      // }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate : {
        isEmail: { msg: 'Must be email format' },
        notEmpty: { msg: "Please fill the Email's Column"},
        notNull: { msg: "Please fill the Email's Column"}
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
    province: {
      type: DataTypes.STRING,
    },
    regency: {
      type: DataTypes.STRING,
    },
    district: {
      type: DataTypes.STRING,
    },
    sub_district: {
      type: DataTypes.STRING,
    },
    RT: {
      type: DataTypes.STRING,
    },
    RW: {
      type: DataTypes.STRING,
    },

  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password)
      },
      beforeUpdate: (user, options) => {
        user.password = hashPassword(user.password)
        // user.date_of_birth = new Date(user.date_of_birth).toLocaleString()
      }
    }
  });
  // User.hook('beforeUpdate', (user) => {
  //   console.log(user);
  //   if (user.password) {
  //     user.password = hashPassword(user.password)
  //   }
  // });
  return User;
};