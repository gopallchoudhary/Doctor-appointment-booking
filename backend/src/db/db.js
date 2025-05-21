import mongoose from 'mongoose'
const DB_NAME = "prescripto"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB connected: DB host: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDB connection error: ", error);
        process.exit(1)
        
    }
}

export default connectDB