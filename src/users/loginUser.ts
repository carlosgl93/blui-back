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

    const poolRequestWithEmail = pool.request().input("email", sql.NVarChar, email);

    const isUserQuery = await poolRequestWithEmail.query("SELECT * FROM Usuario WHERE email = @email");
    const user = isUserQuery.recordset[0];
    // Find if the user is also a prestador by the email.
    const isPrestadorQuery = await poolRequestWithEmail.query("SELECT * FROM Prestador WHERE email = @email");
    const prestador = isPrestadorQuery.recordset[0];

    console.log("user", user);
    console.log("prestador", prestador);

    if (user) {
      // Check if the password is correct
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
let token;

// Generate a token
if (user && prestador) {
  token = jwt.sign({ id: prestador.id }, secretKey as string);
} else {
  token = jwt.sign({ id: user.id }, secretKey as string);
}

      // Send the user data and token in the response
      return res.json({ user, prestador, token });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
