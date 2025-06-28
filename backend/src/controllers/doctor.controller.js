import { DoctorModel } from "../models/doctor.model.js";

//.change availability 
const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body

        const doctorData = await DoctorModel.findById(docId)

        const updatedAvailabilityDoctor = await DoctorModel.findByIdAndUpdate(docId, { available: !doctorData.available })



        res.json({
            success: true, message: "availability changed successfully", updatedAvailabilityDoctor
        })
    } catch (error) {
        console.log("error: ", error.message);
        res.json({ success: false, message: "naa ho paya" })

    }
}

//.doctors-list 
const doctorList = async (req, res) => {
    try {
        const doctors = await DoctorModel.find({}).select(['-password', '-email'])

        res.json({ success: true, doctors })
    } catch (error) {
        console.log("error: ", error.message);
        res.json({ success: false, message: "failed to load doctors data" })
    }
}

export { changeAvailability, doctorList }