const express = require("express");
const router = express.Router();
const { app } = require("../setup/express");

const ExamSessionRouter = require("./express_routers/exam_session_route");
const QuestionRouter = require("./express_routers/question_route");
const QuestionResultRouter = require("./express_routers/question_result_route");
const RegistrantRouter = require("./express_routers/registrant_route");
const SectionRouter = require("./express_routers/section_route");
const SectionResultRouter = require("./express_routers/section_result_route");
const TestRouter = require("./express_routers/test_route");
const TestResultRouter = require("./express_routers/test_result_route");
const ApplicantRouter = require("./express_routers/applicant_route");
const JobVacancyRouter = require("./express_routers/job_vacancy_route");
const KreapelinDataRouter = require("./express_routers/kreapelin_data_route");
const ISTDataRouter = require("./express_routers/ist_data_route");
const EPPSDataRouter = require("./express_routers/epps_data_route");
const SectionOngoingRouter = require("./express_routers/section_ongoing_route");
const AuthController = require("../controller/auth_controller");

const ClockRouter = require("./express_routers/clock_route");
const AuthRouter = require("./express_routers/auth_route");

// Middleware After Route
app.use(function (req, res, next) {
  res.on("finish", function () {
    // Logs Route Path and Method
    if (req.path.includes('/tick')) return next();
    if (!req.route) return next()

    let date_now = new Date();
    let date_string =
      date_now.getFullYear() +
      "-" +
      date_now.getMonth() +
      "-" +
      date_now.getDate() +
      "T" +
      date_now.getHours() +
      ":" +
      date_now.getMinutes() +
      ":" +
      date_now.getSeconds();
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    console.log(
      "[" + date_string + "]",
      "IP:",ip,
      req.route.stack[0].method.toUpperCase(),
      req.route.path
    );
  });
  next();
});

// router.use(new AuthController().verifyToken);

// Routers
router.use("/exam_session", ExamSessionRouter);
router.use("/question", QuestionRouter);
router.use("/question_result", QuestionResultRouter);
router.use("/registrant", RegistrantRouter);
router.use("/section", SectionRouter);
router.use("/section_result", SectionResultRouter);
router.use("/test", TestRouter);
router.use("/test_result", TestResultRouter);
router.use("/applicant", ApplicantRouter);
router.use("/job_vacancy", JobVacancyRouter);
router.use("/kreapelin_data", KreapelinDataRouter);
router.use("/ist_data", ISTDataRouter);
router.use("/epps_data", EPPSDataRouter);
router.use("/section_ongoing", SectionOngoingRouter);
router.use("/clock", ClockRouter);
router.use("/auth", AuthRouter);

app.use(process.env.BASE_PATH, router);