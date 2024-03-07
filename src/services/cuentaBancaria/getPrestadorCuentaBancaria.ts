import { Request, Response } from "express";
import { getPool } from "../../db";

export const getPrestadorCuentaBancaria = async (req: Request, res: Response) => {
  const { prestadorId } = req.query;

  const request = getPool().request();
  const query = `SELECT * FROM CuentaBancaria WHERE prestadorId = ${prestadorId}`;
  try {
    const result = await request.query(query);

    res.status(200).send(result.recordset[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener cuenta bancaria del prestador");
  }
};
