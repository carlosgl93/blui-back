import { Request, Response } from "express";
import sql from "mssql";
import { getPool } from "../db";

export const postPrestadorComunas = async (req: Request, res: Response) => {
  const { prestadorId, comunas } = req.body;

  const request = getPool().request();
  request.input("prestadorId", sql.Int, prestadorId);
  try {
    // Delete query
    let request = getPool().request();
    request.input("prestadorId", sql.Int, prestadorId);
    await request.query`DELETE FROM Prestador_Comuna WHERE prestador_id = @prestadorId;`;

    // Insert queries
    for (const comuna of comunas) {
      request = getPool().request();
      request.input("prestadorId", sql.Int, prestadorId);
      request.input("comuna", sql.Int, comuna.id);
      await request.query`INSERT INTO Prestador_Comuna (prestador_id, comuna_id) VALUES (@prestadorId, @comuna);`;
    }

    return res.status(200).send({
      status: "success",
      message: "Comunas updated successfully.",
      statusCode: 200
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send({
        status: "error",
        message: "There was an error updating comunas. " + error.message,
        statusCode: 500
      });
    } else {
      return res.status(500).send({
        status: "error",
        message: "There was an error updating comunas.",
        statusCode: 500
      });
    }
  }
};
