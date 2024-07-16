const JobVacancyController = require("../../controller/job_vacancy_controller");
const express = require("express");
const router = express.Router();

let controller = new JobVacancyController();
router.get("/all", controller.getAll);

router.post("/create", controller.create.bind(controller));
router.post("/update", controller.update.bind(controller));
router.post("/refreshQR", controller.refreshQR.bind(controller));

router.get("/:id", controller.getOne);
router.get("/", controller.getByFilter);

module.exports = router;