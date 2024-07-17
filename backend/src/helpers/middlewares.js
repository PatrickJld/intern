const jwt = require("jsonwebtoken");
const ExamSession = require("../models/ExamSession");
const access_key = process.env.ACCESS_KEY || "ini access key";
const clock_key = process.env.CLOCK_TOKEN || "ini clock key";

function authenticateSocketToken(socket, next) {
  // console.log("acc token ",socket.handshake.query.acctoken)
  if (
    socket.handshake.query 
    && socket.handshake.query.acctoken 
    // && socket.handshake.query.reftoken
  ) {
    // const { session_id } = jwt.decode(socket.handshake.query.reftoken);
    // console.log("session id",session_id);
    // ExamSession.findOne({ where: { id: session_id } }).then((session) => {
      jwt.verify(
        socket.handshake.query.acctoken, //access
        access_key, //token
        function (err, decoded) {
          if (err) {
            socket.auth = false;
            console.log(err.message);
            return next(new Error("Authentication error"));
          }
          socket.decoded = decoded;
          socket.auth = true;
          socket.emit("authenticated", {});
          console.log("athenticating succeeded")
          next();
        }
      );
    // });
  } else {
    socket.auth = false;
    socket.emit("unauthorized", {});
  }
}

function interServerAuthentication(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    if (token == null) return res.status(401).send("FAIL");

    jwt.verify(token, clock_key, (err, user) => {
      if (err) {
        res.status(403).send("FORBIDDEN");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).send("FAIL");
  }
}

module.exports = {
  authenticateSocketToken,
  interServerAuthentication,
};
