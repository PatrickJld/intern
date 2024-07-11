import { getDB } from "../setup/sequelize";
const sequelize = getDB();
import { Model, DataTypes } from "sequelize";

export default class ExamSession extends Model{}
ExamSession.init(
    {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
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
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "in minutes",
    },
    test_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    auth_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_logged: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "1: logged in, 0: logged out",
    },
    is_admin: {
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
    modelName: "examsession",
    tableName: "exam_session",
  }
)