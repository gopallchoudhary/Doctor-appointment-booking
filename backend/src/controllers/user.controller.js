import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user.model.js'
import { v2 as cloudinary } from 'cloudinary'

//, register user 
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        //> check missing details
        if (!name || !email || !password) {
            return res.json({ success: false, message: "all fields are required" })
        }

        //> check email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "enter a valid email" })
        }

        //> check password strength
        if (password.length < 8) {
            return res.json({ success: false, message: "enter a strong password" })
        }

        //> hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //> user data
        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new UserModel(userData)
        const user = await newUser.save()

        res.json({
            success: true,
            message: "User signed up successfully",
            user
        })

    } catch (error) {
        console.log("error: ", error.message);
        res.json({ success: false, message: "failed to register user" })

    }
}

//, login user 
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })

        //> check user
        if (!user) {
            return res.json({ success: false, message: "No user found" })
        }

        //> check password
        const passwordCheck = await bcrypt.compare(password, user.password)
        if (!passwordCheck) {
            return res.json({ success: false, message: "Wrong password" })
        }

        const userToken = jwt.sign({
            _id: user._id,
            email: user.email
        }, process.env.USER_TOKEN_SECRET)

        res
            .status(200)
            .cookie("userToken", userToken)
            .json({ success: true, message: "user logged in successfully", userToken })




    } catch (error) {
        console.log("error: ", error.message);
        res.json({ success: false, message: "failed to login user" })
    }
}

//, logout user 
const logoutUser = async (req, res) => {
    return res
        .clearCookie("userToken")
        .json({ success: true, message: "user logged out" })
}

//, get user profile 
const getUserProfile = async (req, res) => {
    try {
        const user = req.user

        //> get user data
        const userData = await UserModel.findById(user._id).select('-password')

        res.json({
            success: true,
            userData
        })
    } catch (error) {
        console.log("error: ", error.message);
        res.json({ success: false, message: error.message })
    }
}

//, update user profile 
const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user?._id
        console.log(req.user);
        
        const { name, dob, phone, address, gender } = req.body
        const imageFile = req.file

        if (!name || !dob || !phone || !address || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }

        await UserModel.findByIdAndUpdate(userId, { name, dob, phone, gender, address: JSON.parse(address) })

        //> image file
        if(imageFile) {
            const uploadImage = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
            const imageUrl = uploadImage.secure_url

            await UserModel.findByIdAndUpdate(userId, {image: imageUrl})
        }

        res.json({success: true, message: "User profile updated successfully"})
    } catch (error) {
        console.log("error: ", error.message);
        res.json({ success: false, message: error.message })
    }
}

export { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile }