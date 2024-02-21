import { Router } from "express"; // Import Router from express
import { createUser, loginUser } from "../controller/user";
import { createCourse, createQualification, createApplication } from '../controller/onboarding'; // Update the path accordingly

const router = Router();

// Route for creating a new course
router.post('/:userId/courses', createCourse);

// Route for creating a new qualification
router.post('/:userId/qualifications', createQualification);

// Route for creating a new application
router.post('/:userId/applications', createApplication);

/* GET users listing. */
router.post("/register", createUser);
router.post("/login", loginUser);


export default router;
