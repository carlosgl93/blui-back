import { Request, Response } from "express";
import sql from "mssql";
import { getPool } from "../../db/db";

export const getPrestadorComunas = async (req: Request, res: Response) => {
  const { prestadorId } = req.query;

  try {
    const request = getPool().request();
    request.input("prestadorId", sql.Int, prestadorId);

    const comunas = await request.query(`
      SELECT c.* 
      FROM Prestador_Comuna pc 
      JOIN Comuna c ON pc.comuna_id = c.id 
      WHERE pc.prestador_id = @prestadorId;
    `);
    const responseBody = comunas.recordset;

    return res.status(200).send(responseBody);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send({
        status: "error",
        message: "There was an error fetching comunas. " + error.message,
        statusCode: 500
      });
    } else {
      return res.status(500).send({
        status: "error",
        message: "There was an error fetching prestador comunas.",
        statusCode: 500
      });
    }
  }
};
