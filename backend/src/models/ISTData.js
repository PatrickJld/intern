const { getDB } = require("../setup/sequelize");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class ISTData extends Model {}
ISTData.init(
  {
    test_result_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal_lahir: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tanggal_tes: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    usia: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tujuan_tes: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: "istdata",
    tableName: "ist_data",
  }
);

module.exports = ISTData;
