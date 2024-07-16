const QuestionResult = require("../models/QuestionResult");
const {
  missing_param_response,
  data_not_found_response,
  success_response,
} = require("../helpers/ResponseHelper");
const { validate_required_columns } = require("../helpers/ValidationHelper");
const Question = require("../models/Question");
const SectionResult = require("../models/SectionResult");
const ExamSession = require("../models/ExamSession");
const Section = require("../models/Section");
const TestResult = require("../models/TestResult");
const KreapelinData = require("../models/KreapelinData");
const { q_result_ist } = require("./test_result_calc/ist_calc");

const driveStorageID = process.env.GOOGLE_DRIVE_STORAGE_ID || "";
const {driveService} = require("../helpers/GoogleDriveService");

class QuestionResultController {
  async getOne(req, res) {
    console.log("Getting Question Result...");

    if (!req.params.id) {
      missing_param_response(res);
      return;
    }

    QuestionResult.findOne({ where: { id: req.params.id } }).then((result) => {
      if (!result) {
        data_not_found_response(res);
        return;
      }

      success_response(res, result, "Get One Data Successful!");
    });
  }

  async getByQuestion(req, res) {
    console.log("Getting Question Result By Question...");

    if (!req.params.q_id) {
      missing_param_response(res);
      return;
    }

    if (!req.query.email) {
      QuestionResult.findAll({ where: { question_id: req.params.q_id } }).then(
        (results) => {
          if (results.length == 0) {
            data_not_found_response(res);
            return;
          }

          success_response(res, results, "Get Data Successful!");
        }
      );
    } else {
      QuestionResult.findAll({
        where: { question_id: req.params.q_id },
        include: [
          {
            model: SectionResult,
            include: [
              {
                model: ExamSession,
                where: {
                  email: req.query.email,
                },
              },
            ],
          },
        ],
      }).then((results) => {
        let results2 = [];
        for (let i in results) {
          if (results[i].sectionresult) {
            results2.push(results[i]);
          }
        }
        if (results2.length == 0) {
          data_not_found_response(res);
          return;
        }

        success_response(res, results2, "Get Data Successful!");
      });
    }
  }

  async getBySection(req, res) {
    console.log("Getting Question Result By Section...");

    if (!req.params.section_id) {
      missing_param_response(res);
      return;
    }

    if (!req.query.email) {
      QuestionResult.findAll({
        include: [
          {
            model: SectionResult,
            where: {
              section_id: req.params.section_id,
            },
          },
        ],
      }).then((results) => {
        let results2 = [];
        for (let i in results) {
          if (results[i].sectionresult) {
            results2.push(results[i]);
          }
        }
        if (results2.length == 0) {
          data_not_found_response(res);
          return;
        }

        success_response(res, results2, "Get Data Successful!");
      });
    } else {
      QuestionResult.findAll({
        include: [
          {
            model: SectionResult,
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
          },
        ],
      }).then((results) => {
        let results2 = [];
        for (let i in results) {
          if (results[i].sectionresult) {
            results2.push(results[i]);
          }
        }
        if (results2.length == 0) {
          data_not_found_response(res);
          return;
        }

        success_response(res, results, "Get Data Successful!");
      });
    }
  }

  async getByTest(req, res) {
    console.log("Getting Question Result By Test...");

    if (!req.params.test_id) {
      missing_param_response(res);
      return;
    }

    if (!req.query.email) {
      QuestionResult.findAll({
        include: [
          {
            model: SectionResult,
            include: [
              {
                model: Section,
                where: {
                  test_id: req.params.test_id,
                },
              },
            ],
          },
        ],
      }).then((results) => {
        let results2 = [];
        for (let i in results) {
          if (results[i].sectionresult) {
            results2.push(results[i]);
          }
        }
        if (results2.length == 0) {
          data_not_found_response(res);
          return;
        }

        success_response(res, results2, "Get Data Successful!");
      });
    } else {
      QuestionResult.findAll({
        include: [
          {
            model: SectionResult,
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
          },
        ],
      }).then((results) => {
        let results2 = [];
        for (let i in results) {
          if (results[i].sectionresult) {
            results2.push(results[i]);
          }
        }
        if (results2.length == 0) {
          data_not_found_response(res);
          return;
        }

        success_response(res, results2, "Get Data Successful!");
      });
    }
  }

  async getAll(req, res) {
    console.log("Getting All Available Question Results...");

    QuestionResult.findAll({ where: { status: 1 } }).then((results) => {
      if (results.length == 0) {
        data_not_found_response(res);
        return;
      }

      success_response(res, results, "Get All Data Successful!");
    });
  }

  async create(req, res) {
    console.log("Creating A New Question Result...");

    if (
      !validate_required_columns(req, QuestionResult, [
        "status",
        "status_correct",
      ])
    ) {
      missing_param_response(res);
      return;
    }

    Question.findOne({ where: { id: req.body.question_id } }).then(
      async (question) => {
        let status_correct = false;
        if (question.answer == req.body.answer) status_correct = true;

        const new_result = await QuestionResult.create({
          section_result_id: req.body.section_result_id,
          question_id: req.body.question_id,
          answer: req.body.answer,
          status_correct: status_correct,
        });

        success_response(res, new_result.toJSON(), "Create Successful!");
      }
    );
  }

