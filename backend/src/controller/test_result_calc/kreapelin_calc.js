const {
  data_not_found_response,
  success_response,
} = require("../../helpers/ResponseHelper");

const xlsxFile = require("read-excel-file/node");
const { toFixed } = require("../../helpers/Utilities");
const SectionResult = require("../../models/SectionResult");
const QuestionResult = require("../../models/QuestionResult");
const Question = require("../../models/Question");
const KreapelinData = require("../../models/KreapelinData");

async function calculate_kreapelin(test_type, testres, res) {
  SectionResult.findOne({ where: { test_result_id: testres.id } }).then(
    (sectionres) => {
      QuestionResult.findAll({
        where: { section_result_id: sectionres.id },
      }).then((questionres) => {
        Question.findAndCountAll({
          where: { section_id: sectionres.section_id },
        }).then((questions) => {
          let correct_data = [];
          correct_data = correct_data.concat(Array(questions.count).fill(0));

          let sum_correct = 0;
          let sum_error = 0;
          let sum_skipped = 0;
          let total_questions = 0;
          for (let i = 0; i < questionres.length; i++) {
            for (let j = 0; j < questions.rows.length; j++) {
              if (questionres[i].question_id == questions.rows[j].id) {
                let ctr_correct = 0;

                let correct_answer = questions.rows[j].answer.split(",");
                let user_answer = questionres[i].answer.split(",");

                //assumed if first answer is -1, that row is skipped
                if (user_answer[0] == -1) {
                  sum_skipped++;
                  break;
                }

                for (let k = 0; k < user_answer.length; k++) {
                  if (user_answer[k] == correct_answer[k]) ctr_correct++;
                  else if (user_answer[k] != "-1") sum_error++;
                }
                correct_data[i] = ctr_correct;
                sum_correct += ctr_correct;

                total_questions += user_answer.length;
                break;
              }
            }
          }
          console.log(correct_data);
          let data_sums = {
            sum_correct: sum_correct,
            sum_error: sum_error,
            sum_skipped: sum_skipped,
            total_questions: total_questions,
          };
          console.log(data_sums);

          KreapelinData.findOne({
            where: {
              section_result_id: sectionres.id,
            },
          }).then((kreapelin_data) => {
            if (!kreapelin_data) {
              data_not_found_response(res);
              return;
            }

            process_kreapelin(
              "./src/data/test_norma.xlsx",
              test_type,
              correct_data,
              res,
              testres,
              kreapelin_data,
              data_sums
            );
          });
        });
      });
    }
  );
}

