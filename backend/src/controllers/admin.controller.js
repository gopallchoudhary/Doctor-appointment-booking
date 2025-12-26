import validator from 'validator'
import { v2 as cloudinary } from 'cloudinary'
import { DoctorModel } from '../models/doctor.model.js'
import jwt from 'jsonwebtoken'
import { AppointmentModel } from '../models/appointment.model.js'
import { UserModel } from '../models/user.model.js'

//. API FOR ADDING DOCTOR  
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        if (!imageFile) {
            return res.json({ success: false, message: "No file uploaded" });
        }


        //> all fields are required
        if ([name, email, password, speciality, degree, experience, about, fees, address].some((field) => field?.toString().trim() === "")) {
            return res.json({ success: false, message: "All fields are required" })
        }

        //> validating email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter valid email" })
        }

        //> validating password
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter strong password" })
        }


        const uploadImage = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageURL = uploadImage.secure_url


        //> checking exister doctor
        const existedDoctor = await DoctorModel.findOne({ email })
        if (existedDoctor) {
            return res.json({ success: false, message: "Doctor already existed" })
        }

        const doctorData = {
            name,
            email,
            password,
            image: imageURL,
            speciality,
            degree,
            about,
            experience,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new DoctorModel(doctorData)
        newDoctor.save()

        if (!newDoctor) {
            return res.json({ success: false, message: "Failed in creating data" })
        }

        res.json({ success: true, message: "Doctor added" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}


//. admin login 
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!(email && password)) {
            return res.json({ success: false, message: "Email and Password are required" })
        }
        else if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const adminToken = jwt.sign({ email, password }, process.env.ADMIN_TOKEN_SECRET)
            console.log(adminToken);

            const options = {
                httpOnly: true,
                secure: true,
                sameSite: "None",
                path: "/"
            };

            return res
                .status(200)
                .cookie("adminToken", adminToken)
                .json({ success: true, message: "Admin logged in successfully", adminToken: adminToken })

        } else {
            return res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }


}

//. admin logout 
const adminLogout = async (req, res) => {
    return res
        .clearCookie("adminToken")
        .json({ success: true, message: "Admin logged out successfully" })
}

//. Get all doctors 
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await DoctorModel.find({}).select("-password")
        res.json({ success: true, message: "Doctor details fetched successfully", doctors })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, error: error.message })
    }
}

//. Get all appointments
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await AppointmentModel.find().populate("userData").populate("docData")
        // console.log(appointments);
        res.json({ success: true, message: "Appointments data fetched successfully", appointments })
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: "Error in fetching appointment data" })
    }
}

//. cancel appointments 
const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body

        //> appointment data
        const appointmentData = await AppointmentModel.findById(appointmentId)

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

//. api to get dashboard data for admin panel 

const adminDashboard = async (req, res) => {
    try {
        const doctors = await DoctorModel.find({})
        const users = await UserModel.find({})
        const appointments = await AppointmentModel.find({}).populate("docData")

        const dashData = {
            doctors: doctors.length,
            patients: users.length,
            appointments: appointments.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({ success: true, message: "dashboard data fetched successfully", dashData })
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message })
    }
}


export { addDoctor, adminLogin, getAllDoctors, appointmentsAdmin, cancelAppointment, adminDashboard, adminLogout }