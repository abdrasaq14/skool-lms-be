import express from "express";
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser
} from "../controller/user";
const router = express.Router();

/* GET users listing. */
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/", getUsers);

router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
