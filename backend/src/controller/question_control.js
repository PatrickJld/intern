const fs = require("fs");
const short = require("short-uuid");
const Question = require("../models/Question");
const Section = require("../models/Section");
const {
  missing_param_response,
  data_not_found_response,
  success_response,
} = require("../helpers/ResponseHelper");
const { validate_required_columns } = require("../helpers/ValidationHelper");
const {
  populateQuestion,
  pupulateKreapelinQuestion,
} = require("../helpers/QuestionMaker");

class QuestionController {
  async getOne(req, res) {
    console.log("Getting Question...");

    if (!req.params.id) {
      missing_param_response(res);
      return;
    }

    Question.findOne({ where: { id: req.params.id } }).then((question) => {
      if (!question) {
        data_not_found_response(res);
        return;
      }

      success_response(res, question, "Get One Data Successful!");
    });
  }

  async getAll(req, res) {
    console.log("Getting All Available Questions...");

    if (req.query.test_id) {
      // Get From Test ID
      Question.findAll({
        include: [
          {
            model: Section,
            where: {
              test_id: req.query.test_id,
            },
          },
        ],
      }).then((questions) => {
        if (questions.length == 0) {
          data_not_found_response(res);
          return;
        }

        success_response(res, questions, "Get All Data Successful!");
      });
    } else if (req.query.section_id) {
      // Get From Section ID
      Question.findAll({
        where: { status: 1, section_id: req.query.section_id },
        include: Section,
      }).then((questions) => {
        if (questions.length == 0) {
          data_not_found_response(res);
          return;
        }

        success_response(res, questions, "Get All Data Successful!");
      });
    } else {
      // Get All
      Question.findAll({
        where: { status: 1 },
        include: Section,
      }).then((questions) => {
        if (questions.length == 0) {
          data_not_found_response(res);
          return;
        }

        success_response(res, questions, "Get All Data Successful!");
      });
    }
  }

  async create(req, res) {
    console.log("Creating A New Question...");

    if (!validate_required_columns(req, Question, ["status"])) {
      missing_param_response(res);
      return;
    }

    const new_question = await Question.create({
      instruction: req.body.instruction,
      section_id: req.body.section_id,
      option_num: req.body.option_num,
      option_a: req.body.option_a,
      option_b: req.body.option_b,
      option_c: req.body.option_c,
      option_d: req.body.option_d,
      option_e: req.body.option_e,
      answer: req.body.answer,
      option_type: req.body.option_type,
      instruction_type: req.body.instruction_type,
    });

    success_response(res, new_question.toJSON(), "Create Successful!");
  }

  async update(req, res) {
    console.log("Updating A Question...");

    if (
      !validate_required_columns(req, Question, ["status"], ["updating_id"])
    ) {
      missing_param_response(res);
      return;
    }
    
    Question.findOne({ where: { id: req.body.updating_id } }).then(
      (question) => {
        if (!question) {
          data_not_found_response(res);
          return;
        }

        question.set({
          instruction: req.body.question,
          section_id: req.body.section_id,
          option_num: req.body.option_num,
          option_a: req.body.option_a,
          option_b: req.body.option_b,
          option_c: req.body.option_c,
          option_d: req.body.option_d,
          option_e: req.body.option_e,
          answer: req.body.answer,
          option_type: req.body.option_type,
          instruction_type: req.body.question_type,
        });
        question.save();

        success_response(res, question.toJSON(), "Update Successful!");
      }
    );
  }

  async createFromExcel(req, res) {
    console.log("Creating Question from Excel...");

    if (!req.file || !req.body.section_id) {
      missing_param_response(res);
      return;
    }

    // Upload Temporary Excel File
    let default_path = "tmp/";
    let file_name = "tmp_" + short.generate();

    let format = req.file.originalname.split(".");
    format = format[format.length - 1];
    file_name = `${file_name}.${format}`;
    let dest_file_path = default_path + file_name;

    fs.renameSync(default_path + req.file.filename, dest_file_path);

    populateQuestion(dest_file_path, req.body.section_id, Question, res);
  }

  async deletebyid(req, res) {
    console.log("Deleting Question by id...");

    Question.findOne({ where: { id: req.params.question_id } }).then(
      async (data) => {
        if (!data) {
          data_not_found_response(res);
          return;
        }

        await data.destroy();

        success_response(
          res,
          "Delete by ID Successful!",
          "Delete by ID Successful!"
        );
      }
    );
  }

  async deletebysection(req, res) {
    console.log("Deleting Question by section...");

    Question.findAll({ where: { section_id: req.params.section_id } }).then(
      async (data) => {
        if (!data || data.length <= 0) {
          data_not_found_response(res);
          return;
        }

        for (let i = 0; i < data.length; i++) {
          await data[i].destroy();
        }

        success_response(
          res,
          "Delete by Section Successful!",
          "Delete by Section Successful!"
        );
      }
    );
  }

  async createKreapelinQuestion(req, res) {
    pupulateKreapelinQuestion(req.body.section, Question, res);
  }
}

module.exports = QuestionController;
