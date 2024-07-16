const EPPSDataController = require("../../controller/epps_data_controller");
const express = require("express");
const router = express.Router();

let controller = new EPPSDataController();

router.post("/create", controller.create.bind(controller));
router.post("/update", controller.update.bind(controller));

router.get("/", controller.getOne);
router.get("/all", controller.getAll);

module.exports = router;