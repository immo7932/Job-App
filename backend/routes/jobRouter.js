import  express  from "express";
import { getAlljobs, createjobs , getmyjob, updatejob, deletejob, getSingleJob} from "../controllers/jobController.js";
import isAuthorized from "../middlewares/auth.js";
const router = express.Router();

router.get("/getAlljobs",isAuthorized, getAlljobs);
router.get("/getmyjobs", isAuthorized, getmyjob);
router.get("/:id", getSingleJob);
router.post("/create", isAuthorized, createjobs);
router.put("/update/:id", isAuthorized, updatejob);
router.delete("/delete/:id", isAuthorized, deletejob);


export default router