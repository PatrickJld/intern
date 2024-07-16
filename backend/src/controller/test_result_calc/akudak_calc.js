const {
  data_not_found_response,
  success_response,
} = require("../../helpers/ResponseHelper");

const xlsxFile = require("read-excel-file/node");
const SectionResult = require("../../models/SectionResult");
const Section = require("../../models/Section");

async function calculate_akudak_test(test_type, testres, res) {
  // Get correct answers per Section from Section Results
  SectionResult.findAll({ where: { test_result_id: testres.id } }).then(
    (sectionsres) => {
      Section.findAndCountAll({
        where: { test_id: testres.test_id },
      }).then((sections) => {
        let correct_data = [];
        correct_data = correct_data.concat(Array(sections.count).fill(0));

        for (let i = 0; i < sections.count; i++) {
          for (let j = 0; j < sectionsres.length; j++) {
            if (sectionsres[j].section_id == sections.rows[i].id) {
              correct_data[sections.rows[i].section_number - 1] =
                sectionsres[j].num_correct;
              break;
            }
          }
        }

        // Calculate with nwrms
        process_akudak(
          "./src/data/test_norma.xlsx",
          test_type,
          correct_data,
          res,
          testres
        );
      });
    }
  );
}

async function process_akudak(excel_path, sheet, correct_data, res, testres) {
  // Read Norms from Excel
  xlsxFile(excel_path, {
    sheet: sheet,
  }).then(async (rows) => {
    console.log("Correct Data: ", correct_data);

    let norms = [];
    let start_cols = [0, 3, 6, 9, 12, 15, 18];
    for (let i = 0; i < start_cols.length; i++) {
      let temp_norms = {};
      temp_norms["lookup"] = [];
      temp_norms["value"] = [];
      for (let j = 2; j < 2 + rows[0][start_cols[i] + 1]; j++) {
        temp_norms["lookup"].push(rows[j][start_cols[i]]);
        temp_norms["value"].push(rows[j][start_cols[i] + 1]);
      }
      norms.push(temp_norms);
    }
    // console.log(norms);

    //   Calculate Norms
    let results = [];
    results["norma"] = 0;
    for (let i = 0; i < correct_data.length; i++) {
      for (let j = 0; j < norms[i]["lookup"].length; j++) {
        let split = norms[i]["lookup"][j].split("-");
        let low = split[0];
        let high = split[1];

        if (correct_data[i] >= low && correct_data[i] <= high) {
          let result = {
            num_correct: correct_data[i],
            value: norms[i]["value"][j],
          };
          results.push(result);
          results["norma"] = results["norma"] + result["value"];
          break;
        }
      }
    }

    results["norma"] = results["norma"] / 5.0;
    for (let j = 0; j < norms[5]["lookup"].length; j++) {
      let split = norms[5]["lookup"][j].split("-");
      let low = split[0];
      let high = split[1];

      if (results["norma"] >= low && results["norma"] <= high) {
        results["keterangan"] = norms[5]["value"][j];
        break;
      }
    }

    results.push({
      "norma": results["norma"],
      "keterangan": results["keterangan"]
    })

    testres.set({
      result: JSON.stringify(results),
    });
    testres.save();

    success_response(res, testres?.toJSON(), "Calculate successful!");
  });
}

module.exports = { calculate_akudak_test };
