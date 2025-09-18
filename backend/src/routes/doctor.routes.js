import express from "express";

const doctorRouter = express.Router()

//> import controllers
import { appointmentCancelled, appointmentCompleted, appointmentsDoctor, doctorDashboard, doctorList, doctorLogin, doctorLogout, getDoctorProfile, updateDoctorProfile } from "../controllers/doctor.controller.js";
import { authDoctor } from "../middlewares/authDoctor.js";

//> 
doctorRouter.get("/list", doctorList)
doctorRouter.post("/login", doctorLogin)
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor)
doctorRouter.post("/appointment-completed", authDoctor, appointmentCompleted)
doctorRouter.post("/appointment-cancelled", authDoctor, appointmentCancelled)
doctorRouter.get("/dashboard", authDoctor, doctorDashboard)
doctorRouter.get("/profile", authDoctor, getDoctorProfile)
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile)
doctorRouter.get("/logout", doctorLogout)

export default doctorRouter