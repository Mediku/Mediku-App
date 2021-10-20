"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Clinic.hasMany(models.Registration, {
        foreignKey: "ClinicId",
      });
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
        unique: true,
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
      imageURL: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "PLEASE INSERT IMAGE URL",
          },
          notNull: {
            msg: "PLEASE INSERT IMAGE URL",
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
            msg: "PLEASE INSERT OPERATIONAL DAY OPEN",
          },
          notNull: {
            msg: "PLEASE INSERT OPERATIONAL DAY OPEN",
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
          min: {
            args: [0],
            msg: "MINIMAL ANTIGEN PRICE IS 0",
          },
        },
      },
      pcr_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: "MINIMAL PCR PRICE IS 0",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (data, options) => {
          data.operational_day_open = data.operational_day_open.toLowerCase();
          const hashedPwd = hashPassword(data.password);
          data.password = hashedPwd;
        },
        beforeUpdate: (data, options) => {
          data.operational_day_open = data.operational_day_open.toLowerCase();
          const hashedPwd = hashPassword(data.password);
          data.password = hashedPwd;
        },
      },
      sequelize,
      modelName: "Clinic",
    }
  );
  return Clinic;
};
