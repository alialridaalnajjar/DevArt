import { Request, Response } from "express";
import sequelize from "../db";
export class VideoController {
  static async getVideoByGenre(req: Request, res: Response) {
    const genre = req.params.genre;
    try {
      if (genre === "all" || genre === "All") {
        const [video] = await sequelize.query("SELECT * FROM videos");
        return res.json(video);
      }
      const [video] = await sequelize.query(
        "SELECT * FROM videos WHERE genre = $1",
        { bind: [genre] }
      );
      res.json(video);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch the video by genre" });
    }
  }
  static async getVideoById(req: Request, res: Response) {
    const video_id = req.params.video_id;
    try {
      const [video] = await sequelize.query(
        "SELECT * FROM videos WHERE video_id = $1",
        { bind: [video_id] }
      );
      res.json(video[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch the video by ID" });
    }
  }
}
