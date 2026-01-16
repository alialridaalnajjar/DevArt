import express from "express";
const router = express.Router();
import { UserController } from "../controller/User.controller";

// Admin routes --
router.get("/getAll", UserController.getAllUsersData);
router.delete("/delete/:userId", UserController.deleteUser);
router.put("/admin/edit/:userId", UserController.editUserDataById);

// User routes--
router.get("/:userId", UserController.getProfile);
router.put("/:userId/profile", UserController.editProfile);

export default router;
