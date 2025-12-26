import mongoose, { Schema } from "mongoose";

const appointmentSchema = new Schema({
    userId: { type: String, required: true },
    docId: { type: String, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    userData: { type: Schema.Types.ObjectId, ref: "User" },
    docData: { type: Schema.Types.ObjectId, ref: "Doctor" },
    cancelled: { type: Boolean, default: false },
    date: { type: Number, required: true },
    amount: { type: Number, required: true },
    payment: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false }
}, { timestamps: true });

export const AppointmentModel = mongoose.model("Appointment", appointmentSchema);
