import express from "express";
const router = express.Router();
import { VideoController } from "../controller/Video.controller";

router.get("/genre/:genre", VideoController.getVideoByGenre);
router.get("/:video_id", VideoController.getVideoById);
router.delete("/delete/:video_id", VideoController.deleteVidById);
router.put("/update/:video_id", VideoController.updateVideoById);
export default router;
