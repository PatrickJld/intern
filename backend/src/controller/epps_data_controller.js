const {
  missing_param_response,
  unique_id_response,
  data_not_found_response,
  success_response,
} = require("../helpers/ResponseHelper");
const { validate_required_columns } = require("../helpers/ValidationHelper");
const EPPSData = require("../models/EPPSData");

class EPPSDataController {
  async getOne(req, res) {
    console.log("Getting One EPPS Data...");

    if (!req.query.test_result_id) {
      missing_param_response(res);
      return;
    }

    EPPSData.findOne({
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
    console.log("Getting All Available EPPS Data...");

    EPPSData.findAll({ where: { status: 1 } }).then((data) => {
      if (data.length == 0) {
        data_not_found_response(res);
        return;
      }

      success_response(res, data, "Get All Data Successful!");
    });
  }

  async create(req, res) {
    console.log("Creating A New EPPS Data...");

    if (!validate_required_columns(req, EPPSData, ["status"])) {
      missing_param_response(res);
      return;
    }

    this.isIdUnique(req.body.test_result_id).then(async (isUnique) => {
      if (!isUnique) {
        unique_id_response(res);
        return;
      }

      let kode_epps = 0;
      if (
        req.body.pendidikan.toLowerCase() == "sma" ||
        req.body.pendidikan.toLowerCase() == "smk"
      ) {
        if (req.body.jenis_kelamin.toLowerCase() == "l") kode_epps = 3;
        else if (req.body.jenis_kelamin.toLowerCase() == "p") kode_epps = 4;
      } else if (req.body.pendidikan.toLowerCase() == "s1") {
        if (req.body.jenis_kelamin.toLowerCase() == "l") kode_epps = 1;
        else if (req.body.jenis_kelamin.toLowerCase() == "p") kode_epps = 2;
      } else {
        return res.status(401).send("Pendidikan tidak dikenali");
      }

      const new_data = await EPPSData.create({
        test_result_id: req.body.test_result_id,
        jenis_kelamin: req.body.jenis_kelamin,
        pendidikan: req.body.pendidikan,
        kode_epps: kode_epps,
      });

      success_response(res, new_data.toJSON(), "Create Successful!");
    });
  }

  async update(req, res) {
    console.log("Updating A EPPS Data...");

    if (!validate_required_columns(req, EPPSData, ["status"])) {
      missing_param_response(res);
      return;
    }

    EPPSData.findOne({
      where: {
        test_result_id: req.body.test_result_id,
      },
    }).then(async (epps_data) => {
      if (!epps_data) {
        data_not_found_response(res);
        return;
      }

      let kode_epps = 0;
      if (
        req.body.pendidikan.toLowerCase() == "sma" ||
        req.body.pendidikan.toLowerCase() == "smk"
      ) {
        if (req.body.jenis_kelamin.toLowerCase() == "l") kode_epps = 3;
        else if (req.body.jenis_kelamin.toLowerCase() == "p") kode_epps = 4;
      } else if (req.body.pendidikan.toLowerCase() == "s1") {
        if (req.body.jenis_kelamin.toLowerCase() == "l") kode_epps = 1;
        else if (req.body.jenis_kelamin.toLowerCase() == "p") kode_epps = 2;
      }

      epps_data.set({
        test_result_id: req.body.test_result_id,
        jenis_kelamin: req.body.jenis_kelamin,
        pendidikan: req.body.pendidikan,
        kode_epps: kode_epps,
      });
      await epps_data.save();

      success_response(res, epps_data?.toJSON(), "Update successful!");
    });
  }

  async isIdUnique(test_result_id) {
    return EPPSData.count({ where: { test_result_id: test_result_id } }).then(
      (count) => {
        if (count != 0) {
          return false;
        }
        return true;
      }
    );
  }
}

module.exports = EPPSDataController;
