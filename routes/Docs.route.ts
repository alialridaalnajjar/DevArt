import express from "express";
const router = express.Router();

import { DocsController } from "../controller/Docs.controller";

router.get("/:video_id", DocsController.getDocsByVideoId);

export default router;