const ClockController = require("../../controller/clock_controller");
const express = require("express");
const router = express.Router();

let controller = new ClockController();
router.use(ValidateToken);

function ValidateToken(req, res, next){
    if (req.query.token == process.env.CLOCK_TOKEN){
        next();
        return;
    }

    console.log("Unauthorized Attempt to Clock Route");
    res.status(401);
    res.send("Unauthorized");
}

module.exports = router;