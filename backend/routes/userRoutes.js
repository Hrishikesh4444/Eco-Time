import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userControllers.js";

const router=Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);


export default router;