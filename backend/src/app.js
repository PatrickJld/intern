// load .env file
const dotenv = require("dotenv");
dotenv.config();

const { initExpress } = require("./setup/express");
const { initDB } = require("./setup/sequelize");
const { initSocket } = require("./setup/socketio");
const { initDriveService } = require("./helpers/GoogleDriveService");

// Load Files
initDB().then(() => {
  initExpress();
  initDriveService();
  require("./routers/express_router");
  initSocket();
  require("./routers/socket_router");
  require("./setup/mailer");
});