  async createmultiple(req, res) {
    console.log("Creating A New Question Result...");

    if (
      !validate_required_columns(
        req,
        QuestionResult,
        [
          "status",
          "status_correct",
          "question_id",
          "answer",
          "section_result_id",
        ],
        ["data", "exam_session", "section_id"]
      )
    ) {
      missing_param_response(res);
      return;
    }

    SectionResult.findOne({
      where: {
        exam_session: req.body.exam_session,
        section_id: req.body.section_id,
      },
    }).then(async (secres) => {
      if (!secres) {
        data_not_found_response(res);
        return;
      }

      let results = [];
      let ctr_correct = secres.num_correct;

      // Calculate IST using excel formula
      if (req.body.section_id >= 61 && req.body.section_id <= 69) {
        return q_result_ist(
          req.body.data,
          req.body.section_id,
          ctr_correct,
          secres,
          res
        );
      } else {
        for (const data of req.body.data) {
          await Question.findOne({ where: { id: data.question_id } }).then(
            async (question) => {
              let status_correct = false;

              data.answer = data.answer + "";
              if (data.answer.includes("&")) {
                let a1 = data.answer.split("&")[0];
                let a2 = data.answer.split("&")[1];

                if (question.answer.includes("&")) {
                  // Both answer must equal to the question
                  let q1 = question.answer.split("&")[0];
                  let q2 = question.answer.split("&")[1];

                  if (question.section_id == 6 || question.section_id == 77) {
                    // Answer and Correct Answer has fractions
                    a1 = eval(a1);
                    a2 = eval(a2);
                    q1 = eval(q1);
                    q2 = eval(q2);
                  }

                  if (a1 == q1 && a2 == q2) {
                    status_correct = true;
                    ctr_correct++;
                  }
                } else if (question.answer.includes("-")) {
                  // Each answer corresponds one question
                  console.log("?");
                  let q1 = question.answer.split("-")[0];
                  let q2 = question.answer.split("-")[1];

                  let temp_ctr = 0;
                  console.log(
                    a1 + " - " + q1,
                    a1.toUpperCase() == q1.toUpperCase()
                  );
                  console.log(
                    a2 + " - " + q2,
                    a2.toUpperCase() == q2.toUpperCase()
                  );
                  if (a1.toUpperCase() == q1.toUpperCase()) temp_ctr++;
                  if (a2.toUpperCase() == q2.toUpperCase()) temp_ctr++;
                  if (temp_ctr > 0) status_correct = true;
                  console.log(temp_ctr);
                  ctr_correct += temp_ctr;
                  console.log(ctr_correct);
                }
              } else if (question.answer.includes("|")) {
                // Only 1 answer is needed to be true
                let q1 = question.answer.split("|")[0];
                let q2 = question.answer.split("|")[1];

                if (
                  data.answer.toUpperCase() == q1.toUpperCase() ||
                  data.answer.toUpperCase() == q2.toUpperCase()
                ) {
                  status_correct = true;
                  ctr_correct++;
                }
              } else if (question.answer.includes(",")) {
                // for kreapelin
                let correct_answer = question.answer.split(",");
                let user_answer = data.answer;
                let temp_status_correct = true;
                for (let i = 0; i < user_answer.length; i++) {
                  if (user_answer[i] == correct_answer[i]) ctr_correct++;
                  else temp_status_correct = false;
                }

                data.answer = data.answer.toString();
                status_correct = temp_status_correct;
              } else {
                if (
                  data.answer.toUpperCase() == question.answer.toUpperCase()
                ) {
                  status_correct = true;
                  ctr_correct++;
                }
              }

              const new_result = await QuestionResult.create({
                section_result_id: secres.id,
                question_id: data.question_id,
                answer: data.answer,
                status_correct: status_correct,
              });

              results.push(new_result);
            }
          );
        }
      }

      secres.set({
        num_correct: ctr_correct,
      });
      secres.save();

      success_response(res, results, "Create Multiple Successful!");
    });
  }

  async update(req, res) {
    console.log("Updating A Question Result...");

    if (
      !validate_required_columns(
        req,
        QuestionResult,
        ["status"],
        ["updating_id"]
      )
    ) {
      missing_param_response(res);
      return;
    }

    QuestionResult.findOne({ where: { id: req.body.updating_id } }).then(
      (result) => {
        if (!result) {
          data_not_found_response(res);
          return;
        }

        Question.findOne({ where: { id: req.body.question_id } }).then(
          (question) => {
            if (!question) {
              data_not_found_response(res);
              return;
            }

            // let status_correct = false;
            let status_correct = req.body.status_correct;
            // if (question.answer == req.body.answer) status_correct = true;
            // if (req.body.status_correct == 1 || req.body.status_correct == 2)
            //   status_correct = true;
            console.log(req.body.section_result_id);
            console.log(req.body.question_id);
            console.log(req.body.answer);
            console.log(status_correct);

            result.set({
              section_result_id: req.body.section_result_id,
              question_id: req.body.question_id,
              answer: req.body.answer,
              status_correct: status_correct,
            });
            result.save();

            success_response(res, result?.toJSON(), "Update successful!");
          }
        );
      }
    );
  }

