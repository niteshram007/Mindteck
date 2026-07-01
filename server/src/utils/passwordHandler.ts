import bcrypt from "bcryptjs";
import CustomError from "../error";

export class PasswordHandler {
  private saltRounds: number;

  constructor(saltRounds: number = 10) {
    this.saltRounds = saltRounds;
  }

  /**
   * Hashes a plain-text password using bcrypt.
   * @param password - The plain-text password to hash.
   * @returns A promise that resolves to the hashed password.
   */
  async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, this.saltRounds);
    } catch {
      throw new CustomError("Error hashing password");
    }
  }

  /**
   * Compares a plain-text password with a hashed password.
   * @param password - The plain-text password.
   * @param hashedPassword - The hashed password to compare against.
   * @returns A promise that resolves to a boolean indicating if the passwords match.
   */
  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch {
      throw new CustomError("Error comparing passwords");
    }
  }
}
