const {
  missing_param_response,
  unique_id_response,
  data_not_found_response,
  success_response,
} = require("../helpers/ResponseHelper");
const { validate_required_columns } = require("../helpers/ValidationHelper");
const Applicant = require("../models/Applicant");
const {driveService} = require("../helpers/GoogleDriveService");

const driveStorageID = process.env.GOOGLE_DRIVE_STORAGE_ID || "";

class ApplicantController {
  async getOne(req, res) {
    console.log("Getting Applicant...");

    if (!req.params.email) {
      missing_param_response(res);
      return;
    }

    Applicant.findOne({ where: { email: req.params.email } }).then(
      (applicant) => {
        if (!applicant) {
          data_not_found_response(res);
          return;
        }

        success_response(res, applicant, "Get One Data Successful!");
      }
    );
  }

  async getByFilter(req, res) {
    console.log("Getting Applicant By Filter...");

    let wheres = {};
    if (req.query.posisi) wheres.posisi_dilamar = req.query.posisi;
    if (req.query.jurusan) wheres.jurusan = req.query.jurusan;
    if (req.query.pendidikan) wheres.pendidikan_terakhir = req.query.pendidikan;

    Applicant.findAll({ where: wheres }).then((applicant) => {
      if (!applicant) {
        data_not_found_response(res);
        return;
      }

      success_response(res, applicant, "Get Multiple Data Successful!");
    });
  }

  async getByVacancy(req, res) {
    console.log("Getting Applicant By Vacancy...");

    // console.log(req.params.id_vacancy);
    if (!req.params.id_vacancy) {
      missing_param_response(res);
      return;
    }

    Applicant.findAll({
      where: { job_vacancy_id: req.params.id_vacancy },
    }).then((applicants) => {
      if (!applicants) {
        data_not_found_response(res);
        return;
      }

      success_response(res, applicants, "Get Multiple Data Successful!");
    });
  }

  async getAll(req, res) {
    console.log("Getting All Available Applicants...");

    Applicant.findAll({ where: { status: 1 } }).then((apllicants) => {
      if (apllicants.length == 0) {
        data_not_found_response(res);
        return;
      }

      success_response(res, apllicants, "Get All Data Successful!");
    });
  }

  async create(req, res) {
    console.log("Creating A New Applicant...");

    if (
      !validate_required_columns(
        req,
        Applicant,
        ["status", "lampiran_drive_id"],
        [],
        true
      )
    ) {
      missing_param_response(res);
      return;
    }

    this.isEmailUnique(req.body.email).then(async (isUnique) => {
      if (!isUnique) {
        unique_id_response(res);
        return;
      }

      // Upload Lampiran
      let file = await this.uploadLampiran(
        req.file,
        req.body.email
      );
      const new_applicant = await Applicant.create({
        job_vacancy_id: req.body.job_vacancy_id,
        nama: req.body.nama,
        no_ktp: req.body.no_ktp,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        jenis_kelamin: req.body.jenis_kelamin,
        alamat_domisili: req.body.alamat_domisili,
        usia: req.body.usia,
        status_perkawinan: req.body.status_perkawinan,
        nomor_hp: req.body.nomor_hp,
        email: req.body.email,
        pendidikan_terakhir: req.body.pendidikan_terakhir,
        nama_sekolah: req.body.nama_sekolah,
        jurusan: req.body.jurusan,
        posisi_dilamar: req.body.posisi_dilamar,
        lampiran_drive_id: file.data.id,
        portofolio: req.body.portofolio,
      });

      success_response(res, new_applicant.toJSON(), "Create Successful!");
    });
  }

  async update(req, res) {
    console.log("Updating A Applicant...");

    if (
      !validate_required_columns(
        req,
        Applicant,
        ["status", "lampiran_drive_id"],
        ["updating_id"],
        true
      )
    ) {
      missing_param_response(res);
      return;
    }

    Applicant.findOne({ where: { id: req.body.updating_id } }).then(
      async (applicant) => {
        if (!applicant) {
          data_not_found_response(res);
          return;
        }

        // Upload Lampiran
        if (req.file) {
          // Delete & Reupload Lampiran
          await driveService
            .deleteFile(applicant.lampiran_drive_id)
            .catch((error) => {
              console.error(error);
            });
          let file = await this.uploadLampiran(
            req.file,
            req.body.email
          );
          applicant.set({ lampiran_drive_id: file.data.id });
        }

        applicant.set({
          job_vacancy_id: req.body.job_vacancy_id,
          nama: req.body.nama,
          no_ktp: req.body.no_ktp,
          tempat_lahir: req.body.tempat_lahir,
          tanggal_lahir: req.body.tanggal_lahir,
          jenis_kelamin: req.body.jenis_kelamin,
          alamat_domisili: req.body.alamat_domisili,
          usia: req.body.usia,
          status_perkawinan: req.body.status_perkawinan,
          nomor_hp: req.body.nomor_hp,
          email: req.body.email,
          pendidikan_terakhir: req.body.pendidikan_terakhir,
          nama_sekolah: req.body.nama_sekolah,
          jurusan: req.body.jurusan,
          posisi_dilamar: req.body.posisi_dilamar,
        });
        applicant.save();

        success_response(res, applicant?.toJSON(), "Update successful!");
      }
    );
  }

  async uploadLampiran(uploadFile, email) {
    // Get applicant folder
    let subfolders = await driveService
      .searchInParent(driveStorageID)
      .catch((error) => {
        console.error(error);
        return null;
      });
    let subfolder = subfolders.filter(
      (subfolder) => subfolder.name == "APPLICANT"
    )[0];

    // Delete Lampiran Applicant
    await driveService.deleteFileFromFolder(
      subfolder.id,
      "Lampiran_Applicant_" + email
    );

    let ext = uploadFile.originalname.split(".");
    ext = ext[ext.length - 1];

    let file = await driveService
      .saveFile(
        "Lampiran_Applicant_" + email,
        uploadFile.buffer,
        "application/" + ext,
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

    return file;
  }

  async isEmailUnique(email) {
    return Applicant.count({ where: { email: email } }).then((count) => {
      if (count != 0) {
        return false;
      }
      return true;
    });
  }
}

module.exports = ApplicantController;
