import { Request, Response } from "express";
import sequelize from "../db";
export class UserController {
  static async getProfile(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId, 10);
      const [users]: any = await sequelize.query(
        "SELECT user_id, username, email, role, created_at, profile_photo_url, dob,bio, location, first_name, last_name FROM users WHERE user_id = $1",
        { bind: [userId] }
      );

      if (users.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = users[0];

      res.status(200).json({
        message: "User profile retrieved successfully",
        user,
      });
    } catch (error) {
      console.error("Get profile error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async editProfile(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId, 10);
      const {
        username,
        email,
        profile_photo_url,
        dob,
        bio,
        location,
        first_name,
        last_name,
      } = req.body;

      const [result]: any = await sequelize.query(
        `UPDATE users SET
        username = $1,
        email = $2,
        profile_photo_url = $3,
        dob = $4,
        bio = $5,
        location = $6,
        first_name = $7,
        last_name = $8
      WHERE user_id = $9
      RETURNING *`,
        {
          bind: [
            username,
            email,
            profile_photo_url,
            dob,
            bio,
            location,
            first_name,
            last_name,
            userId,
          ],
        }
      );

      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "Profile updated successfully",
        user: result[0],
      });
    } catch (error) {
      console.error("Edit profile error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getAllUsersData(req: Request, res: Response) {
    try {
      const [result] = await sequelize.query(
        `SELECT user_id, username, email, created_at, dob, first_name, last_name, location FROM users`
      );
      res.status(200).json({
        message: "Data Sent",
        users: result,
      });
    } catch (error) {
      console.error("fetch users error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId, 10);
      const [result]: any = await sequelize.query(
        "DELETE FROM users WHERE user_id = $1 RETURNING *",
        { bind: [userId] }
      );
      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("Delete user error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
