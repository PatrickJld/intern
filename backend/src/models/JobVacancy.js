const { getDB } = require("../setup/sequelize");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class JobVacancy extends Model {}
JobVacancy.init(
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
    qr_link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    list_pekerjaan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "1: open, 0: closed",
    },
  },
  {
    sequelize,
    modelName: "jobvacancy",
    tableName: "job_vacancy",
  }
);

module.exports = JobVacancy;
