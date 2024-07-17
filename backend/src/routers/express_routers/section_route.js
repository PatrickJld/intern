const SectionController = require("../../controller/section_controller");
const express = require("express");
const router = express.Router();

let controller = new SectionController();
router.get("/all/:test_id?", controller.getAll);

router.post("/create", controller.create.bind(controller));
router.post("/update", controller.update.bind(controller));

router.get("/:id", controller.getOne);

module.exports = router;