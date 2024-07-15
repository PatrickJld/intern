const ClockController = require("../../controller/clock_controller");
const controller = new ClockController();

function game(socket){
    socket.on("clock.tick", () => controller.tick(socket));
}

module.exports=game;