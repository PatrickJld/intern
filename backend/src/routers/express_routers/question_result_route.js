const QuestionResultController = require("../../controller/question_result_controller");
const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer();

let controller = new QuestionResultController();
router.get("/all", controller.getAll);

router.post("/create", controller.create.bind(controller));
router.post("/createmultiple", controller.createmultiple.bind(controller));
router.post("/update", controller.update.bind(controller));
router.post("/resetQuestion", controller.resetQuestion.bind(controller));

router.post("/uploadImage", upload.single("gambar"), controller.uploadImage.bind(controller));

router.get("/:id", controller.getOne);
router.get("/getbyquestion/:q_id", controller.getByQuestion);
router.get("/getbysection/:section_id", controller.getBySection);
router.get("/getbytest/:test_id", controller.getByTest);

module.exports = router;