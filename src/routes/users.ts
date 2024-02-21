import express from "express";
import {
  createUser,
  loginUser,
  forgotPasswordUser
} from "../controller/user";
const router = express.Router();

/* GET users listing. */
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/forgotpassword", forgotPasswordUser )

export default router;
