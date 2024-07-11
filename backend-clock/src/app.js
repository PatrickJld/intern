import dotenv from "dotenv";
dotenv.config();

import initService from "./services/service";

console.log("===THIS IS THE MAIN CLOCK INSTANCE===");
initService();