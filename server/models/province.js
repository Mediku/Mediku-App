'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Province.hasMany(models.User, { foreignKey: "provinceId" })
    }
  };
  Province.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: { msg: 'Title is required'},
        notNull: { msg: 'Title is required'}
      }
    }
  }, {
    sequelize,
    modelName: 'Province',
  });
  return Province;
};