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

  static async editUserDataById(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId, 10);
      const { username, first_name, last_name, email, location, dob } =
        req.body;

      const [result]: any = await sequelize.query(
        `UPDATE users SET
        username = $1,
        first_name = $2,
        last_name = $3,
        email = $4,
        location = $5,
        dob = $6
      WHERE user_id = $7
      RETURNING *`,
        {
          bind: [username, first_name, last_name, email, location, dob, userId],
        }
      );
      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        message: "User data updated successfully",
        user: result[0],
      });
    } catch (error) {
      console.error("Edit user data error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async addSkills(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId, 10);
      const { skills } = req.body; 

      if (!Array.isArray(skills)) {
        return res.status(400).json({ message: "Skills must be an array" });
      }

      const [result]: any = await sequelize.query(
        `UPDATE users SET skills = $1 WHERE user_id = $2 RETURNING *`,
        { bind: [skills, userId] }
      );

      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "Skills updated successfully",
        user: result[0],
      });
    } catch (error) {
      console.error("Add skills error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async getSkills(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId, 10);
      const [users]: any = await sequelize.query(
        "SELECT skills FROM users WHERE user_id = $1",
        { bind: [userId] }
      );

      if (users.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      const user = users[0];
      res.status(200).json({
        message: "Skills retrieved successfully",

        skills: user.skills,
      });
    } catch (error) {
      console.error("Get skills error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  
}
