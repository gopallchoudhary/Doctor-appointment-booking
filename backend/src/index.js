import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import connectCloudinary from "./utils/cloudinary.js";

dotenv.config({
    path: "./.env"
});




const PORT = 3001;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`app is listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection error: ", err);
    });

connectCloudinary()