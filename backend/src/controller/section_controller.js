const Section = require("../models/Section");
const Question = require("../models/Question");
const { getDB } = require("../setup/sequelize");
const sequelize = getDB();
const {
  missing_param_response,
  data_not_found_response,
  success_response,
} = require("../helpers/ResponseHelper");
const { validate_required_columns } = require("../helpers/ValidationHelper");

class SectionController {
  async getOne(req, res) {
    console.log("Getting Section...");

    if (!req.params.id) {
      missing_param_response(res);
      return;
    }

    Section.findOne({ where: { id: req.params.id } }).then(async (section) => {
      if (!section) {
        data_not_found_response(res);
        return;
      }

      await Question.findAndCountAll({
        where: { section_id: section.id },
      }).then((question) => {
        section.setDataValue("question_num", question.count);
      });
      // console.log(section);

      success_response(res, section, "Get One Data Successful!");
    });
  }

  async getAll(req, res) {
    console.log("Getting All Available Sections...");

    if (!req.params.test_id) {
      Section.findAll({ where: { status: 1 } }).then((sections) => {
        if (sections.length == 0) {
          data_not_found_response(res);
          return;
        }

        success_response(res, sections, "Get All Data Successful!");
      });
    } else {
      Section.findAll({
        where: { status: 1, test_id: req.params.test_id },
      }).then(async (sections) => {
        if (sections.length == 0) {
          data_not_found_response(res);
          return;
        }

        for (const key in sections) {
          await Question.findAndCountAll({
            where: { section_id: sections[key].id },
          }).then((question) => {
            sections[key].setDataValue("question_num", question.count);
          });
        }

        // console.log(sections);
        success_response(res, sections, "Get All Data Successful!");
      });
    }
  }

  async create(req, res) {
    console.log("Creating A New Section...");

    if (!validate_required_columns(req, Section, ["status"])) {
      missing_param_response(res);
      return;
    }

    const new_section = await Section.create({
      test_id: req.body.test_id,
      section_number: req.body.section_number,
      instruction: req.body.instruction,
      duration: req.body.duration,
      section_type: req.body.section_type,
      question_type: req.body.question_type,
      option_num: req.body.option_num,
    });

    success_response(res, new_section.toJSON(), "Create Successful!");
  }

  async update(req, res) {
    console.log("Updating A Section...");

    if (!validate_required_columns(req, Section, ["status"], ["updating_id"])) {
      missing_param_response(res);
      return;
    }

    Section.findOne({ where: { id: req.body.updating_id } }).then((section) => {
      if (!section) {
        data_not_found_response(res);
        return;
      }

      section.set({
        test_id: req.body.test_id,
        section_number: req.body.section_number,
        instruction: req.body.instruction,
        duration: req.body.duration,
        section_type: req.body.section_type,
        question_type: req.body.question_type,
        option_num: req.body.option_num,
      });
      section.save();

      success_response(res, section.toJSON(), "Update Successful!");
    });
  }
}

module.exports = SectionController;
