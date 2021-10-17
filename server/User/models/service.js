'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Service.hasMany(models.Clinic, { foreignKey: 'ServiceId' })
    }
  };
  Service.init({
    swab_antigen: DataTypes.BOOLEAN,
    swab_pcr: DataTypes.BOOLEAN,
    antigen_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notEmpty: { msg: "Please fill Antigen Price's Column"},
        notNull: { msg: "Please fill Antigen Price's Column"}
      }
    },
    pcr_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notEmpty: { msg: "Please fill PCR Price's Column"},
        notNull: { msg: "Please fill PCR Pric's Column"}
      }
    }
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};