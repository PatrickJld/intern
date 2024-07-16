const {
  missing_param_response,
  unique_id_response,
  data_not_found_response,
  success_response,
} = require("../helpers/ResponseHelper");
const { validate_required_columns } = require("../helpers/ValidationHelper");
const JobVacancy = require("../models/JobVacancy");
const {driveService} = require("../helpers/GoogleDriveService");
const QRImage = require("qr-image");
const fs = require("fs");

const driveStorageID = process.env.GOOGLE_DRIVE_STORAGE_ID || "";

class JobVacancyController {
  async getOne(req, res) {
    console.log("Getting Job Vacancy...");

    if (!req.params.id) {
      missing_param_response(res);
      return;
    }

    JobVacancy.findOne({ where: { id: req.params.id } }).then((jobvacancy) => {
      if (!jobvacancy) {
        data_not_found_response(res);
        return;
      }

      success_response(res, jobvacancy, "Get One Data Successful!");
    });
  }

  async getByFilter(req, res) {
    console.log("Getting Job Vacancy By Filter...");

    JobVacancy.findAll().then((jobvacancy) => {
      jobvacancy = jobvacancy.filter(
        (jv) => new Date(jv.start_date) >= new Date(req.query.start_date)
      );
      if (!jobvacancy) {
        data_not_found_response(res);
        return;
      }

      success_response(res, jobvacancy, "Get Multiple Data Successful!");
    });
  }

  async getAll(req, res) {
    console.log("Getting All Job Vacancy...");

    // JobVacancy.findAll({ where: { status: 1 } }).then((vacancy) => {
    JobVacancy.findAll().then((vacancy) => {
      if (vacancy.length == 0) {
        data_not_found_response(res);
        return;
      }

      success_response(res, vacancy, "Get All Data Successful!");
    });
  }

  async create(req, res) {
    console.log("Creating A New Job Vacancy...");

    if (
      !validate_required_columns(
        req,
        JobVacancy,
        ["status", "qr_link"],
        ["url"]
      )
    ) {
      missing_param_response(res);
      return;
    }

    const new_vacancy = await JobVacancy.create({
      name: req.body.name,
      qr_link: "-",
      list_pekerjaan: req.body.list_pekerjaan.join(),
      start_date: req.body.start_date,
    });

    // Create QR File
    await this.createQR(req.body.url);

    // Upload QR
    let qr_link = await this.uploadQR(new_vacancy.id);
    qr_link = "https://drive.google.com/file/d/" + qr_link.data.id;

    new_vacancy.set({
      qr_link: qr_link,
    });
    new_vacancy.save();

    success_response(res, new_vacancy.toJSON(), "Create Successful!");
  }

  async update(req, res) {
    console.log("Updating A Job Vacancy...");

    if (
      !validate_required_columns(req, JobVacancy, ["qr_link"], ["updating_id"])
    ) {
      missing_param_response(res);
      return;
    }

    JobVacancy.findOne({
      where: { id: req.body.updating_id },
    }).then(async (vacancy) => {
      if (!vacancy) {
        data_not_found_response(res);
        return;
      }

      // Upload QR
      let qr_link = vacancy.qr_link;
      if (req.body.url) {
        // Delete & Reupload QR Code
        let fileId = vacancy.qr_link.split(
          "https://drive.google.com/file/d/"
        )[1];

        await driveService.deleteFile(fileId).catch((error) => {
          console.error(error);
        });

        // Create QR File
        await this.createQR(req.body.url);

        let link = await this.uploadQR(vacancy.id);
        link = "https://drive.google.com/file/d/" + link.data.id;
        qr_link = link;
      }

      // let start_date = vacancy.start_date;
      // if (req.body.start_date) {
      //   let split_date = req.body.start_date.split(" ")[0];
      //   let split_time = req.body.start_date.split(" ")[1];
      //   start_date =
      //     split_date.split("/")[2] +
      //     "-" +
      //     split_date.split("/")[1] +
      //     "-" +
      //     split_date.split("/")[0] +
      //     " " +
      //     split_time;
      // }

      vacancy.set({
        name: req.body.name ?? vacancy.name,
        qr_link: qr_link,
        list_pekerjaan: req.body.list_pekerjaan
          ? req.body.list_pekerjaan.join()
          : vacancy.list_pekerjaan,
        start_date: req.body.start_date,
        // start_date: start_date,
        status: req.body.status - 1,
      });
      await vacancy.save();

      success_response(res, vacancy?.toJSON(), "Update successful!");
    });
  }

  async refreshQR(req, res) {
    console.log("Refreshing QR Job Vacancy...");

    if (!req.body.url || !req.body.updating_id) {
      missing_param_response(res);
      return;
    }

    JobVacancy.findOne({
      where: { id: req.body.updating_id },
    }).then(async (vacancy) => {
      if (!vacancy) {
        data_not_found_response(res);
        return;
      }

      // Upload QR
      // Delete & Reupload QR Code
      let fileId = vacancy.qr_link.split("https://drive.google.com/file/d/")[1];

      await driveService.deleteFile(fileId).catch((error) => {
        console.error(error);
      });

      // Create QR File
      await this.createQR(req.body.url);

      let link = await this.uploadQR(vacancy.id);
      link = "https://drive.google.com/file/d/" + link.data.id;
      let qr_link = link;

      vacancy.set({
        qr_link: qr_link,
      });
      vacancy.save();

      success_response(res, vacancy?.toJSON(), "Refresh QR successful!");
    });
  }

  async uploadQR(id) {
    // Get vacancy folder
    let subfolders = await driveService
      .searchInParent(driveStorageID)
      .catch((error) => {
        console.error(error);
        return null;
      });
    let subfolder = subfolders.filter(
      (subfolder) => subfolder.name == "VACANCY"
    )[0];

    // Delete File
    await driveService.deleteFileFromFolder(
      subfolder.id,
      "VACANCY_" + id
    );

    let file = await driveService
      .saveFileFromLocal(
        "VACANCY_" + id,
        "qr_temp.png",
        "image/png",
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

    fs.unlinkSync("qr_temp.png");

    return file;
  }

  async createQR(text) {
    var qr_svg = QRImage.image(text, { type: "png" });
    qr_svg.pipe(require("fs").createWriteStream("qr_temp.png"));
  }
}

module.exports = JobVacancyController;
