const { getDB } = require("../setup/sequelize");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");
const ExamSession = require("./ExamSession");
const Section = require("./Section");

class SectionOngoing extends Model {}
SectionOngoing.init(
  {
    section_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    exam_session_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    start_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    temp_answers: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    finish_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Sectionongoing",
    tableName: "section_ongoing",
  }
);
SectionOngoing.belongsTo(Section, { foreignKey: "section_id" });
SectionOngoing.belongsTo(ExamSession, {
  foreignKey: "exam_session_id",
});

module.exports = SectionOngoing;
