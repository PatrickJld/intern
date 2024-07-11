const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const EXPRESS_PORT = process.env.EXPRESS_PORT;
const CLIENT_PORT = process.env.CLIENT_PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

let host = "localhost";
if(process.env.NODE_ENV != "dev"){
    host = process.env.EXPRESS_URL;
}

let regexopt = new RegExp(
    `((36\.66\.215\.27))`
);
app.use(
    cors({
        origin: ``,
        credentials: true,
    })
);

const initExpress = () => {
    app.listen(EXPRESS_PORT, host, () => {
        console.log(`Server started on`);
    });
};

module.exports = { app, initExpress };