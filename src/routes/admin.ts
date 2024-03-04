import { Router } from "express";
import {
    getAllProfessionalApplicationsWithStatus, getAllProfessionalApplications, getApplicationsByUserId
} from "../controller/professional";

const router = Router();

// Route to get all Pending Professional applications
router.get(
    "/professional-applications-pending",
    getAllProfessionalApplicationsWithStatus
);
router.get("/professional-applications", getAllProfessionalApplications);
router.get("/professional-applications/:id", getApplicationsByUserId);