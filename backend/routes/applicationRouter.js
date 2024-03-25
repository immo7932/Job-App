import  express  from "express";
import {employergetAllApplication,
     jobseekergetAllApplication,
     jobsekerDeleteapplication,
    postApplication} from "../controllers/applicationcontroller.js"
import isAuthorized from "../middlewares/auth.js";

const router = express.Router();
router.get("/employergetAllApplication", isAuthorized, employergetAllApplication);
router.get("/jobseekergetAllApplication", isAuthorized, jobseekergetAllApplication);
router.delete("/delete/:id", isAuthorized, jobsekerDeleteapplication);
router.post("/post", isAuthorized, postApplication);
export default router