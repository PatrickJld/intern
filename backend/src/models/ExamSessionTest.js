const { getDB } = require("../setup/sequelize");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");
const ExamSession = require("./ExamSession");
const Test = require("./Test");

class ExamSessionTest extends Model {}
ExamSessionTest.init(
  {
    exam_session_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    test_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "examsessiontest",
    tableName: "exam_session_test",
  }
);
ExamSessionTest.belongsTo(ExamSession, { foreignKey: "exam_session_id" });
ExamSessionTest.belongsTo(Test, { foreignKey: "test_id" });

module.exports = ExamSessionTest;