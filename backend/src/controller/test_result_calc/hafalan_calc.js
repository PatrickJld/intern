const {
  data_not_found_response,
  success_response,
} = require("../../helpers/ResponseHelper");
const xlsxFile = require("read-excel-file/node");
const SectionResult = require("../../models/SectionResult");
const Section = require("../../models/Section");

async function calculate_hafalan_test(test_type, testres, res) {
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
        // correct_data.shift();
        correct_data = [correct_data.shift()];

        // Calculate with norms
        process_hafalan(
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

async function process_hafalan(excel_path, sheet, correct_data, res, testres) {
  // Read Norms from Excel
  xlsxFile(excel_path, {
    sheet: sheet,
  }).then(async (rows) => {
    console.log("Correct Data: ", correct_data);

    let norms_lookup = [];
    let norms_value = [];
    let categories = rows[0][1];
    for (let i = 2; i < 2 + categories; i++) {
      norms_lookup.push(rows[i][0]);
      norms_value.push(rows[i][1]);
    }
    // console.log(norms_lookup);
    // console.log(norms_value);

    //   Calculate Norms
    let results = [];
    for (let i = 0; i < correct_data.length; i++) {
      for (let j = 0; j < categories; j++) {
        let split = norms_lookup[j].split("-");
        let low = split[0];
        let high = split[1];

        if (correct_data[i] >= low && correct_data[i] <= high) {
          let result = {
            num_correct: correct_data[i],
            norma: norms_value[j],
          };
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

module.exports = { calculate_hafalan_test };
