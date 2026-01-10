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

  static async deleteVidById(req: Request, res: Response) {
    const video_id = req.params.video_id;
    try {
      await sequelize.query("DELETE FROM videos WHERE video_id = $1", {
        bind: [video_id],
      });
      res.json({ message: "Video deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete the video by ID" });
    }
  }

  static async updateVideoById(req: Request, res: Response) {
    const video_id = req.params.video_id;
    const {
      title,
      module,
      video_url,
      manifest_url,
      duration_seconds,
      genre,
      author,
      language,
    } = req.body;

    try {
      // Validate required fields
      if (!title || !module || !video_url || !duration_seconds || !genre) {
        return res.status(400).json({
          error: "Missing required fields",
        });
      }

      await sequelize.query(
        "UPDATE videos SET title = $1, module = $2, video_url = $3, manifest_url = $4, duration_seconds = $5, genre = $6, author = $7, language = $8 WHERE video_id = $9",
        {
          bind: [
            title,
            module,
            video_url,
            manifest_url || null,
            Number(duration_seconds),
            genre,
            author || null,
            language || null,
            video_id,
          ],
        }
      );
      res.json({ message: "Video updated successfully" });
    } catch (error) {
      console.error("Update video error:", error);
      res.status(500).json({
        error: "Failed to update the video by ID",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
