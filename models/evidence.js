'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evidence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Evidence.init({
    reportId: DataTypes.INTEGER,
    fileName: DataTypes.STRING,
    filePath: DataTypes.STRING,
    fileType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Evidence',
  });
  return Evidence;
};