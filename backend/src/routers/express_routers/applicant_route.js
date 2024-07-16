const ApplicantController = require("../../controller/applicant_controller");
const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer();

let controller = new ApplicantController();
router.get("/all", controller.getAll);

router.post(
    "/create",
    upload.single("lampiran"),
    controller.create.bind(controller)
);

router.post(
    "/update",
    upload.single("lampiran"),
    controller.update.bind(controller)
);

router.get("/vacancy/:id_vacancy", controller.getByVacancy);
router.get("/:email", controller.getOne);
router.get("/", controller.getByFilter);

module.exports = router;