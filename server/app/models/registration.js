'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Registration.belongsTo(models.User, { foreignKey: 'UserId' })
      Registration.belongsTo(models.Clinic, { foreignKey: 'ClinicId' })
    }
  };
  Registration.init({
    service_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Please fill the Service Name's Column" },
        notNull: { msg: "Please fill the Service Name's Column" }
      }
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Please fill the Total Price's Column" },
        notNull: { msg: "Please fill the Total Price's Column" }
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Please fill the Date's Column" },
        notNull: { msg: "Please fill the Date's Column" }
      }
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Please fill the Time's Column" },
        notNull: { msg: "Please fill the Time's Column" }
      }
    },
    is_paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Please fill the Status Paid's Column" },
        notNull: { msg: "Please fill the Status Paid's Column" }
      }
    },
    UserId: DataTypes.INTEGER,
    ClinicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Please choose at least one clinic" },
        notNull: { msg: "Please choose at least one clinic" }
      }
    },
    is_tested: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Please fill the Status Test's Column" },
        notNull: { msg: "Please fill the Status Test's Column" }
      }
    },
    test_result: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Registration',
  });
  return Registration;
};