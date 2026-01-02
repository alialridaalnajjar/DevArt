import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  (() => {
    throw new Error("JWT_SECRET must be defined in environment variables");
  })();

const JWT_EXPIRES_IN = "6h";

export class JWTUtil {
  static generateToken(
    userId: number,
    email: string,
    role: string,
    username: string,
    rememberMe: boolean | string
  ): string {
    const shouldRemember = rememberMe === true || rememberMe === "true";

    if (shouldRemember === true) {
      return jwt.sign({ userId, email, role, username }, JWT_SECRET, {
        expiresIn: "2mo",
      });
    }
    return jwt.sign({ userId, email, role, username }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}
