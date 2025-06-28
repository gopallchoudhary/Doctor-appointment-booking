import express from 'express'
import { upload } from '../middlewares/multer.js'
const adminRouter = express.Router()

//? import controllers
import { addDoctor, adminLogin, getAllDoctors } from '../controllers/admin.controller.js'
import { authAdmin } from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/doctor.controller.js'

adminRouter.post("/login", adminLogin)
adminRouter.post("/add-doctor", authAdmin, upload.single('image'), addDoctor)
adminRouter.get("/all-doctors", getAllDoctors)
adminRouter.post("/change-availability", authAdmin, changeAvailability)

export default adminRouter