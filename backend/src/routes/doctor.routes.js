import express from "express";

const doctorRouter = express.Router()

//> import controllers
import { doctorList } from "../controllers/doctor.controller.js";

//> 
doctorRouter.get("/list", doctorList)

export default doctorRouter