"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../../Clinic/helpers/bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Clinic.hasMany(models.Registration, {
      //   foreignKey: "clinicId",
      // });
    }
  }
  Clinic.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "PLEASE INSERT NAME",
          },
          notNull: {
            msg: "PLEASE INSERT NAME",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "PLEASE INSERT EMAIL",
          },
          notNull: {
            msg: "PLEASE INSERT EMAIL",
          },
          isEmail: {
            args: true,
            msg: "NOT A VALID EMAIL FORMAT",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "PLEASE INSERT PASSWORD",
          },
          notNull: {
            msg: "PLEASE INSERT PASSWORD",
          },
        },
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "PLEASE INSERT PHONE_NUMBER",
          },
          notNull: {
            msg: "PLEASE INSERT PHONE_NUMBER",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "PLEASE INSERT ADDRESS",
          },
          notNull: {
            msg: "PLEASE INSERT ADDRESS",
          },
        },
      },
      operational_time_open: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "PLEASE INSERT OPEN TIME",
          },
          notNull: {
            msg: "PLEASE INSERT OPEN TIME",
          },
        },
      },
      operational_time_close: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "PLEASE INSERT CLOSE TIME",
          },
          notNull: {
            msg: "PLEASE INSERT CLOSE TIME",
          },
        },
      },
      operational_day_open: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "PLEASE INSERT CLOSE TIME",
          },
          notNull: {
            msg: "PLEASE INSERT CLOSE TIME",
          },
        },
      },
      swab_antigen: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "PLEASE INSERT SWAB_ANTIGEN BOOLEAN",
          },
          notNull: {
            msg: "PLEASE INSERT SWAB_ANTIGEN BOOLEAN",
          },
        },
      },
      swab_pcr: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "PLEASE INSERT SWAB_PCR BOOLEAN",
          },
          notNull: {
            msg: "PLEASE INSERT SWAB_PCR BOOLEAN",
          },
        },
      },
      antigen_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "PLEASE INSERT ANTIGEN PRICE",
          },
          notNull: {
            msg: "PLEASE INSERT ANTIGEN PRICE",
          },
        },
      },
      pcr_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "PLEASE INSERT PCR PRICE",
          },
          notNull: {
            msg: "PLEASE INSERT PCR PRICE",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Clinic",
    }
  );
  return Clinic;
};
