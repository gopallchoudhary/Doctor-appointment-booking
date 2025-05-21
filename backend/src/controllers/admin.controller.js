import validator from 'validator'
import { v2 as cloudinary } from 'cloudinary'
import { DoctorModel } from '../models/doctor.model.js'
import jwt from 'jsonwebtoken'

//# API FOR ADDING DOCTOR   
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        if (!imageFile) {
            return res.json({ success: false, message: "No file uploaded" });
        }


        //! all fields are required
        if ([name, email, password, speciality, degree, experience, about, fees, address].some((field) => field?.toString().trim() === "")) {
            return res.json({ success: false, message: "All fields are required" })
        }

        //! validating email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter valid email" })
        }

        //! validating password
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter strong password" })
        }

        //! upload image to cloudinary 
        const uploadImage = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageURL = uploadImage.secure_url


        //! checking exister doctor
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

//# ADMIN LOGIN
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
            };

            return res
                .status(200)
                .cookie("adminToken", adminToken, options)
                .setHeader("adminToken", adminToken)
                .json({ success: true, message: "Admin logged in successfully", adminToken: adminToken })

        } else {
            return res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }


}



export { addDoctor, adminLogin }