const { success_response } = require("../../helpers/ResponseHelper");

const xlsxFile = require("read-excel-file/node");
const SectionResult = require("../../models/SectionResult");
const QuestionResult = require("../../models/QuestionResult");
const Question = require("../../models/Question");

async function calculate_sdi_tests(test_type, testres, res) {
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
        process_sdi(
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

async function process_sdi(
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

    let norms_lookup = [];
    let norms_value = [];
    let categories = rows[0][1];
    for (let i = 2; i < 2 + categories; i++) {
      norms_lookup.push(rows[i][0]);
      norms_value.push(rows[i][1]);
    }

    //   Calculate Norms
    let results = [];
    for (let j = 0; j < categories; j++) {
      let sum_correct = correct_data.reduce((a, b) => a + b, 0);

      let split = norms_lookup[j].split("-");
      let low = split[0];
      let high = split[1];

      if (sum_correct >= low && sum_correct <= high) {
        let numbers = [];
        for (let k = 0; k < correct_data.length; k++) {
          numbers.push(k + 1);
        }

        let result = {
          numbers: numbers,
          answers: answers,
          correct_data: correct_data,

          sum_correct: sum_correct,
          keterangan: norms_value[j],
        };
        results.push(result);
        break;
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

module.exports = { calculate_sdi_tests };
