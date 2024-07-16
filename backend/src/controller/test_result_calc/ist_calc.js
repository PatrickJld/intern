const {
  data_not_found_response,
  success_response,
} = require("../../helpers/ResponseHelper");

const xlsxFile = require("read-excel-file/node");
const FormulaParser = require('hot-formula-parser').Parser;
const SectionResult = require("../../models/SectionResult");
const Section = require("../../models/Section");
const QuestionResult = require("../../models/QuestionResult");
const ISTData = require("../../models/ISTData");

async function q_result_ist(data, section_id, ctr_correct, secres, res) {
  xlsxFile("./src/data/test_norma.xlsx", {
    sheet: "17_formula",
  }).then(async (rows) => {
    let results = [];

    let start_cols = [0, 3, 6, 9, 12, 18, 21, 24, 27];
    let refer_col = ["A", "D", "G", "", "M", "S", "V", "Y", "AB"];
    let persoalan = section_id - 61;
    let col = start_cols[persoalan]; //fisr section id = 61
    for (let j = 3; j < 3 + data.length; j++) {
      let status_correct = false;
      let d = data[j - 3];
      d.answer = d.answer + "";

      // console.log("========");
      let numbers = col != 9 ? rows[0][col + 1] : rows[0][col];
      // console.log(numbers);
      let kunci = col != 9 ? rows[j][col] : "";
      let formulaAnswer = col != 9 ? rows[j][col + 1] : rows[j][col];
      formulaAnswer = formulaAnswer.replace(/;/g, ",");

      let regex = new RegExp(refer_col[persoalan] + j, "g");
      formulaAnswer = formulaAnswer.replace(regex, '"' + kunci + '"');
      formulaAnswer = formulaAnswer.replace(/#REF!/g, '"' + d.answer + '"');
      formulaAnswer = formulaAnswer.toUpperCase();
      formulaAnswer = formulaAnswer.substring(1, formulaAnswer.length)

      // console.log(kunci, formulaAnswer);
      var parser = new FormulaParser();
      let parseResult = parser.parse(formulaAnswer);
      console.log(parseResult);
      ctr_correct += parseResult.result;
      if (parseResult != 0) status_correct = true;

      const new_result = await QuestionResult.create({
        section_result_id: secres.id,
        question_id: d.question_id,
        answer: d.answer,
        status_correct: status_correct,
      });

      results.push(new_result);
    }
    secres.set({
      num_correct: ctr_correct,
    });
    secres.save();

    success_response(res, results, "Create Multiple Successful!");
  });
}

async function calculate_ist_test(test_type, testres, res) {
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

        ISTData.findOne({
          where: {
            test_result_id: testres.id,
          },
        }).then((ist_data) => {
          if (!ist_data) {
            data_not_found_response(res);
            return;
          }

          // Calculate with norms
          process_ist(
            "./src/data/test_norma.xlsx",
            test_type,
            correct_data,
            res,
            testres,
            ist_data
          );
        });
      });
    }
  );
}

