const jwt = require("jsonwebtoken");
const ExamSession = require("../models/ExamSession");
const short = require("short-uuid");
const {
  missing_param_response,
  data_not_found_response,
} = require("../helpers/ResponseHelper");
const ExamSessionTest = require("../models/ExamSessionTest");
const TestResult = require("../models/TestResult");

class AuthController {
  constructor() {
    this.login = this.login.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  createAccessToken(session) {
    return jwt.sign(
      {
        session_id: session.id,
      },
      process.env.ACCESS_KEY,
      {
        expiresIn: "5m",
      }
    );
  }

  createRefreshToken(session) {
    return jwt.sign(
      {
        session_id: session.id,
      },
      process.env.REFRESH_KEY,
      {
        expiresIn: "1w",
      }
    );
  }

  login(req, res) {
    console.log("Login Attempt");

    if (!req.body.email || !req.body.test_token) {
      res.status(401).send("Silahkan isi kolom terlebih dahulu");
      return;
    }

    ExamSession.findAll({ where: { email: req.body.email } }).then(
      (session) => {
        if (!session) {
          return res.status(401).send("Email atau Token Tidak Sesuai");
        }

        let selected_session = "";
        for (let i = 0; i < session.length; i++) {
          if (session[i].test_token == req.body.test_token)
            selected_session = session[i];
        }
        if (selected_session == "")
          return res.status(401).send("Email atau Token Tidak Sesuai");

        session = selected_session;

        // // Check Only 1 Device Can Logged In At Same Time
        // if (session.is_logged==1) {
        //   return res.status(403).send("Sesi Login Hanya Berlaku Untuk 1 Device!");
        // }

        // Check Is Still in Session
        let date_now = new Date();
        let start_date = this.convertToGMT(new Date(session.start_date));
        let finish_date = this.convertToGMT(new Date(session.finish_date));
        console.log("Date Now", date_now)
        console.log("Start Date", start_date)
        console.log("Finish Date", date_now)
        if (!(date_now >= start_date && date_now < finish_date)) {
          return res.status(401).send("Anda Tidak Sedang Melakukan Ujian");
        }

        const refresh_token = this.createRefreshToken(session);

        const user_key = short.generate();
        const access_token = this.createAccessToken(session);

        session.set({
          auth_token: user_key,
          // is_logged: 1
        });
        session.save();

        ExamSessionTest.findAll({
          where: { exam_session_id: session.id, status: 1 },
        }).then((assigned_tests) => {
          let temp_tests = [];

          for (let i = 0; i < assigned_tests.length; i++) {
            temp_tests.push(assigned_tests[i].test_id);
          }

          TestResult.findAll({ where: { exam_session: session.id } }).then(
            (test_ress) => {
              let tests = [];

              for (let i = 0; i < temp_tests.length; i++) {
                let test_res_id = test_ress.find(
                  (t) => t.test_id == temp_tests[i]
                ).id;
                let temp_test = [parseInt(temp_tests[i]), test_res_id];
                tests.push(temp_test);
              }

              // let refresh_age = 1 * 24 * 60 * 60 * 1000; // 1 day
              let refresh_age = 24 * 60 * 60 * 1000; // 24 hours
              res.cookie("refresh_token", refresh_token, {
                httpOnly: true,
                maxAge: refresh_age,
              });
              // console.log(res.cookie);

              res.status(200).send({
                tests: tests,
                email: session.email,
                exam_session: session.id,
                token: access_token,
                refresh_token: {
                  token: refresh_token,
                  age: refresh_age / 1000,
                },
                auth_token: session.auth_token,
                is_admin: session.is_admin,
              });
            }
          );
        });
      }
    );
  }

  authenticatedUser(req, res) {
    console.log("Getting Authenticated User");

    try {
      const { session_id } = jwt.decode(req.cookies["refresh_token"]);

      ExamSession.findOne({ where: { id: session_id } }).then((session) => {
        if (!session) return res.status(401).send("Not Authenticated");
        // if (session.is_logged==1) return res.status(403).send("Already Logged In!");

        try {
          const access_token = req.header("Authorization")?.split(" ")[1] || "";

          const payload = jwt.verify(
            access_token,
            process.env.ACCESS_KEY + session.auth_token
          );

          if (!payload) return res.status(401).send("Not Authenticated");

          // Check Is Still on Session Date
          let date_now = new Date();
          let start_date = this.convertToGMT(new Date(session.start_date));
          let finish_date = this.convertToGMT(new Date(session.finish_date));

          if (date_now >= start_date && date_now < finish_date) {
            return res.status(200).send({
              email: session.email,
              start_date: session.start_date,
              finish_date: session.finish_date,
              test_token: session.test_token,
            });
          } else {
            return res.status(401).send("Session Expired");
          }
        } catch (error) {
          return res.status(401).send("Not Authenticated");
        }
      });
    } catch (error) {
      return res.status(401).send("Not Authenticated");
    }
  }

  convertToGMT(datetime) {
    let date_second = datetime.getTime();
    let minus_hour = 7 * 60 * 60 * 1000;
    return new Date(date_second - minus_hour);
  }

  authenticatedAdmin(req, res) {
    console.log("Getting Authenticated Admin");

    try {
      const { session_id } = jwt.decode(req.cookies["refresh_token"]);

      ExamSession.findOne({ where: { id: session_id } }).then((session) => {
        if (!session) return res.status(401).send("Admin Not Authenticated");

        try {
          const access_token = req.header("Authorization")?.split(" ")[1] || "";

          const payload = jwt.verify(
            access_token,
            process.env.ACCESS_KEY + session.auth_token
          );

          if (!payload) return res.status(401).send("Admin Not Authenticated");
          if (!session.is_admin)
            return res.status(401).send("Admin Not Authenticated");

          return res.status(200).send(session);
        } catch (error) {
          return res.status(401).send("Admin Not Authenticated");
        }
      });
    } catch (error) {
      return res.status(401).send("Admin Not Authenticated");
    }
  }

  refresh(req, res) {
    console.log("Refreshing Access Token");

    const refresh_token = req.cookies["refresh_token"];
    if (refresh_token == null) return res.status(401).send("Not Authenticated");

    const { session_id } = jwt.verify(refresh_token, process.env.REFRESH_KEY);
    if (!session_id) return res.status(401).send("Not Authenticated");

    ExamSession.findOne({ where: { id: session_id } }).then((session) => {
      if (!session) {
        data_not_found_response(res);
        return;
      }

      // Refresh max age
      let refresh_age = 24 * 60 * 60 * 1000; // 24 hours
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        maxAge: refresh_age,
      });
      const access_token = this.createAccessToken(session, session.auth_token);

      return res.status(200).send({ token: access_token });
    });
  }

  verifyToken(req, res, next) {
    if (req.path.includes("/auth") || req.path.includes("/tick")) return next();

    const authHeader = req.headers["authorization"];
    const access_token = authHeader && authHeader.split(" ")[1];
    const refresh_token = req.cookies["refresh_token"];
    if (access_token == null || refresh_token == null)
      return res.status(401).send("Unauthorized");

    jwt.verify(
      access_token,
      process.env.ACCESS_KEY,
      (err, decoded) => {
        if (err) {
          console.log(err);
          res.status(401).send("Unauthorized");
        }

        next();
      }
    );

    // const { session_id } = jwt.decode(refresh_token);
    // ExamSession.findOne({ where: { id: session_id } }).then((session) => {
    //   if (!session) {
    //     return res.status(401).send("Unauthorized");
    //   }

    //   jwt.verify(
    //     access_token,
    //     process.env.ACCESS_KEY + session.auth_token,
    //     (err, decoded) => {
    //       if (err) {
    //         console.log(err);
    //         res.status(401).send("Unauthorized");
    //       }

    //       next();
    //     }
    //   );
    // });
  }

  async logout(req, res) {
    // if (!req.body.session_id) {
    //   missing_param_response(res);
    //   return;
    // }

    res.cookie("refresh_token", "", { expires: new Date(0)});

    return res.status(200).send({ message: "success" });
    // ExamSession.findOne({ where: { id: req.body.session_id } }).then(
    //   (session) => {
    //     session.set({ is_logged: 0 });
    //     session.save();

    //     res.cookie("refresh_token", "", { maxAge: 0, secure: true, expires: new Date(0) });

    //     return res.status(200).send({ message: "success" });
    //   }
    // );
  }
}

module.exports = AuthController;
