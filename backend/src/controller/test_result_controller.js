const TestResult = require("../models/TestResult");
const ExamSession = require("../models/ExamSession");
const {
  missing_param_response,
  data_not_found_response,
  success_response,
} = require("../helpers/ResponseHelper");
const { validate_required_columns } = require("../helpers/ValidationHelper");
const Test = require("../models/Test");

const { calculate_tintum_test } = require("./test_result_calc/tintum_calc");
const { calculate_EPPS_test } = require("./test_result_calc/epps_calc");
const { calculate_sdi_tests } = require("./test_result_calc/sdi_calc");
const { calculate_mmpi_tests } = require("./test_result_calc/mmpi_calc");
const { calculate_kreapelin } = require("./test_result_calc/kreapelin_calc");
const { calculate_nine_tests } = require("./test_result_calc/nine_calc");
const { calculate_akudak_test } = require("./test_result_calc/akudak_calc");
const {
  calculate_tintum_anak_test,
} = require("./test_result_calc/tintum_anak_calc");
const {
  calculate_papi_kostick_test,
} = require("./test_result_calc/papi_kostick_calc");
const { calculate_hafalan_test } = require("./test_result_calc/hafalan_calc");
const { calculate_ist_test } = require("./test_result_calc/ist_calc");

class TestResultController {
  async getOne(req, res) {
    console.log("Getting Test Result...");

    if (!req.params.id) {
      missing_param_response(res);
      return;
    }

    TestResult.findOne({ where: { id: req.params.id } }).then((result) => {
      if (!result) {
        data_not_found_response(res);
        return;
      }

      success_response(res, result, "Get One Data Successful!");
    });
  }

  async getAll(req, res) {
    console.log("Getting All Available Test Results...");

    TestResult.findAll({ where: { status: 1 } }).then((results) => {
      if (results.length == 0) {
        data_not_found_response(res);
        return;
      }

      success_response(res, results, "Get All Data Successful!");
    });
  }

  async getByTest(req, res) {
    console.log("Getting Test Result By Test...");

    if (!req.params.test_id) {
      missing_param_response(res);
      return;
    }

    if (!req.query.email) {
      TestResult.findAll({
        where: {
          test_id: req.params.test_id,
        },
      }).then((results) => {
        if (results.length == 0) {
          data_not_found_response(res);
          return;
        }

        success_response(res, results, "Get Data Successful!");
      });
    } else {
      TestResult.findAll({
        where: {
          test_id: req.params.test_id,
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

  async getByEmail(req, res) {
    console.log("Getting Test Result By Email...");

    if (!req.params.email) {
      missing_param_response(res);
      return;
    }

    TestResult.findAll({
      include: [
        {
          model: ExamSession,
          where: {
            email: req.params.email,
          },
        },
      ],
    }).then((results) => {
      if (results.length == 0) {
        data_not_found_response(res);
        return;
      }

      success_response(res, results, "Get All Data Successful!");
    })
  }

  async create(req, res) {
    console.log("Creating A New Test Result...");

    if (!validate_required_columns(req, TestResult, ["status", "result"])) {
      missing_param_response(res);
      return;
    }

    const new_result = await TestResult.create({
      test_id: req.body.test_id,
      exam_session: req.body.exam_session,
      start_date: req.body.start_date,
      finish_date: req.body.finish_date,
    });

    success_response(res, new_result.toJSON(), "Create Successful!");
  }

  async update(req, res) {
    console.log("Updating A Test Result...");

    if (!validate_required_columns(req, TestResult, [], ["updating_id"])) {
      missing_param_response(res);
      return;
    }

    TestResult.findOne({ where: { id: req.body.updating_id } }).then(
      (result) => {
        if (!result) {
          data_not_found_response(res);
          return;
        }

        result.set({
          test_id: req.body.test_id,
          exam_session: req.body.exam_session,
          start_date: req.body.start_date,
          finish_date: req.body.finish_date,
          status: req.body.status - 1,
        });
        result.save();

        success_response(res, result?.toJSON(), "Update successful!");
      }
    );
  }

  async calculate_result(req, res) {
    console.log("Calculating A Test Result...");

    if (!req.body.test_id || !req.body.email) {
      missing_param_response(res);
      return;
    }

    Test.findOne({ where: { id: req.body.test_id } }).then((test) => {
      if (!test) {
        data_not_found_response(res);
        return;
      }

      TestResult.findOne({
        where: { test_id: req.body.test_id },
        include: [
          {
            model: ExamSession,
            where: {
              email: req.body.email,
            },
          },
        ],
      }).then((testres) => {
        if (!testres) {
          data_not_found_response(res);
          return;
        }

        // Check Test Type
        if (test.test_type == 1) {
          calculate_tintum_test(test.test_type, testres, res);
        } else if (test.test_type == 2) {
          calculate_EPPS_test(test.test_type, testres, res);
        } else if (test.test_type == 3) {
          //SDI mirip dengan Nine Tests
          calculate_sdi_tests(test.test_type, testres, res);
        } else if (test.test_type == 4) {
          calculate_mmpi_tests(test.test_type, testres, res);
        } else if (
          test.test_type == 6 ||
          test.test_type == 7 ||
          test.test_type == 8 ||
          test.test_type == 9 ||
          test.test_type == 11 ||
          test.test_type == 12 ||
          test.test_type == 13 ||
          test.test_type == 14 ||
          test.test_type == 15
        ) {
          calculate_nine_tests(test.test_type, testres, res);
        } else if (test.test_type == 5) {
          calculate_kreapelin(test.test_type, testres, res);
        } else if (test.test_type == 10) {
          calculate_akudak_test(test.test_type, testres, res);
        } else if (test.test_type == 16) {
          calculate_tintum_anak_test(test.test_type, testres, res);
        } else if (test.test_type == 17) {
          calculate_ist_test(test.test_type, testres, res);
        } else if (test.test_type == 18) {
          calculate_papi_kostick_test(test.test_type, testres, res);
        } else if (test.test_type == 21) {
          calculate_hafalan_test(test.test_type, testres, res);
        }
      });
    });
  }
}

module.exports = TestResultController;
