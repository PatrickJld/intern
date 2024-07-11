import jwt from "jsonwebtoken";
import pkg from "axios";
const { post } = pkg;
import dotenv from "dotenv";
dotenv.config();

import Clock from "./Clock";

import { initDB  } from "../setup/sequelize";
import SectionOngoing from "../models";