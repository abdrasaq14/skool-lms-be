import express from "express";
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controller/user";
const router = express.Router();

/* GET users listing. */

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
