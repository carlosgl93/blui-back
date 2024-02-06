import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sql from "mssql";
import { getPool } from "../db";

export const loginUser = async (req: Request, res: Response) => {
  const secretKey = process.env.SECRET;
  const { email, password } = req.body;

  const pool = getPool();

  // Validate the email and password

  try {
    // Find the user in the database
    const poolRequestWithEmail = pool.request().input("email", sql.NVarChar, email);

    const isUserQuery = await poolRequestWithEmail.query("SELECT * FROM Usuario WHERE email = @email");
    const user = isUserQuery.recordset[0];
    // Find if the user is also a prestador by the email.
    const isPrestadorQuery = await poolRequestWithEmail.query(`
      SELECT P.id, P.firstname, P.lastname, P.password, P.description, P.email, P.phone, P.address, P.city, P.region, P.country, P.comuna_id, P.service_id, P.speciality_id, P.offers_free_meet_greet, AVG(R.score) as average_review, COUNT(R.score) as total_reviews, STRING_AGG(PC.comuna_id, ', ') as comunas
      FROM Prestador P
      LEFT JOIN Prestador_Comuna PC ON P.id = PC.prestador_id
      LEFT JOIN Reviews R ON P.id = R.prestador_id
      WHERE P.email = @email
      GROUP BY P.id, P.firstname, P.lastname, P.password, P.description, P.email, P.phone, P.address, P.city, P.region, P.country, P.comuna_id, P.service_id, P.speciality_id, P.offers_free_meet_greet;	
    `);
    const prestador = isPrestadorQuery.recordset[0];

    if (user || prestador) {
      let isPasswordCorrect;
      // Check if the password is correct
      if (user) {
        isPasswordCorrect = await bcrypt.compare(password, user.password);
      } else {
        console.log(password, prestador.password);
        isPasswordCorrect = await bcrypt.compare(password, prestador.password);
        console.log(typeof prestador.password, typeof password);
      }

      if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      let token;

      // Generate a token
      if (user && prestador) {
        token = jwt.sign({ id: prestador.id }, secretKey as string);
      } else if (user && !prestador) {
        token = jwt.sign({ id: user.id }, secretKey as string);
      } else {
        token = jwt.sign({ id: prestador.id }, secretKey as string);
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
