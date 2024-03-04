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
import {
  createProfessionalApplication,
  getAllProfessionalApplicationsWithStatus,
  deleteProfessionalApplication,
  deleteMultipleProfessionalApplications,
  approveProfessionalApplication,
  rejectProfessionalApplication
} from "../controller/professional";

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

// Route to get all Professional applications with the status
router.get(
  "/professional-applications",
  getAllProfessionalApplicationsWithStatus
);

// Route to verify OTP for email authentication
router.post("/verify-otp", verifyOTPEmailAuth);

// Route to delete a professional application

router.delete("/professional-application/:id", deleteProfessionalApplication);

// Route to delete multiple professional applications

router.delete(
  "/professional-applications",
  deleteMultipleProfessionalApplications
);

// Route to approve a professional application
router.put("/approve-application/:id", approveProfessionalApplication);

// Route to reject a professional application
router.put("/reject-application/:id", rejectProfessionalApplication);

/* GET users listing. */

export default router;
