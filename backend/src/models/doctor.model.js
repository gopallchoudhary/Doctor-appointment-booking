import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const doctorSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            required: false,
        },

        speciality: {
            type: String,
            required: true,
        },

        degree: {
            type: String,
            required: true,
        },

        experience: {
            type: String,
            required: true,
        },

        about: {
            type: String,
            required: true,
        },

        available: {
            type: Boolean,
            default: true,
        },

        fees: {
            type: Number,
            required: true,
        },

        address: {
            type: Object,
            required: true,
        },

        date: {
            type: Number,
            required: true,
        },

        slots_booked: {
            type: Object,
            default: {},
        },
    },
    { minimize: false }
);

//? password hashing
doctorSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)

})

//? password check
doctorSchema.methods.isPasswordCorrect = async function (password) {
    await bcrypt.compare(password, this.password)
}

//? access token
doctorSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    )
}

//? refresh token
doctorSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    )
}


export const DoctorModel = mongoose.model("Doctor", doctorSchema);