async function process_ist(
  excel_path,
  sheet,
  correct_data,
  res,
  testres,
  ist_data
) {
  // Read Norms from Excel
  xlsxFile(excel_path, {
    sheet: sheet,
  }).then(async (rows) => {
    console.log(correct_data.length);
    console.log("Answers: ", correct_data);

    let factors = ["SE", "WA", "AN", "GE", "RA", "ZR", "FA", "WU", "ME"];
    let usia = ist_data.usia;

    // Load Norms
    let norms_lookup = {};
    let tahuns = [
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "20",
      "24",
      "28",
      "33",
      "39",
      "45",
      "60",
    ];
    for (let k = 0; k < 13; k++) {
      let start_col = k * 10;
      let end_col = start_col + 9;
      let code = tahuns[k];
      let clump = {};

      // column
      for (let i = start_col; i <= end_col; i++) {
        let norm = [];
        let col_name = rows[2][i] ?? "RW";
        let rowlength = col_name == "GE" || col_name == "RW" ? 33 : 21;
        for (let j = 3; j < 3 + rowlength; j++) {
          //rows
          norm.push(rows[j][i] ?? 0);
        }
        clump[col_name] = norm;
      }
      norms_lookup[code] = clump;
    }
    // console.log(norms_lookup[usia + ""]);

    let norm_usia = "";
    if (usia < 13) norm_usia = "13";
    else if (usia <= 20) norm_usia = usia + "";
    else if (usia <= 24) norm_usia = "24";
    else if (usia <= 28) norm_usia = "28";
    else if (usia <= 33) norm_usia = "33";
    else if (usia <= 39) norm_usia = "39";
    else if (usia <= 45) norm_usia = "45";
    else norm_usia = "60";
    // console.log(norms_lookup[norm_usia]);

    // Calculate Norms
    let factors_results = {};
    factors_results["jumlah_RW"] = 0;
    factors_results["jumlah_SW"] = 0;
    factors_results["IQ"] = 0;
    for (let i = 0; i < factors.length; i++) {
      // lookup SW from excel
      let factor = factors[i];
      let lookup = norms_lookup[norm_usia];
      let RW = lookup["RW"][correct_data[i]];
      let SW = lookup[factor][RW];

      // Category
      let kategori = "";
      if (SW <= 80) kategori = "Sangat Rendah";
      else if (SW <= 94) kategori = "Rendah";
      else if (SW <= 99) kategori = "Sedang";
      else if (SW <= 104) kategori = "Cukup";
      else if (SW <= 118) kategori = "Tinggi";
      else kategori = "Sangat Tinggi";

      factors_results[factor] = {};
      factors_results[factor]["RW"] = RW;
      factors_results[factor]["SW"] = SW;
      factors_results[factor]["kategori"] = kategori;
      factors_results["jumlah_RW"] += RW;
    }

    // Load Gesamt Lookup
    let norms_lookup_gesamt = {};
    for (let k = 0; k < 15; k++) {
      let code = k == 0 ? "RW" : k == 14 ? "IQ" : tahuns[k - 1];

      // column
      let norm = [];
      for (let i = 41; i <= 41 + 180; i++) {
        norm.push(rows[i][k] ?? 0);
      }
      norms_lookup_gesamt[code] = norm;
    }

    // Lookup Gesamt from excel
    let lookup = norms_lookup_gesamt[norm_usia];
    let RW = norms_lookup_gesamt["RW"][factors_results["jumlah_RW"]];
    let jumlah_SW = lookup[RW];
    factors_results["jumlah_SW"] = jumlah_SW;

    // Lookup IQ from excel
    lookup = norms_lookup_gesamt["IQ"];
    RW = norms_lookup_gesamt["RW"][factors_results["jumlah_SW"]];
    let IQ = lookup[RW];
    factors_results["IQ"] = { IQ: IQ };

    // Keterangan IQ
    let kategori_iq = "";
    if (IQ <= 65) kategori_iq = "Mentally Defective";
    else if (IQ <= 79) kategori_iq = "Borderline Defective";
    else if (IQ <= 90) kategori_iq = "Low Average";
    else if (IQ <= 110) kategori_iq = "Average";
    else if (IQ <= 119) kategori_iq = "High Average";
    else if (IQ <= 127) kategori_iq = "Superior";
    else if (IQ <= 139) kategori_iq = "Very Superior";
    else kategori_iq = "Genius";
    factors_results["IQ"]["kategori"] = kategori_iq;

    // Calculate Dominasi
    let temp_a = factors_results["GE"]["SW"] + factors_results["RA"]["SW"];
    let temp_b = factors_results["AN"]["SW"] + factors_results["ZR"]["SW"];
    let temp_res = 0;
    if (temp_a > temp_b) temp_res = temp_a - temp_b;
    else temp_res = temp_b - temp_a;

    let dominasi = "";
    if (temp_res <= 10) dominasi = "Seimbang";
    else if (temp_a > temp_b) dominasi = "Eksak";
    else if (temp_b < temp_a) dominasi = "Non Eksak";
    else dominasi = "Non Eksak";
    factors_results["dominasi"] = dominasi;

    console.log("Result JSON:", factors_results);

    testres.set({
      result: JSON.stringify(factors_results),
    });
    testres.save();

    success_response(res, testres?.toJSON(), "Calculate successful!");
  });
}

module.exports = { calculate_ist_test, q_result_ist };
