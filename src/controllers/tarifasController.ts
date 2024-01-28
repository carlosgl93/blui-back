import { Request, Response } from "express";
import sql from "mssql";

import { getPool } from "../db/db";
import { error } from "../utils/logger";

export const getTarifas = async (req: Request, res: Response) => {
  const { prestadorId } = req.query;

  console.log("inside getTarifas", prestadorId);

  const request = getPool().request();
  request.input("prestadorId", sql.Int, Number(prestadorId));

  try {
    const data = await request.query`
        SELECT * FROM Tarifas WHERE prestador_id = @prestadorId;
    `;

    return res.status(200).send(data.recordset);
  } catch (err) {
    if (err instanceof Error) {
      error(err.message);
      return res.status(500).send({
        status: "error",
        message: "There was an error fetching tarifas. " + err.message,
        statusCode: 500
      });
    }
    return res.status(500).send({
      status: "error",
      message: "There was an error fetching tarifas.",
      statusCode: 500
    });
  }
};

export const postTarifas = async (req: Request, res: Response) => {
  const { prestadorId, tarifas } = req.body;

  const request = getPool().request();
  request.input("prestadorId", sql.Int, prestadorId);

  try {
    // Delete query
    let request = getPool().request();
    request.input("prestadorId", sql.Int, prestadorId);
    await request.query`DELETE FROM Tarifas WHERE prestador_id = @prestadorId;`;

    // Insert queries
    for (const tarifa of tarifas) {
      request = getPool().request();
      request.input("prestadorId", sql.Int, prestadorId);
      request.input("dayName", sql.VarChar, tarifa.dayName);
      request.input("precio", sql.Int, Number(tarifa.price));
      await request.query`INSERT INTO Tarifas (prestador_id, day_name, price) VALUES (@prestadorId, @dayName,  @precio);`;
    }

    return res.status(200).send({
      status: "success",
      message: "Tarifas updated successfully.",
      statusCode: 200
    });
  } catch (err) {
    if (err instanceof Error) {
      error(err.message);
      return res.status(500).send({
        status: "error",
        message: "There was an error updating tarifas. " + err.message,
        statusCode: 500
      });
    }
    return res.status(500).send({
      status: "error",
      message: "There was an error updating tarifas.",
      statusCode: 500
    });
  }
};
