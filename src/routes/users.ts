import { Router } from "express"; // Import Router from express
import {
  createUser,
  loginUser,
  verifyOTPEmailAuth,
  resetPassword,
  resetPasswordToken,
} from "../controller/user";
import {
  createCourse,
  createApplication,
  updateOnboarding,
} from "../controller/onboarding"; // Update the path accordingly
import { createProfessionalApplication } from "../controller/professional";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/forgotpassword", resetPassword);
router.post("/forgotpassword/:token", resetPasswordToken);
// Route for creating a new course
router.post("/:userId/courses", createCourse);


// Route for creating a new application
router.post("/:userId/applications", createApplication);

// Route for updating onboarding details
router.put("/:userId/onboarding", updateOnboarding);

// Route for creating a new professional application
router.post("/professional-application", createProfessionalApplication);

router.post("/verify-otp", verifyOTPEmailAuth);

/* GET users listing. */

export default router;
