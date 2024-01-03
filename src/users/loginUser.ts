import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sql from "mssql";
import { getPool } from "../db";

export const loginUser = async (req: Request, res: Response) => {
  const secretKey = process.env.SECRET;
  const { email, password } = req.body;
  console.log(req.body);
  console.log(email);
  console.log(password);

  const pool = getPool();

  // Validate the email and password

  try {
    // Find the user in the database
    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM Usuario WHERE email = @email");

    if (result.recordset.length > 0) {
      const user = result.recordset[0];

      // Check if the password is correct
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate a token
      const token = jwt.sign({ id: user.id }, secretKey as string);

      // Send the user data and token in the response
      return res.json({ user, token });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
