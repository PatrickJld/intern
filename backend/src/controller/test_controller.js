const Test = require("../models/Test");
const TestResult = require("../models/TestResult");
const ExamSessionTest = require("../models/ExamSessionTest");
const { io } = require("../setup/socketio");
const { useUsersSocket } = require("../routers/socket_router");
const {
  missing_param_response,
  data_not_found_response,
  success_response,
} = require("../helpers/ResponseHelper");
const { validate_required_columns } = require("../helpers/ValidationHelper");
const {driveService} = require("../helpers/GoogleDriveService");

const driveStorageID = process.env.GOOGLE_DRIVE_STORAGE_ID || "";

class TestController {
  async getOne(req, res) {
    console.log("Getting Test...");

    if (!req.params.id) {
      missing_param_response(res);
      return;
    }

    Test.findOne({ where: { id: req.params.id } }).then((test) => {
      if (!test) {
        data_not_found_response(res);
        return;
      }

      success_response(res, test, "Get One Data Successful!");
    });
  }

  async getAll(req, res) {
    console.log("Getting All Available Tests...");

    Test.findAll({ where: { status: 1 } }).then((tests) => {
      if (tests.length == 0) {
        data_not_found_response(res);
        return;
      }

      success_response(res, tests, "Get All Data Successful!");
    });
  }

  async getbyExamSession(req, res) {
    console.log("Getting Tests By Exam Session...");

    ExamSessionTest.findAll({
      where: {
        exam_session_id: req.params.exam_session_id,
      },
    }).then((results) => {
      if (results.length == 0) {
        data_not_found_response(res);
        return;
      }

      success_response(res, results, "Get Data Successful!");
    });
  }

  async addtest(req, res) {
    console.log("Add Tests to Exam Session Test...");

    if (!req.body.test_id || !req.body.exam_session_id) {
      missing_param_response(res);
      return;
    }

    const { test_id, exam_session_id } = req.body;
    let test_to_add = [];
    let test_result_to_add = [];
    let now = new Date();
    for (let i = 0; i < test_id.length; i++) {
      test_to_add.push({
        exam_session_id: exam_session_id,
        test_id: test_id[i],
      });

      test_result_to_add.push({
        test_id: test_id[i],
        exam_session: exam_session_id,
        start_date: now,
        finish_date: now,
      });
    }

    await ExamSessionTest.bulkCreate(test_to_add);
    await TestResult.bulkCreate(test_result_to_add);

    success_response(res, test_to_add, "Create Successful!");
  }

  async create(req, res) {
    console.log("Creating A New Test...");

    if (!validate_required_columns(req, Test, ["status"])) {
      missing_param_response(res);
      return;
    }

    const new_test = await Test.create({
      name: req.body.name,
      test_order: req.body.test_order,
      test_type: req.body.test_type,
    });

    success_response(res, new_test.toJSON(), "Create Successful!");
  }

  async update(req, res) {
    console.log("Updating A Test...");

    if (!validate_required_columns(req, Test, ["status"], ["updating_id"])) {
      missing_param_response(res);
      return;
    }

    Test.findOne({ where: { id: req.body.updating_id } }).then((test) => {
      if (!test) {
        data_not_found_response(res);
        return;
      }

      test.set({
        name: req.body.name,
        test_order: req.body.test_order,
        test_type: req.body.test_type,
      });
      test.save();

      success_response(res, test?.toJSON(), "Update successful!");
    });
  }

  async tick(req, res) {
    // send countdown to frontend socket
    const clock_data = req.body;
    let userSocket = useUsersSocket();
    for (let i = 0; i < clock_data.length; i++) {
      for (let key in userSocket) {
        if (clock_data[i].exam_session_id == key) {
          // Send to each Corresponding Socket Client
          // console.log("user socket", userSocket[key]);
          io.to(userSocket[key]).emit("test.tick", {
            countdown: clock_data[i].countdown,
            total_duration: clock_data[i].total_duration,
            section_id: clock_data[i].section_id,
          });
          break;
        }
      }
    }
    return res.status(200).send("OK");
  }

  async uploadBuram(req, res) {
    if (!req.files || !req.body.email) {
      missing_param_response(res);
      return;
    }

    // Get Buram folder
    let subfolders = await driveService
      .searchInParent(driveStorageID)
      .catch((error) => {
        console.error(error);
        return null;
      });
    let subfolder = subfolders.filter(
      (subfolder) => subfolder.name == "BURAM"
    )[0];

    // Delete Buram
    await driveService.deleteFileFromFolder(
      subfolder.id,
      "Buram_" + req.body.email
    );

    let files = [];
    for (let i = 0; i < req.files.length; i++) {
      let uploadFile = req.files[i];
      let ext = uploadFile.originalname.split(".");
      ext = ext[ext.length - 1];

      let file = await driveService
        .saveFile(
          "Buram_" + req.body.email + "_" + (i + 1),
          uploadFile.buffer,
          uploadFile.mimetype,
          subfolder.id
        )
        .catch((error) => {
          console.error(error);
        });

      await driveService
        .updatePermission(file.data.id, "reader", "anyone")
        .catch((error) => {
          console.error(error);
        });

      files.push(
        "https://drive.google.com/file/d/" + file.data.id + "/view?usp=sharing"
      );
    }

    return res.status(200).send(files);
  }
}

module.exports = TestController;
