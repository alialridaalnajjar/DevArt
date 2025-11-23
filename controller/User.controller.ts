import bcrypt from "bcrypt";
import { Request, Response } from "express";
import sequelize from "../db";
import { UserBuilder } from "../model/builder/User.builder";
import { JWTUtil } from "../utils/jwt.util";

export class UserController {
  static async register(req: Request, res: Response) {
    try {
      const {
        username,
        email,
        password,
        role,
        profile_photo_url,
        DOB,
        location,
        first_name,
        last_name,
      } = req.body;

      const [existingUsers]: any = await sequelize.query(
        "SELECT user_id FROM users WHERE email = $1 OR username = $2",
        {
          bind: [email, username],
        }
      );

      if (existingUsers.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      const password_hash = await bcrypt.hash(password, 10);
      const userBuilder = new UserBuilder()
        .setUsername(username)
        .setEmail(email)
        .setPasswordHash(password_hash)
        .setRole(role)
        .setCreatedAt(new Date())
        .setProfilePhotoUrl(profile_photo_url)
        .setDOB(DOB ? new Date(DOB) : null)
        .setLocation(location)
        .setFirstName(first_name)
        .setLastName(last_name)
        .build();

      const [result]: any = await sequelize.query(
        "INSERT INTO users (username, email, password_hash, role, created_at, profile_photo_url, DOB, location, first_name, last_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING user_id, username, email, role, created_at",
        {
          bind: [
            userBuilder.username,
            userBuilder.email,
            userBuilder.password_hash,
            userBuilder.role,
            userBuilder.created_at,
            userBuilder.profile_photo_url,
            userBuilder.DOB,
            userBuilder.location,
            userBuilder.first_name,
            userBuilder.last_name,
          ],
        }
      );

      const newUser = result[0];

      const token = JWTUtil.generateToken(
        newUser.user_id,
        newUser.email,
        newUser.role
      );

      res.status(201).json({
        message: "User registered successfully",
        token,
        user: newUser,
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const [users]: any = await sequelize.query(
        "SELECT user_id, username, email, password_hash, role FROM users WHERE email = $1",
        { bind: [email] }
      );

      if (users.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = users[0];

      const isPasswordValid = await bcrypt.compare(
        password,
        user.password_hash
      );

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = JWTUtil.generateToken(user.user_id, user.email, user.role);

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
