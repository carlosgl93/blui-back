import { Request, Response } from "express";
import { getPool } from "../db/db";

export const getPrestadorById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    console.log("fetching prestador by id", id);

    const data = await getPool().request().query`
          SELECT TOP 1 * FROM Prestador WHERE id = ${id};
      `;
    return res.status(200).send(data.recordset[0]);
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "There was an error fetching prestador by id.",
      statusCode: 500
    });
  }
};
