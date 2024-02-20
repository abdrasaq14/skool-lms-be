import express from "express";
import {
  createUser,
  loginUser
} from "../controller/user";
const router = express.Router();

/* GET users listing. */
router.post("/register", createUser);
router.post("/login", loginUser);


export default router;
