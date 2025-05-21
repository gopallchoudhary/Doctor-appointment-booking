import express from 'express'
import { upload } from '../middlewares/multer.js'
const adminRouter = express.Router()

//? import controllers
import { addDoctor, adminLogin } from '../controllers/admin.controller.js'
import { authAdmin } from '../middlewares/authAdmin.js'

adminRouter.post("/add-doctor", authAdmin, upload.single('image'), addDoctor)
adminRouter.post("/login", adminLogin)

export default adminRouter