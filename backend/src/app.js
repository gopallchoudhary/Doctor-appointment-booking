import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

//? common middleware
app.use(express.json({ limit: "16kb" }));
app.use(urlencoded({ extended: true, limit: "16bk" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors(
    {
        origin: "http://localhost:5174", 
        credentials: true
    }
));

//? import routes
import adminRouter from "./routes/admin.routes.js";

//? api end points
app.use("/api/admin", adminRouter)

export { app };
