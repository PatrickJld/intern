const {
  data_not_found_response,
  success_response,
} = require("../../helpers/ResponseHelper");

const xlsxFile = require("read-excel-file/node");
const SectionResult = require("../../models/SectionResult");
const Section = require("../../models/Section");
const { now } = require("moment");

const iq_lookup = {
  4: 85,
  5: 88,
  6: 91,
  7: 94,
  8: 97,
  9: 100,
  10: 103,
  11: 106,
  12: 109,
  13: 112,
  14: 115,
  15: 118,
  16: 121,
};

async function calculate_tintum_anak_test(test_type, testres, res) {
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

        // Calculate with norms
        process_tintum_anak(
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

/*async function process_tintum_anak(
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
    console.log("Correct Data: ", correct_data);

    let norms = [];
    let start_cols = [0, 3, 6, 9, 12, 15, 18, 21, 24];
    for (let i = 0; i < start_cols.length; i++) {
      let temp_norms = {};
      temp_norms["lookup"] = [];
      temp_norms["value"] = [];
      for (let j = 2; j < 2 + rows[0][start_cols[i] + 1]; j++) {
        temp_norms["lookup"].push(rows[j][start_cols[i]]);
        temp_norms["value"].push(rows[j][start_cols[i] + 1]);
      }

      temp_norms["norm_lookup"] = [];
      temp_norms["norm_keterangan"] = [];
      let keterangan_idx = 4 + rows[0][start_cols[i] + 1];
      let categories = rows[keterangan_idx][start_cols[i] + 1];
      for (
        let j = keterangan_idx + 2;
        j < keterangan_idx + 2 + categories;
        j++
      ) {
        temp_norms["norm_lookup"].push(rows[j][start_cols[i]]);
        temp_norms["norm_keterangan"].push(rows[j][start_cols[i] + 1]);
      }
      norms.push(temp_norms);
    }
    // console.log(norms);

    //   Calculate Norms
    let results = [];
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
          break;
        }
      }
      
      for (let j = 0; j < norms[i]["norm_lookup"].length; j++) {
        let split = norms[i]["norm_lookup"][j].split("-");
        let low = split[0];
        let high = split[1];
        
        if (results[i]!==undefined && results[i]["value"] >= low && results[i]["value"] <= high) {
          results[i]["keterangan"] = norms[i]["norm_keterangan"][j];
          break;
        }
      }
    }

    // Calculate IQ
    let norms_sum = 0
    results.forEach(result => { norms_sum += result.value });
    console.log("Norms Sum: ", norms_sum);
    let norms_div = norms_sum / 10;
    let norms_rounded = Math.floor(norms_div);

    let iq =
      iq_lookup[Object.keys(iq_lookup)[Object.keys(iq_lookup).length - 1]];
    for (const key in iq_lookup) {
      if (key >= norms_div) {
        let iq_keys = Object.keys(iq_lookup);
        let loc = iq_keys.indexOf(key);

        if (key == norms_div) iq = iq_lookup[key];
        else if (loc != 0) iq = iq_lookup[iq_keys[loc - 1]];
        else iq = 0;

        break;
      }
    }

    if (!(norms_div - norms_rounded < 0.3)) {
      iq = iq + Math.floor((norms_div - norms_rounded + 0.000001) / 0.3);
    }
    console.log("IQ: ", iq);

    console.log("Result JSON: ", results);

    let res_full = {};
    res_full.norms_sum = norms_sum;
    res_full.iq = iq;
    res_full.data = results;
    
    testres.set({
      result: JSON.stringify(res_full),
    });
    testres.save();

    success_response(res, testres?.toJSON(), "Calculate successful!");
  });
}
*/
async function process_tintum_anak(
  excel_path,
  sheet,
  correct_data,
  res,
  testres
){
  try{
    const rows = await xlsxFile(excel_path, {sheet});

    console.log("Correct Data: ", correct_data);

    let norms = [];
    let start_cols = [0, 3, 6, 9, 12, 15, 18, 21, 24];
    for(let i=0; i<start_cols.length;i++){
      let temp_norms = {
        lookup:[],
        value:[],
        norm_lookup:[],
        norm_keterangan:[],
      };

      for(let j=2; j < 2 + rows[0][start_cols[i]+1]; j++){
        temps_norms.lookup.push(rows[j][start_cols[i]]);
        temps_norms.value.push(rows[j][start_cols[i]+1]);
      }

      let keterangan_idx = 4 + rows[0][start_cols[1]+1];
      let categories = rows[keterangan_idx][start_cols[i]+1];
      for(
        let j = keterangan_idx + 2;
        j < keterangan_idx + 2 + categories;
        j++
      ){
        temps_norms.norm_lookup.push(rows[j][start_cols[i]]);
        temps_norms.norm_keterangan.push(rows[j][start_cols[i]+1]);
      }
      norms.push(temp_norms);
    }
    let results = [];
    let norms_sum = 0;

    for (let i=0;i<correct_data.length;i++){
      let result = {};
      result.num_correct = correct_data[i];

      for(let j=0;j<norms[i].lookup.length;j++){
        let split = norms[i].lookup[j].split("-");
        let low = split[0];
        let high = split[1];

        if(correct_data[i] >= low && correct_data[i] <= high ){
          result.value = norms[i].value[j];
          norms_sum += result.value;
          break;
        }
      }
      if(result.value != undefined){
        for(let j=0; j< norms[i].norm_lookup.length;j++){
          let split = norms[i].norm_lookup[j].split("-");
          let low = split[0];
          let high = split[1];

          if(result.value >= low && result.value <= high){
            result.keterangan = norms[i].norm_keterangan[j];
            break;
          }
        }
      }else{
        result.value = 0;
      }

      results.push(result);
    }

    let norms_div = norms_sum / 10;
    let norms_rounded = Math.floor(norms_div);

    let iq = iq_lookup[Object.keys(iq_lookup)[Object.keys(iq_lookup).length-1]];
    for (const key in iq_lookup){
      if( key >= norms_div){
        let iq_keys = Object.keys(iq_lookup);
        let loc = iq_keys.indexOf(key);

        if (key == norms_div)iq = iq_lookup[key];
        else if(loc !== 0) iq = iq_lookup[iq_keys[loc-1]];
        else iq = 0;

        break;
      }
    }

    if(!(norms_div- norms_rounded < 0.3)){
      iq = iq + Math.floor((norms_div - norms_rounded + 0.000001)/0.3);
    }
    console.log("IQ: ", iq);

    console.log("Result JSON: ", results);

    let res_full= {};
    res_full.norms_sum = norms_sum;
    res_full.iq = iq;
    res_full.data = results;

    testres.set({
      result: JSON.stringify(res_full),
    });
    await testres.save();

    success_response(res, testres?.toJSON(), "Calculate Succesfull!");
  }catch(error){
    console.error("Error processing tintum anak test: ", error);

    data_not_found_response(res, "Error processing data tintum anak test");
  }
}

module.exports = { calculate_tintum_anak_test };
