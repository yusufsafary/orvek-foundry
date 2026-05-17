import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import profileRouter from "./profile";
import jobsRouter from "./jobs";
import resumeRouter from "./resume";
import dashboardRouter from "./dashboard";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(profileRouter);
router.use(jobsRouter);
router.use(resumeRouter);
router.use(dashboardRouter);

export default router;
