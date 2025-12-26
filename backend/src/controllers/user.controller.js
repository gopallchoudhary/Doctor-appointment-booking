import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user.model.js'
import { v2 as cloudinary } from 'cloudinary'
import { AppointmentModel } from '../models/appointment.model.js'
import { DoctorModel } from '../models/doctor.model.js'
import dotenv from 'dotenv'
import Razorpay from 'razorpay'
dotenv.config();



//. register user 
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

//. login user 
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

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: "/",
        };

        res
            .status(200)
            .cookie("userToken", userToken)
            .json({ success: true, message: "user logged in successfully", userToken })




    } catch (error) {
        console.log("error: ", error.message);
        res.json({ success: false, message: "failed to login user" })
    }
}

//. logout user 
const logoutUser = async (req, res) => {
    return res
        .clearCookie("userToken")
        .json({ success: true, message: "user logged out" })
}

//. get user profile 
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

//. update user profile 
const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user?._id
        const { name, dob, phone, address, gender } = req.body
        const imageFile = req.file

        if (!name || !dob || !phone || !address || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }

        await UserModel.findByIdAndUpdate(userId, { name, dob, phone, gender, address: JSON.parse(address) })

        //> image file
        if (imageFile) {
            const uploadImage = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageUrl = uploadImage.secure_url

            await UserModel.findByIdAndUpdate(userId, { image: imageUrl })
        }

        res.json({ success: true, message: "User profile updated successfully" })
    } catch (error) {
        console.log("error: ", error.message);
        res.json({ success: false, message: error.message })
    }
}

//. book appointment 
const bookAppointment = async (req, res) => {
    try {
        const { docId, slotDate, slotTime } = req.body
        const userId = req.user?._id

        //> doc data
        const docData = await DoctorModel.findById(docId)

        //> check dr availability
        if (!docData.available) {
            return res.json({ success: false, message: 'Dr. not available' })
        }

        const slots_booked = docData.slots_booked

        //> check slots availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'slot not available' })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        //> user data
        const userData = await UserModel.findById(userId).select('-password')

        //> deleting slots_booked from docData variabe
        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            slotDate,
            slotTime,
            amount: docData.fees,
            date: Date.now(),
            userData,
            docData
        }

        const newAppointment = new AppointmentModel(appointmentData)
        await newAppointment.save()

        //> save new slots in docData 
        await DoctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment Booked' })




    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//. list appointments 
const listAppointments = async (req, res) => {
    try {
        const userId = req.user._id
        const appointments = await AppointmentModel.find({ userId }).populate("userData").populate("docData", "name speciality image address")

        res.json({ success: true, message: "Appointments fetched successfully", appointments })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//. cancel appointments 
const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const userId = req.user._id

        //> appointment data
        const appointmentData = await AppointmentModel.findById(appointmentId)

        //> verify user 
        if (appointmentData.userId != userId) {
            return res.json({ success: false, message: "Unauthorized" })
        }

        //> cancelled: true
        await AppointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        //> get datas
        const { docId, slotDate, slotTime } = appointmentData

        //> doctor data
        const docData = await DoctorModel.findById(docId)

        //> modifying slots_booked
        const slots_booked = docData.slots_booked
        slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e != slotTime)

        //> update in doctor data
        await DoctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: "Appointment cancelled" })


    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Failed to cancel the appointment" })
    }
}

//. razorpay payments 
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const paymentRazorpay = async (req, res) => {
    try {
        const { appointmentId } = req.body
        //> appointment Data
        const appointmentData = await AppointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: "appointment cancelled or not found" })
        }

        //> razorpay options
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId
        }

        //> order/payment
        const order = await razorpayInstance.orders.create(options)

        res.json({ success: true, message: "Payment successfull", order })


    } catch (error) {
        console.log("Paymet failed", error);
        res.json({ success: true, message: "payment failed" })
    }
}

//. api for verify razorpay 
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        console.log(orderInfo);
        if (orderInfo.status == "paid") {
            const appointmentId = orderInfo.receipt
            await AppointmentModel.findByIdAndUpdate(appointmentId, { payment: true })
            res.json({ success: true, message: "Payment successfull" })
        } else {
            res.json({ success: false, message: "Payment failed" })
        }
    } catch (error) {
        console.error(error);
        res.json(
            { success: false, message: error.message }
        )
    }
}


export { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile, bookAppointment, listAppointments, cancelAppointment, paymentRazorpay, verifyRazorpay }