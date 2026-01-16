import express from "express";
const router = express.Router();
import { UserController } from "../controller/User.controller";

router.get("/getAll", UserController.getAllUsersData);
router.delete("/delete/:userId", UserController.deleteUser);
router.put("/edit/:userId", UserController.editProfile);

router.get("/:userId", UserController.getProfile);

export default router;