async function process_kreapelin(
  excel_path,
  sheet,
  correct_data,
  res,
  testres,
  kreapelin_data,
  data_sums
) {
  //   Calculate Norms
  let n = correct_data.length;
  let sum_x = 0;
  let sum_y = 0;
  let sum_xy = 0;
  let sum_pow_x = 0;
  for (let i = 1; i <= n; i++) {
    let x = i;
    let y = correct_data[i - 1];
    sum_x += x;
    sum_y += y;

    let xy = x * y;
    let x_pow = x * x;
    sum_xy += xy;
    sum_pow_x += x_pow;
  }

  let sum_x_sum_y = sum_x * sum_y;
  let pow_sum_x = sum_x * sum_x;

  let b = (n * sum_xy - sum_x_sum_y) / (n * sum_pow_x - pow_sum_x);
  let x = sum_x / n;
  let y = sum_y / n;
  let a = y - b * x;

  let b_round = toFixed(b, 4);
  let y_round = toFixed(y, 1);
  let a_round = toFixed(a, 4);

  let ori_datas = [];
  let sum_f = 0;
  let sum_fy = 0;
  // Find xy, x^2, y_regresi
  for (let i = 1; i <= n; i++) {
    let x = i;
    let y = correct_data[i - 1];
    let xy = x * y;
    let x_pow = x * x;

    let y_regresi = a + b * x;

    let data = {
      x: x,
      y: y,
      xy: xy,
      x_pow: x_pow,
      y_regresi: y_regresi,
    };
    ori_datas.push(data);
  }

  let calc_datas = [];
  // Find f and fy
  for (let i = 1; i <= 27; i++) {
    let f = 0;
    for (let j = 0; j < n; j++) {
      let y_search = correct_data[j];
      if (y_search == i) f++;
    }
    let fy = f * i;

    sum_f += f;
    sum_fy += fy;

    let data = {
      y: i,
      f: f,
      fy: fy,
    };
    calc_datas.push(data);
  }

  let sum_dev = 0;
  let sum_d = 0;
  let sum_fd = 0;

  let panker = 0;
  let janker = 0;
  let hanker = 0;
  let tianker = 0;
  // Find dev, d, fd
  for (let i = 0; i < calc_datas.length; i++) {
    let data = calc_datas[i];

    panker = sum_fy / n;
    let dev = 0;
    let d = 0;
    let fd = 0;
    if (data.f != 0) {
      dev = toFixed(data.y - panker, 2);

      if (panker > data.y) d = dev * -1;
      else d = dev;

      fd = toFixed(data.f * d, 2);
    }

    calc_datas[i].dev = dev;
    calc_datas[i].d = d;
    calc_datas[i].fd = fd;

    sum_dev += dev;
    sum_d += d;
    sum_fd += fd;
  }
  sum_dev = toFixed(sum_dev, 2);
  sum_d = toFixed(sum_d, 2);
  sum_fd = toFixed(sum_fd, 2);

  janker = toFixed(sum_fd / n, 2);
  hanker = toFixed(ori_datas[n - 1].y_regresi - a, 2);

  tianker = data_sums.sum_error + data_sums.sum_skipped;

  let codes = [0, 0, 0, 0];
  let k_pendidikan = kreapelin_data.pendidikan.toLowerCase();
  let k_jurusan = kreapelin_data.jurusan.toLowerCase();
  let k_jk = kreapelin_data.jenis_kelamin.toLowerCase();

  // kode panker
  if (k_pendidikan == "smea") codes[0] = 1;
  else if (k_pendidikan == "stm-smk") codes[0] = 2;
  else if (k_pendidikan == "sma") codes[0] = 3;
  else if (k_pendidikan == "sarjana muda") {
    if (k_jurusan == "ips") {
      if (k_jk == "l") codes[0] = 4;
      else if (k_jk == "p") codes[0] = 5;
    } else if (k_jurusan == "ipa") {
      codes[0] = 6;
    }
  } else if (k_pendidikan == "sarjana") {
    if (k_jurusan == "ips") {
      codes[0] = 7;
    } else if (k_jurusan == "ipa") {
      codes[0] = 8;
    }
  }

  // kode janker
  if (k_pendidikan == "smea") codes[1] = 1;
  else if (k_pendidikan == "stm-smk") codes[1] = 2;
  else if (k_pendidikan == "sma") codes[1] = 3;
  else if (k_pendidikan == "sarjana muda") codes[1] = 4;
  else if (k_pendidikan == "sarjana") codes[1] = 5;

  // kode hanker
  if (k_pendidikan == "smea") codes[2] = 1;
  else if (k_pendidikan == "stm-smk") codes[2] = 2;
  else if (k_pendidikan == "sma") codes[2] = 3;
  else if (k_pendidikan == "sarjana muda") {
    if (k_jurusan == "ips") {
      if (k_jk == "l") codes[2] = 4;
      else if (k_jk == "p") codes[2] = 5;
    } else if (k_jurusan == "ipa") {
      codes[2] = 6;
    }
  } else if (k_pendidikan == "sarjana") codes[2] = 7;

  // kode tianker
  if (k_pendidikan == "smea") codes[3] = 1;
  else if (k_pendidikan == "stm-smk") codes[3] = 2;
  else if (k_pendidikan == "sma") {
    if (k_jurusan == "ipa") codes[3] = 3;
    else if (k_jurusan == "ips") codes[3] = 4;
  } else if (k_pendidikan == "sarjana muda") codes[3] = 7;
  else if (k_pendidikan == "sarjana") codes[3] = 8;

  let values = [panker, janker, hanker, tianker];
  let analisis = await analisis_kreapelin_data(
    excel_path,
    sheet,
    codes,
    values
  );

  let results = {
    sum_x: sum_x,
    sum_y: sum_y,
    sum_xy: sum_xy,
    sum_pow_x: sum_pow_x,
    sum_x_sum_y,
    sum_x_sum_y,
    pow_sum_x,
    pow_sum_x,
    sum_f: sum_f,
    sum_fy: sum_fy,
    b: b_round,
    x: x,
    y: y_round,
    a: a_round,
    sum_dev: sum_dev,
    sum_d: sum_d,
    sum_fd: sum_fd,
    panker: {
      val: panker,
      analisis: analisis["panker"],
    },
    janker: {
      val: janker,
      analisis: analisis["janker"],
    },
    hanker: {
      val: hanker,
      analisis: analisis["hanker"],
    },
    tianker: {
      val: tianker,
      analisis: analisis["tianker"],
    },
    ori_datas: ori_datas,
    calc_datas: calc_datas,
  };
  console.log("Result JSON: ", results);

  testres.set({
    result: JSON.stringify(results),
  });
  testres.save();

  success_response(res, testres?.toJSON(), "Calculate successful!");
}

async function analisis_kreapelin_data(excel_path, sheet, codes, values) {
  let rows = await xlsxFile(excel_path, {
    sheet: sheet,
  });

  let keterangan_nama = ["panker", "janker", "hanker", "tianker"];
  let keterangan_ops = [8, 5, 7, 8];
  let keterangan_excel = [1, 11, 18, 27];
  let norms = {};
  for (let i = 0; i < keterangan_ops.length; i++) {
    let temp = [];
    for (let j = 0; j < keterangan_ops[i]; j++) {
      let row = keterangan_excel[i] + j;
      let temp2 = {
        code: j + 1,
        x: rows[row][1].split(";"),
        keterangan: rows[row][2].split(";"),
      };
      temp.push(temp2);
    }
    norms[keterangan_nama[i]] = temp;
  }

  let analysis = {};
  for (let i = 0; i < keterangan_nama.length; i++) {
    let norm = norms[keterangan_nama[i]].filter((obj) => {
      return obj.code == codes[i];
    });
    norm = norm[0];
    let hasil_keterangan = "";

    for (let j = 0; j < norm.x.length; j++) {
      let x = norm.x[j];
      let keterangan = norm.keterangan[j];

      //check if tianker or not
      if (keterangan_nama[i] != "tianker") {
        if (values[i] <= x) {
          hasil_keterangan = keterangan;
          break;
        }
      } else {
        if (values[i] >= x) {
          hasil_keterangan = keterangan;
          break;
        }
      }
    }
    analysis[keterangan_nama[i]] = hasil_keterangan;
  }

  return analysis;
}

module.exports = { calculate_kreapelin };
