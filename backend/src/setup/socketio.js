const httpServer = require("http").createServer();
const { authenticateSocketToken } = require("../helpers/middlewares");

// let url;
// if (process.env.CLIENTPORT) {
//   url =
//     (process.env.PROTOCOL || "http") +
//     "://" +
//     (process.env.CLIENTURL || "127.0.0.1") +
//     ":" +
//     (process.env.CLIENTPORT || 5050);
// } else {
//   url = (process.env.PROTOCOL || "http") + "://" + process.env.CLIENTURL;
// }

const io = require("socket.io")(httpServer, {
  cors: {
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
  allowEIO3: true,
});

function initSocket() {
  console.log("RUNNING WEB SOCKET");

  io.use(authenticateSocketToken);
  io.listen(process.env.SOCKET_PORT || 5501);
}

module.exports = { io, initSocket };