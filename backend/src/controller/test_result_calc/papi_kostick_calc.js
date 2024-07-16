const {
  data_not_found_response,
  success_response,
} = require("../../helpers/ResponseHelper");

const xlsxFile = require("read-excel-file/node");
const SectionResult = require("../../models/SectionResult");
const QuestionResult = require("../../models/QuestionResult");
const Question = require("../../models/Question");

async function calculate_papi_kostick_test(test_type, testres, res) {
  SectionResult.findOne({
    where: { test_result_id: testres.id },
  }).then((sectionres) => {
    Question.findAndCountAll({
      where: { section_id: sectionres.section_id },
    }).then((questions) => {
      QuestionResult.findAll({
        where: { section_result_id: sectionres.id },
      }).then(async (qres) => {
        let answers = [];
        answers = answers.concat(Array(questions.count).fill(0));

        for (let i = 0; i < questions.count; i++) {
          for (let j = 0; j < qres.length; j++) {
            if (qres[j].question_id == questions.rows[i].id) {
              answers[i] = qres[j].answer;
              break;
            }
          }
        }

        // Calculate papi_kostick
        process_papi_kostick(
          "./src/data/test_norma.xlsx",
          test_type,
          answers,
          res,
          testres
        );
      });
    });
  });
}

async function process_papi_kostick(
  excel_path,
  sheet,
  correct_data,
  res,
  testres
) {
  // Read Norms from Excel
  xlsxFile(excel_path, {
    sheet: sheet,
  }).then(async (rows) => {
    console.log(correct_data.length);
    console.log("Answers: ", correct_data);

    let norms = [];
    let start_cols = [
      [0, 3, 6],
      [10, 13, 16],
      [20, 23],
      [27, 30, 33, 36],
      [40, 43, 46],
      [50, 53, 56],
      [60, 63],
    ];
    for (let i = 0; i < start_cols.length; i++) {
      let temp_category = [];
      temp_category["jenis"] = rows[1][start_cols[i][0]];

      for (let j = 0; j < start_cols[i].length; j++) {
        let col = start_cols[i][j];
        let temp_norms = {};
        temp_norms["aspek"] = rows[2][col + 1];
        temp_norms["faktor"] = rows[3][col + 1];
        temp_norms["lookup"] = [];
        temp_norms["value"] = [];
        for (let k = 5; k < 5 + 9; k++) {
          temp_norms["lookup"].push(rows[k][col]);
          temp_norms["value"].push(rows[k][col + 1]);
        }

        temp_norms["norm_lookup"] = [];
        temp_norms["norm_keterangan"] = [];
        let categories = rows[15][col + 1];
        for (let k = 17; k < 17 + parseInt(categories); k++) {
          temp_norms["norm_lookup"].push(rows[k][col]);
          temp_norms["norm_keterangan"].push(rows[k][col + 1]);
        }
        temp_category.push(temp_norms);
      }

      norms.push(temp_category);
    }
    // for (let i = 0; i < norms.length; i++) {
    //   console.log(norms[i]);
    // }

    //   Calculate Norms
    let results = [];
    for (let i = 0; i < norms.length; i++) {
      let temp_results = {};
      temp_results["jenis"] = norms[i]["jenis"];
      temp_results["data"] = [];

      for (let j = 0; j < norms[i].length; j++) {
        let temp_result = {};
        temp_result["aspek"] = norms[i][j]["aspek"];
        temp_result["faktor"] = norms[i][j]["faktor"];

        let nilai = 0;
        for (let k = 0; k < norms[i][j]["lookup"].length; k++) {
          if (
            correct_data[norms[i][j]["lookup"][k] - 1].toUpperCase() ==
            norms[i][j]["value"][k].toUpperCase()
          ) {
            nilai = nilai + 1;
          }
        }
        temp_result["nilai"] = nilai;

        for (let k = 0; k < norms[i][j]["norm_lookup"].length; k++) {
          let split = norms[i][j]["norm_lookup"][k].split("-");
          let low = split[0];
          let high = split[1];

          if (nilai >= low && nilai <= high) {
            temp_result["keterangan"] = norms[i][j]["norm_keterangan"][k];
            break;
          }
        }

        temp_results["data"].push(temp_result);
      }
      results.push(temp_results);
    }

    // Calculate Total Bawah & Atas
    results["total_atas"] = 0;
    results["total_bawah"] = 0;
    for (let i = 0; i < 10; i++) {
      let row_atas = rows[25 + i][0];
      let row_bawah = rows[25 + i][1];
      let arr_atas = 0;
      let arr_bawah = 0;
      for (let j = 0; j < results.length; j++) {
        for (let k = 0; k < results[j]["data"].length; k++) {
          if (results[j]["data"][k]["faktor"] == row_atas) {
            arr_atas = arr_atas + results[j]["data"][k]["nilai"];
          }

          if (results[j]["data"][k]["faktor"] == row_bawah) {
            arr_bawah = arr_bawah + results[j]["data"][k]["nilai"];
          }
        }
      }

      results["total_atas"] = results["total_atas"] + arr_atas;
      results["total_bawah"] = results["total_bawah"] + arr_bawah;
    }
    console.log("Result JSON:", results);

    testres.set({
      result: JSON.stringify(results),
    });
    testres.save();

    success_response(res, testres?.toJSON(), "Calculate successful!");
  });
}

module.exports = { calculate_papi_kostick_test };
