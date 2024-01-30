import { Request, Response } from "express";
import sql from "mssql";

import { getPool } from "../db/db";
import { error } from "../utils/logger";

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const request = getPool().request();
  request.input("id", sql.Int, id);

  try {
    const userResult = await request.query(`SELECT * FROM Usuario WHERE id = @id`);
    const prestadorResult = await request.query(`SELECT * FROM Prestador WHERE id = @id`);
    const isPrestador = prestadorResult.recordset.length > 0;
    res.json({
      status: "success",
      data: isPrestador ? prestadorResult.recordset[0] : userResult.recordset[0],
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
