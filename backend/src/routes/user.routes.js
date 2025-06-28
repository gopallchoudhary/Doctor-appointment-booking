import express from 'express'
import {upload} from '../middlewares/multer.js'
const userRouter = express.Router()

//> import controllers
import { getUserProfile, loginUser, logoutUser, registerUser, updateUserProfile } from '../controllers/user.controller.js'
import { authUser } from '../middlewares/authUser.js'

userRouter.post("/signup", registerUser)
userRouter.post("/signin", loginUser)
userRouter.get("/logout", logoutUser)
userRouter.get("/get-profile", authUser, getUserProfile)
userRouter.post("/update-profile", authUser, upload.single('image'), updateUserProfile )

export default userRouter