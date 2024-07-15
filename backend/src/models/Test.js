const { getDB } = require("../setup/sequelize");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class Test extends Model {}
Test.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    test_order: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "1: in sequence, 2 : not in sequence",
    },
    test_type: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "normal, EPPS, or else",
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "1: available, 0: deleted",
    },
  },
  {
    sequelize,
    modelName: "test",
    tableName: "test",
  }
);

module.exports = Test;
