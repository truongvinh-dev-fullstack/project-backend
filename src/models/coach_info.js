"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Coach_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Coach_info.belongsTo(models.User, { foreignKey: "coachId" });
    }
  }
  Coach_info.init(
    {
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Coach_info",
    }
  );
  return Coach_info;
};
