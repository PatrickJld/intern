import { getDB } from "../setup/sequelize";
const sequelize = getDB();
import { Model, DataTypes } from "sequelize";
import ExamSession from "./ExamSession";
import Section from "./Section";

export default class SectionOngoing extends Model{}
SectionOngoing.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    section_id: {
      type: DataTypes.BIGINT,
      primaryKey: false,
      allowNull: false,
    },
    exam_session_id: {
      type: DataTypes.BIGINT,
      primaryKey: false,
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
    modelName: "sectionongoing",
    tableName: "section_ongoing",
  }
);
SectionOngoing.belongsTo(Section, { foreignKey: "section_id" });
SectionOngoing.belongsTo(ExamSession, {
    foreignKey: "exam_session_id",
});