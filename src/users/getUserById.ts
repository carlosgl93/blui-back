import { Request, Response } from "express";
import { getPool } from "../db/db";
import sql from "mssql";

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const request = getPool().request();
  request.input("id", sql.Int, id);

  try {
    const result = await request.query(`SELECT * FROM Usuario WHERE id = @id`);
    res.json({
      status: "success",
      data: result.recordset,
      message: "Fetched user successfully",
      statusCode: 200
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      res.status(500).send(err.message);
    } else {
      console.error(err);
      res.status(500).send("An unknown error occurred.");
    }
  }
};

export default getUserById;
