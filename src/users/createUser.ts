import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { getPool } from "../db/db";

const createUser = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password } = req.body;
  console.log(req.body);

  if (!password) {
    res.status(400).json({
      status: "error",
      message: "The 'password' field is required"
    });
    return;
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await getPool().request()
      .query`INSERT INTO Usuario (firstname, lastname, email, password) VALUES (${firstname}, ${lastname}, ${email}, ${hashedPassword})`;
    res.status(201).json({
      status: "success",
      data: result.recordset,
      message: "User created successfully",
      statusCode: 201
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: error.message,
        statusCode: 500
      });
    } else {
      console.error(error);
      res.status(500).json({
        status: "error",
        message: "Unkwon error occurred.",
        statusCode: 500
      });
    }
  }
};

export default createUser;
