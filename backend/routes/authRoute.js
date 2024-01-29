import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";

//rouer object
const router = express.Router();

//routing
//Register || Method POST
router.post("/register", registerController);

//LOGIN || Method POST
router.post("/login", loginController);

export default router;
