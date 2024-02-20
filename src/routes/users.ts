import express from "express";
import { registrationStageController, applicationStageController, qualificationStageController, courseController } from "../controller/user";

const router = express.Router();

// Define routes
router.post("/registration", registrationStageController);
router.post("/application", applicationStageController);
router.post("/qualification", qualificationStageController);
router.post("/course", courseController); // Add route for adding a course

export default router;
