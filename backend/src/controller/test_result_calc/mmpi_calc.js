const { success_response } = require("../../helpers/ResponseHelper");

const xlsxFile = require("read-excel-file/node");
const SectionResult = require("../../models/SectionResult");
const QuestionResult = require("../../models/QuestionResult");
const Question = require("../../models/Question");

async function calculate_mmpi_tests(test_type, testres, res) {
  SectionResult.findOne({
    where: { test_result_id: testres.id },
  }).then((sectionres) => {
    Question.findAndCountAll({
      where: { section_id: sectionres.section_id },
    }).then((questions) => {
      QuestionResult.findAll({
        where: { section_result_id: sectionres.id },
      }).then(async (qres) => {
        let correct_data = [];
        let answers = [];
        correct_data = correct_data.concat(Array(questions.count).fill(0));
        answers = answers.concat(Array(questions.count).fill(0));

        for (let i = 0; i < questions.count; i++) {
          for (let j = 0; j < qres.length; j++) {
            if (qres[j].question_id == questions.rows[i].id) {
              correct_data[i] = parseInt(qres[j].status_correct);
              answers[i] = parseInt(qres[j].answer);
              break;
            }
          }
        }

        // Calculate with norms
        process_mmpi(
          "./src/data/test_norma.xlsx",
          test_type,
          correct_data,
          answers,
          res,
          testres
        );
      });
    });
  });
}

async function process_mmpi(
  excel_path,
  sheet,
  correct_data,
  answers,
  res,
  testres
) {
  // Read Norms from Excel
  xlsxFile(excel_path, {
    sheet: sheet,
  }).then(async (rows) => {
    console.log("Correct Data: ", correct_data);
    console.log("Answers: ", answers);

    let norms = [];
    let start_rows = [0, 10, 20, 30, 40, 50, 60, 70, 80];
    for (let i = 0; i < start_rows.length; i++) {
      let temp_norms = {};
      temp_norms["jenis"] = rows[start_rows[i]][1];
      temp_norms["fields"] = rows[start_rows[i] + 1][1];
      temp_norms["question"] = rows[start_rows[i] + 2][1];

      // Split per Jenis
      let split = temp_norms["question"].split("-");
      let from_q = split[0];
      let to_q = split[1];
      temp_norms["answers"] = [];
      temp_norms["answers"] = answers.slice(from_q - 1, to_q);
      temp_norms["correct_data"] = [];
      temp_norms["correct_data"] = correct_data.slice(from_q - 1, to_q);
      temp_norms["sum_correct"] = temp_norms["correct_data"].reduce(
        (a, b) => a + b,
        0
      );

      temp_norms["lookup"] = [];
      temp_norms["value"] = [];
      for (
        let j = start_rows[i] + 4;
        j < start_rows[i] + 4 + temp_norms["fields"];
        j++
      ) {
        temp_norms["lookup"].push(rows[j][0]);
        temp_norms["value"].push(rows[j][1]);
      }
      norms.push(temp_norms);
    }

    console.log(norms);

    //   Calculate Norms
    let results = [];
    for (let i = 0; i < norms.length; i++) {
      let norm = norms[i];

      for (let j = 0; j < norm["fields"]; j++) {
        let split = norm["lookup"][j].split("-");
        let low = split[0];
        let high = split[1];

        if (norm["sum_correct"] >= low && norm["sum_correct"] <= high) {
          let result = {};

          let split = norm["question"].split("-");
          let from_q = parseInt(split[0]);
          let to_q = parseInt(split[1]);
          let temp_number = [];
          for (let k = from_q; k <= to_q; k++) {
            temp_number.push(k);
          }

          result["numbers"] = temp_number;
          result["answers"] = norm["answers"];
          result["correct_data"] = norm["correct_data"];

          result["jenis"] = norm["jenis"];
          result["sum_correct"] = norm["sum_correct"];
          result["keterangan"] = norm["value"][j];
          results.push(result);
          break;
        }
      }
    }
    console.log("Result JSON: ", results);

    testres.set({
      result: JSON.stringify(results),
    });
    testres.save();

    success_response(res, testres?.toJSON(), "Calculate successful!");
  });
}

module.exports = { calculate_mmpi_tests };
