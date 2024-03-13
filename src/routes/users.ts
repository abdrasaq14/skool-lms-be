import { Router } from "express";
import {
  createUser,
  loginUser,
  verifyOTPEmailAuth,
  resetPassword,
  resetPasswordToken,
  changePassword,
  editUserDetails,
  fetchUserDashboard,
  hasUserApplied,
} from "../controller/user";
import { createOnboarding } from "../controller/onboarding";
import {
  createProfessionalApplication,
  getProfessionalApplication,
  deleteProfessionalApplication,
  deleteMultipleProfessionalApplications,
  approveProfessionalApplication,
  rejectProfessionalApplication,
} from "../controller/professional";
import { createNotification, getNotification } from "../controller/nofications";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/forgotpassword", resetPassword);
router.post("/forgotpassword/:token", resetPasswordToken);

//User dahboard routes
router.post("/change-password", changePassword);
router.put("/edit-profile", editUserDetails);
router.get("/dashboard", fetchUserDashboard);
router.get("/notifications", getNotification);

router.get("/professional-application", hasUserApplied);

// Route for updating onboarding details
router.post("/onboarding", createOnboarding);

// Route for creating a new professional application
router.post("/professional-application", createProfessionalApplication);

// Route to get a single Professional application
router.get("/professional-applications/:id", getProfessionalApplication);

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

// Route to create a notification
router.post("/notification", createNotification);
// Route to get a notification
router.get("/notification", getNotification);

export default router;
