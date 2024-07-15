const { getDB } = require("../setup/sequelize");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");
const Question = require("./Question");
const Test = require("./Test");

class Section extends Model {}
Section.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    test_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    section_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "in minutes",
    },
    instruction: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "in minutes",
    },
    section_type: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "1: essay, 2 : multiple choice",
    },
    question_type: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "1: text,  2: image",
    },
    option_num: {
      type: DataTypes.INTEGER,
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
    modelName: "Section",
    tableName: "section",
  }
);

Section.belongsTo(Test, { foreignKey: "test_id" });
module.exports = Section;
