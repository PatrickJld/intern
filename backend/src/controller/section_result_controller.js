const SectionResult = require("../models/SectionResult");
const {
  missing_param_response,
  data_not_found_response,
  success_response,
} = require("../helpers/ResponseHelper");
const { validate_required_columns } = require("../helpers/ValidationHelper");
const ExamSession = require("../models/ExamSession");
const Section = require("../models/Section");
const Test = require("../models/Test");
const QuestionResult = require("../models/QuestionResult");

class SectionResultController {
  async getOne(req, res) {
    console.log("Getting Section Result...");

    if (!req.params.id) {
      missing_param_response(res);
      return;
    }

    SectionResult.findOne({ where: { id: req.params.id } }).then((result) => {
      if (!result) {
        data_not_found_response(res);
        return;
      }

      success_response(res, result, "Get One Data Successful!");
    });
  }

  async getAll(req, res) {
    console.log("Getting All Available Section Results...");

    SectionResult.findAll({ where: { status: 1 } }).then((results) => {
      if (results.length == 0) {
        data_not_found_response(res);
        return;
      }

      success_response(res, results, "Get All Data Successful!");
    });
  }

  async getLatest(req, res) {
    console.log("Getting Latest Section Results...");

    SectionResult.findAll({ 
      where: { status: 1 },
      include: [
        {
          model: Section,
          attributes: ['section_number'],
          include: [
            {
              model: Test,
              attributes: ['name']
            },
          ], 
        },{
          model: ExamSession,
          attributes: ['email'],
        }
      ], 
      limit: 25,
      order: [['finish_date', 'desc']]
    }).then((results) => {
      if (results.length == 0) {
        data_not_found_response(res);
        return;
      }

      let hasil = []
      results.forEach(ress => {
        let section = ress.section.section_number
        let test = ""
        if(ress.section.test!=null) test = ress.section.test.name
        let section2 = "Tes "+test+" Persoalan "+section
        hasil.push({
          "email": ress.examsession.email,
          "start_date": ress.start_date,
          "finish_date": ress.finish_date,
          "section": section2
        })
      });

      success_response(res, hasil, "Get All Data Successful!");
    }).catch(function (err) {
      console.log(err)
    });
  }

  async getBySection(req, res) {
    console.log("Getting Section Result By Section...");

    if (!req.params.section_id) {
      missing_param_response(res);
      return;
    }

    if (!req.query.email) {
      SectionResult.findAll({
        where: {
          section_id: req.params.section_id,
        },
      }).then((results) => {
        if (results.length == 0) {
          data_not_found_response(res);
          return;
        }

        success_response(res, results, "Get Data Successful!");
      });
    } else {
      SectionResult.findAll({
        where: {
          section_id: req.params.section_id,
        },
        include: [
          {
            model: ExamSession,
            where: {
              email: req.query.email,
            },
          },
        ],
      }).then((results) => {
        if (results.length == 0) {
          data_not_found_response(res);
          return;
        }

        success_response(res, results, "Get Data Successful!");
      });
    }
  }

  async getByTest(req, res) {
    console.log("Getting Section Result By Test...");

    if (!req.params.test_id) {
      missing_param_response(res);
      return;
    }

    if (!req.query.email) {
      SectionResult.findAll({
        include: [
          {
            model: Section,
            where: {
              test_id: req.params.test_id,
            },
          },
        ],
      }).then((results) => {
        if (results.length == 0) {
          data_not_found_response(res);
          return;
        }

        success_response(res, results, "Get Data Successful!");
      });
    } else {
      SectionResult.findAll({
        include: [
          {
            model: Section,
            where: {
              test_id: req.params.test_id,
            },
          },
          {
            model: ExamSession,
            where: {
              email: req.query.email,
            },
          },
        ],
      }).then((results) => {
        if (results.length == 0) {
          data_not_found_response(res);
          return;
        }

        success_response(res, results, "Get Data Successful!");
      });
    }
  }

  async create(req, res) {
    console.log("Creating A New Section Result...");

    // TODO COUNT NUM CORRECT AUTOMATICALLY
    if (
      !validate_required_columns(req, SectionResult, ["status", "num_correct"])
    ) {
      missing_param_response(res);
      return;
    }

    const new_result = await SectionResult.create({
      test_result_id: req.body.test_result_id,
      section_id: req.body.section_id,
      exam_session: req.body.exam_session,
      start_date: req.body.start_date,
      finish_date: req.body.finish_date,
    });

    // this.updateCorrectQuestion(new_result, res);
    success_response(res, new_result, "Create Multiple Successful!");
  }

  async update(req, res) {
    console.log("Updating A Section Result...");

    if (
      !validate_required_columns(
        req,
        SectionResult,
        ["status"],
        ["updating_id"]
      )
    ) {
      missing_param_response(res);
      return;
    }

    // TODO COUNT NUM CORRECT AUTOMATICALLY
    SectionResult.findOne({ where: { id: req.body.updating_id } }).then(
      (result) => {
        if (!result) {
          data_not_found_response(res);
          return;
        }

        result.set({
          test_result_id: req.body.test_result_id,
          section_id: req.body.section_id,
          exam_session: req.body.exam_session,
          start_date: req.body.start_date,
          finish_date: req.body.finish_date,
          num_correct: req.body.num_correct
        });
        result.save();

        success_response(res, result?.toJSON(), "Update successful!");
      }
    );
  }

  // async updateCorrectQuestion(section_result, res) {
  //   let ctr_correct = 0;
  //   QuestionResult.findAll({
  //     where: { section_result_id: section_result.id },
  //   }).then((results) => {
  //     results.forEach((result) => {
  //       if (result.status_correct) ctr_correct++;
  //     });

  //     section_result.set({
  //       num_correct: ctr_correct,
  //     });
  //     section_result.save();
  //     console.log(ctr_correct);

  //     success_response(res, results, "Create Multiple Successful!");
  //   });
  // }
}

module.exports = SectionResultController;
