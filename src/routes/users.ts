// import express from "express";
// import {
//   getUsers,
//   createUser,
//   getUser,
//   updateUser,
//   deleteUser,
// } from "../controller/user";
// const router = express.Router();

// /* GET users listing. */

// router.get("/", getUsers);
// router.post("/", createUser);
// router.get("/:id", getUser);
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);

// export default router;

import express from 'express';
import { registrationStageController, applicationStageController, qualificationStageController } from '../controller/user';

const router = express.Router();

// Route for registration stage
router.post('/registration', registrationStageController);

// Route for application stage
router.put('/application', applicationStageController);

// Route for qualification stage
router.put('/qualification', qualificationStageController);

export default router;

