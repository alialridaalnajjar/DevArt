import express from "express";
const router = express.Router();
import { UserController } from "../controller/User.controller";

router.post("/register", UserController.register);
router.post("/login", UserController.login);

export default router;
