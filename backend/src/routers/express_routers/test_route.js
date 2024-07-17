const TestController = require("../../controller/test_controller");
const express = require("express");
const router = express.Router();
const { interServerAuthentication } = require("./../../helpers/middlewares");

const multer = require("multer")
var storage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null, "./tmp");
    },
    filename: function (req, file, callback){
        callback(null, file.originalname);
    },
});

const upload = multer();

let controller = new TestController();

router.post("/tick", interServerAuthentication, controller.tick.bind(controller));
router.get("/all", controller.getAll);

router.post("/create", controller.create.bind(controller));
router.post("/update", controller.update.bind(controller));
router.post("/addtest", controller.addtest.bind(controller));

router.post("/uploadBuram", controller.uploadBuram.bind(controller));

router.get("/getbyExamSession/:exam_session_id", controller.getbyExamSession);
router.get("/:id", controller.getOne);

module.exports = router;