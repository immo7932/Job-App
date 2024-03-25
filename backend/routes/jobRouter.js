import  express  from "express";
import { getAlljobs, createjobs , getmyjob, updatejob, deletejob} from "../controllers/jobController.js";
import isAuthorized from "../middlewares/auth.js";
const router = express.Router();

router.get("/getAlljobs",isAuthorized, getAlljobs);
router.post("/create", isAuthorized, createjobs);
router.get("/getmyjobs", isAuthorized, getmyjob);
router.put("/update/:id", isAuthorized, updatejob);
router.delete("/delete/:id", isAuthorized, deletejob);

export default router