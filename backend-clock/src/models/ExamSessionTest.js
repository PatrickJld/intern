import { getDB } from "../setup/sequelize";
const sequelize = getDB();
import { Model, DataTypes } from "sequelize";
import ExamSession from "./ExamSession";

export default class ExamSessionTest extends Model{}
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