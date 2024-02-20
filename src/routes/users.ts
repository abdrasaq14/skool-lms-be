import express from "express";
import {
  createUser,
  loginUser,
  courseController
} from "../controller/user";
const router = express.Router();

/* GET users listing. */
router.post("/register", createUser);
router.post("/login", loginUser);
router.post('/courses', courseController);


export default router;
