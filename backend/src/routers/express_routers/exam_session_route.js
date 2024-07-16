const ExamSessionController = require("../../controller/exam_session_controller");
const express = require("express");
const router = express.Router();

let controller = new ExamSessionController();
router.get("/all", controller.getAll);

router.post("/create", controller.create.bind(controller));
router.post("/update", controller.update.bind(controller));
router.post("/openTest", controller.openTest.bind(controller));
router.post("/refresh_test_token", controller.refresh_test_token.bind(controller));
router.post("/updateCurrentTest", controller.updateCurrentTest.bind(controller));

router.get("/:id", controller.getOne);
router.get("/getByEmail/:email", controller.getByEmail);

module.exports=router;