import mongoose, { Schema } from "mongoose";

const appointmentSchema = new Schema({
    userId: { type: String, required: true },
    docId: { type: String, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    userData: { type: Object, required: true },
    docData: { type: Object, required: true },
    cancelled: { type: Boolean, default: false },
    date: { type: Number, required: true},
    amount: {type: Number, required: true},
    payment: {type: Boolean, default: false},
    isCompleted: {type: Boolean, default: false}
});

export const AppointmentModel = mongoose.model("Appointment", appointmentSchema);
