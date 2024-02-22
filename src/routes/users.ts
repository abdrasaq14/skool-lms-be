import { Router } from "express"; // Import Router from express
import { createUser, loginUser, forgotPasswordUser, verifyOTPEmailAuth  } from "../controller/user";
import {
  createCourse,
  createQualification,
  createApplication,
  updateOnboarding,
} from "../controller/onboarding"; // Update the path accordingly

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/forgotpassword", forgotPasswordUser);


// Route for creating a new course
router.post("/:userId/courses", createCourse);

// Route for creating a new qualification
router.post("/:userId/qualifications", createQualification);

// Route for creating a new application
router.post("/:userId/applications", createApplication);

// Route for updating onboarding details
router.put("/:userId/onboarding", updateOnboarding);

router.post("/verify-otp", verifyOTPEmailAuth);

/* GET users listing. */

export default router;
