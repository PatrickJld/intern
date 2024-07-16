const {
  missing_param_response,
  unique_id_response,
  data_not_found_response,
  success_response,
} = require("../helpers/ResponseHelper");
const { validate_required_columns } = require("../helpers/ValidationHelper");
const ExamSession = require("../models/ExamSession");
const ISTData = require("../models/ISTData");
const SectionResult = require("../models/SectionResult");

class ISTDataController {
  async getOne(req, res) {
    console.log("Getting One IST Data...");

    if (!req.query.test_result_id) {
      missing_param_response(res);
      return;
    }

    ISTData.findOne({
      where: {
        test_result_id: req.query.test_result_id,
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
    console.log("Getting All Available IST Data...");

    ISTData.findAll({ where: { status: 1 } }).then((data) => {
      if (data.length == 0) {
        data_not_found_response(res);
        return;
      }

      success_response(res, data, "Get All Data Successful!");
    });
  }

  async getByEmail(req, res) {
    console.log("Getting All Available IST Data by Email...");

    if (!req.params.email) {
      missing_param_response(res);
      return;
    }

    ISTData.findAll({ where: { email: req.params.email } }).then((data) => {
      if (data.length == 0) {
        data_not_found_response(res);
        return;
      }

      success_response(res, data, "Get All Data Successful!");
    });
  }

  async create(req, res) {
    console.log("Creating A New IST Data...");

    if (!validate_required_columns(req, ISTData, ["status"])) {
      missing_param_response(res);
      return;
    }

    let now = new Date();
    let usia = new Date(now - new Date(req.body.tanggal_lahir));
    usia = Math.abs(usia.getUTCFullYear() - 1970);

    const new_data = await ISTData.create({
      test_result_id: req.body.test_result_id,
      email: req.body.email,
      tanggal_lahir: req.body.tanggal_lahir,
      tanggal_tes: now,
      usia: usia,
      tujuan_tes: req.body.tujuan_tes,
    });

    success_response(res, new_data.toJSON(), "Create Successful!");
  }

  async update(req, res) {
    console.log("Updating A IST Data...");

    if (!validate_required_columns(req, ISTData, ["status"])) {
      missing_param_response(res);
      return;
    }

    ISTData.findOne({
      where: {
        test_result_id: req.body.test_result_id,
      },
    }).then(async (ist_data) => {
      if (!ist_data) {
        data_not_found_response(res);
        return;
      }

      let now = new Date();
      let usia = new Date(now - new Date(req.body.tanggal_lahir));
      usia = Math.abs(usia.getUTCFullYear() - 1970);

      ist_data.set({
        test_result_id: req.body.test_result_id,
        email: req.body.email,
        tanggal_lahir: req.body.tanggal_lahir,
        tanggal_tes: now,
        usia: usia,
        tujuan_tes: req.body.tujuan_tes,
      });
      await ist_data.save();

      success_response(res, ist_data?.toJSON(), "Update successful!");
    });
  }
}

module.exports = ISTDataController;
