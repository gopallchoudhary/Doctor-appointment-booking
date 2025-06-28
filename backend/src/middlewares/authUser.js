import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user.model.js'

export const authUser = async (req, res, next) => {
    try {
        const userToken = req.cookies?.userToken
        if(!userToken) {
            return res.json({success:false, message: "Unauthorized"})
        }

        //> decoded token
        const decodedToken = jwt.verify(userToken, process.env.USER_TOKEN_SECRET)

        const user = await UserModel.findById(decodedToken._id)
        if(!user) {
            return res.json({success: false, message: "user not found"})
        }

        req.user = user
        next()
    } catch (error) {
        console.log("Error: ", error.message);
        res.json({success: false, error: error.message})
    }
}