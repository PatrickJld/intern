const {
  missing_param_response,
  data_not_found_response,
  success_response,
} = require("../helpers/ResponseHelper");
const { validate_required_columns } = require("../helpers/ValidationHelper");
const SectionOngoing = require("../models/SectionOngoing");
const ExamSession = require("../models/ExamSession");
const Section = require("../models/Section");

class SectionOngoingController {
  async getOne(req, res) {
    console.log("Getting One Section Ongoing...");

    SectionOngoing.findOne({
      where: {
        id: req.params.id,
      },
    }).then((data) => {
      if (!data) {
        data_not_found_response(res);
        return;
      }

      success_response(res, data, "Get One Data Successful!");
    });
  }

  async getAll(req, res) {
    console.log("Getting All Available Section Ongoing...");

    SectionOngoing.findAll().then((data) => {
      if (data.length == 0) {
        data_not_found_response(res);
        return;
      }

      success_response(res, data, "Get All Data Successful!");
    });
  }

  async getBySection(req, res) {
    console.log("Getting Section Ongoing By Section...");

    if (!req.params.section_id) {
      missing_param_response(res);
      return;
    }

    if (!req.query.exam_session_id) {
      SectionOngoing.findAll({
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
      SectionOngoing.findAll({
        where: {
          section_id: req.params.section_id,
          exam_session_id: req.query.exam_session_id,
        },
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
    console.log("Getting Section Ongoing By Test...");

    if (!req.params.test_id) {
      missing_param_response(res);
      return;
    }

    if (!req.query.exam_session_id) {
      SectionOngoing.findAll({
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
      SectionOngoing.findAll({
        where: {
          exam_session_id: req.query.exam_session_id,
        },
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
    }
  }

  async create(req, res) {
    console.log("Creating A New Section Ongoing...");

    if (!validate_required_columns(req, SectionOngoing, [])) {
      missing_param_response(res);
      return;
    }

    let start_time = new Date(req.body.start_time);
    let finish_time = new Date(
      start_time.getTime() + req.body.duration * 60000
    );

    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    console.log("Created by: "+req.body.exam_session_id);

    try {
      const new_data = await SectionOngoing.create({
        section_id: req.body.section_id,
        exam_session_id: req.body.exam_session_id,
        start_status: req.body.start_status,
        temp_answers: req.body.temp_answers ?? "",
        start_time: req.body.start_time,
        finish_time: finish_time,
        duration: req.body.duration,
      });
      success_response(res, new_data.toJSON(), "Create Successful!");
    } catch (error) {
      data_not_found_response(res);
    }
  }

  async update(req, res) {
    console.log("Updating A Section Ongoing...");

    if (!validate_required_columns(req, SectionOngoing, ["status"])) {
      missing_param_response(res);
      return;
    }

    SectionOngoing.findOne({ where: { id: req.body.updating_id } }).then(
      async (section_ongoing) => {
        if (!section_ongoing) {
          data_not_found_response(res);
          return;
        }

        let start_time = new Date(req.body.start_time);
        let finish_time = new Date(
          start_time.getTime() + req.body.duration * 60000
        );

        let temp_answers = section_ongoing.temp_answers;
        if (req.body.temp_answers) {
          temp_answers = req.body.temp_answers;
        }

        section_ongoing.set({
          section_id: req.body.section_id,
          exam_session_id: req.body.exam_session_id,
          start_status: req.body.start_status,
          temp_answers: temp_answers,
          start_time: req.body.start_time,
          finish_time: finish_time,
          duration: req.body.duration,
        });
        await section_ongoing.save();

        success_response(res, section_ongoing?.toJSON(), "Update successful!");
      }
    );
  }

  async updateTempAnswers(req, res) {
    console.log("Updating Temp Answers");
    if (!req.body.section_id || !req.body.exam_session) {
      missing_param_response(res);
      return;
    }

    SectionOngoing.update(
      {
        temp_answers: req.body.temp_answers,
      },
      {
        where: {
          section_id: req.body.section_id,
          exam_session_id: req.body.exam_session,
          start_status: 1,
        },
      }
    );
    success_response(res, "Update Data Successful!", "Update Data Successful!");
  }

  async stopSection(req, res) {
    console.log("Stopping Section Ongoing");
    if (!req.body.section_id || !req.body.exam_session) {
      missing_param_response(res);
      return;
    }

    SectionOngoing.update(
      {
        start_status: 2,
      },
      {
        where: {
          section_id: req.body.section_id,
          exam_session_id: req.body.exam_session,
          start_status: 1,
        },
      }
    );
    success_response(
      res,
      "Stopping Section Successful!",
      "Stopping Section Successful!"
    );
  }
}

module.exports = SectionOngoingController;
