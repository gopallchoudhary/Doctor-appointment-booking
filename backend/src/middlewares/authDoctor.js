import jwt from 'jsonwebtoken'
import { DoctorModel } from '../models/doctor.model.js'

export const authDoctor = async (req, res, next) => {
    try {
        const doctorToken = req.cookies?.doctorToken
        if (!doctorToken) {
            return res.json({ success: false, message: "Unauthorized" })
        }

        const decodedToken = jwt.verify(doctorToken, process.env.DOCTOR_TOKEN_SECRET)

        const doctor = await DoctorModel.findById(decodedToken._id)
        if (!doctor) {
            return res.json({ success: false, message: "Doctor not found" })
        }

        req.doctor = doctor;
        next()
    } catch (error) {
        console.error("Error: ", error.message);
        res.json({ success: false, message: error.message })
    }
}