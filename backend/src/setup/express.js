const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const EXPRESS_PORT = process.env.EXPRESS_PORT || 8888;
const CLIENT_PORT = process.env.CLIENT_PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// let url;
// if (process.env.CLIENT_PORT) {
//   url = process.env.CLIENT_URL || "http://127.0.0.1:5050";
// } else {
//   url = process.env.EXPRESS_URL || "http://127.0.0.1:3000";
// }


let host = "localhost";
if (process.env.NODE_ENV != "dev") {
  host = process.env.EXPRESS_URL;
}

// Set Cors Middleware
let regexopt = new RegExp(
  `((36\.66\.215\.27))`
);
app.use(
  cors({
    origin: `http://36.66.215.27:222`,
    //origin: `http://10.10.16.250:3000`,
    credentials: true,
  })
);

const initExpress = () => {
  app.listen(EXPRESS_PORT, host, () => {
    console.log(`Server started on http://${host}:${EXPRESS_PORT}`);
  });
};

module.exports = { app, initExpress };