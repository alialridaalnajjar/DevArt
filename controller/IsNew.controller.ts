import { Request, Response } from "express";
import sequelize from "../db";

export class IsNewController {
  static async getIsNewByUserId(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const rows = await sequelize.query(
        "SELECT isnew FROM users WHERE user_id = $1",
        { bind: [userId] }
      );
      if (!rows.length)
        return res.status(404).json({ message: "User not found" });
      res.status(200).json(rows[0][0]);
    } catch (error) {
      console.error("Error fetching isNew status:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async setIsNewByUserIdFalse(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      await sequelize.query(
        "UPDATE users SET isnew = FALSE WHERE user_id = $1",
        { bind: [userId] }
      );
      res.status(200).json({ message: "isNew status updated successfully" });
    } catch (error) {
      console.error("Error updating isNew status:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
