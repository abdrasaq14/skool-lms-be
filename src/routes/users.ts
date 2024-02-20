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
router.post("/", createUser);
router.get("/", getUsers);

router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
