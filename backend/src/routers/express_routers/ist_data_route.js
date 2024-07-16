const ISTDataController = require("../../controller/ist_data_controller");
const express = require("express");
const router = express.Router();

let controller = new ISTDataController();

router.post("/create", controller.create.bind(controller));
router.post("/update", controller.update.bind(controller));

router.get("/", controller.getOne);
router.get("/getbyemail/:email", controller.getByEmail);
router.get("/all", controller.getAll);

module.exports = router;