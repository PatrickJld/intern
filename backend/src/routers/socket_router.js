const { io } = require("../setup/socketio");
const ClockSocket = require("./socket_routers/clock_socket");

let serverSocket = [];
let usersSocket = {};

// Listen from frontend
io.on("connection", (socket) => {
  if (socket.auth) {
    // console.log("new client connected with id " + socket.id);
    serverSocket = socket;

    usersSocket[socket.decoded.session_id] = socket.id;

    ClockSocket(socket);
  }
});

function useSocket(callback) {
  if (serverSocket) {
    callback(serverSocket);
  }
}

function useUsersSocket() {
  return usersSocket;
}

module.exports = { useSocket, useUsersSocket };