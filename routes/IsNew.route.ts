import express from "express";
const router = express.Router();

import { IsNewController } from "../controller/IsNew.controller";

router.get("/:userId", IsNewController.getIsNewByUserId);
router.put("/setIsNewFalse/:userId", IsNewController.setIsNewByUserIdFalse);

export default router;
