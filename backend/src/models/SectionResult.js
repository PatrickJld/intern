const { getDB } = require("../setup/sequelize");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");
const ExamSession = require("./ExamSession");
const Section = require("./Section");

class SectionResult extends Model {}
SectionResult.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    test_result_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    section_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    exam_session: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    finish_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    num_correct: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
    modelName: "sectionresult",
    tableName: "section_result",
  }
);
SectionResult.belongsTo(Section, { foreignKey: "section_id" });
SectionResult.belongsTo(ExamSession, { foreignKey: "exam_session" });

module.exports = SectionResult;
