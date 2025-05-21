import jwt from 'jsonwebtoken'

export const authAdmin = async (req, res, next) => {
    try {

        const adminToken = req.cookies?.adminToken || req.headers.admintoken
        
        
        if (!adminToken) {
            return res.json({ success: false, message: "Unauthorized request" })
        }

        const decodedToken = jwt.verify(adminToken, process.env.ADMIN_TOKEN_SECRET)

        if (decodedToken.email !== process.env.ADMIN_EMAIL && decodedToken.password !== process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "Unauthorized request 2" })
        }
        
        next()

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}