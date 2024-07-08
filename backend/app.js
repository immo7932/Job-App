import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import db from "./database/db.js";
import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import { errorMiddleware } from "./middlewares/error.js";

dotenv.config({ path: "./config/config.env" });

const app = express();


db();


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
  
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));


app.use('/api/v2/user', userRouter);
app.use('/api/v2/job', jobRouter);
app.use('/api/v2/app', applicationRouter);

app.use(errorMiddleware);

export default app;