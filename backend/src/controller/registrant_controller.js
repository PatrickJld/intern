const Registrant = require("../models/Registrant");
const {
  missing_param_response,
  unique_id_response,
  data_not_found_response,
  success_response,
} = require("../helpers/ResponseHelper");
const { validate_required_columns } = require("../helpers/ValidationHelper");
const {driveService} = require("../helpers/GoogleDriveService");

const driveStorageID = process.env.GOOGLE_DRIVE_STORAGE_ID || "";

class RegistrantController {
  async getOne(req, res) {
    console.log("Getting Registrant Data...");

    if (!req.params.email) {
      missing_param_response(res);
      return;
    }

    Registrant.findOne({ where: { email: req.params.email } }).then(
      (registrant) => {
        if (!registrant) {
          data_not_found_response(res);
          return;
        }

        if (registrant.biodata != "")
          registrant.biodata = JSON.parse(registrant.biodata);
        else registrant.biodata = {};
        success_response(res, registrant, "Get One Data Successful!");
      }
    );
  }

  async getAll(req, res) {
    console.log("Getting All Registrant Data...");

    Registrant
      .findAll
      // { where: { status: 1 } }
      ()
      .then((registrants) => {
        if (registrants.length == 0) {
          data_not_found_response(res);
          return;
        }

        for (const key in registrants) {
          if (registrants[key].biodata != "")
            registrants[key].biodata = JSON.parse(registrants[key].biodata);
          else registrants[key].biodata = {};
        }
        success_response(res, registrants, "Get All Data Successful!");
      });
  }

  async create(req, res) {
    console.log("Creating A New Registrant Data...");

    if (!validate_required_columns(req, Registrant, ["status"]) || !req.file) {
      missing_param_response(res);
      return;
    }

    this.isIdUnique(req.body.email).then(async (isUnique) => {
      if (!isUnique) {
        unique_id_response(res);
        return;
      }

      const new_registrant = await Registrant.create({
        email: req.body.email,
        biodata: JSON.stringify(req.body.biodata),
      });

      success_response(res, new_registrant.toJSON(), "Create Successful!");
    });
  }

  async update(req, res) {
    console.log("Updating A Registrant Data...");

    if (
      !validate_required_columns(
        req,
        Registrant,
        ["email", "status"],
        ["updating_email"]
      )
    ) {
      missing_param_response(res);
      return;
    }

    Registrant.findOne({ where: { email: req.body.updating_email } }).then(
      async (registrant) => {
        if (!registrant) {
          data_not_found_response(res);
          return;
        }

        // Upload Tanda_Tangan
        if(req.file){
          let file = await this.uploadTandaTangan(
            req.file,
            req.body.updating_email
          );
  
          req.body["tanda_tangan"] = file.data.id;
        }
        
        let biodata = req.body;
        biodata.kesehatan = JSON.parse(biodata.kesehatan ?? '""');
        biodata.status_nikah = JSON.parse(biodata.status_nikah ?? '""');
        biodata.pendidikan = JSON.parse(biodata.pendidikan ?? '""');
        biodata.keluarga = JSON.parse(biodata.keluarga ?? '""');
        biodata.riwayat_pekerjaan = JSON.parse(
          biodata.riwayat_pekerjaan ?? '""'
        );
        biodata.training_kursus = JSON.parse(biodata.training_kursus ?? '""');
        biodata.organisasi = JSON.parse(biodata.organisasi ?? '""');
        biodata.bahasa_dikuasai = JSON.parse(biodata.bahasa_dikuasai ?? '""');
        biodata.keterangan_kerja = JSON.parse(biodata.keterangan_kerja ?? "{}");
        biodata.keterangan_kerja.kenalan = JSON.parse(
          biodata.keterangan_kerja.kenalan ?? '""'
        );
        biodata.kendaraan = JSON.parse(biodata.kendaraan ?? '""');
        biodata.prestasi = JSON.parse(biodata.prestasi ?? '""');
        biodata.seni_dikuasai = JSON.parse(biodata.seni_dikuasai ?? '""');
        biodata.orang_terdekat = JSON.parse(biodata.orang_terdekat ?? '""');

        delete biodata["updating_email"];
        console.log(biodata);

        registrant.set({
          biodata: JSON.stringify(biodata),
        });
        registrant.save();

        success_response(res, registrant?.toJSON(), "Update successful!");
      }
    );
  }

  async isIdUnique(email) {
    return Registrant.count({ where: { email: email } }).then((count) => {
      if (count != 0) {
        return false;
      }
      return true;
    });
  }

  async uploadTandaTangan(uploadFile, email) {
    // Get applicant folder
    let subfolders = await driveService
      .searchInParent(driveStorageID)
      .catch((error) => {
        console.error(error);
        return null;
      });
    let subfolder = subfolders.filter(
      (subfolder) => subfolder.name == "TANDA_TANGAN"
    )[0];

    let ext = uploadFile.originalname.split(".");
    ext = ext[ext.length - 1];

    // Delete Applicant if any
    await driveService.deleteFileFromFolder(
      subfolder.id,
      "Registrant_" + email + ".jpg"
    );

    // Send File
    let file = await driveService
      .saveFile(
        "Registrant_" + email + ".jpg",
        uploadFile.buffer,
        uploadFile.mimetype,
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
}

module.exports = RegistrantController;
