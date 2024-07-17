const SectionResultController = require("../../controller/section_result_controller");
const express = require("express");
const router = express.Router();

let controller = new SectionResultController();
router.get("/all", controller.getAll);

router.post("/create", controller.create.bind(controller));
router.post("/update", controller.update.bind(controller));

router.get("/getbysection/:section_id", controller.getBySection);
router.get("/getbytest/:test_id", controller.getByTest);
router.get("/getLatest", controller.getLatest);
router.get("/:id", controller.getOne);

module.exports = router;