import { Router } from "express";
import {
    getAllProfessionalApplicationsWithStatus, getAllProfessionalApplications, getProfessionalApplication
} from "../controller/professional";

const router = Router();

// Route to get all Pending Professional applications
router.get(
    "/professional-applications-pending",
    getAllProfessionalApplicationsWithStatus
);
// Route to get all Professional applications regardless of status
router.get("/professional-applications", getAllProfessionalApplications);
// Route to get a single Professional application
router.get("/professional-applications/:id", getProfessionalApplication);