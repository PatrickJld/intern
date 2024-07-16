const QuestionController = require("../../controller/question_controller");
const express = require("express");
const router = express.Router();

const multer = require("multer");
let default_path = "tmp/";
const upload = multer({
    dest:default_path,
});

let controller = new QuestionController();
router.get("/all", controller.getAll);

router.post("/create", controller.create.bind(controller));
router.post("/createFromExcel", upload.single("excel"), controller.createFromExcel.bind(controller));
router.post("/createKreapelinQuestion", controller.createKreapelinQuestion.bind(controller));

router.post("/update", controller.update.bind(controller));
router.delete("/deletebyid/:question_id", controller.deletebyid);
router.delete("/deletebysection/:section_id", controller.deletebysection);

router.get("/:id", controller.getOne);

module.exports = router;