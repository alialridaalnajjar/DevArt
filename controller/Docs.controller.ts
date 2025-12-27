import { Request, Response } from "express";
import sequelize from "../db";

export class DocsController {
  static async getDocsByVideoId(req: Request, res: Response) {
    try {
      const video_id = req.params.video_id;
      const [docs]: any = await sequelize.query(
        "SELECT * FROM docs WHERE video_fk = $1",
        { bind: [video_id] }
      );
      res.status(200).json(docs);
    } catch (error) {
      console.error("Error fetching documents:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