  async resetQuestion(req, res) {
    console.log("Resetting A Question Results...");

    if (!req.body.exam_session || !req.body.section_id) {
      missing_param_response(res);
      return;
    }

    if (req.body.section_id == 53) {
      // Delete kraepelin data
      ExamSession.findOne({
        where: {
          id: req.body.exam_session,
        },
      }).then(async (session) => {
        // destroy kraepelin data
        KreapelinData.destroy({
          where: {
            email: session.email,
          },
        });
      });
    }

    // Delete Question REsult  Section Result
    await SectionResult.findOne({
      where: {
        section_id: req.body.section_id,
        exam_session: req.body.exam_session,
      },
    }).then(async (secres) => {
      if (!secres) {
        data_not_found_response(res);
        return;
      }

      await QuestionResult.destroy({
        where: { section_result_id: secres.id },
      });

      // Remove Result on Test Result
      Section.findOne({
        where: {
          id: req.body.section_id,
        },
      }).then(async (sec) => {
        TestResult.findOne({
          where: {
            test_id: sec.test_id,
            exam_session: req.body.exam_session,
          },
        }).then(async (testres) => {
          testres.set({
            result: "",
            status: 1,
          });
          testres.save();
          return res
            .status(200)
            .send({ message: "Reset Questions Result Successful!" });
        });
      });
    });

    SectionResult.destroy({
      where: {
        section_id: req.body.section_id,
        exam_session: req.body.exam_session,
      },
    });
  }

  async uploadImage(req, res) {
    console.log("Uploading to Drive on Question Results...");

    if (
      !req.file ||
      !req.body.test_result_id ||
      !req.body.section_id ||
      !req.body.exam_session ||
      !req.body.question_id
    ) {
      missing_param_response(res);
    }

    await SectionResult.findOne({
      where: {
        exam_session: req.body.exam_session,
        section_id: req.body.section_id,
        test_result_id: req.body.test_result_id,
      },
    }).then(async (secres) => {
      // Upload Lampiran
      let file = await this.uploadToDrive(
        req.file,
        secres.id,
        req.body.question_id
      );

      await QuestionResult.create({
        section_result_id: secres.id,
        question_id: req.body.question_id,
        answer: file.data.id,
        status_correct: 1,
      });
    });

    // update test result
    SectionResult.findAll({
      where: {
        exam_session: req.body.exam_session,
        test_result_id: req.body.test_result_id,
      },
    }).then(async (secres) => {
      let result = [];
      for (let i = 0; i < secres.length; i++) {
        const secress = secres[i];
        let q = await QuestionResult.findOne({
          where: { section_result_id: secress.id },
        });
        result.push(q != null ? q.answer : "");
      }

      for (let i = secres.length; i < 4; i++) {
        result.push("");
      }

      await TestResult.update(
        {
          result: JSON.stringify(result),
        },
        {
          where: {
            id: req.body.test_result_id,
          },
        }
      );
      success_response(res, "Upload Successful!", "Upload Successful!");
    });
  }

  async uploadToDrive(
    uploadFile,
    section_result_id,
    question_id
  ) {
    // Get gambar folder
    let subfolders = await driveService
      .searchInParent(driveStorageID)
      .catch((error) => {
        console.error(error);
        return null;
      });
    let subfolder = subfolders.filter(
      (subfolder) => subfolder.name == "TES_GAMBAR"
    )[0];

    // Delete File
    await driveService.deleteFileFromFolder(
      subfolder.id,
      "GAMBAR_" + section_result_id + "_" + question_id
    );

    let ext = uploadFile.originalname.split(".");
    ext = ext[ext.length - 1];
    let finalFileName = "GAMBAR_" + section_result_id + "_" + question_id;
    let finalFileNameExt = finalFileName + "." + ext;

    // fs.renameSync(uploadFile.path, __dirname + "/" + finalFileNameExt);
    // const finalPath = path.join(__dirname, finalFileNameExt);
    // console.log(fs.createReadStream(finalPath));
    // if (!fs.existsSync(finalPath)) {
    //   throw new Error("File not found!");
    // }

    let file = await driveService
      .saveFile(
        finalFileName,
        uploadFile.buffer,
        uploadFile.mimetype,
        subfolder.id
      )
      .catch((error) => {
        console.error(error);
      });
    // fs.unlinkSync(finalPath);

    await driveService
      .updatePermission(file.data.id, "reader", "anyone")
      .catch((error) => {
        console.error(error);
      });

    return file;
  }
}

module.exports = QuestionResultController;
