import express from 'express'
import { upload } from '../middlewares/multer.js'
const userRouter = express.Router()

//> import controllers
import { bookAppointment, cancelAppointment, getUserProfile, listAppointments, loginUser, logoutUser, registerUser, updateUserProfile } from '../controllers/user.controller.js'
import { authUser } from '../middlewares/authUser.js'

userRouter.post("/signup", registerUser)
userRouter.post("/signin", loginUser)
userRouter.get("/logout", logoutUser)
userRouter.get("/get-profile", authUser, getUserProfile)
userRouter.post("/update-profile", authUser, upload.single("image"), updateUserProfile)
userRouter.post("/book-appointment", authUser, bookAppointment)
userRouter.get("/appointments", authUser, listAppointments)
userRouter.post("/cancel-appointment", authUser, cancelAppointment)

export default userRouter