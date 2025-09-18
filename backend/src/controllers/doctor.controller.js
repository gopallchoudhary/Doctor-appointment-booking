import { DoctorModel } from "../models/doctor.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppointmentModel } from "../models/appointment.model.js";

//.change availability
const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;

        const doctorData = await DoctorModel.findById(docId);

        const updatedAvailabilityDoctor = await DoctorModel.findByIdAndUpdate(
            docId,
            { available: !doctorData.available }
        );

        res.json({
            success: true,
            message: "availability changed successfully",
            updatedAvailabilityDoctor,
        });
    } catch (error) {
        console.log("error: ", error.message);
        res.json({ success: false, message: "naa ho paya" });
    }
};

//.doctors-list
const doctorList = async (req, res) => {
    try {
        const doctors = await DoctorModel.find({}).select(["-password", "-email"]);

        res.json({ success: true, doctors });
    } catch (error) {
        console.log("error: ", error.message);
        res.json({ success: false, message: "failed to load doctors data" });
    }
};

//. doctor login
const doctorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await DoctorModel.findOne({ email });
        if (!doctor) {
            return res.json({
                success: false,
                message: "Doctor with this email does not found",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, doctor.password);
        if (!isPasswordCorrect) {
            return res.json({ success: false, message: "Wrong Password" });
        }

        const doctorToken = jwt.sign(
            {
                _id: doctor._id,
                email: doctor.email,
            },
            process.env.DOCTOR_TOKEN_SECRET
        );

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: "/",
        };

        return res.status(200).cookie("doctorToken", doctorToken, options).json({
            success: true,
            message: "Doctor successfully logged in",
            doctorToken: doctorToken,
        });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: "Login failed" });
    }
};

//. doctor Logout
const doctorLogout = async (req, res) => {
    return res
        .clearCookie("doctorToken")
        .json({ success: true, message: "Doctor logged out successfully" });
};

//. appointments for  doctor profile
const appointmentsDoctor = async (req, res) => {
    try {
        const doctor = req.doctor;
        if (!doctor) {
            return res.json({ success: false, messaage: "Doctor does not found" });
        }
        const docId = doctor._id;

        const appointments = await AppointmentModel.find({ docId });
        return res.json({
            success: true,
            message: "Appointments fetched successfully",
            appointments,
        });
    } catch (error) {
        console.error("Error: ", error.message);
        res.json({
            success: false,
            message: "Failed to fetch the appointments data",
        });
    }
};

//. appointment completed for dr panel
const appointmentCompleted = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const docId = req.doctor._id;

        const appointmentData = await AppointmentModel.findById(appointmentId);

        if (!appointmentData) {
            return res.json({
                success: false,
                message: "Appointment doesn't exists",
            });
        }

        if (appointmentData.docId == docId) {
            await AppointmentModel.findByIdAndUpdate(appointmentId, {
                isCompleted: true,
            });
            return res.json({
                success: true,
                message: "Appointment marked complteted",
            });
        } else {
            return res.json({ success: false, message: "Mark failed" });
        }
    } catch (error) {
        console.error("Error: ", error.messaage);
        res.json({ success: false, message: "Failed to update the appointment" });
    }
};

//. cancel appointment
const appointmentCancelled = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const docId = req.doctor._id;

        const appointmentData = await AppointmentModel.findById(appointmentId);
        if (!appointmentData) {
            return res.json({
                success: false,
                message: "Appointment doesn't exists",
            });
        }

        if (appointmentData.docId == docId) {
            await AppointmentModel.findByIdAndUpdate(appointmentId, {
                cancelled: true,
            });
            return res.json({ success: true, messaage: "Appointment cancelled" });
        } else {
            return res.json({
                success: false,
                messaage: "Failed to cancel the appointment",
            });
        }
    } catch (error) {
        console.error("Error: ", error.messaage);
        res.json({ success: false, messaage: "Failed to cancel the appointment" });
    }
};

//. doctor dashboard
const doctorDashboard = async (req, res) => {
    try {
        const docId = req.doctor._id;

        const appointments = await AppointmentModel.find({ docId });
        if (!appointments) {
            return res.json({ success: false, message: "No appointmentst found" });
        }

        let earnings = 0;
        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount;
            }
        });
        let patients = [];
        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId);
            }
        });

        const docData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5),
        };

        res.json({
            success: true,
            message: "Dr data fetched successfully",
            docData,
        });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Failed the appointment information" });
    }
};

//. doctor profile 
const getDoctorProfile = async (req, res) => {
    try {
        const docId = req.doctor._id
        const doctorProfileData = await DoctorModel.findById(docId).select("-password")
        res.json({ success: true, message: "Dr. profile date fetched successfully", doctorProfileData })
    } catch (error) {
        console.error("Error: ", error.messaage);
        res.json({ success: false, message: "Failed to get the doctor profile" })
    }
}

//. update doctor profile 
const updateDoctorProfile = async (req, res) => {
    try {
        const docId = req.doctor._id
        const { fees, available, address} = req.body
        const updateProfile = await DoctorModel.findByIdAndUpdate(docId, {fees, available, address})
        res.json({success: true, message: "Doctor data updated successfully", updateProfile})
    } catch (error) {
        console.error("Error: ", error.messaage);
        res.json({ success: false, message: "Failed to update the doctor profile" })
    }
}

export {
    changeAvailability,
    doctorList,
    doctorLogin,
    doctorLogout,
    appointmentsDoctor,
    appointmentCompleted,
    appointmentCancelled,
    doctorDashboard,
    getDoctorProfile,   
    updateDoctorProfile
};
