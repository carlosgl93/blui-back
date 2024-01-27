import { Request, Response } from "express";
import sql from "mssql";

import { getPool } from "../db/db";
import { error } from "../utils/logger";

export const getUserById = async (req: Request, res: Response) => {
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
      error(err);
      res.status(500).send(err.message);
    } else {
      error(err);
      res.status(500).send("An unknown error occurred.");
    }
  }
};

export default getUserById;
